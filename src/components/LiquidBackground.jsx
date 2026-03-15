import { memo } from 'react';

const LiquidBackground = memo(function LiquidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 80%, rgba(129, 140, 248, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(79, 70, 229, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #000000 0%, #09090b 40%, #1e1b4b 100%)
          `,
        }}
      />

      {/* Liquid blob 1 - large */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 70%)',
          animation: 'liquid-flow-1 20s ease-in-out infinite',
          filter: 'blur(60px)',
          willChange: 'transform, border-radius',
        }}
      />

      {/* Liquid blob 2 - medium */}
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          top: '30%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, rgba(79, 70, 229, 0.04) 50%, transparent 70%)',
          animation: 'liquid-flow-2 25s ease-in-out infinite',
          filter: 'blur(50px)',
          willChange: 'transform, border-radius',
        }}
      />

      {/* Liquid blob 3 - small accent */}
      <div
        className="absolute"
        style={{
          width: '350px',
          height: '350px',
          bottom: '10%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
          animation: 'liquid-flow-3 18s ease-in-out infinite',
          filter: 'blur(40px)',
          willChange: 'transform, border-radius',
        }}
      />

      {/* Subtle wave overlay at top */}
      <svg
        className="absolute top-0 left-0 w-full opacity-[0.03]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '200px', animation: 'wave-drift 15s ease-in-out infinite' }}
      >
        <path
          fill="url(#wave-grad)"
          d="M0,160L48,149.3C96,139,192,117,288,133.3C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-[0.02] rotate-180"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '150px', animation: 'wave-drift 20s ease-in-out infinite reverse' }}
      >
        <path
          fill="#4f46e5"
          d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,128C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
});

export default LiquidBackground;
