import { useState, useRef, useEffect } from 'react';

const useSwipeDirection = () => {
  const [direction, setDirection] = useState('');
  const ref = useRef<any>(null);

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    ref.current!.startX = touch.clientX;
    ref.current!.startY = touch.clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    const deltaX = touch.clientX - ref.current!.startX;
    const deltaY = touch.clientY - ref.current!.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setDirection(deltaY > 0 ? 'down' : 'up');
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('touchstart', handleTouchStart);
      ref.current.addEventListener('touchmove', handleTouchMove);

      return () => {
        ref?.current?.removeEventListener('touchstart', handleTouchStart);
        ref.current?.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);

  return { direction, ref };
};

export default useSwipeDirection;
