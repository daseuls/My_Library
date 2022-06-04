import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { libraryBookListState, wishListState } from "../../states/state";
import { IBookItem } from "../../types";
import { getLocalData } from "../../utils/getLocalData";
import LibraryBookList from "./_shared/LibraryBookItem";

const LibraryPage = () => {
  const [isLibrary, setIsLibrary] = useState(true);

  const [libraryBookList, setLibraryBookList] = useRecoilState(libraryBookListState);
  const [wishBookList, setWishBookList] = useRecoilState(wishListState);

  useEffect(() => {
    const libraryList = getLocalData("library");
    const wishList = getLocalData("wish");
    setLibraryBookList(libraryList);
    setWishBookList(wishList);
  }, [setLibraryBookList, setWishBookList]);

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
            <LibraryBookList key={bookItem.isbn} bookItem={bookItem} isLibrary={isLibrary} />
          ))}
        </BookListWrapper>
      ) : (
        <BookListWrapper>
          {wishBookList.map((bookItem: IBookItem) => (
            <LibraryBookList key={bookItem.isbn} bookItem={bookItem} isLibrary={isLibrary} />
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
  margin: 4rem 1rem 0.5rem;
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
`;

const BookListWrapper = styled.div`
  width: 90%;
`;
