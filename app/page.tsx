"use client";
import { useState } from 'react';

export default function ConfessionPage() {
  const [step, setStep] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [page, setPage] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(2);
      setIsTransitioning(false);
    }, 1000);
  };

  const isiBuku = [
    { 
      judul: "Buat Alifya...", 
      pesan: "Created By Affan, AKA nnaf", 
    },
    { 
      judul: "The Real Question", 
      pesan: "Alip kamu mau ga jadi cewe ak?",
      isFinal: true 
    }
  ];

  const moveButton = () => {
    const x = Math.random() * 160 - 80; 
    const y = Math.random() * 160 - 80;
    setNoButtonPos({ x, y });
  };

  const nextPage = () => {
    if (page < isiBuku.length - 1) setPage(page + 1);
  };

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-6 font-serif overflow-hidden relative">
      
      {/* BACKGROUND STARS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full opacity-0 animate-star"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 7 + 3}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      </div>

      <div className="z-10 w-full flex items-center justify-center relative">
        
        {/* HASIL AKHIR: MAU (Kucing Bunga) */}
        {isAccepted && (
          <div className="text-center animate-fade-in z-50 max-w-sm">
            <img src="/senang.jpeg" alt="Senang" className="w-64 h-64 object-cover rounded-2xl mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
            <p className="text-white text-lg italic leading-relaxed">
              Screenshot terus kirim foto ini ke WhatsApp kalo kamu mau sama akuu
            </p>
            <button onClick={() => window.location.reload()} className="mt-8 text-gray-500 text-xs underline">Balik lagi</button>
          </div>
        )}

        {/* HASIL AKHIR: GAMAU (Kucing Nangis) */}
        {isRejected && (
          <div className="text-center animate-fade-in z-50 max-w-sm">
            <img src="/sedih.jpeg" alt="Sedih" className="w-64 h-64 object-cover rounded-2xl mx-auto mb-6 shadow-[0_0_30px_rgba(255,0,0,0.2)]" />
            <p className="text-white text-lg italic leading-relaxed">
              Screenshot terus kirim foto ini ke WhatsApp kalo kamu gamau sama aku 🥺
            </p>
            <button onClick={() => window.location.reload()} className="mt-8 text-gray-500 text-xs underline">Gak sengaja klik..</button>
          </div>
        )}

        {/* KONTEN UTAMA (Akan hilang kalau MAU/GAMAU di-klik) */}
        {!isAccepted && !isRejected && (
          <>
            {/* STEP 1: INTRO */}
            <div className={`text-center transition-all duration-1000 transform ${
              step === 1 && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'
            }`}>
              <h1 className="text-5xl text-white font-bold mb-3 italic animate-glow-text">Hai Alifya.</h1>
              <button onClick={handleStart} className="px-12 py-4 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all">
                Coba Pencet
              </button>
            </div>

            {/* STEP 2: VIRTUAL BOOK */}
            <div className={`flex flex-col items-center max-w-sm w-full transition-all duration-2000 transform ${
              step === 2 && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none absolute'
            }`}>
              <div className="relative w-full aspect-[3/4]" style={{ perspective: '2000px' }}>
                {isiBuku.map((item, index) => (
                  <div
                    key={index}
                    onClick={!item.isFinal ? nextPage : undefined}
                    className={`absolute inset-0 bg-[#0f0f0f] shadow-2xl rounded-r-2xl rounded-l-md p-10 flex flex-col justify-center border-l-[3px] border-[#222] transition-all duration-[2000ms] ease-in-out origin-left ${
                      index < page ? "-rotate-y-120 opacity-0 pointer-events-none" : "z-10"
                    } ${index === page ? "opacity-100 rotate-y-0" : "opacity-0 pointer-events-none"}`}
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">{item.judul}</h2>
                    
                    <div className="animate-fade-in">
                      {item.isFinal && index === page ? (
                        <p className="text-gray-200 text-xl italic mb-12 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                          {item.pesan.split("").map((char, charIndex) => (
                            <span key={charIndex} className="opacity-0 animate-text-char" style={{ animationDelay: `${charIndex * 0.08}s`, display: 'inline-block' }}>
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </p>
                      ) : (
                        <p className="text-gray-300 italic text-lg leading-relaxed mb-12">{item.pesan}</p>
                      )}
                      
                      {item.isFinal && (
                        <div className="flex flex-col gap-5 items-center">
                          <button onClick={(e) => { e.stopPropagation(); setIsAccepted(true); }} className="w-full py-3.5 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all">MAUUU</button>
                          <button 
                            onMouseEnter={moveButton} 
                            onClick={(e) => { e.stopPropagation(); setIsRejected(true); }} 
                            style={{ transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)` }}
                            className="w-1/2 py-2 bg-[#1a1a1a] text-gray-600 rounded-lg text-sm transition-all duration-100"
                          >
                            GAMAU
                          </button>
                        </div>
                      )}
                    </div>

                    {!item.isFinal && (
                      <div className="absolute bottom-10 right-10 z-20">
                        <span className="text-gray-600 text-[9px] uppercase tracking-[4px] animate-pulse">Ketuk untuk lanjut →</span>
                      </div>
                    )}
                    <div className="absolute bottom-6 left-8 text-[#222] font-mono text-xs">0{index + 1} / 0{isiBuku.length}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        .bg-radial-gradient { background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%); }
        @keyframes star-move {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
        }
        .animate-star { animation: star-move linear infinite; }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        @keyframes text-char-in { from { opacity: 0; transform: translateY(5px); filter: blur(3px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .animate-text-char { animation: text-char-in 0.5s ease-out forwards; }
        .rotate-y-0 { transform: rotateY(0deg); }
        .-rotate-y-120 { transform: rotateY(-120deg); }
      `}</style>
    </main>
  );
}