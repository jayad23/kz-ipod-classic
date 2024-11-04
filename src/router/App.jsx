import './App.css';

export default function App({ children }) {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="absolute top-[20px] right-1/2">
        <button style={{ background: "white", color: "black" }}>Login</button>
      </div>
      {children}
    </main>
  );
}