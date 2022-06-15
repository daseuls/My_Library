import { useState } from "react";
import styled from "styled-components";
import { IBookItem } from "../../../types";
import ModalContents from "./ModalContents";
import { NO_IMG_URL } from "../../../utils/no_img";
import Modal from "../../../components/Modal";

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
        <Thumbnail src={thumbnail || NO_IMG_URL} alt="bookThumbnail" />
      </Wrapper>
    </>
  );
};

export default BookItem;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.$BOOK_SHADOWS};
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 9rem;
  height: 13rem;
`;

const ModalOutside = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
