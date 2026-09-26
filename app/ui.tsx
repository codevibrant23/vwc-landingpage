"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  List,
  X,
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
      whileInView={reduce ? {} : { y: [16, 0] }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.1 }}
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
            video.play().catch(() => {
              // Autoplay policy or interrupt handling
            });
          } else {
            video.pause();
          }
        });
      },
      {
        rootMargin: "150px 0px",
        threshold: 0.05,
      },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      aria-label={ariaLabel}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header wrap">
      <a className="brand" href="#" aria-label="VWC Vibrant Watch Company home">
        <span>VWC</span>
        <small>VIBRANT WATCH COMPANY</small>
      </a>
      <nav aria-label="Main navigation" className={open ? "nav open" : "nav"}>
        <a href="#designs" onClick={() => setOpen(false)}>
          The designs
        </a>
        <a href="#products" onClick={() => setOpen(false)}>
          Timepieces
        </a>
        <a href="#story" onClick={() => setOpen(false)}>
          Our story
        </a>
        <a href="#custom" onClick={() => setOpen(false)}>
          Custom pieces
        </a>
        <a className="nav-cta" href="#interest" onClick={() => setOpen(false)}>
          Enquire now <ArrowUpRight size={18} />
        </a>
      </nav>
      <button
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26} /> : <List size={26} />}
      </button>
    </header>
  );
}

const designs = [
  {
    name: "The Botanical",
    type: "Nature, in miniature",
    video: "/video-1.mp4",
    image: "/images/watch-botanical.webp",
    alt: "Gold watch concept with painted burgundy flowers and burgundy strap",
    className: "botanical",
  },
  {
    name: "The Blue Hour",
    type: "A moment worth keeping",
    image: "/images/watch-blue.webp",
    alt: "Hand-painted blue landscape watch concept with a navy leather strap",
    className: "blue",
  },
];

export function Collection() {
  return (
    <div className="collection">
      {designs.map((d) => (
        <article className={`design-card ${d.className}`} key={d.name}>
          <a
            href={`#interest`}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("design-select", { detail: d.name }),
              )
            }
            aria-label={`${d.name}. ${d.type}. Enquire now`}
          >
            <div className="design-image">
              {d.video ? (
                <PerformantVideo
                  src={d.video}
                  poster={d.image}
                  ariaLabel={d.alt}
                />
              ) : (
                <Image
                  src={d.image!}
                  alt={d.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <span className="image-arrow">
                <ArrowUpRight size={26} />
              </span>
            </div>
            <div className="design-caption">
              <h3>{d.name}</h3>
              <p>{d.type}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}

export const products = [
  {
    id: "botanical-gold",
    name: "The Botanical Gold",
    tagline: "Indian flora miniature on ivory canvas",
    edition: "Edition 01",
    spec: "38mm · Rose Gold · Burgundy Leather",
    image: "/images/watch-botanical.webp",
    alt: "Hand-painted Botanical Gold watch dial on cream canvas",
    status: "Available to Commission",
  },
  {
    id: "botanical-noir",
    name: "The Botanical Noir",
    tagline: "Midnight blooms & gilded hour markers",
    edition: "Edition 02",
    spec: "38mm · Brushed Gold · Black Leather",
    image: "/images/watch-botanical.webp",
    alt: "Hand-painted Botanical Noir timepiece",
    status: "Limited Edition",
  },
  {
    id: "lotus-dawn",
    name: "The Lotus Dawn",
    tagline: "Water lily strokes on warm enamel",
    edition: "Edition 03",
    spec: "36mm · Champagne Gold · Silk Strap",
    image: "/images/watch-botanical.webp",
    alt: "Hand-painted Lotus Dawn gold wristwatch",
    status: "Available to Commission",
  },
  {
    id: "gulmohar-red",
    name: "The Gulmohar Edit",
    tagline: "Summer petals in deep crimson hues",
    edition: "Edition 04",
    spec: "40mm · Classic Gold · Tan Leather",
    image: "/images/watch-botanical.webp",
    alt: "Gulmohar Edit hand-painted wristwatch",
    status: "Made to Order",
  },
  {
    id: "royal-heritage",
    name: "The Royal Heritage",
    tagline: "Artisanal gold leaf & botanical motifs",
    edition: "Edition 05",
    spec: "38mm · 18k Plated · Burgundy Strap",
    image: "/images/watch-botanical.webp",
    alt: "Royal Heritage artisan hand-painted timepiece",
    status: "Bespoke Only",
  },
];

export function ProductsSection() {
  return (
    <div className="products-grid">
      {products.map((p, idx) => (
        <article className="product-card" key={p.id}>
          <a
            href="#interest"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("design-select", { detail: p.name }),
              )
            }
            aria-label={`${p.name}. ${p.spec}. Enquire now`}
          >
            <div className="product-image-container">
              <span className="product-badge">{p.edition}</span>
              <div className="product-image">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  loading={idx < 2 ? "eager" : "lazy"}
                />
              </div>
              <span className="product-action-pill">
                Enquire <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="product-info">
              <div className="product-meta">
                <span className="product-spec">{p.spec}</span>
                <span className="product-status">{p.status}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.tagline}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}

export function InterestForm() {
  const [design, setDesign] = useState("Explore the collection");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handler = (e: Event) => setDesign((e as CustomEvent<string>).detail);
    window.addEventListener("design-select", handler);
    return () => window.removeEventListener("design-select", handler);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      interest: formData.get("interest") || design,
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
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setState("success");
    } catch (err) {
      setErrorMessage((err as Error).message || "Something went wrong.");
      setState("error");
    }
  }

  if (state === "success")
    return (
      <div className="form-success" role="status">
        <Check size={42} />
        <h3>A lovely place to start.</h3>
        <p>
          Thank you for reaching out. We have received your enquiry and will be
          in touch with you shortly.
        </p>
        <button className="text-link" onClick={() => setState("idle")}>
          Submit another enquiry <ArrowRight size={20} />
        </button>
      </div>
    );

  return (
    <form onSubmit={submit} className="enquiry-form">
      {state === "error" && (
        <div className="form-error-banner" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="First and last name"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        I’m interested in
        <select
          name="interest"
          value={design}
          onChange={(e) => setDesign(e.target.value)}
        >
          <option>Explore the collection</option>
          <option>The Botanical</option>
          <option>The Blue Hour</option>
          <option>The Botanical Gold</option>
          <option>The Botanical Noir</option>
          <option>The Lotus Dawn</option>
          <option>The Gulmohar Edit</option>
          <option>The Royal Heritage</option>
          <option>A custom piece</option>
          <option>A gift for someone</option>
        </select>
      </label>
      <label>
        A little about your idea <span className="optional">(optional)</span>
        <textarea
          name="message"
          rows={3}
          maxLength={2000}
          placeholder="A design you love, an occasion, a story…"
        />
      </label>
      <button className="button" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Submitting..." : "Enquire now"}
        <ArrowUpRight size={21} />
      </button>
      <p className="form-note">
        We respect your privacy. Your details are securely recorded.
      </p>
    </form>
  );
}


