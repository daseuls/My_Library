import axios from "axios";

const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

const BASE_URL = `${PROXY}/search/book`;

axios.defaults.headers.common.Authorization = "KakaoAK 06a99e77ee1303f63fa326248490a3ba";

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
