import { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';

type View = 'books' | 'cart';

function App() {
  const [view, setView] = useState<View>('books');
  const [savedPage, setSavedPage] = useState(1);
  const [savedCategory, setSavedCategory] = useState('');

  function handleBrowseStateChange(page: number, category: string) {
    setSavedPage(page);
    setSavedCategory(category);
  }

  return (
    <CartProvider>
      <Layout
        onGoToCart={() => setView('cart')}
        onGoToBooks={() => setView('books')}
        currentView={view}
      >
        {view === 'books' ? (
          <BookList
            onGoToCart={() => setView('cart')}
            savedPage={savedPage}
            savedCategory={savedCategory}
            onBrowseStateChange={handleBrowseStateChange}
          />
        ) : (
          <Cart onContinueShopping={() => setView('books')} />
        )}
      </Layout>
    </CartProvider>
  );
}

export default App;
