import { useQuery } from "react-query";
import { getBookList } from "../../services/fetchData";
import styled from "styled-components";
import { useState, ChangeEvent, FormEvent, FormEventHandler, useEffect } from "react";
import BookItem from "./_shared/BookItem";
import { IBookItem } from "../../types";
import { useSetRecoilState } from "recoil";
import { libraryBookListState } from "../../states/state";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [inputValaue, setInputValue] = useState("");
  const setLibraryBookList = useSetRecoilState(libraryBookListState);

  const { data } = useQuery(["book", keyword], () => getBookList(keyword, "accuracy"), {
    enabled: !!keyword,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  useEffect(() => {
    const localData = localStorage.getItem("library");
    if (localData) {
      setLibraryBookList(JSON.parse(localData));
    }
  }, [setLibraryBookList]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValaue);
  };

  return (
    <Wrapper>
      <SearchForm onSubmit={onSubmitForm}>
        <Input onChange={onChangeInput} name="title" placeholder="서재에 등록하고 싶은 책을 검색하세요 !" />
      </SearchForm>
      <ListWrapper>
        {data?.data.documents.map((bookItem: IBookItem) => (
          <BookItem key={bookItem.isbn} bookItem={bookItem} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
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
  /* background-color: yellow; */
  margin: 2rem 0;
`;

const SubmitBtn = styled.button``;
