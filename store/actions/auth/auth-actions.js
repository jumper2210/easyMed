export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password, name) => {
  return async (dispatch) => {
    const response = await fetch("http://192.168.1.17:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password, name) => {
  return async (dispatch) => {
    const response = await fetch("http://192.168.1.17:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch({ type: LOGIN });
  };
};
