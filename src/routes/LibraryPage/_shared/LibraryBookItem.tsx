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
  border: 1px solid #393b44;
  /* border: 1px solid black; */

  padding: 1rem 2rem;
  border-radius: 25px;
  margin-bottom: 0.5rem;
`;

const Img = styled.img`
  width: 4rem;
  border: 1px solid black;
`;
