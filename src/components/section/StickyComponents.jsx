"use client";
import React, { useRef, useState, useEffect } from 'react';

// Create a React Context for sticky state management
export const StickyContext = React.createContext({
  containerRef: null,
  registerStickyElement: () => {},
  unregisterStickyElement: () => {},
});

// Modern StickyContainer replacement
export const StickyContainer = ({ children, className = "", style = {} }) => {
  const [stickyElements, setStickyElements] = useState({});
  const containerRef = useRef(null);

  const registerStickyElement = (id, element) => {
    setStickyElements(prev => ({ ...prev, [id]: element }));
  };

  const unregisterStickyElement = (id) => {
    setStickyElements(prev => {
      const newElements = { ...prev };
      delete newElements[id];
      return newElements;
    });
  };

  return (
    <StickyContext.Provider value={{ 
      registerStickyElement, 
      unregisterStickyElement,
      containerRef 
    }}>
      <div ref={containerRef} className={className} style={style}>
        {children}
      </div>
    </StickyContext.Provider>
  );
};

// Modern Sticky component replacement
export const Sticky = ({ children, topOffset = 0, bottomOffset = 0, className = "", style = {} }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const [distanceFromBottom, setDistanceFromBottom] = useState(0);
  const elementRef = useRef(null);
  const { containerRef } = React.useContext(StickyContext);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current || !containerRef.current) return;
      
      const elementRect = elementRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const elementTop = elementRect.top;
      const elementHeight = elementRect.height;
      const windowHeight = window.innerHeight;
      const containerBottom = containerRect.bottom;
      
      // Check if element should be sticky
      const shouldBeSticky = 
        elementTop <= topOffset && 
        containerBottom - topOffset - elementHeight > 0;
      
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
      }
      
      setDistanceFromTop(elementTop - topOffset);
      setDistanceFromBottom(containerBottom - elementTop - elementHeight - bottomOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [topOffset, bottomOffset, isSticky, containerRef]);
  
  const stickyStyles = isSticky ? {
    position: 'fixed',
    top: topOffset,
    zIndex: 100,
    width: elementRef.current?.offsetWidth || 'auto',
  } : {};
  
  return (
    <div ref={elementRef} className={className} style={{ ...style, ...stickyStyles }}>
      {typeof children === 'function' 
        ? children({ isSticky, distanceFromTop, distanceFromBottom })
        : children}
    </div>
  );
};