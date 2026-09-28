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
        <section className="hero hero-wrap">
          <div className="hero-content-col">
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
              {/* <div className="subtext-line" /> */}
              <p className="hero-subtext">
                Hand-painted watches. Custom pieces. Crafted in India.
              </p>
            </div>
          </div>

          <Reveal className="hero-media-col">
            <div className="hero-media-showcase">
              <PerformantVideo
                src="/vid-1.mp4"
                poster="/images/watch-artistry.webp"
                ariaLabel="Master artisan hand-painting fine details on a watch dial"
              />
            </div>
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
        </section>

        {/* LEAD CAPTURE / EARLY ACCESS SECTION */}
        <section className="early-access-section wrap" id="interest">
          <div className="early-access-image">
            <PerformantVideo
              src="/rammandir.mp4"
              poster="/rammandir.webp"
              ariaLabel="Ram Mandir watch artistry video"
            />
          </div>
          <div className="form-content-block">
            <p className="section-eyebrow">VWC IS COMING SOON</p>
            <h2 className="section-heading">BE FIRST TO KNOW</h2>
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
