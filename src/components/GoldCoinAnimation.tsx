// Gold coin animation component

interface GoldCoinAnimationProps {
  points: number;
}

interface Coin {
  id: number;
  tx: number;
  ty: number;
  delay: number;
}

export function GoldCoinAnimation({ points }: GoldCoinAnimationProps) {
  const numCoins = Math.min(Math.max(points, 1), 15);
  const coins: Coin[] = [];

  for (let i = 0; i < numCoins; i++) {
    // Random angle for coin trajectory
    const angle = (Math.PI * 2 * i) / numCoins + (Math.random() - 0.5);
    const distance = 150 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = -Math.sin(angle) * distance - 50; // Go up and outward

    coins.push({
      id: i,
      tx,
      ty,
      delay: i * 60, // Stagger animation
    });
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: '1000px' }}
      >
        {coins.map(coin => (
          <div
            key={coin.id}
            className="coin"
            style={{
              '--tx': `${coin.tx}px`,
              '--ty': `${coin.ty}px`,
              animationDelay: `${coin.delay}ms`,
            } as React.CSSProperties & { '--tx': string; '--ty': string }}
          />
        ))}
      </div>
    </div>
  );
}
