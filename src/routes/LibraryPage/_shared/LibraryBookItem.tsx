import styled from "styled-components";
import { IBookItem } from "../../../types";

interface IProps {
  bookItem: IBookItem;
}

const LibraryBookList = ({ bookItem }: IProps) => {
  const { title, thumbnail, startDate, endDate } = bookItem;
  return (
    <Wrapper>
      <Img src={thumbnail} />
      <div>
        <p>{title}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
      </div>
    </Wrapper>
  );
};

export default LibraryBookList;

const Wrapper = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 5rem;
`;
