import moment from "moment";

export const prepareEvents = (events = []) => {
  return events.map((e) => ({
    ...e,
    start: moment(e.start).toDate(),
    finish: moment(e.finish).toDate(),
  }));
};
