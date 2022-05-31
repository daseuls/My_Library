import { IBookItem } from "../../../types";
import styled from "styled-components";

interface IProps {
  item: IBookItem;
}

const BookItem = ({ item }: IProps) => {
  const { title, thumbnail } = item;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Thumbnail src={thumbnail} />
    </Wrapper>
  );
};

export default BookItem;

const Wrapper = styled.li`
  cursor: pointer;
`;

const Title = styled.p``;

const Thumbnail = styled.img`
  width: 40px;
`;
