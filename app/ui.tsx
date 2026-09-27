"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Check,
  InstagramLogo,
  YoutubeLogo,
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
      <a className="brand-logo-link" href="#" aria-label="VWC Vibrant Watch Company Home">
        <Image
          src="/images/vwc-logo.png"
          alt="VWC Vibrant Watch Company"
          width={130}
          height={38}
          priority
          className="header-logo"
        />
      </a>
      <a className="header-cta-btn" href="#interest">
        Join the List
      </a>
    </header>
  );
}

export const collectionWatches = [
  {
    id: "ram-mandir",
    index: "01 / 06",
    name: "RAM MANDIR",
    detail: "A tribute to India's heritage.",
    edition: "ART EDITION",
    description:
      "An artistic interpretation of the iconic Ram Mandir, bringing Indian architecture and craftsmanship together on a Titan timepiece.",
    image: "/images/watch-botanical.webp",
    alt: "Ram Mandir architectural miniature art on a Titan timepiece",
  },
  {
    id: "bengal-tiger",
    index: "02 / 06",
    name: "BENGAL TIGER",
    detail: "The spirit of the wild.",
    edition: "HERITAGE EDITION",
    description:
      "Inspired by India's majestic Bengal tiger, this design captures its raw character and commanding presence in a striking dial.",
    image: "/images/watch-blue.webp",
    alt: "Bengal Tiger hand-painted artwork dial",
  },
  {
    id: "tiranga",
    index: "03 / 06",
    name: "TIRANGA",
    detail: "A symbol of pride.",
    edition: "NATIONAL EDITION",
    description:
      "The colours of the Indian tricolour meet the iconic white G-Shock GA-2100 in a design celebrating India's identity.",
    image: "/images/watch-botanical.webp",
    alt: "Tiranga Indian tricolour artwork on white G-Shock GA-2100",
  },
  {
    id: "chroma",
    index: "04 / 06",
    name: "CHROMA",
    detail: "A celebration of colour.",
    edition: "STUDIO EDITION",
    description:
      "A playful arrangement of multicoloured dots transforms a clean white dial into a vibrant expression of creativity.",
    image: "/images/watch-blue.webp",
    alt: "Chroma playful dots on clean white dial",
  },
  {
    id: "aqua",
    index: "05 / 06",
    name: "AQUA",
    detail: "A bold shade of blue.",
    edition: "CHRONO EDITION",
    description:
      "A striking Tiffany-blue treatment against a black G-Shock, balanced with crisp white highlights for a distinctive contrast.",
    image: "/images/watch-blue.webp",
    alt: "Aqua Tiffany-blue treatment on black G-Shock",
  },
  {
    id: "diet-coke",
    index: "06 / 06",
    name: "DIET COKE",
    detail: "A classic colour combination.",
    edition: "POP CULTURE EDITION",
    description:
      "Inspired by Diet Coke's iconic red and silver palette, this design brings a bold pop-culture influence to the G-Shock.",
    image: "/images/watch-botanical.webp",
    alt: "Diet Coke red and silver palette inspired custom G-Shock",
  },
];

export function CollectionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const watch = collectionWatches[currentIndex];

  // Autoplay: advance every 4 seconds
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === collectionWatches.length - 1 ? 0 : prev + 1));
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? collectionWatches.length - 1 : prev - 1));
    pauseAndResume();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === collectionWatches.length - 1 ? 0 : prev + 1));
    pauseAndResume();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  const selectWatchForEnquiry = (name: string) => {
    window.dispatchEvent(new CustomEvent("design-select", { detail: name }));
  };

  return (
    <div className="collection-slider-container">
      <div
        className="collection-card-frame"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="card-image-display">
          <button
            className="carousel-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous watch"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            className="carousel-nav-btn next"
            onClick={handleNext}
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

          <a
            href="#interest"
            onClick={() => selectWatchForEnquiry(watch.name)}
            className="card-view-story-link"
          >
            VIEW STORY <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Watches pagination">
        {collectionWatches.map((w, idx) => (
          <button
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
  );
}

export function EarlyAccessForm() {
  const [selectedInterest, setSelectedInterest] = useState("First VWC Collection");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handler = (e: Event) => setSelectedInterest((e as CustomEvent<string>).detail);
    window.addEventListener("design-select", handler);
    return () => window.removeEventListener("design-select", handler);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      interest: selectedInterest,
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
      setErrorMessage((err as Error).message || "Something went wrong. Please try again.");
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
          Thank you for joining the VWC circle. We look forward to sharing our first collection and private launch updates with you soon.
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
          placeholder="Your name"
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
          placeholder="Your mobile number"
          maxLength={30}
          autoComplete="tel"
          className="clean-input"
        />
      </div>

      <div className="form-field-group">
        <input
          name="email"
          type="email"
          placeholder="Your email address"
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
          placeholder="Tell us what you're looking for (optional)"
          maxLength={2000}
          className="clean-input clean-textarea"
        />
      </div>

      <button className="primary-burgundy-btn" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Submitting..." : "GET EARLY ACCESS"}
        <ArrowRight size={18} weight="bold" />
      </button>

      <div className="form-note-block">
        <p className="form-sub-note">Be part of the first VWC collection.</p>
        <p className="form-disclaimer">
          Your details will only be used for VWC launch updates and relevant communication.
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
        <div className="footer-brand-col">
          <Image
            src="/images/vwc-logo.png"
            alt="VWC Vibrant Watch Company"
            width={120}
            height={36}
            className="footer-logo"
          />
        </div>

        <div className="footer-tagline-col">
          <p>Hand-Painted Watches • Custom Pieces • Crafted in India.</p>
        </div>

        <div className="footer-social-col">
          <div className="social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VWC on Instagram"
              className="social-icon"
            >
              <InstagramLogo size={22} weight="regular" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VWC on YouTube"
              className="social-icon"
            >
              <YoutubeLogo size={22} weight="regular" />
            </a>
          </div>
          <p className="footer-copyright">
            © 2026 VWC - Vibrant Watch Company
          </p>
        </div>
      </div>
    </footer>
  );
}
