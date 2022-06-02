import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useRecoilState } from "recoil";
import { libraryBookListState, wishListState } from "../../../states/state";
import { IBookItem } from "../../../types";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { IoBookOutline, IoBook } from "react-icons/io5";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

interface IProps {
  bookItem: IBookItem;
}

const ModalContents = ({ bookItem }: IProps) => {
  const { title, thumbnail, authors } = bookItem;

  const [date, setDate] = useState({ startDate: new Date(), endDate: null });
  const [libraryBookList, setLibraryBookList] = useRecoilState(libraryBookListState);
  const [wishList, setWishList] = useRecoilState(wishListState);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const isAddedLibrary = libraryBookList.map((el) => el.isbn).includes(bookItem.isbn);
  const isAddedWishList = wishList.map((el) => el.isbn).includes(bookItem.isbn);

  const onClickAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDatePickerOpen((prev) => !prev);
  };

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });

    if (!end) return;
    if (isAddedLibrary) {
      const changedDateItem = libraryBookList.map((el) =>
        el.isbn === bookItem.isbn ? { ...el, startDate: start, endDate: end } : el
      );
      localStorage.setItem("library", JSON.stringify(changedDateItem));
      setLibraryBookList(changedDateItem);
    } else {
      const addedList = [...libraryBookList, { ...bookItem, ...{ startDate: start, endDate: end } }];
      localStorage.setItem("library", JSON.stringify(addedList));
      setLibraryBookList(addedList);
    }
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const handleRemoveBookItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isAddedLibrary) {
      const filteredList = libraryBookList.filter((el) => el.isbn !== bookItem.isbn);
      localStorage.setItem("library", JSON.stringify(filteredList));
      setLibraryBookList(filteredList);
    } else {
      setIsDatePickerOpen(true);
    }
  };

  const handleWishListItem = () => {
    if (isAddedWishList) {
      const filteredWishItem = wishList.filter((el) => el.isbn !== bookItem.isbn);
      localStorage.setItem("wish", JSON.stringify(filteredWishItem));
      setWishList(filteredWishItem);
    } else {
      const wishItem = [...wishList, bookItem];
      localStorage.setItem("wish", JSON.stringify(wishItem));
      setWishList(wishItem);
    }
  };

  return (
    <Wrapper onClick={handleCloseDatePicker}>
      <BookInfoWrapper>
        <Thumbnail src={thumbnail} />
        <TitleWrapper>
          <Title>{title}</Title>
          {authors?.map((author, i) => (
            <Author key={`${author}${i}`}>{author}</Author>
          ))}
        </TitleWrapper>
      </BookInfoWrapper>
      <AddWishItem onClick={handleWishListItem}>
        <BsHeart size={19} />
        <div>위시리스트에 추가하기</div>
      </AddWishItem>

      {isAddedLibrary ? (
        <div>
          <IoBook size={20} />
          <SaveHandleBtn onClick={handleRemoveBookItem}>내 서재에서 삭제하기</SaveHandleBtn>
        </div>
      ) : (
        <div>
          <IoBookOutline size={20} />
          <SaveHandleBtn onClick={handleRemoveBookItem}>내 서재에 추가하기</SaveHandleBtn>
        </div>
      )}

      {isDatePickerOpen && (
        <PickerWrapper onClick={(e) => e.stopPropagation()}>
          <DateWrapper>
            <DatePickerIcon onClick={onClickAddBtn}>
              <AiTwotoneCalendar size={14} color="#3366FF" />
            </DatePickerIcon>
            <StartDate>{dayjs(date.startDate).format("YYYY년 MM월 DD일")}</StartDate>
            <EndDate>{dayjs(date.endDate).format("YYYY년 MM월 DD일")}</EndDate>
          </DateWrapper>
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
    </Wrapper>
  );
};
export default ModalContents;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Thumbnail = styled.img`
  width: 7rem;
  margin-right: 1rem;
`;

const BookInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleWrapper = styled.div``;
const Title = styled.p`
  margin-bottom: 1rem;
`;

const Author = styled.p``;

const DatePickerIcon = styled.button``;

const PickerWrapper = styled.div``;

const StartDate = styled.p`
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 2rem;
  margin: 0 1rem;
`;
const EndDate = styled.p`
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 2rem;
`;
const SaveHandleBtn = styled.button``;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AddWishItem = styled.div``;
