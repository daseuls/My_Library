import { IBookItem } from "../../../types";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useState } from "react";

import ModalContents from "./ModalContents";

interface IProps {
  bookItem: IBookItem;
}

// TODO: isAddedLibrary에 따른 버튼 스타일링
// TODO: endDay가 없을때 버튼 비활성화하기, 모달껐을때 date저장 안되도록
// TODO: 함수명, 변수명 직관적으로 바꾸기
// TODO: 첫렌더링때 검색후 안나오는 오류 해결

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
`;

const Thumbnail = styled.img`
  width: 40px;
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
