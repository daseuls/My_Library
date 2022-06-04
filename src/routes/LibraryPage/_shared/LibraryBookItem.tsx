import styled from "styled-components";
import { IBookItem } from "../../../types";
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { AiFillDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { libraryBookListState, wishListState } from "../../../states/state";

interface IProps {
  bookItem: IBookItem;
  isLibrary: boolean;
}

const LibraryBookList = ({ bookItem, isLibrary }: IProps) => {
  const { title, thumbnail, startDate, endDate } = bookItem;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [libraryBookList, setLibraryList] = useRecoilState(libraryBookListState);
  const [wishList, setWishList] = useRecoilState(wishListState);

  const onClickModal = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleDeleteItem = () => {
    if (isLibrary) {
      const filteredList = libraryBookList.filter((el: IBookItem) => el.isbn !== bookItem.isbn);
      localStorage.setItem("library", JSON.stringify(filteredList));
      setLibraryList(filteredList);
    } else {
      const filteredWishItem = wishList.filter((el: IBookItem) => el.isbn !== bookItem.isbn);
      localStorage.setItem("wish", JSON.stringify(filteredWishItem));
      setWishList(filteredWishItem);
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalOutside onClick={onClickModal}>
          <Modal>
            <ModalInsideWrapper>
              <AiFillDelete size={25} />
              <ContentsTitle>{isLibrary ? "서재에서 삭제할까요?" : "위시 리스트에서 삭제할까요?"}</ContentsTitle>
              <BtnWrapper>
                <AgreeBtn onClick={handleDeleteItem}>확인</AgreeBtn>
                <CancelBtn onClick={onClickModal}>취소</CancelBtn>
              </BtnWrapper>
            </ModalInsideWrapper>
          </Modal>
        </ModalOutside>
      )}
      <Wrapper onClick={handleModalOpen}>
        <Img src={thumbnail} />
        <BookInfo>
          <Title>{title}</Title>
          {isLibrary && (
            <p>{`${dayjs(startDate).format("YYYY년 MM월 DD일")} - ${dayjs(endDate).format("YYYY년 MM월 DD일")}`}</p>
          )}
        </BookInfo>
      </Wrapper>
    </>
  );
};

export default LibraryBookList;

const Wrapper = styled.div`
  display: flex;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  padding: 1rem 2rem;
  border-radius: 2rem;
  margin-bottom: 1rem;
  background-color: #f6fbf4;
  transition: all 0.3s ease;

  :hover {
    background-color: #a7d7c5;
    transform: scale(1.03);
  }
  cursor: pointer;
`;

const Img = styled.img`
  width: 4rem;
`;

const BookInfo = styled.div`
  margin-left: 1rem;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
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

const ModalInsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ContentsTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem 0 1.5rem;
`;

const BtnWrapper = styled.div``;

const AgreeBtn = styled.button`
  cursor: pointer;
  border: 1px solid gray;
  padding: 0.7rem 1.5rem;
  border-radius: 1rem;
  margin-right: 1rem;
  transition: 0.3s all ease;

  :hover {
    background-color: #deecfc;
  }
`;

const CancelBtn = styled.button`
  cursor: pointer;
  border: 1px solid gray;
  padding: 0.7rem 1.5rem;
  border-radius: 1rem;
  transition: 0.3s all ease;

  :hover {
    background-color: #deecfc;
  }
`;
