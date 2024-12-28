import React, { useEffect } from 'react';

const StarryBackground: React.FC = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.opacity = `${Math.random()}`;
      document.getElementById('starry-bg')?.appendChild(star);

      star.addEventListener('animationend', () => {
        star.remove();
      });
    };

    const interval = setInterval(createStar, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="starry-bg"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background: 'radial-gradient(circle at center, #1a1a4a 0%, #0a0a2a 100%)'
      }}
    />
  );
};

export default StarryBackground;