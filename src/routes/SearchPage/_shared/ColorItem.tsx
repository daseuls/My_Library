import styled from "styled-components";

interface IProps {
  color: string;
}

const ColorItem = ({ color }: IProps) => {
  return <Color color={color} />;
};

export default ColorItem;

const Color = styled.div<{ color: string }>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
