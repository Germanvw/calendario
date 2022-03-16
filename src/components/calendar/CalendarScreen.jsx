import React, { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../helpers/calendar-messages-esp";
import CalendarEvent from "./CalendarEvent";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../redux/actions/uiActions";
import {
  eventActive,
  eventStartFetchAll,
} from "../redux/actions/calendarActions";
import { AddFab } from "../ui/AddFab";
import { DeleteFab } from "../ui/DeleteFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { active, events } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView:") || "month"
  );

  useEffect(() => {
    dispatch(eventStartFetchAll());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(modalOpen());
  };

  const onSelectEvent = (e) => {
    dispatch(eventActive(e));
  };

  const onSelectSlot = (e) => {
    const { start, end } = e;
    dispatch(
      eventActive({
        title: "",
        notes: "",
        start,
        finish: end,
        bgcolor: "#fafafa",
      })
    );
    dispatch(modalOpen());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView:", e);
  };
  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        events={events}
        localizer={localizer}
        messages={messages}
        view={lastView}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        eventPropGetter={eventPropGetter}
        startAccessor="start"
        endAccessor="finish"
      />
      {active && <DeleteFab />}
      <AddFab />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
