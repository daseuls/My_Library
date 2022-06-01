import { Dispatch } from "react";
import styled from "styled-components";

interface IProps {
  children: JSX.Element | null;
  setIsDatePickerVisible: Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setIsDatePickerVisible }: IProps) => {
  const onClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDatePickerVisible(false);
  };

  return (
    <Wrapper onClick={onClickModal}>
      <ModalWrapper>{children}</ModalWrapper>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div``;

const ModalWrapper = styled.div`
  background-color: yellow;
  width: 20rem;
  height: 30rem;
`;
