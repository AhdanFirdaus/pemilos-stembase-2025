import { useEffect, useRef, useState } from "react";
import {
    Star,
    Moon,
    Sun,
    Rocket,
    Sparkles,
    Shell,
    Asterisk,
    Earth,
} from "lucide-react";

const Home = () => {
    const [candidates, setCandidates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const iconInnerRefs = useRef([]);
    iconInnerRefs.current = [];

    const addIconRef = (el) => {
        if (el && !iconInnerRefs.current.includes(el)) {
            iconInnerRefs.current.push(el);
        }
    };

    const icons = [
        {
            Icon: Star,
            size: 22,
            top: "8%",
            left: "22%",
            depth: 0.06,
            dur: 2000,
        },
        {
            Icon: Star,
            size: 22,
            top: "50%",
            left: "90%",
            depth: 0.08,
            dur: 2500,
        },
        {
            Icon: Moon,
            size: 24,
            top: "10%",
            left: "75%",
            depth: 0.04,
            dur: 3000,
        },
        {
            Icon: Sparkles,
            size: 18,
            top: "36%",
            left: "12%",
            depth: 0.03,
            dur: 4000,
        },
        {
            Icon: Earth,
            size: 24,
            top: "60%",
            left: "25%",
            depth: 0.03,
            dur: 4000,
        },
        {
            Icon: Shell,
            size: 18,
            top: "78%",
            left: "5%",
            depth: 0.03,
            dur: 4000,
        },
        {
            Icon: Rocket,
            size: 22,
            top: "78%",
            left: "90%",
            depth: 0.08,
            dur: 2500,
        },
        {
            Icon: Asterisk,
            size: 24,
            top: "90%",
            left: "50%",
            depth: 0.08,
            dur: 2500,
        },
        { Icon: Sun, size: 20, top: "5%", left: "45%", depth: 0.05, dur: 6000 },
    ];

    const blobs = [
        { top: "60%", left: "78%", size: 420, op: 0.38, dur: 5000, delay: 0 },
        {
            top: "-10%",
            left: "-10%",
            size: 320,
            op: 0.36,
            dur: 3000,
            delay: 1200,
        },
        { top: "74%", left: "18%", size: 280, op: 0.3, dur: 10000, delay: 800 },
        {
            top: "-20%",
            left: "60%",
            size: 360,
            op: 0.28,
            dur: 3500,
            delay: 2000,
        },
        { top: "10%", left: "6%", size: 220, op: 0.22, dur: 4000, delay: 400 },
        { top: "82%", left: "86%", size: 260, op: 0.2, dur: 4500, delay: 1600 },
    ];

    useEffect(() => {
        let raf = null;
        const positions = icons.map(() => ({ x: 0, y: 0 }));

        const onMove = (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                iconInnerRefs.current.forEach((el, idx) => {
                    if (!el) return;
                    const depth = icons[idx]?.depth ?? 0.04;
                    const amp = 30;
                    const tx = dx * amp * depth * 40;
                    const ty = dy * amp * depth * 40;
                    const p = positions[idx];
                    const smooth = 0.12;
                    p.x += (tx - p.x) * smooth;
                    p.y += (ty - p.y) * smooth;
                    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
                });
            });
        };

        window.addEventListener("mousemove", onMove);
        return () => {
            window.removeEventListener("mousemove", onMove);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []); // eslint-disable-line

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
            style={{ backgroundColor: "var(--color-secondary)" }}
        >
            {/* BLOBS */}
            {blobs.map((b, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: b.size,
                        height: b.size,
                        top: b.top,
                        left: b.left,
                        background: "var(--color-primary)",
                        opacity: b.op,
                        filter: "blur(70px)",
                        transform: "translate3d(0,0,0)",
                        animation: `blobMove ${b.dur}ms ease-in-out ${b.delay}ms infinite`,
                    }}
                />
            ))}

            {/* ICONS */}
            {icons.map((it, idx) => {
                const Outer = it.Icon;
                return (
                    <div
                        key={idx}
                        className="absolute pointer-events-none"
                        style={{
                            top: it.top,
                            left: it.left,
                            transform: "translate3d(0,0,0)",
                            animation: `iconFloat ${it.dur}ms ease-in-out ${
                                idx * 200
                            }ms infinite`,
                        }}
                    >
                        <div
                            ref={addIconRef}
                            className="flex items-center justify-center"
                            style={{
                                transform: "translate3d(0,0,0)",
                                willChange: "transform",
                                color: "rgba(255,255,255,0.95)",
                            }}
                        >
                            <Outer size={it.size} strokeWidth={1.5} />
                        </div>
                    </div>
                );
            })}

            {/* CONTENT */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Tiga logo dengan posisi kiri-tengah-kanan */}
                <div className="relative flex justify-center items-center gap-6 mb-8 mt-4">
                    {/* Logo kiri */}
                    <img
                        src="/img/mpk.jpg"
                        alt="Logo MPK"
                        className="w-16 h-16 object-contain rounded-2xl opacity-0 animate-logoEnter"
                        style={{
                            animationDelay: "0s, 1s", // fadeIn dulu, lalu mulai float
                        }}
                    />

                    {/* Logo tengah (Stemba) */}
                    <div
                        className="mx-6 w-28 h-28 sm:w-36 sm:h-36 bg-center bg-contain bg-no-repeat opacity-0 animate-logoEnter"
                        style={{
                            backgroundImage: "url('/img/stemba.png')",
                            animationDelay: "0.3s, 1.3s",
                        }}
                    ></div>

                    {/* Logo kanan */}
                    <img
                        src="/img/osis.jpg"
                        alt="Logo OSIS"
                        className="w-16 h-16 object-contain rounded-2xl opacity-0 animate-logoEnter"
                        style={{
                            animationDelay: "0.6s, 1.6s",
                        }}
                    />
                </div>

                <h1
                    className="text-5xl md:text-6xl font-bold font-genshin opacity-0 animate-fadeInText leading-tight"
                    style={{ animationDelay: "1.4s" }}
                >
                    Pemilihan Ketua <br /> dan Wakil OSIS
                </h1>

                <div
                    className="w-0 h-[2px] bg-white mx-auto my-6 animate-expandLine"
                    style={{ animationDelay: "0.6s" }}
                ></div>

                <p
                    className="text-3xl md:text-4xl opacity-0 animate-fadeInYear font-genshin"
                    style={{ animationDelay: "1.8s" }}
                >
                    2025/2026
                </p>

                <button
                    className="mt-12 bg-primary text-white font-semibold px-10 py-3 rounded-lg shadow-md opacity-0 animate-fadeInButton text-lg cursor-pointer"
                    style={{
                        animationDelay: "2.2s",
                        animationFillMode: "forwards",
                    }}
                    onClick={() => {
                        window.location.href = '/auth/login'
                    }}
                >
                    Lanjut
                </button>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes blobMove {
                  0% { transform: translate3d(0,0,0) scale(1); }
                  50% { transform: translate3d(24px, -18px, 0) scale(1.06); }
                  100% { transform: translate3d(0,0,0) scale(1); }
                }
                @keyframes iconFloat {
                  0% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(-8px) rotate(3deg); }
                  100% { transform: translateY(0) rotate(0deg); }
                }
                @keyframes logoFloat {
                  0%,100% { transform: translateY(0); }
                  50% { transform: translateY(-6px); }
                }
                .animate-logoFloat {
                  animation: logoFloat 3.2s ease-in-out infinite;
                }

                @keyframes pulseRotateShake {
                0% { transform: scale(1) rotate(0deg); }
                10% { transform: scale(1.05) rotate(5deg); }
                20% { transform: scale(1.1) rotate(8deg); }
                30% { transform: scale(1.05) rotate(5deg); }
                40% { transform: scale(1.03) rotate(-4deg); }
                50% { transform: scale(1) rotate(0deg); }
                100% { transform: scale(1) rotate(0deg); }
                }

                .animate-expandLine { animation: expandLine 1s ease-out forwards; }
                .animate-fadeInSchool { animation: fadeInSchool 0.8s ease-out forwards; }
                .animate-fadeInLogo { animation: fadeInLogo 0.8s ease-out forwards; }
                .animate-fadeInText { animation: fadeInText 0.8s ease-out forwards; }
                .animate-fadeInYear { animation: fadeInYear 0.8s ease-out forwards; }

                .animate-fadeInButton {
                  animation:
                    fadeInButton 0.8s ease-out forwards,
                    pulseRotateShake 2.5s ease-in-out 5s infinite alternate;
                  animation-delay: 2.2s, 6s;
                }

                @keyframes expandLine {
                  0% { width: 0; opacity: 0; }
                  50% { opacity: 1; }
                  100% { width: 380px; opacity: 1; }
                }
                @keyframes fadeInSchool {
                  0% { transform: translateY(20px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeInLogo {
                  0% { transform: translateY(20px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeInText {
                  0% { transform: translateY(15px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeInYear {
                  0% { transform: translateY(10px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeInButton {
                  0% { transform: translateY(10px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes logoEnter {
                0% { transform: translateY(25px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
                }

                @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
                }

                /* kombinasi dua animasi: masuk dulu, lalu terus naik-turun */
                .animate-logoEnter {
                animation:
                    logoEnter 0.8s ease-out forwards,
                    float 3s ease-in-out 1s infinite;
                }
                @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                }

                .animate-float {
                animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Home;
