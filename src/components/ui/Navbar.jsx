import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStartLogout } from "../redux/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authStartLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
