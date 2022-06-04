import { useEffect, useState } from "react";
import styled from "styled-components";
import { IBookItem } from "../../types";
import { getLocalData } from "../../utils/getLocalData";
import LibraryBookList from "./_shared/LibraryBookItem";

const LibraryPage = () => {
  const [isLibrary, setIsLibrary] = useState(true);

  const libraryBookList = getLocalData("library");
  const wishBookList = getLocalData("wish");

  const handleCategory = (bool: boolean) => {
    setIsLibrary(bool);
  };

  return (
    <Wrapper>
      <CategoryWrapper>
        <Category onClick={() => handleCategory(true)}>내 서재</Category>
        <Category onClick={() => handleCategory(false)}>위시 리스트</Category>
      </CategoryWrapper>
      {isLibrary ? (
        <BookListWrapper>
          {libraryBookList.map((bookItem: IBookItem) => (
            <LibraryBookList key={bookItem.isbn} bookItem={bookItem} />
          ))}
        </BookListWrapper>
      ) : (
        <BookListWrapper>
          {wishBookList.map((bookItem: IBookItem) => (
            <LibraryBookList key={bookItem.isbn} bookItem={bookItem} />
          ))}
        </BookListWrapper>
      )}
    </Wrapper>
  );
};

export default LibraryPage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 87%;
  overflow: auto;
  margin: 2rem 1rem 0.5rem;

  border-bottom-right-radius: 3rem;
  border-bottom-left-radius: 3rem;

  background-color: white;
`;

const CategoryWrapper = styled.div`
  border-top-right-radius: 3rem;

  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Category = styled.div`
  cursor: pointer;
  background-color: yellow;
`;

const BookListWrapper = styled.div`
  width: 90%;
`;
