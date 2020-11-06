import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`http://192.168.0.169:80/api/orders/${userId}`);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            resData[key].id.toString(),
            JSON.parse(resData[key].cartItems),
            parseFloat(resData[key].totalAmount),
            new Date(resData[key].updated_at)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch("http://192.168.0.169:80/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: JSON.stringify(cartItems),
        totalAmount,
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.id.toString(),
        items: cartItems,
        amount: totalAmount,
        date: resData.created_at,
      },
    });
  };
};
