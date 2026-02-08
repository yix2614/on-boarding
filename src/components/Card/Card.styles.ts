import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  width: 212px;
  height: 249px;
  background-color: #F8F8F8;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 39px;
  gap:12px;
  box-sizing: border-box;

  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const RadioContainer = styled.div<{ $selected?: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #DDDDDD;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  ${props => props.$selected && `
    border-color: #FE2C55;
    background-color: #FE2C55;
  `}
`;

export const RadioInner = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  opacity: 1; /* Always 1 when rendered, logic handled in valid component render */
  transition: opacity 0.2s ease;
`;

export const EmojiContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 132px;
  line-height: 100%;
  width: 100%;
`;

export const Description = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
  line-height: 130%;
  font-weight: 600;
  color: #161823;
  text-align: center;
  margin-bottom: 32px;
`;
