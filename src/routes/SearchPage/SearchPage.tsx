import { useState, ChangeEvent, FormEvent, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BsBook } from "react-icons/bs";
import Loading from "../../components/Loading";
import { getBookList } from "../../services/fetchData";
import { getLocalData } from "../../utils/getLocalData";
import { libraryBookListState, wishListState } from "../../states/state";
import { IBookItem } from "../../types";
import BookItem from "./_shared/BookItem";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [inputValaue, setInputValue] = useState("");
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const parentObservedTarget = useRef<HTMLElement>(null);
  const setLibraryBookList = useSetRecoilState(libraryBookListState);
  const setWishBookList = useSetRecoilState(wishListState);

  const { data, fetchNextPage, status } = useInfiniteQuery(
    ["booklist", keyword],
    ({ pageParam = 1 }) => getBookList(keyword, "accuracy", pageParam),
    {
      enabled: !!keyword,
      refetchOnWindowFocus: false,
      staleTime: 10000,
      getNextPageParam: (lastPage) => {
        return lastPage.config.params.page + 1;
      },
    }
  );

  const flattenedData = data?.pages.map((el) => el.data.documents).flat(1);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entry) => {
      if (entry[0].isIntersecting) {
        setTimeout(() => {
          fetchNextPage();
        }, 1000);
      }
    },
    [fetchNextPage]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(handleObserver, {
        root: parentObservedTarget.current,
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [handleObserver, target]);

  useEffect(() => {
    const libraryBookList = getLocalData("library");
    const wishBookList = getLocalData("wish");
    setLibraryBookList(libraryBookList);
    setWishBookList(wishBookList);
  }, [setLibraryBookList, setWishBookList]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValaue);
  };

  return (
    <Wrapper ref={parentObservedTarget}>
      <SearchBarWrapper>
        <SearchForm onSubmit={onSubmitForm}>
          <Input onChange={onChangeInput} name="title" placeholder="서재에 등록하고 싶은 책을 검색하세요 !" />
          <IconWrapper>
            <BsBook size={15} color="#393B44" />
          </IconWrapper>
        </SearchForm>
      </SearchBarWrapper>

      <ListWrapper>
        {!flattenedData || flattenedData.length === 0 ? (
          <NoResultText>검색결과가 없습니다</NoResultText>
        ) : (
          <>
            {flattenedData?.map((bookItem: IBookItem, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <BookItem key={i} bookItem={bookItem} />
            ))}
            {status === "loading" ? null : (
              <LoadingWrapper ref={setTarget}>
                <Loading />
              </LoadingWrapper>
            )}
          </>
        )}
      </ListWrapper>
    </Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 87%;
  padding: 1rem 3rem 0;
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 2rem;
  width: 90%;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.colors.$BACKGROUND};
  border: 1px solid ${({ theme }) => theme.colors.$BORDER};
  border-radius: 1rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 3.7rem;
  top: 1.05rem;
`;
const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 8rem 0 0;
  overflow: auto;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NoResultText = styled.p`
  font-size: 1.2rem;
`;
