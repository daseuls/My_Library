# 📚 프로젝트 설명

읽은 책을 검색해서 읽은 날짜를 기록하고, 위시리스트를 저장할 수 있는 웹 어플리케이션입니다.

> [배포링크 🚀](https://deploy-preview-9--booklibrary21.netlify.app)

> 기간 : 5/31 - 6/5

# 📚 사용 기술, 라이브러리

- Javascript, TypeScript, React, Styled-Component
- recoil
- react query
- eslint + prettier + stylelint
- react-datepicker
- full calendar

# 📚 구현 기능

## 1. search page

- 카카오 도서 API를 이용해 도서를 검색합니다.
- 검색한 도서를 렌더링하고, useInfiniteQuery와 Intersection Observer를 통해 무한 스크롤을 구현했습니다.
- 검색한 도서를 클릭시 위시리스트에 저장하거나, 내 서재에 저장할 수 있습니다.
- date picker 라이브러리를 사용하여 내 서재에 저장할 때 읽기 시작한 날짜와 다 읽은 날짜를 선택해 함께 기록할 수 있습니다.
- 날짜 선택시 캘린더 페이지에 어떠한 백그라운드 색상으로 보여질 지 color를 선택할 수 있습니다.
- localStorage와 recoil을 사용하여, 새로고침을 해도 내 서재와 위시리스트의 데이터가 유지되도록 구현했습니다.

  https://user-images.githubusercontent.com/71131248/172037987-0b93c958-2664-4019-9072-0032492a2764.mp4

## 2. library page, wishlist page

- search page에서 검색해 저장한 내 서재와 위시리스트의 아이템들을 확인할 수 있는 페이지입니다.
- 해당 아이템을 클릭시 삭제할 수 있습니다.

https://user-images.githubusercontent.com/71131248/172038025-c408990f-2d18-4754-a52b-8f7ca45a04f6.mp4

## 3. calendar page

- full calendar 라이브러리를 사용해서 구현했습니다.
- 내가 읽은 도서들을 날짜에 맞게 캘린더로 한눈에 확인할 수 있습니다.

https://user-images.githubusercontent.com/71131248/172037994-e1237e4d-43d1-4c43-8ab7-337d0b811972.mp4
