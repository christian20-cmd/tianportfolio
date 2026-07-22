// src/components/showcases/PhoneFrame.jsx

export default function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative mx-auto ${className} `}
      style={{ width: "100%", maxWidth: 240, aspectRatio: "9.4 / 19" }}
    >
      <div
        className="absolute inset-0 rounded-[38px] bg-black/80 border-4 border-white/80 "
        style={{ padding: "5px", boxShadow: "0 20px 45px -15px rgba(0,0,0,0.45)" }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-white">
        
          {children}
        </div>
      </div>
      {/* encoche */}
      <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-10" />
    </div>
  );
}