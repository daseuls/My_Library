import styled from "styled-components";

interface IProps {
  children: JSX.Element | null;
}

const Modal = ({ children }: IProps) => {
  const onClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
  width: 25rem;
  height: 35rem;
`;
