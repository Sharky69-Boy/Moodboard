import React, { useState, createContext, useMemo } from 'react';
import MoodboardRoom from './components/MoodboardRoom';
import Toolbar from './components/Toolbar';
import './App.css';

// 1. Create Theme Context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', 'pastel'
  const [items, setItems] = useState([
    // Initial example items
    { id: 1, type: 'quote', content: 'Vibes are everything!', x: 50, y: 50, zIndex: 1 },
    { id: 2, type: 'text', content: 'My Moodboard', x: 200, y: 100, zIndex: 2, fontSize: '24px' },
  ]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Memoize context value to prevent unnecessary re-renders
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  const addItem = (type) => {
    let content = '';
    if (type === 'quote') {
      content = prompt('Enter your quote:');
    } else if (type === 'text') {
      content = prompt('Enter your text:');
    }
    // In a real app, you'd have a more robust way to get content
    // and allow for different media types (images, links etc.)

    if (content) {
      const newItem = {
        id: Date.now(), // Simple unique ID
        type,
        content,
        x: Math.random() * 300, // Random initial position
        y: Math.random() * 200,
        zIndex: items.length + 1,
      };
      setItems([...items, newItem]);
    }
  };

  // This is a placeholder for actual drag-and-drop logic.
  // You'd use a library like dnd-kit here.
  const handleItemMove = (itemId, newX, newY) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="app">
        <Toolbar onAddItem={addItem} />
        <MoodboardRoom items={items} onItemMove={handleItemMove} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
