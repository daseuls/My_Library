import styled from "styled-components";
import { IBookItem } from "../../../types";
import dayjs from "dayjs";

interface IProps {
  bookItem: IBookItem;
}

const LibraryBookList = ({ bookItem }: IProps) => {
  const { title, thumbnail, startDate, endDate } = bookItem;
  return (
    <Wrapper>
      <Img src={thumbnail} />
      <BookInfo>
        <Title>{title}</Title>
        <p>{`${dayjs(startDate).format("YYYY년 MM월 DD일")} - ${dayjs(endDate).format("YYYY년 MM월 DD일")}`}</p>
      </BookInfo>
    </Wrapper>
  );
};

export default LibraryBookList;

const Wrapper = styled.div`
  display: flex;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  padding: 1rem 2rem;
  border-radius: 2rem;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  width: 4rem;
`;

const BookInfo = styled.div`
  margin-left: 1rem;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
