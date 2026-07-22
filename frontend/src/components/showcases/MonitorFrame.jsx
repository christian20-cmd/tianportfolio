// src/components/showcases/MonitorFrame.jsx

function Frame({ children }) {
  console.log('🖥️ [MonitorFrame] Rendu avec children:', children ? '✅' : '❌');
  return (
    <>
      {/* Écran */}
      <div
        className="relative w-full rounded-[18px]"
        style={{
          background: "#474947",
          padding: "8px 8px 24px 8px",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
        }}
      >
        <div className="relative w-full overflow-hidden rounded-[14px] bg-black">
          
          {children}
        </div>
      </div>

      {/* Pied (neck + base) */}
      <svg
        viewBox="0 0 300 110"
        style={{ width: "16%", minWidth: 90, display: "block", marginTop: "-1px" }}
      >
        <defs>
          <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8e8e93" />
            <stop offset="15%" stopColor="#e8e8ea" />
            <stop offset="50%" stopColor="#c7c7cc" />
            <stop offset="85%" stopColor="#e8e8ea" />
            <stop offset="100%" stopColor="#8e8e93" />
          </linearGradient>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e2e5" />
            <stop offset="55%" stopColor="#c9c9cd" />
            <stop offset="100%" stopColor="#a8a8ad" />
          </linearGradient>
        </defs>

        {/* neck */}
        <rect x="128" y="0" width="44" height="58" fill="url(#neckGrad)" />

        {/* base */}
        <path
          d="M 50 58
             Q 150 44 250 58
             L 268 96
             Q 150 112 32 96
             Z"
          fill="url(#baseGrad)"
        />
        <path
          d="M 50 58 Q 150 44 250 58"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
      </svg>
    </>
  );
}

export default function MonitorFrame({ children, className = "" }) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={{ width: "100%" }}>
      <div className="flex flex-col items-center w-full">
        <Frame>{children}</Frame>
      </div>
    </div>
  );
}