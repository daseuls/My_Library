import styled from "styled-components";
import { IoLibraryOutline, IoSearchOutline, IoCalendarClearOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const Tab = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigatePage = (route: string) => {
    navigate(route);
  };
  return (
    <Wrapper>
      <IconWrapper onClick={() => navigatePage("/")} isLocate={pathname === "/"}>
        <IoSearchOutline size={23} />
      </IconWrapper>
      <IconWrapper onClick={() => navigatePage("/library")} isLocate={pathname === "/library"}>
        <IoLibraryOutline size={23} />
      </IconWrapper>
      <IconWrapper onClick={() => navigatePage("/calendar")} isLocate={pathname === "/calendar"}>
        <IoCalendarClearOutline size={23} />
      </IconWrapper>
    </Wrapper>
  );
};

export default Tab;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 3.5rem;
  background-color: pink;
  height: 13%;
  width: 100%;
  border-radius: 5rem;
`;

const IconWrapper = styled.div<{ isLocate: boolean }>`
  cursor: pointer;
  border-bottom: ${(props) => (props.isLocate ? "1.5px" : "0px")} solid black;
  height: 2.7rem;
  translate: all 1s ease;
  margin: 0 0.5rem;
`;
