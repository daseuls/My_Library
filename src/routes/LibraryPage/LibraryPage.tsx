import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { libraryBookListState, wishListState } from "../../states/state";
import LibraryBookList from "./_shared/LibraryBookItem";

const LibraryPage = () => {
  const [libraryBookList, setLibraryBookList] = useRecoilState(libraryBookListState);
  const [wishBookList, setWishBookList] = useRecoilState(wishListState);
  const [isLibrary, setIsLibrary] = useState(true);

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
          {libraryBookList.map((bookItem) => (
            <LibraryBookList key={bookItem.isbn} bookItem={bookItem} />
          ))}
        </BookListWrapper>
      ) : (
        <BookListWrapper>
          {wishBookList.map((bookItem) => (
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
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const CategoryWrapper = styled.div`
  display: flex;
  width: 100%;
  /* align-items: center; */
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Category = styled.div`
  cursor: pointer;
  background-color: yellow;
`;

const BookListWrapper = styled.div``;
