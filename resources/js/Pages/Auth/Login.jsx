import React, { useEffect, useRef, useState } from "react";
import {
    Eye,
    EyeOff,
    Star,
    Moon,
    Sun,
    Rocket,
    Sparkles,
    School,
    GraduationCap,
    Shell,
    Asterisk,
    Earth,
} from "lucide-react";

export default function Login() {
    const [isTeacher, setIsTeacher] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const nisnRef = useRef(null);
    const nuptkRef = useRef(null);

    // refs untuk icon inner element (yang digeser oleh cursor)
    const iconInnerRefs = useRef([]);
    iconInnerRefs.current = [];

    const addIconRef = (el) => {
        if (el && !iconInnerRefs.current.includes(el)) {
            iconInnerRefs.current.push(el);
        }
    };

    // daftar ikon (posisi awal & depth untuk parallax)
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
            top: "20%",
            left: "72%",
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
            left: "70%",
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
        {
            Icon: Sun,
            size: 20,
            top: "5%",
            left: "45%",
            depth: 0.05,
            dur: 6000,
        },
    ];

    // Blobs konfigurasi (posisi, ukuran, opasitas, durasi)
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

    // cursor following (throttle via requestAnimationFrame)
    useEffect(() => {
        let raf = null;

        // Simpan posisi saat ini untuk tiap icon
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

                    // posisi sekarang
                    const p = positions[idx];
                    // smoothing factor (0.1 lebih lambat, 0.3 lebih cepat)
                    const smooth = 0.12;

                    // gerak perlahan menuju target
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

    useEffect(() => {
        if (isTeacher) {
            // ketika flip ke form guru
            nuptkRef.current?.focus();
        } else {
            // ketika flip ke form siswa
            nisnRef.current?.focus();
        }
    }, [isTeacher]);

    const handleFlip = (e) => {
        e.preventDefault();
        setIsTeacher((s) => !s);
        setShowPassword(false);
    };

    const togglePassword = () => setShowPassword((s) => !s);

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
            style={{ backgroundColor: "#1C1729" }}
        >
            {/* ----- BLOBS (loop animation only) ----- */}
            {blobs.map((b, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: b.size,
                        height: b.size,
                        top: b.top,
                        left: b.left,
                        background: "#FF93CE",
                        opacity: b.op,
                        filter: "blur(70px)",
                        transform: "translate3d(0,0,0)",
                        animation: `blobMove ${b.dur}ms ease-in-out ${b.delay}ms infinite`,
                    }}
                />
            ))}

            {/* ----- ICONS: outer has loop animation, inner is moved by cursor (refs) ----- */}
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
                            // each icon gets slightly different float speed/delay to feel organic
                            animation: `iconFloat ${it.dur}ms ease-in-out ${
                                idx * 200
                            }ms infinite`,
                        }}
                    >
                        <div
                            ref={addIconRef}
                            className="flex items-center justify-center"
                            style={{
                                transform: "translate3d(0,0,0)", // this will be updated by mouse
                                willChange: "transform",
                                color: "rgba(255,255,255,0.95)",
                            }}
                        >
                            <Outer size={it.size} strokeWidth={1.5} />
                        </div>
                    </div>
                );
            })}

            {/* ----- CARD (flip container) ----- */}
            <div
                className="relative z-10 w-full max-w-[520px] px-6"
                style={{ perspective: 1100 }}
            >
                <div
                    className="relative transition-transform duration-700 [transform-style:preserve-3d]"
                    style={{
                        minHeight: 420,
                        transform: isTeacher
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                    }}
                >
                    {/* FRONT - SISWA */}
                    <form
                        className="absolute inset-0 p-10 rounded-2xl bg-white/3 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <h2 className="text-3xl font-genshin mb-6">
                            Masuk Siswa
                        </h2>

                        <input
                            ref={nisnRef}
                            autoComplete="off"
                            type="text"
                            placeholder="Masukkan NISN"
                            className="w-full placeholder-white/60 text-white rounded-lg px-4 py-3 mb-4 outline-none border border-white/12 focus:border-white/20"
                        />

                        <div className="relative w-full mb-4">
                            <input
                                autoComplete="new-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan Password"
                                className="w-full placeholder-white/60 text-white rounded-lg px-4 py-3 pr-10 outline-none border border-white/12 focus:border-white/20"
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 cursor-pointer"
                            >
                                {showPassword ? (
                                    <Eye size={18} />
                                ) : (
                                    <EyeOff size={18} />
                                )}
                            </button>
                        </div>

                        <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg mb-3 cursor-pointer">
                            Masuk
                        </button>

                        <button
                            type="button"
                            onClick={handleFlip}
                            className="text-sm text-white/70 hover:text-white flex items-center gap-2 cursor-pointer hover:underline"
                        >
                            <School size={14} /> Masuk Sebagai Guru
                        </button>
                    </form>

                    {/* BACK - GURU */}
                    <form
                        className="absolute inset-0 p-10 rounded-2xl bg-white/3 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center"
                        style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <h2 className="text-3xl font-genshin mb-6">
                            Masuk Guru
                        </h2>

                        <input
                            ref={nuptkRef}
                            autoComplete="off"
                            type="text"
                            placeholder="Masukkan NUPTK"
                            className="w-full text-white rounded-lg px-4 py-3 mb-4 outline-none border border-white/12 focus:border-white/20"
                        />

                        <div className="relative w-full mb-4">
                            <input
                                autoComplete="new-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan Password"
                                className="w-full text-white rounded-lg px-4 py-3 pr-10 outline-none border border-white/12 focus:border-white/20"
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                            >
                                {showPassword ? (
                                    <Eye size={18} />
                                ) : (
                                    <EyeOff size={18} />
                                )}
                            </button>
                        </div>

                        <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg mb-3">
                            Masuk
                        </button>

                        <button
                            type="button"
                            onClick={handleFlip}
                            className="text-sm text-white/70 hover:text-white flex items-center gap-2 cursor-pointer hover:underline"
                        >
                            <GraduationCap size={14} /> Masuk Sebagai Siswa
                        </button>
                    </form>
                </div>
            </div>

            {/* Inline CSS keyframes */}
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

        /* small responsive adjustment */
        @media (max-width: 640px) {
          .[transform-style\\:preserve-3d] { min-height: 420px; }
        }
      `}</style>
        </div>
    );
}
