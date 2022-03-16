import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { validateNewNote, validateNoteUI } from "../helpers/validations";
import { clearError, modalClose } from "../redux/actions/uiActions";
import {
  eventStartCreate,
  eventStartUpdate,
} from "../redux/actions/calendarActions";

const CalendarModalBody = ({
  handleInputs,
  handleStartDate,
  handleFinishDate,
  values,
  setValues,
  clearForm,
}) => {
  const [validTitle, setValidTitle] = useState(true);
  const [validNote, setValidNote] = useState(true);
  const [validDate, setValidDate] = useState(true);

  const { title, notes } = values;

  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.calendar);
  const { errorMsg } = useSelector((state) => state.ui);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones y llamada backend
    if (validateNewNote(values, dispatch)) {
      if (active && active._id) {
        dispatch(eventStartUpdate(values, active._id));
      } else {
        dispatch(eventStartCreate(values));
      }
      clearForm();
      setValidTitle(true);
      setValidNote(true);
      setValidDate(true);
      dispatch(modalClose());
      // Limpieza de campos
    }
  };

  useEffect(() => {
    if (errorMsg) {
      Swal.fire("Error", errorMsg, "error");

      validateNoteUI(values, setValidTitle, setValidNote, setValidDate);
      dispatch(clearError());
    }
  }, [errorMsg]);

  useEffect(() => {
    if (active) {
      setValues(active);
    }
  }, [active, setValues]);

  return (
    <>
      <h1> {active && active.id ? "Editar Evento" : "Nuevo Evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mb-2">Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDate}
            value={values.start}
            className={`form-control mb-2 ${!validDate && "is-invalid"}`}
          />
        </div>

        <div className="form-group">
          <label className="mb-2">Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleFinishDate}
            value={values.finish}
            minDate={values.start}
            className={`form-control ${!validDate && "is-invalid"}`}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!validTitle && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputs}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className={`form-control ${!validNote && "is-invalid"}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputs}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> {active && active.id ? "Actualizar" : "Guardar"}</span>
        </button>
      </form>
    </>
  );
};

export default CalendarModalBody;
