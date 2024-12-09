import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export function DanError() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => prev === 1 ? 0.3 : 1);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-red-500 flex items-center justify-center flex-col gap-8 transition-opacity duration-200"
      style={{ opacity }}
    >
      <AlertTriangle className="w-32 h-32 text-white animate-bounce" />
      <div className="text-white text-center space-y-4">
        <h1 className="text-6xl font-bold animate-pulse">ERREUR 1000</h1>
        <p className="text-3xl font-semibold">NIVEAU DE BULLSHIT INCALCULABLE</p>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-[explosion_1s_ease-out_forwards]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          >
            💥
          </div>
        ))}
      </div>
    </div>
  );
}