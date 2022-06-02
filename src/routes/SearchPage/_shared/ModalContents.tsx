import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useRecoilState } from "recoil";
import { libraryBookListState } from "../../../states/state";
import { IBookItem } from "../../../types";

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  bookItem: IBookItem;
}
const ModalContents = ({ bookItem }: IProps) => {
  const { title, thumbnail, authors } = bookItem;

  const [date, setDate] = useState({ startDate: new Date(), endDate: null });
  const [libraryBookList, setLibraryBookList] = useRecoilState(libraryBookListState);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const isAddedLibrary = libraryBookList.map((el) => el.isbn).includes(bookItem.isbn);

  const onClickAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDatePickerVisible((prev) => !prev);
  };

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });
  };

  const onClickSaveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!date.endDate) return;
    if (isAddedLibrary) {
      const filteredList = libraryBookList.filter((el) => el.isbn !== bookItem.isbn);
      localStorage.setItem("library", JSON.stringify(filteredList));
      setLibraryBookList(filteredList);
    } else {
      const addedList = [...libraryBookList, { ...bookItem, ...date }];
      localStorage.setItem("library", JSON.stringify(addedList));
      setLibraryBookList(addedList);
    }
  };

  return (
    <>
      <BookTitle>{title}</BookTitle>
      {authors?.map((author, i) => (
        <BookDesc key={`${author}${i}`}>{author}</BookDesc>
      ))}
      <AddLibraryBtn onClick={onClickAddBtn}>아이콘</AddLibraryBtn>
      <StartDate>{String(date.startDate)}</StartDate>
      <EndDate>{String(date.endDate)}</EndDate>

      {isDatePickerVisible && (
        <PickerWrapper onClick={(e) => e.stopPropagation()}>
          <DatePicker
            selected={date.startDate}
            onChange={onChangeDate}
            startDate={date.startDate}
            endDate={date.endDate}
            locale={ko}
            selectsRange
            inline
          />
        </PickerWrapper>
      )}
      <SaveBtn onClick={onClickSaveBtn}>저장하기</SaveBtn>
    </>
  );
};
export default ModalContents;

const BookTitle = styled.p``;

const BookDesc = styled.p``;
const AddBtn = styled.button``;

const AddLibraryBtn = styled.button``;

const PickerWrapper = styled.div``;

const StartDate = styled.div``;
const EndDate = styled.div``;
const SaveBtn = styled.button``;
