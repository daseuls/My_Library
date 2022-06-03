import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { IBookItem } from "../../../types";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoBookOutline, IoBook } from "react-icons/io5";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { getLocalData } from "../../../utils/getLocalData";
import { useRecoilState } from "recoil";
import { libraryBookListState, wishListState } from "../../../states/state";

interface IProps {
  bookItem: IBookItem;
}

const ModalContents = ({ bookItem }: IProps) => {
  const { title, thumbnail, authors } = bookItem;

  const [libraryBookList, setLibraryList] = useRecoilState(libraryBookListState);
  const [wishList, setWishList] = useRecoilState(wishListState);

  const [date, setDate] = useState({ startDate: new Date(), endDate: null });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const isAddedLibrary = libraryBookList.map((el: IBookItem) => el.isbn).includes(bookItem.isbn);
  const isAddedWishList = wishList.map((el: IBookItem) => el.isbn).includes(bookItem.isbn);

  const onClickAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDatePickerOpen((prev) => !prev);
  };

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });

    if (!end) return;
    if (isAddedLibrary) {
      const changedDateItem = libraryBookList.map((el: IBookItem) =>
        el.isbn === bookItem.isbn ? { ...el, startDate: start, endDate: end } : el
      );
      localStorage.setItem("library", JSON.stringify(changedDateItem));
      setLibraryList(changedDateItem);
    } else {
      const addedList = [...libraryBookList, { ...bookItem, ...{ startDate: start, endDate: end } }];
      localStorage.setItem("library", JSON.stringify(addedList));
      setLibraryList(addedList);
    }
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const handleRemoveBookItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isAddedLibrary) {
      const filteredList = libraryBookList.filter((el: IBookItem) => el.isbn !== bookItem.isbn);
      localStorage.setItem("library", JSON.stringify(filteredList));
      setLibraryList(filteredList);
    } else {
      setIsDatePickerOpen(true);
    }
  };

  const handleWishListItem = () => {
    if (isAddedWishList) {
      const filteredWishItem = wishList.filter((el: IBookItem) => el.isbn !== bookItem.isbn);
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
            // eslint-disable-next-line react/no-array-index-key
            <Author key={`${author}${i}`}>{author}</Author>
          ))}
        </TitleWrapper>
      </BookInfoWrapper>
      {isAddedWishList ? (
        <HandleListWrapper onClick={handleWishListItem}>
          <BsHeartFill size={19} />
          <AddDeleteText>위시리스트에 삭제하기</AddDeleteText>
        </HandleListWrapper>
      ) : (
        <HandleListWrapper onClick={handleWishListItem}>
          <BsHeart size={19} />
          <AddDeleteText>위시리스트에 추가하기</AddDeleteText>
        </HandleListWrapper>
      )}
      {isAddedLibrary ? (
        <HandleListWrapper onClick={handleRemoveBookItem}>
          <IoBook size={20} />
          <AddDeleteText>내 서재에서 삭제하기</AddDeleteText>
        </HandleListWrapper>
      ) : (
        <HandleListWrapper onClick={handleRemoveBookItem}>
          <IoBookOutline size={20} />
          <AddDeleteText>내 서재에 추가하기</AddDeleteText>
        </HandleListWrapper>
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
  align-items: flex-end;
  /* justify-content: flex-end; */
  margin-bottom: 2rem;
`;

const TitleWrapper = styled.div`
  margin-bottom: 0.5rem;
`;
const Title = styled.p`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
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

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HandleListWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AddDeleteText = styled.p`
  font-size: 1.2rem;
  margin-left: 1rem;
`;
