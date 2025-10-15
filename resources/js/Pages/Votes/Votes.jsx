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
    AlertCircle,
    PartyPopper,
} from "lucide-react";
import { router } from "@inertiajs/react";

const Votes = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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

    const handleVoteClick = (candidate) => {
        setSelectedCandidate(candidate);
        setShowConfirm(true);
    };

    const confirmVote = () => {
        console.log("Voted for", selectedCandidate);
        router.post('/voter', { candidate_id: selectedCandidate.id })
        setShowConfirm(false);
        setShowSuccess(true);
    };

    const cancelVote = () => {
        setShowConfirm(false);
    };

    const closeSuccess = () => {
        setShowSuccess(false);
        // Optional: redirect to home or elsewhere
        // window.location.href = "/";
    };

    const handleBack = () => {
        window.location.href = "/";
    };

    if (candidates.length === 0) {
        return <div>Loading...</div>;
    }

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
            <div className="relative z-10 w-full max-w-[800px] mx-4 sm:mx-6 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10">
                {/* Kembali Button */}
                <button
                    onClick={handleBack}
                    className="bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out active:scale-70 cursor-pointer"
                >
                    Kembali
                </button>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl font-bold text-center my-4 sm:my-8 font-genshin text-white">
                    Ayo Voting!
                </h1>
                <p className="text-xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 font-genshin text-white">
                    Suaramu Penentu Masa Depan STEMBASE!
                </p>

                {/* Paslon Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    {candidates.map((candidate, index) => (
                        <button
                            key={candidate.id}
                            onClick={() => handleVoteClick(candidate)}
                            className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-md hover:scale-110 hover:shadow-xl hover:rotate-3 transition-all duration-300 ease-in-out active:scale-70 cursor-pointer"
                        >
                            Paslon {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Confirm Popup */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 max-w-md w-full text-center mx-4 sm:mx-6">
                        <AlertCircle
                            size={36}
                            className="mx-auto mb-4 text-primary sm:size-18"
                        />
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                            Yakin ingin vote Paslon {selectedCandidate.id}?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmVote}
                                className="bg-primary text-white px-4 sm:px-6 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 active:scale-70 cursor-pointer"
                            >
                                Ya
                            </button>
                            <button
                                onClick={cancelVote}
                                className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 active:scale-70 cursor-pointer"
                            >
                                Tidak
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 max-w-md w-full text-center mx-4 sm:mx-6">
                        <PartyPopper
                            size={36}
                            className="mx-auto mb-4 text-primary sm:size-18"
                        />
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                            Selamat! Suara Anda untuk Paslon {selectedCandidate.id} telah tercatat.
                        </h2>
                        <div className="flex justify-center">
                            <button
                                onClick={closeSuccess}
                                className="bg-primary text-white px-4 sm:px-6 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 active:scale-70 cursor-pointer"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
              `}</style>
        </div>
    );
};

export default Votes;