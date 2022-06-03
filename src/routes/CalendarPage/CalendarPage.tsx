import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { libraryBookListState } from "../../states/state";
import { IBookItem } from "../../types";

const CalendarPage = () => {
  const libraryBookList = useRecoilValue(libraryBookListState);
  const calendarBookList = libraryBookList?.map((item: IBookItem) => {
    return { title: item.title, date: item.startDate, end: item.endDate };
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
  margin: 5rem 2rem 0;
`;
