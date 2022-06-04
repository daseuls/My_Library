import styled from "styled-components";
import { Dispatch } from "react";

interface IProps {
  item: string;
  color: string;
  setColor: Dispatch<React.SetStateAction<string>>;
}

const ColorItem = ({ item, setColor, color }: IProps) => {
  return <Color onClick={() => setColor(item)} color={item} isSelected={color === item} />;
};

export default ColorItem;

const Color = styled.div<{ color: string; isSelected: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: ${(props) => (props.isSelected ? "1px solid black" : null)};
`;
