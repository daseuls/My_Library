import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import { IBookItem } from "../../types";
import { getLocalData } from "../../utils/getLocalData";

const CalendarPage = () => {
  const libraryBookList = getLocalData("library");
  const calendarBookList = libraryBookList?.map((item: IBookItem) => {
    return { title: item.title, date: item.startDate, end: item.endDate, color: "#FFE6E6" };
  });

  const renderEventContent = (eventInfo: any) => {
    return <i>{eventInfo.event.title}</i>;
  };

  return (
    <CalendarWrapper>
      <FullCalendar
        locale="ko"
        plugins={[dayGridPlugin]}
        height={550}
        initialView="dayGridMonth"
        fixedWeekCount={false}
        events={calendarBookList}
        eventContent={renderEventContent}
      />
    </CalendarWrapper>
  );
};

export default CalendarPage;

const CalendarWrapper = styled.main`
  padding: 5rem 2rem 0;
`;
