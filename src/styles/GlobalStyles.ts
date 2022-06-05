import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "InterBold";
  }

:root{
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  font-size: 10px;
  font-family: "InterBold";
  background-color: #F6F7F8;
  }
  

  p,div,li {
    color: #393B44;
  }

button,
input {
  background-color: transparent;
  outline: none;
  border: none;
  font-size: inherit;
}

ul,li {
  list-style: none;
  
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;
