import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if user has scrolled past a threshold
 * @param {number} threshold - Scroll position threshold in pixels
 * @returns {boolean} - True if scrolled past threshold
 */
export const useScrollDetection = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};