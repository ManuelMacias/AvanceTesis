import { AsyncStorage } from "react-native";
import Auth from "@aws-amplify/auth";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password, name, phone_number, address) => {
  return async () => {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email: email,
        name: name,
        phone_number: phone_number,
        address: address,
      },
    })
      .then(() => {})
      .catch((err) => {
        if (err.message) {
          throw new Error(err.message);
        }
        console.log(err);
      });
  };
};

export const confirmSignUp = (email, confirmationCode) => {
  return async () => {
    await Auth.confirmSignUp(email, confirmationCode)
      .then(() => {})
      .catch((err) => {
        if (err.message) {
          throw new Error(err.message);
        }
        console.log(err);
      });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    await Auth.signIn(email, password)
      .then((user) => {
        dispatch(
          authenticate(
            user.attributes.sub,
            user.signInUserSession.accessToken.jwtToken,
            3600000
          )
        );
        const expirationDate = new Date(new Date().getTime() + 3600000);
        saveDataToStorage(
          user.signInUserSession.accessToken.jwtToken,
          user.attributes.sub,
          expirationDate
        );
      })
      .catch((err) => {
        if (err.message) {
          throw new Error(err.message);
        }
        console.log(err);
      });
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
