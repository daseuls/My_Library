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
        <Category isLibrary={isLibrary} onClick={() => handleCategory(true)}>
          내 서재
        </Category>
        <Category isLibrary={!isLibrary} onClick={() => handleCategory(false)}>
          위시 리스트
        </Category>
      </CategoryWrapper>
      <TabBarContainer>
        <TabBar />
        <TabSlider isLibrary={isLibrary} />
      </TabBarContainer>
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
  margin: 4rem 1rem 0.5rem;
  overflow: auto;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem;
  border-top-right-radius: 3rem;
`;

const Category = styled.div<{ isLibrary: boolean }>`
  padding: 0 4rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => (props.isLibrary ? null : "lightgray")};
  cursor: pointer;
`;

const BookListWrapper = styled.div`
  width: 90%;
`;

const TabBarContainer = styled.div`
  position: relative;
  width: 80%;
  margin-bottom: 2rem;
`;

const TabBar = styled.div`
  width: 100%;
  height: 2.5px;
  background-color: lightgray;
`;

const TabSlider = styled.div<{ isLibrary: boolean }>`
  position: absolute;
  top: 0;
  width: 50%;
  height: 2.5px;
  background-color: #6ebfb8;
  transform: ${(props) => (props.isLibrary ? "translateX(0)" : "translateX(100%)")};
  transition: all 0.3s ease;
`;
