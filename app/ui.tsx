"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Check,
} from "@phosphor-icons/react";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? {} : { y: [16, 0], opacity: [0.9, 1] }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.08 }}
    >
      {children}
    </motion.div>
  );
}

export function PerformantVideo({
  src,
  poster,
  className = "",
  ariaLabel,
}: {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduce) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        rootMargin: "100px 0px",
        threshold: 0.05,
      },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
        aria-label={ariaLabel}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function Header() {
  return (
    <header className="header wrap">
      <a
        className="brand-logo-link"
        href="#"
        aria-label="VWC Vibrant Watch Company Home"
      >
        <Image
          src="/vwc-logo.PNG"
          alt="VWC Vibrant Watch Company"
          width={140}
          height={42}
          priority
          className="header-logo"
        />
      </a>
    </header>
  );
}

export const collectionWatches = [
  {
    id: "ram-mandir",
    index: "01 / 06",
    name: "RAM MANDIR",
    detail: "A tribute to India\u2019s heritage.",
    description:
      "An artistic interpretation of the iconic Ram Mandir, bringing Indian architecture and craftsmanship together on a Titan timepiece.",
    image: "/rammandir.webp",
    alt: "Ram Mandir architectural miniature art on a Titan timepiece",
  },
  {
    id: "bengal-tiger",
    index: "02 / 06",
    name: "BENGAL TIGER",
    detail: "The spirit of the wild.",
    description:
      "Inspired by India\u2019s majestic Bengal tiger, this design captures its raw character and commanding presence in a striking dial.",
    image: "/lion.webp",
    alt: "Bengal Tiger hand-painted artwork dial",
  },
  {
    id: "tiranga",
    index: "03 / 06",
    name: "TIRANGA",
    detail: "A symbol of pride.",
    description:
      "The colours of the Indian tricolour meet the iconic white G-Shock GA-2100 in a design celebrating India\u2019s identity.",
    image: "/tiranga.webp",
    alt: "Tiranga Indian tricolour artwork on white G-Shock GA-2100",
  },
  {
    id: "chroma",
    index: "04 / 06",
    name: "CHROMA",
    detail: "A celebration of colour.",
    description:
      "A playful arrangement of multicoloured dots transforms a clean white dial into a vibrant expression of creativity.",
    image: "/chroma.webp",
    alt: "Chroma playful dots on clean white dial",
  },
  {
    id: "aqua",
    index: "05 / 06",
    name: "AQUA",
    detail: "A bold shade of blue.",
    description:
      "A striking Tiffany-blue treatment against a black G-Shock, balanced with crisp white highlights for a distinctive contrast.",
    image: "/aqua.webp",
    alt: "Aqua Tiffany-blue treatment on black G-Shock",
  },
  {
    id: "diet-coke",
    index: "06 / 06",
    name: "DIET COKE",
    detail: "A classic colour combination.",
    description:
      "Inspired by Diet Coke\u2019s iconic red and silver palette, this design brings a bold pop-culture influence to the G-Shock.",
    image: "/diet-coke.webp",
    alt: "Diet Coke red and silver palette inspired custom G-Shock",
  },
];

