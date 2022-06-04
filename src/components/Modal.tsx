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
  width: 25rem;
  background-color: #f3f8ff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 2rem;
`;
