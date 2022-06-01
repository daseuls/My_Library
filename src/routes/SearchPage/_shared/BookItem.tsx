import { IBookItem } from "../../../types";
import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  item: IBookItem;
}

const BookItem = ({ item }: IProps) => {
  const { title, thumbnail } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState({ startDate: new Date(), endDate: null });

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const onClickModal = () => {
    setIsModalOpen(false);
    setIsDatePickerVisible(false);
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(date);

  const onClickAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDatePickerVisible((prev) => !prev);
  };

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });
  };

  console.log(date);

  return (
    <>
      {isModalOpen && (
        <ModalWrapper onClick={onClickModal}>
          <Modal setIsDatePickerVisible={setIsDatePickerVisible}>
            <>
              <BookTitle>{item.title}</BookTitle>
              {item.authors?.map((author, i) => (
                <BookDesc key={`${author}${i}`}>{author}</BookDesc>
              ))}
              <AddLibraryBtn onClick={onClickAddBtn}>아이콘</AddLibraryBtn>
              <StartDate>{String(date.startDate)}</StartDate>
              <StartDate>{String(date.endDate)}</StartDate>

              {isDatePickerVisible && (
                <PickerWrapper onClick={(e) => e.stopPropagation()}>
                  <DatePicker
                    selected={date.startDate}
                    onChange={onChangeDate}
                    startDate={date.startDate}
                    endDate={date.endDate}
                    locale={ko}
                    selectsRange
                    inline
                  />
                </PickerWrapper>
              )}
            </>
          </Modal>
        </ModalWrapper>
      )}
      <Wrapper onClick={handleOpen}>
        <Thumbnail src={thumbnail} />
      </Wrapper>
      {isOpen && (
        <div>
          <Title>{title}</Title>
          <AddBtn onClick={handleModal}>서재에 추가하기</AddBtn>
        </div>
      )}
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

const BookTitle = styled.p``;

const BookDesc = styled.p``;

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

const AddBtn = styled.button``;

const AddLibraryBtn = styled.button``;

const PickerWrapper = styled.div``;

const StartDate = styled.div``;
const EndDate = styled.div``;
