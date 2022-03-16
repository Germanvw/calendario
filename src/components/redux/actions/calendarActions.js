import { types } from "../types";

import Swal from "sweetalert2";
import { fetchToken } from "../../hooks/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
import moment from "moment";

export const eventStartUpdate = (values) => {
  return async (dispatch) => {
    try {
      // Editar evento
      const answ = await fetchToken(`events/edit/${values._id}`, values, "PUT");
      const body = await answ.json();
      const { newEvent } = body;
      if (body.ok) {
        // Update formateo
        newEvent.start = moment(newEvent.start).toDate();
        newEvent.finish = moment(newEvent.finish).toDate();

        dispatch(eventUpdate(newEvent));
        Swal.fire("Success", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const eventStartCreate = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const answ = await fetchToken("events/create", event, "POST");

      const body = await answ.json();

      if (body.ok) {
        body.event.user = { _id: uid, name };
        body.event.start = moment(event.start).toDate();
        body.event.finish = moment(event.finish).toDate();

        dispatch(eventCreate(body.event));
        Swal.fire("Success", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (err) {
      console.log(err);
    }
    // Crear un evento
  };
};

export const eventStartFetchAll = () => {
  return async (dispatch) => {
    try {
      // Fetch all
      const answ = await fetchToken("events/");

      const body = await answ.json();

      const events = prepareEvents(body.events);
      if (body.ok) {
        dispatch(eventFetchAll(events));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const eventStartDelete = (id) => {
  return async (dispatch) => {
    try {
      const answ = await fetchToken(`events/delete/${id}`, {}, "DELETE");
      const body = await answ.json();
      if (body.ok) {
        dispatch(eventDelete(id));
        Swal.fire("Success", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const eventActive = (event) => ({
  type: types.eventActive,
  payload: event,
});

export const eventNoActive = () => ({
  type: types.eventNoActive,
});

const eventDelete = (id) => ({
  type: types.eventDelete,
  payload: id,
});

const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

const eventCreate = (event) => ({
  type: types.eventCreate,
  payload: event,
});

const eventFetchAll = (events) => ({
  type: types.eventFetchAll,
  payload: events,
});
