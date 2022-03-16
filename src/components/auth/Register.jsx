import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateRegisterInputs } from "../helpers/validations";
import { useForm } from "../hooks/useForm";
import { authStartRegister } from "../redux/actions/authActions";
import { startLoading, stopLoading } from "../redux/actions/uiActions";
import ErrorMsg from "../ui/ErrorMsg";
import FormInput from "./FormInput";

const Register = () => {
  const [value, handleInputChange, reset] = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerInputs = [
    {
      id: 1,
      type: "text",
      placeholder: "Username...",
      name: "username",
    },
    {
      id: 2,
      type: "email",
      placeholder: "Email...",
      name: "email",
    },
    {
      id: 3,
      type: "password",
      placeholder: "Contraseña...",
      name: "password",
    },
    {
      id: 4,
      type: "password",
      placeholder: "Repita la contarseña...",
      name: "confirmPassword",
    },
  ];

  const dispatch = useDispatch();
  const { errorMsg, loading } = useSelector((state) => state.ui);

  const handleRegister = (e) => {
    e.preventDefault();

    // Validacion y respuesta backend
    const valid = validateRegisterInputs(value, dispatch);
    if (valid) {
      // Loading
      dispatch(startLoading());
      // Peticion Backend
      dispatch(
        authStartRegister({
          name: value.username,
          email: value.email,
          password: value.password,
        })
      );
      dispatch(stopLoading());
      // Reseteo estados
      reset();
    } else {
      // Error
    }
  };

  return (
    <div className="container login-container">
      <div className="login-form-2">
        <h3>Registro</h3>
        <form onSubmit={handleRegister}>
          {registerInputs.map((input) => (
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
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
