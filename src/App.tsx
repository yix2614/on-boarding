import { useState, useMemo } from 'react';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CurveLayout from './components/CurveLayout/CurveLayout';
import { AppContainer, BackgroundImage, BackgroundImageWrapper } from './App.styles';
import { generateCards } from './utils/data';
import bgSrc from './assets/bg.png';

function App() {
  const cards = useMemo(() => generateCards(32), []);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleToggle = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  return (
    <>
      <BackgroundImageWrapper>
        <BackgroundImage src={bgSrc} />
      </BackgroundImageWrapper>
      <AppContainer style={{ flexDirection: 'column', alignItems: 'stretch', padding: 0 }}>
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Area */}
        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
          <CurveLayout>
            {cards.map((card) => (
              <Card
                key={card.id}
                emoji={card.emoji}
                description={card.description}
                isSelected={selectedIds.has(card.id)}
                onToggle={() => handleToggle(card.id)}
              />
            ))}
          </CurveLayout>
        </div>

        {/* Fixed Footer */}
        <Footer selectionCount={selectedIds.size} />
      </AppContainer>
    </>
  );
}

export default App;
