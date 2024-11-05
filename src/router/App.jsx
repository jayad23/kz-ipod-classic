import './App.css';
import { useContext } from 'react';
import { AppearanceContext } from '../contexts/appearance';
// bg-gray-900
export default function App({ children }) {
  const { theme } = useContext(AppearanceContext);
  return (
    <main style={{ background: theme.config.background }} className="min-h-screen flex items-center justify-center">
      {children}
    </main>
  );
}