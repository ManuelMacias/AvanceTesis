import { Item } from "react-navigation-header-buttons";

export const SET_USER = "SET_USER";

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`http://192.168.0.169:80/api/usuarios/${userId}`);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      let name = resData.name
      let address = resData.address
      let email = resData.email
      let phone_number = resData.phone_number

      dispatch({
        type: SET_USER,
        name: name,
        address: address,
        email: email,
        phone_number: phone_number
      });
    } catch (err) {
      // Send to analytics server
      throw err;
    }
  };
};

