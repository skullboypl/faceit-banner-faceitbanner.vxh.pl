import { useState } from 'react';
import { Language, tl } from '../translations/translations.ts';

import nukePreview from '../assets/previews/nuke.png';
import miragePreview from '../assets/previews/mirage.png';
import ancientPreview from '../assets/previews/ancient.png';
import dust2Preview from '../assets/previews/dust2.png';
import overpassPreview from '../assets/previews/overpass.png';

type PreviewOption = {
  id: string;
  label: string;
  img: string;
};

const previews: PreviewOption[] = [
  { id: 'nuke', label: 'Nuke', img: nukePreview },
  { id: 'mirage', label: 'Mirage', img: miragePreview },
  { id: 'ancient', label: 'Ancient', img: ancientPreview },
  { id: 'dust2', label: 'Dust2', img: dust2Preview },
  { id: 'overpass', label: 'Overpass', img: overpassPreview },
];

export const PreviewCarousel = ({
  language,
  previewBackground,
  setPreviewBackground,
}: {
  language: Language;
  previewBackground: string;
  setPreviewBackground: (id: string) => void;
}) => {
  const currentIndex = previews.findIndex((p) => p.id === previewBackground);
  const [index, setIndex] = useState<number>(
    currentIndex >= 0 ? currentIndex : 0
  );

  const handlePrev = () => {
    const newIndex = (index - 1 + previews.length) % previews.length;
    setIndex(newIndex);
    setPreviewBackground(previews[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = (index + 1) % previews.length;
    setIndex(newIndex);
    setPreviewBackground(previews[newIndex].id);
  };

  const current = previews[index];

  return (
    <div className="preview-carousel">
      <button onClick={handlePrev} className="arrow left">
        ‹
      </button>

      <div className="preview-item">
        <img src={current.img} alt={current.label} />
        <p>{tl(language, `generator.preview.${current.id}`)}</p>
      </div>

      <button onClick={handleNext} className="arrow right">
        ›
      </button>
    </div>
  );
};
