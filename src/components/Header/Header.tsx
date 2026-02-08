import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 40px;
  text-align: center;
 
  width: 472px;
  width: 472px;
  margin: 0 auto;
  animation: ${slideIn} 0.3s cubic-bezier(0.25, 0, 0.25, 1) forwards;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 130%;
  color: #000;
  width: 472px;
  margin: 0 0 16px 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #000;
  opacity: 0.48;
  margin: 0;
  line-height: 1.3;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>What do you want to watch on TikTok?</Title>
      <Subtitle>Select at least 3 categories, and<br />scroll down to see more.</Subtitle>
    </HeaderContainer>
  );
};

export default Header;
