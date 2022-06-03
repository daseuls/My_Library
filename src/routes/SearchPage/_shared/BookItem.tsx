import { IBookItem } from "../../../types";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useState } from "react";

import ModalContents from "./ModalContents";

interface IProps {
  bookItem: IBookItem;
}

const BookItem = ({ bookItem }: IProps) => {
  const { thumbnail } = bookItem;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const onClickModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ModalOutside onClick={onClickModal}>
          <Modal>
            <ModalContents bookItem={bookItem} />
          </Modal>
        </ModalOutside>
      )}
      <Wrapper onClick={handleModalOpen}>
        <Thumbnail src={thumbnail} alt="bookThumbnail" />
      </Wrapper>
    </>
  );
};

export default BookItem;

const Wrapper = styled.div`
  cursor: pointer;
  margin-bottom: 1rem;
  border: 1px solid #393b44;
`;

const Thumbnail = styled.img`
  width: 9rem;
`;

const ModalOutside = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
