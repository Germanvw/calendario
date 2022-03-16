import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventStartDelete } from "../redux/actions/calendarActions";

export const DeleteFab = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.calendar);

  const handleClick = (e) => {
    dispatch(eventStartDelete(active._id));
  };

  return (
    <button className="btn btn-danger fab fab-delete" onClick={handleClick}>
      <i className="fas fa-minus"></i>
    </button>
  );
};
