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
    ChevronLeft,
    ChevronRight,
    CheckCircle,
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

    // Fetch data from data.json
    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setCandidates(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

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

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < candidates.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            console.log("Vote for", candidates[currentIndex]);
            window.location.href = "/vote"; // arahkan ke halaman lain
        }
    };

    if (candidates.length === 0) {
        return <div>Loading...</div>;
    }

    const currentCandidate = candidates[currentIndex];

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
            style={{ backgroundColor: "var(--color-secondary)" }}
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
                        background: "var(--color-primary)",
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

            {/* ----- CONTENT CARD ----- */}
            <div className="min-h-screen flex justify-center items-center py-6">
                <div className="relative z-10 w-full max-w-[1100px] mx-6">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 border border-white/10">
                        <h1 className="text-5xl mb-6 font-bold text-center font-genshin">
                            {currentCandidate.name}
                        </h1>

                        <div className="flex flex-col md:flex-row items-start gap-6">
                            {/* Gambar + Label */}
                            <div className="relative w-full md:w-[40%]">
                                <img
                                    src={`/paslon/paslon_${currentCandidate.id}.jpg`}
                                    alt={currentCandidate.name}
                                    className="w-full h-auto max-h-[600px] rounded-xl bg-black/10"
                                />

                                {/* Label Ketua & Wakil */}
                                <div
                                    className="
                                    absolute inset-x-0 bottom-4
                                    flex flex-col items-center gap-2
                                    sm:flex-row sm:justify-between sm:items-end
                                    px-4
                                "
                                >
                                    {/* Ketua */}
                                    <div
                                        className="
                                    bg-primary text-white px-4 py-2
                                    rounded-2xl text-center shadow-md text-sm font-semibold
                                    sm:w-[48%] w-[80%]
                                    "
                                    >
                                        Ketua
                                        <br />
                                        <span className="font-normal">
                                            {currentCandidate.ketua}
                                        </span>
                                    </div>

                                    {/* Wakil */}
                                    <div
                                        className="
              bg-primary text-white px-4 py-2
              rounded-2xl text-center shadow-md text-sm font-semibold
              sm:w-[48%] w-[80%]
            "
                                    >
                                        Wakil
                                        <br />
                                        <span className="font-normal">
                                            {currentCandidate.wakil}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* VISI & MISI */}
                            <div className="flex flex-col gap-6 w-full md:w-[60%] mt-4 md:mt-0">
                                <div className="relative">
                                    <span className="absolute -top-3 left-4 bg-primary text-white px-3 py-1 rounded-2xl text-sm shadow-md z-10">
                                        VISI
                                    </span>
                                    <div className="bg-white text-black pt-6 pb-4 px-4 rounded-xl shadow-md">
                                        <p>{currentCandidate.visi}</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <span className="absolute -top-3 left-4 bg-primary text-white px-3 py-1 rounded-2xl text-sm shadow-md z-10">
                                        MISI
                                    </span>
                                    <div className="bg-white text-black pt-6 pb-4 px-4 rounded-xl shadow-md">
                                        <ol className="list-decimal pl-5 flex flex-col gap-1">
                                            {currentCandidate.misi.map(
                                                (item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                )
                                            )}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigasi */}
                        <div className="flex justify-between mt-2">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-lg disabled:opacity-50 shadow-lg cursor-pointer active:scale-70 transition-transform duration-150"
                            >
                                <ChevronLeft size={28} />
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-lg shadow-md gap-1 cursor-pointer active:scale-70 transition-transform duration-150"
                            >
                                {currentIndex === candidates.length - 1 ? (
                                    <CheckCircle size={24} />
                                ) : (
                                    <ChevronRight size={28} />
                                )}
                            </button>
                        </div>
                    </div>
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
                  .flex-col.md\\:flex-row { flex-direction: column; }
                }
              `}</style>
        </div>
    );
};

export default Home;
