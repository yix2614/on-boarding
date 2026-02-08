import { CardContainer, RadioContainer, RadioInner, EmojiContainer, Description } from './Card.styles';

interface CardProps {
  emoji: string;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
}

const Card = ({ emoji, description, isSelected, onToggle }: CardProps) => {
  return (
    <CardContainer onClick={onToggle}>
      <RadioContainer $selected={isSelected}>
        {isSelected && <RadioInner />}
      </RadioContainer>

      <EmojiContainer>
        {emoji}
      </EmojiContainer>

      <Description>
        {description}
      </Description>
    </CardContainer>
  );
};

export default Card;
