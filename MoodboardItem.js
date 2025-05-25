import React, { useState, useEffect } from 'react';
import './MoodboardItem.css';

// VERY SIMPLIFIED DRAG LOGIC (replace with a real DND library)
function MoodboardItem({ item, onMove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: item.x, y: item.y });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 }); // For calculating drag delta

  const handleMouseDown = (e) => {
    // Only drag if not clicking on an interactive element within the item (e.g., input)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') {
      return;
    }
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    // Prevent text selection while dragging
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      setPosition({ x: newX, y: newY });
      // In a real DND library, this update might be throttled or handled differently.
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onMove(item.id, position.x, position.y); // Update App state
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPos, item.id, onMove, position.x, position.y]); // Added position.x, position.y dependency


  const itemStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: item.zIndex,
    fontSize: item.fontSize || 'inherit',
  };

  let content;
  switch (item.type) {
    case 'quote':
      content = <blockquote>{item.content}</blockquote>;
      break;
    case 'text':
      content = <p>{item.content}</p>;
      break;
    // Add cases for 'photo', 'song', 'video' later
    default:
      content = <p>Unsupported item type</p>;
  }

  return (
    <div
      className="moodboard-item"
      style={itemStyle}
      onMouseDown={handleMouseDown}
    >
      {content}
    </div>
  );
}

export default MoodboardItem;
