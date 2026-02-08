import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0 40px;

  display: flex;
  justify-content: center;
  pointer-events: none; /* Let clicks pass through the gradient part */
  animation: ${slideIn} 0.3s cubic-bezier(0.25, 0, 0.25, 1) forwards;
`;

const Button = styled.button<{ $disabled: boolean }>`
  pointer-events: auto;
  background-color: ${props => props.$disabled ? 'rgba(254, 44, 85, 0.34)' : '#FE2C55'};
  color: white;
  border: none;
  border-radius: 999px; /* Slightly rounded per reference usually, or pill shape */
  padding: 0;
  width: 300px; /* Approximate width */
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  
  /* Make it a bit more rounded per standard TikTok buttons */
  border-radius: 8px; 
`;

interface FooterProps {
    selectionCount: number;
    minSelection?: number;
}

const Footer = ({ selectionCount, minSelection = 3 }: FooterProps) => {
    const isDisabled = selectionCount < minSelection;

    return (
        <FooterContainer>
            <Button $disabled={isDisabled}>
                Done ({selectionCount}/{minSelection})
            </Button>
        </FooterContainer>
    );
};

export default Footer;
