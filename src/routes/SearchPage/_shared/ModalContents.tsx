import { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { IBookItem } from "../../../types";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoBookOutline, IoBook } from "react-icons/io5";
import { libraryBookListState, wishListState } from "../../../states/state";
import ColorItem from "./ColorItem";

interface IProps {
  bookItem: IBookItem;
}

const COLORS = ["#F2D1D1", "#C2DED1", "#F0D9FF", "#FFF89A", "#9AD0EC"];

const ModalContents = ({ bookItem }: IProps) => {
  const { title, thumbnail, authors } = bookItem;

  const [libraryBookList, setLibraryList] = useRecoilState(libraryBookListState);
  const [wishList, setWishList] = useRecoilState(wishListState);

  const [date, setDate] = useState({ startDate: new Date(), endDate: null });
  const [color, setColor] = useState(COLORS[0]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const isAddedLibrary = libraryBookList.map((el: IBookItem) => el.isbn).includes(bookItem.isbn);
  const isAddedWishList = wishList.map((el: IBookItem) => el.isbn).includes(bookItem.isbn);

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });
  };

  const onClickSaveBtn = () => {
    if (!date.endDate) return;
    if (isAddedLibrary) {
      const changedDateItem = libraryBookList.map((el: IBookItem) =>
        el.isbn === bookItem.isbn ? { ...el, startDate: date.startDate, endDate: date.endDate, color } : el
      );
      localStorage.setItem("library", JSON.stringify(changedDateItem));
      setLibraryList(changedDateItem);
    } else {
      const addedList = [
        ...libraryBookList,
        { ...bookItem, ...{ startDate: date.startDate, endDate: date.endDate, color } },
      ];
      localStorage.setItem("library", JSON.stringify(addedList));
      setLibraryList(addedList);
    }
    setIsDatePickerOpen((prev) => !prev);
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
      <HandleListWrapper onClick={handleWishListItem}>
        {isAddedWishList ? (
          <>
            <BsHeartFill color="C490E4" size={19} />
            <AddDeleteText>위시리스트에 삭제하기</AddDeleteText>
          </>
        ) : (
          <>
            <BsHeart color="C490E4" size={19} />
            <AddDeleteText>위시리스트에 추가하기</AddDeleteText>
          </>
        )}
      </HandleListWrapper>
      <HandleListWrapper onClick={handleRemoveBookItem}>
        {isAddedLibrary ? (
          <>
            <IoBook color="5BA19B" size={20} />
            <AddDeleteText>내 서재에서 삭제하기</AddDeleteText>
          </>
        ) : (
          <>
            <IoBookOutline color="5BA19B" size={20} />
            <AddDeleteText>내 서재에 추가하기</AddDeleteText>
          </>
        )}
      </HandleListWrapper>
      {isDatePickerOpen && (
        <PickerWrapper onClick={(e) => e.stopPropagation()}>
          <DateWrapper>
            <ColorPicker>
              {COLORS.map((item) => (
                <ColorItem color={color} setColor={setColor} key={item} item={item} />
              ))}
            </ColorPicker>

            <DateDetail color={color}>
              <SelectedDate>
                <StartDate>{dayjs(date.startDate).format("YYYY년 MM월 DD일")}</StartDate>
                <EndDate>{date.endDate ? dayjs(date.endDate).format("YYYY년 MM월 DD일") : "-년 -월 -일"}</EndDate>
              </SelectedDate>
              <DatePicker
                selected={date.startDate}
                onChange={onChangeDate}
                startDate={date.startDate}
                endDate={date.endDate}
                locale={ko}
                selectsRange
                inline
              />
            </DateDetail>
            <SaveBtn onClick={onClickSaveBtn} disabled={!date.endDate}>
              저장
            </SaveBtn>
          </DateWrapper>
        </PickerWrapper>
      )}
    </Wrapper>
  );
};
export default ModalContents;

const Wrapper = styled.div`
  width: 100%;
  height: 42rem;
  padding: 2rem;
`;

const Thumbnail = styled.img`
  width: 6rem;
  margin-right: 1rem;
`;

const BookInfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1.5rem;
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

const PickerWrapper = styled.div``;

const StartDate = styled.p`
  width: 50%;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid black;
  border-radius: 2rem;
`;

const EndDate = styled.p`
  width: 50%;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 2rem;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 1rem;
`;

const HandleListWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
  cursor: pointer;
`;

const AddDeleteText = styled.p`
  margin-left: 1rem;
  font-size: 1.2rem;
`;

const ColorPicker = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const SelectedDate = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const DateDetail = styled.div<{ color: string }>`
  margin-bottom: 0.5rem;

  .react-datepicker {
    border: 1px solid #dddddd;
    font-size: 0.6rem;
    border-radius: 1rem;
    background-color: #f3f8ff;
  }

  .react-datepicker__header {
    background-color: #f3f8ff;
    border-bottom: 1px solid #dddddd;
    border-top-right-radius: 1rem;
  }

  .react-datepicker__day--keyboard-selected:hover {
    border-radius: 2rem;
    background-color: ${(props) => props.color};
  }

  .react-datepicker__day--in-range {
    background-color: ${(props) => props.color};
  }

  .react-datepicker__navigation-icon {
    border-color: gray;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-bottom: 0.2rem;
    font-weight: 500;
    color: #393b44;
  }

  .react-datepicker__day-name {
    color: #393b44;
  }

  .react-datepicker__day {
    color: #393b44;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2.4rem;
    line-height: 1.5rem;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 2rem;
  }
`;

const SaveBtn = styled.button<{ disabled: boolean }>`
  padding: 0.5rem;
  color: ${(props) => (props.disabled ? "#dddddd" : "1px solid #393B44")};
  border: ${(props) => (props.disabled ? "1px solid #dddddd" : "1px solid #393B44")};
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.3s all ease;
  :hover {
    background-color: ${(props) => (props.disabled ? null : "#DEECFC")};
  }
`;
