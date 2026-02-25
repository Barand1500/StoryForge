'use client';

import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingBooks() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const bookEmojis = ['📚', '📖', '✨', '🌟', '📝', '🪶', '📕', '📗', '📘'];
    const generated: FloatingElement[] = [];
    
    for (let i = 0; i < 15; i++) {
      generated.push({
        id: i,
        emoji: bookEmojis[Math.floor(Math.random() * bookEmojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 16 + Math.random() * 24,
      });
    }
    
    setElements(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float opacity-20"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
}
