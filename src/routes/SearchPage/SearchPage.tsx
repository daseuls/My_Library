import { useQuery } from "react-query";
import { getBookList } from "../../services/fetchData";
import styled from "styled-components";
import { useState, ChangeEvent, FormEvent } from "react";
import BookItem from "./_shared/BookItem";
import { IBookItem } from "../../types";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [inputValaue, setInputValue] = useState("");

  const { data } = useQuery(["book", keyword], () => getBookList(keyword, "accuracy"), {
    enabled: !!keyword,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

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
