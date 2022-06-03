import styled from "styled-components";
import { IoLibraryOutline, IoSearchOutline, IoCalendarClearOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Tab = () => {
  const navigate = useNavigate();

  const navigatePage = (route: string) => {
    navigate(route);
  };
  return (
    <Wrapper>
      <IconWrapper onClick={() => navigatePage("/")}>
        <IoSearchOutline size={23} />
      </IconWrapper>
      <IconWrapper onClick={() => navigatePage("/library")}>
        <IoLibraryOutline size={23} />
      </IconWrapper>
      <IconWrapper onClick={() => navigatePage("/calendar")}>
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

const IconWrapper = styled.div`
  cursor: pointer;
`;
