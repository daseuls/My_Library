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
        <IoSearchOutline size={18} color="#767C77" />
      </IconWrapper>
      <IconWrapper onClick={() => navigatePage("/library")} isLocate={pathname === "/library"}>
        <IoLibraryOutline size={18} color="#767C77" />
      </IconWrapper>
      <IconWrapper onClick={() => navigatePage("/calendar")} isLocate={pathname === "/calendar"}>
        <IoCalendarClearOutline size={18} color="#767C77" />
      </IconWrapper>
    </Wrapper>
  );
};

export default Tab;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 2rem;
  background-color: #ffe6e6;
  height: 12%;
  width: 100%;
  border-radius: 2.5rem;
`;

const IconWrapper = styled.div<{ isLocate: boolean }>`
  cursor: pointer;
  border-bottom: ${(props) => (props.isLocate ? "1.5px" : "0px")} solid #767c77;
  height: 2.7rem;
  translate: all 1s ease;
  margin: 0 0.5rem;
`;
