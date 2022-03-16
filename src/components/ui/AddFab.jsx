import React from "react";
import { useDispatch } from "react-redux";
import { eventNoActive } from "../redux/actions/calendarActions";
import { modalOpen } from "../redux/actions/uiActions";

export const AddFab = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(eventNoActive());
    dispatch(modalOpen());
  };

  return (
    <button className="btn btn-primary fab fab-add" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
