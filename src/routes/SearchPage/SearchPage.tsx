import { useInfiniteQuery } from "react-query";
import { getBookList } from "../../services/fetchData";
import styled from "styled-components";
import { useState, ChangeEvent, FormEvent, useEffect, useRef, useCallback } from "react";
import BookItem from "./_shared/BookItem";
import { IBookItem } from "../../types";
import Loading from "../../components/Loading";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [inputValaue, setInputValue] = useState("");
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const parentObservedTarget = useRef<HTMLElement>(null);

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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValaue);
  };

  return (
    <Wrapper ref={parentObservedTarget}>
      <SearchForm onSubmit={onSubmitForm}>
        <Input onChange={onChangeInput} name="title" placeholder="서재에 등록하고 싶은 책을 검색하세요 !" />
      </SearchForm>
      {!flattenedData || flattenedData.length === 0 ? (
        <div>검색결과가 없습니다</div>
      ) : (
        <ListWrapper>
          {flattenedData?.map((bookItem: IBookItem, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <BookItem key={`${bookItem.isbn}${i}`} bookItem={bookItem} />
          ))}
          {status === "loading" ? null : (
            <LoadingWrapper ref={setTarget}>
              <Loading />
            </LoadingWrapper>
          )}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 87%;
  overflow: auto;
  padding: 2rem 3rem 0;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Input = styled.input`
  border: 1px solid black;
  width: 90%;
  padding: 1rem 2rem;
  border-radius: 2rem;
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2rem 0;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
