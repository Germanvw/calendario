import { types } from "../types";
import { fetchNoToken, fetchToken } from "../../hooks/fetch";

import Swal from "sweetalert2";

export const authStartLogin = (form) => {
  const { email, password } = form;

  return async (dispatch) => {
    const answ = await fetchNoToken("auth/login", { email, password }, "POST");

    const body = await answ.json();

    if (body.ok) {
      localStorage.setItem("x-token", body.token);
      localStorage.setItem("token-init", new Date().getTime());

      dispatch(
        authLogin({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      localStorage.removeItem("x-token");
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const authStartRegister = (form) => {
  const { name, email, password } = form;

  return async (dispatch) => {
    const answ = await fetchNoToken(
      "auth/register",
      { name, email, password },
      "POST"
    );

    const body = await answ.json();
    if (body.ok) {
      //Register success
      console.log("login");
      dispatch(
        authLogin({
          uid: body._id,
          name: body.name,
        })
      );
    } else {
      //Register error
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const answ = await fetchToken("auth/renew");

    const body = await answ.json();
    if (body.ok) {
      localStorage.setItem("x-token", body.token);
      localStorage.setItem("token-init", new Date().getTime());

      dispatch(
        authLogin({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      //Register error
      localStorage.removeItem("x-token");
      dispatch(checkingFinish());
    }
  };
};

export const authStartLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("x-token");
    localStorage.removeItem("token-init");
    dispatch(authLogout());
  };
};

const checkingFinish = () => ({
  type: types.authFinishValidating,
});

const authLogin = (user) => ({
  type: types.authLogin,
  payload: user,
});

const authLogout = () => ({
  type: types.authLogout,
});
