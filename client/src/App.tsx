import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { theme } from './theme';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}