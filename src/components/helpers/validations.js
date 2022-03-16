import { clearError, setError } from "../redux/actions/uiActions";
import moment from "moment";

export const validateRegisterInputs = (form, dispatch) => {
  const { username, email, password, confirmPassword } = form;

  if (username.trim().length === 0) {
    dispatch(setError("Invalid username"));
    return false;
  } else if (email.trim().length === 0) {
    dispatch(setError("Invalid email"));
    // Invalid email
    return false;
  } else if (password.length < 6) {
    dispatch(setError("Invalid password, length must be 6 or longer"));
    return false;
  } else if (password !== confirmPassword) {
    dispatch(setError("Passwords must match"));
    return false;
  } else {
    dispatch(clearError());
    return true;
  }
};

export const validateLoginInputs = (form, dispatch) => {
  const { email, password } = form;

  if (email.trim().length === 0) {
    dispatch(setError("Invalid email"));
    // Invalid email
    return false;
  } else if (password.length < 6) {
    dispatch(setError("Invalid password, length must be 6 or longer"));
    return false;
  } else {
    dispatch(clearError());
    return true;
  }
};

export const validateNewNote = (form, dispatch) => {
  const { title, notes, start, finish } = form;

  const newStart = moment(start);
  const newFinish = moment(finish);

  if (newStart.isSameOrAfter(newFinish)) {
    dispatch(setError("La fecha de finalizacion debe ser mayor"));
    return false;
  } else if (title.trim().length === 0) {
    dispatch(setError("Invalid title"));
    return false;
  } else if (notes.trim().length === 0) {
    dispatch(setError("Invalid note"));
    return false;
  } else {
    dispatch(clearError());
    return true;
  }
};

export const validateNoteUI = (
  values,
  setValidTitle,
  setValidNote,
  setValidDate
) => {
  if (values.title.trim().length === 0) {
    setValidTitle(false);
  } else {
    setValidTitle(true);
  }

  if (values.notes.trim().length === 0) {
    setValidNote(false);
  } else {
    setValidNote(true);
  }

  if (moment(values.start).isSameOrAfter(moment(values.finish))) {
    setValidDate(false);
  } else {
    setValidDate(true);
  }
};
