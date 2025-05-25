import React from 'react';
import MoodboardItem from './MoodboardItem';
import './MoodboardRoom.css';

// This component will eventually interact heavily with a drag-and-drop library.
function MoodboardRoom({ items, onItemMove }) {
  return (
    <div className="moodboard-room">
      {items.map(item => (
        <MoodboardItem
          key={item.id}
          item={item}
          onMove={onItemMove} // This prop would be used by the DND library
        />
      ))}
    </div>
  );
}

export default MoodboardRoom;
