import { IBookItem } from "../../../types";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useState } from "react";

interface IProps {
  item: IBookItem;
}

const BookItem = ({ item }: IProps) => {
  const { title, thumbnail } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const onClickModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ModalWrapper onClick={onClickModal}>
          <Modal>
            <ModalTitle>{item.title}</ModalTitle>
          </Modal>
        </ModalWrapper>
      )}
      <Wrapper onClick={handleModal}>
        <Title>{title}</Title>
        <Thumbnail src={thumbnail} />
      </Wrapper>
    </>
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

const ModalTitle = styled.p``;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
