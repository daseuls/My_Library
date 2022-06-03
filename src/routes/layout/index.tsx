import { Outlet } from "react-router-dom";
import Tab from "../../components/Tab";
import styled from "styled-components";

const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
      <Tab />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35rem;
  height: 73vh;
  min-height: 60rem;
  border-radius: 2.5rem;
  background-color: #d2f3e080;
  overflow: hidden;
`;
