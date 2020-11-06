import { SET_USER } from "../actions/user";

const initialState = {
  name: "",
  address: "",
  email: "",
  phone_number: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
            name: action.name,
            address: action.address,
            email: action.email,
            phone_number: action.phone_number,
        };
    }
    return state;
  };
  