export function CollectionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const watch = collectionWatches[currentIndex];

  // Autoplay: advance every 4 seconds
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === collectionWatches.length - 1 ? 0 : prev + 1,
      );
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  // Pause autoplay on interaction, resume after 6s idle
  const pauseAndResume = () => {
    stopAutoplay();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(startAutoplay, 6000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? collectionWatches.length - 1 : prev - 1,
    );
    pauseAndResume();
  };

  const handleNext = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === collectionWatches.length - 1 ? 0 : prev + 1,
    );
    pauseAndResume();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        handleNext();
      } else if (distance < -50) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="collection-slider-container">
      <div className="mobile-collection-slider">
        <div
          className="collection-card-frame"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="card-image-display">
            <button
              type="button"
              className="carousel-nav-btn prev"
              onClick={handlePrev}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              aria-label="Previous watch"
            >
              <CaretLeft size={20} weight="bold" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={watch.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="carousel-image-inner"
              >
                <Image
                  src={watch.image}
                  alt={watch.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, 560px"
                  className="carousel-watch-img"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              className="carousel-nav-btn next"
              onClick={handleNext}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              aria-label="Next watch"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>

          <div className="collection-card-details">
            <span className="edition-number">{watch.index}</span>
            <h3 className="watch-card-title">{watch.name}</h3>
            <p className="watch-card-detail">{watch.detail}</p>
            <p className="watch-card-description">{watch.description}</p>
          </div>
        </div>

        <div
          className="carousel-dots"
          role="tablist"
          aria-label="Watches pagination"
        >
          {collectionWatches.map((w, idx) => (
            <button
              type="button"
              key={w.id}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to ${w.name}`}
              className={`carousel-dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(idx);
                pauseAndResume();
              }}
            />
          ))}
        </div>
      </div>

      <div className="desktop-collection-grid">
        {collectionWatches.map((item) => (
          <article className="desktop-watch-card" key={item.id}>
            <div className="desktop-watch-image">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1200px) 16vw, 180px"
              />
            </div>
            <div className="desktop-watch-copy">
              <span className="edition-number">{item.index}</span>
              <h3 className="watch-card-title">{item.name}</h3>
              <p className="watch-card-detail">{item.detail}</p>
              <p className="watch-card-description">{item.description}</p>
              {/* <a className="card-view-story-link" href="#interest">
                View story <ArrowRight size={13} weight="bold" />
              </a> */}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function EarlyAccessForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit early access details");
      }

      setState("success");
    } catch (err) {
      setErrorMessage(
        (err as Error).message || "Something went wrong. Please try again.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="early-access-success" role="status">
        <div className="success-icon-badge">
          <Check size={36} color="#660033" weight="bold" />
        </div>
        <h3>You are on the list.</h3>
        <p>
          Thank you for joining the VWC circle. We look forward to sharing our
          first collection and private launch updates with you soon.
        </p>
        <button className="reset-form-btn" onClick={() => setState("idle")}>
          Submit another request <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="early-access-form" id="lead-form">
      {state === "error" && (
        <div className="form-error-banner" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="form-field-group">
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          maxLength={100}
          autoComplete="name"
          className="clean-input"
        />
      </div>

      <div className="form-field-group">
        <input
          name="phone"
          type="tel"
          placeholder="Phone number"
          maxLength={30}
          autoComplete="tel"
          className="clean-input"
        />
      </div>

      <div className="form-field-group">
        <input
          name="email"
          type="email"
          placeholder="Email ID"
          required
          maxLength={254}
          autoComplete="email"
          className="clean-input"
        />
      </div>

      <div className="form-field-group">
        <textarea
          name="message"
          rows={3}
          placeholder="Message"
          maxLength={2000}
          className="clean-input clean-textarea"
        />
      </div>

      <button
        className="primary-burgundy-btn"
        type="submit"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Submitting..." : "GET EARLY ACCESS"}
        <ArrowRight size={18} weight="bold" />
      </button>

      <div className="form-note-block">
        <p className="form-disclaimer">
          Your details will only be used for VWC launch updates and relevant
          communication.
        </p>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="vwc-footer wrap">
      <div className="footer-top-rule" />
      <div className="footer-body">
        <div style={{ width: "100%", height: "auto" }}>
          <Image
            src="/vwc-logo.PNG"
            alt="VWC Vibrant Watch Company"
            width={220}
            height={80}
            className="footer-logo"
            style={{ height: "auto" }}
          />
        </div>

        <div style={{ width: "100%" }}>
          <p>Hand-Painted Watches. Custom Pieces. Crafted in India.</p>
        </div>

        <div className="footer-copyright-col">
          <p className="footer-copyright">© 2026 VWC - Vibrant Watch Company</p>
        </div>
      </div>
    </footer>
  );
}
