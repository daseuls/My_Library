import React, { useRef, RefObject, ReactDOM } from "react";
import { Outlet } from "react-router-dom";
import Tab from "../../components/Tab";
import styled from "styled-components";

const Layout = () => {
  const container = useRef<HTMLDivElement>(null!);

  return (
    <Wrapper ref={container}>
      <Outlet />
      <Tab />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  position: relative;
  width: 35rem;
  height: 73vh;
  min-height: 60rem;
  border-radius: 5rem;
  padding: 3rem;
  background-color: white;
  overflow: hidden;
`;
