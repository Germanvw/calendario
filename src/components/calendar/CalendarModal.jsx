import React, { useEffect, useState } from "react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import "../../css/modal.css";
import CalendarModalBody from "./CalendarModalBody";
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../redux/actions/uiActions";
import { eventNoActive } from "../redux/actions/calendarActions";

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const finish = moment().minutes(0).seconds(0).add(2, "hours");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const initialState = {
  title: "",
  notes: "",
  start: now.toDate(),
  finish: finish.toDate(),
  bgcolor: "#fafafa",
};
const CalendarModal = () => {
  // States
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateFinish, setDateFinish] = useState(finish.toDate());
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);

  // Functions
  const closeModal = () => {
    dispatch(modalClose());
    setValues(initialState);
    dispatch(eventNoActive());
  };

  const clearForm = () => {
    setValues(initialState);
  };
  const handleStartDate = (e) => {
    setDateStart(e);
    setValues({ ...values, start: e });
  };

  const handleFinishDate = (e) => {
    setDateFinish(e);
    setValues({ ...values, finish: e });
  };

  const handleInputs = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (moment(dateStart).isSameOrAfter(moment(values.finish))) {
      setValues({ ...values, start: values.finish });
    }
  }, [dateStart]);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <CalendarModalBody
        handleInputs={handleInputs}
        handleStartDate={handleStartDate}
        handleFinishDate={handleFinishDate}
        dateStart={dateStart}
        dateFinish={dateFinish}
        values={values}
        setValues={setValues}
        clearForm={clearForm}
      />
    </Modal>
  );
};

export default CalendarModal;
