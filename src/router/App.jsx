import './App.css';

export default function App({ children }) {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      {children}
    </main>
  );
}