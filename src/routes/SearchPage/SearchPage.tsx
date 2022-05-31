import { useQuery } from "react-query";
import { getBookList } from "../../services/fetchData";
import styled from "styled-components";
import { useState, ChangeEvent, FormEvent, FormEventHandler } from "react";
import BookItem from "./_shared/BookItem";
import { IBookItem } from "../../types";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const { data, isLoading } = useQuery(["book", keyword], () => getBookList(keyword, "accuracy"), {
    enabled: !!keyword,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  console.log(data?.data.documents);

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword((e.currentTarget[0] as HTMLInputElement).value);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <Wrapper>
      <SearchForm onSubmit={onSubmitForm}>
        <Input name="title" placeholder="서재에 등록하고 싶은 책을 검색하세요 !" />
        <ListWrapper>
          {data?.data.documents.map((book: IBookItem) => (
            <BookItem key={book.isbn} item={book} />
          ))}
        </ListWrapper>
      </SearchForm>
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
