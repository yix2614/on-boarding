import styled from 'styled-components';

// Background Image Layer
export const BackgroundImageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

export const BackgroundImage = styled.img`
  height: calc(100vh - 32px);
  width: auto;
  min-width: 0; /* flexbox fix */
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1); /* Subtle shadow for depth */
`;
// Note: AppContainer has backdrop-filter. z-index of img needs to be behind it. 
// AppContainer is relative/static? It has z-index? 
// AppContainer styles:


export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  /* Glassmorphism / Blur Effect */
  background: rgba(255, 255, 255, 0.75); /* White overlay */
  backdrop-filter: blur(30px); /* Stronger blur */
  -webkit-backdrop-filter: blur(30px);
`;
// AppContainer is reused but simplified in App.tsx usage

