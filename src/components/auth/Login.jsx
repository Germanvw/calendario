import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/login.css";
import { validateLoginInputs } from "../helpers/validations";
import { useForm } from "../hooks/useForm";
import { authStartLogin } from "../redux/actions/authActions";
import { startLoading, stopLoading } from "../redux/actions/uiActions";
import ErrorMsg from "../ui/ErrorMsg";
import FormInput from "./FormInput";

const Login = () => {
  const [value, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const loginInputs = [
    {
      id: 1,
      type: "email",
      placeholder: "Email...",
      name: "email",
    },
    {
      id: 2,
      type: "password",
      placeholder: "Contraseña...",
      name: "password",
    },
  ];

  const dispatch = useDispatch();
  const { errorMsg, loading } = useSelector((state) => state.ui);

  const handleLogin = (e) => {
    e.preventDefault();

    //Validaciones y respuesta backend
    const valid = validateLoginInputs(value, dispatch);
    if (valid) {
      //Loading
      dispatch(startLoading());
      // Peticion Backend
      dispatch(authStartLogin(value));

      dispatch(stopLoading());
      // Reseteo de datos
      reset();
    } else {
      // Error
      console.log("error");
    }
  };

  return (
    <div className="container login-container">
      <div className="login-form-1">
        <h3>Ingreso</h3>
        <form onSubmit={handleLogin}>
          {loginInputs.map((input) => (
            <FormInput
              key={input.id}
              value={value[input.name]}
              handleChange={handleInputChange}
              {...input}
            />
          ))}
          {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
          <div className="form-group">
            <button type="submit" className="btnSubmit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
