import { useRef, useState, useLayoutEffect } from 'react';
import PhoneFrame from './PhoneFrame';


export default function MobileShowcase({ screenshots, activeIndex }) {
  const viewportRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, scrollTop: 0 });

  const hasScreenshots = screenshots && screenshots.length > 0;
  const current = hasScreenshots ? (screenshots[activeIndex] || screenshots[0]) : null;
  const imageUrl = current ? (current.src || current.image || '') : '';

  // Reset du scroll à chaque changement de slide
  useLayoutEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0;
    }
  }, [activeIndex]);

  if (!hasScreenshots) {
    return (
      <PhoneFrame>
        <div className="flex items-center justify-center h-full bg-black/20 text-white/30">
          <p className="text-sm">Aucune capture</p>
        </div>
      </PhoneFrame>
    );
  }

  // Empêche le wheel de remonter jusqu'à ProjectShowcase (qui changerait de slide)
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  // Drag à la souris pour scroller (en plus du tactile natif)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      scrollTop: viewportRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !viewportRef.current) return;
    const deltaY = e.clientY - dragStartRef.current.y;
    viewportRef.current.scrollTop = dragStartRef.current.scrollTop - deltaY;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <PhoneFrame>
      <div
        ref={viewportRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full h-full overflow-y-auto overflow-x-hidden bg-black/40 no-scrollbar ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={current.titre || 'Screenshot'}
            className="block w-full h-auto select-none"
            draggable={false}
            onError={(e) => {
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              const errorMsg = document.createElement('div');
              errorMsg.className = 'flex items-center justify-center h-full text-red-400 text-sm';
              errorMsg.textContent = `❌ Image non trouvée: ${imageUrl}`;
              parent.appendChild(errorMsg);
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/20">
            <p className="text-sm">Image non disponible</p>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}