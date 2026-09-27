import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  Header,
  EarlyAccessForm,
  Reveal,
  CollectionSlider,
  PerformantVideo,
  Footer,
} from "./ui";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* HERO SECTION */}
        <section className="hero wrap">
          <div className="hero-tag-row">
            <span className="hero-badge">VWC — VIBRANT WATCH COMPANY</span>
          </div>

          <h1 className="hero-title">
            WHERE ART <br className="mobile-only-br" />
            MEETS TIME.
          </h1>

          <p className="hero-support-text">
            Hand-painted watches and custom timepieces, crafted in India for
            those who believe a watch is more than something you wear.
          </p>

          <div className="hero-cta-wrapper">
            <a className="primary-burgundy-btn hero-btn" href="#interest">
              JOIN THE VWC LIST <ArrowRight size={18} weight="bold" />
            </a>
          </div>

          <div className="hero-subtext-bar">
            <div className="subtext-line" />
            <p className="hero-subtext">
              HAND-PAINTED WATCHES <span>•</span> CUSTOM PIECES <span>•</span> CRAFTED IN INDIA
            </p>
          </div>

          <Reveal className="hero-media-showcase">
            <PerformantVideo
              src="/video.mp4"
              poster="/images/watch-artistry.webp"
              ariaLabel="Master artisan hand-painting fine details on a watch dial"
            />
          </Reveal>
        </section>

        {/* COLLECTION SECTION */}
        <section className="collection-section wrap" id="collection">
          <div className="section-header-block">
            <p className="section-eyebrow">THE FIRST VWC COLLECTION</p>
            <h2 className="section-heading">
              SIX WATCHES. <br />
              SIX STORIES.
            </h2>
            <p className="section-intro-text">
              Each VWC creation begins with an idea. From artistic
              interpretations of Indian heritage to bold explorations of colour,
              our first collection brings together six distinctive expressions
              of time.
            </p>
          </div>

          <CollectionSlider />

          {/* TEASER MOMENT */}
          <div className="craft-teaser-banner">
            <div className="teaser-image-wrap">
              <Image
                src="/images/watch-artistry.webp"
                alt="Art on a smaller canvas"
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="teaser-img"
              />
              <div className="teaser-overlay">
                <h3>
                  Art <br />
                  on a smaller <br />
                  canvas.
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* LEAD CAPTURE / EARLY ACCESS SECTION */}
        <section className="early-access-section wrap" id="interest">
          <div className="form-hero-banner">
            <Image
              src="/images/watch-botanical.webp"
              alt="Intricate floral dial timepiece creation"
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className="form-banner-img"
            />
          </div>

          <div className="form-content-block">
            <p className="section-eyebrow">VWC IS COMING SOON</p>
            <h2 className="section-heading">BE FIRST TO KNOW.</h2>
            <p className="section-intro-text">
              A new expression of time is coming. Join the VWC list for early
              access to our first collection, launch updates and a closer look
              at the stories behind our watches.
            </p>

            <EarlyAccessForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
