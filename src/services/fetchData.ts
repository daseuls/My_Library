import axios from "axios";

const BASE_URL = "https://dapi.kakao.com/v3/search/book";

axios.defaults.headers.common.Authorization = `KakaoAK ${process.env.REACT_APP_API_KEY}`;

export const getBookList = (query: string, sort: string, page: number) => {
  return axios
    .get(encodeURI(`${BASE_URL}`), {
      params: {
        query,
        sort,
        size: 15,
        page,
      },
    })
    .then((res) => {
      return res;
    });
};
