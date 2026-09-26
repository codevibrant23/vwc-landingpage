import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  FlowerLotus,
} from "@phosphor-icons/react/dist/ssr";
import {
  Header,
  InterestForm,
  Reveal,
  Collection,
  PerformantVideo,
  ProductsSection,
} from "./ui";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-top">
            <p className="text-black">
              Hand-painted watches. Crafted in India.
            </p>
            <span className="hero-note">
              A little art. A lifetime of stories.
            </span>
          </div>
          <h1>
            Art, worn{" "}
            <span>
              as <span className="burgundy">time.</span>
            </span>
          </h1>
          <div className="hero-bottom">
            <p>
              For the ones who see things differently.
              <br />
              Hand-painted timepieces, as individual as you.
            </p>
            <a className="button" href="#designs">
              Explore designs <ArrowDownRight size={21} />
            </a>
          </div>
          <div className="hero-photo">
            <Image
              src="/images/watch-botanical.webp"
              alt="Concept of a gold watch with a hand-painted botanical dial and burgundy leather strap on ivory silk"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1400px"
              quality={90}
            />
            <div className="photo-mark" aria-hidden="true">
              <FlowerLotus weight="thin" />
            </div>
          </div>
        </section>
        <section className="intro wrap" id="story">
          <p className="eyebrow">The Vibrant philosophy</p>
          <Reveal>
            <h2>
              Life isn’t off the shelf.
              <br />
              Your watch shouldn’t be either.
            </h2>
            <div className="intro-copy">
              <p>
                A favourite flower. A place you carry with you. A colour that
                feels like home. We believe the smallest canvas can hold the
                most personal stories.
              </p>
              <p>
                At Vibrant Watch Company, art meets the everyday. Hand-painted
                watches and custom pieces, crafted in India to feel like you.
              </p>
            </div>
          </Reveal>
        </section>
        <section className="designs wrap" id="designs">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The design edit</p>
              <h2>
                Small canvas.
                <br />
                Endless possibility.
              </h2>
            </div>
            <p>
              A glimpse into our creative world.
              <br />
              Find a direction that speaks to you.
            </p>
          </div>
          <Collection />
          <p className="concept-note">
            Concept gallery. These visualisations explore our design direction;
            final pieces and availability are confirmed on enquiry.
          </p>
        </section>
        <section className="products wrap" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The editions</p>
              <h2>
                Products we have.
                <br />
                Ready to commission.
              </h2>
            </div>
            <p>
              Explore our five signature hand-painted concepts.
              <br />
              Each piece is individually painted and crafted to order.
            </p>
          </div>
          <ProductsSection />
        </section>
        <section className="custom wrap" id="custom">
          <Reveal className="custom-art">
            <PerformantVideo
              src="/video.mp4"
              poster="/images/watch-artistry.webp"
              ariaLabel="Hand-painting detail on a bespoke watch dial"
            />
          </Reveal>
          <div className="custom-copy">
            <p className="eyebrow">Made personal</p>
            <h2>
              Your story.
              <br />
              Our smallest canvas.
            </h2>
            <p>
              Have something in mind? Let’s turn a memory, a mood, or a
              meaningful detail into a watch you’ll reach for every day.
            </p>
            <ol>
              <li>
                <strong>Share your spark</strong>
                <span>A flower, a sketch, a story. Start anywhere.</span>
              </li>
              <li>
                <strong>Find your expression</strong>
                <span>Explore the artwork and palette with us.</span>
              </li>
              <li>
                <strong>Make it yours</strong>
                <span>
                  We’ll confirm the details before creating your piece.
                </span>
              </li>
            </ol>
            <a className="text-link" href="#interest">
              Enquire now <ArrowUpRight size={22} />
            </a>
          </div>
        </section>
        <section className="interest wrap" id="interest">
          <div>
            <p className="eyebrow">Let’s make time personal</p>
            <h2>
              Something
              <br />
              caught your eye?
            </h2>
            <p>
              Tell us what you’re drawn to. We’ll help you explore a design, a
              custom piece, or a thoughtful gift.
            </p>
            <FlowerLotus
              className="interest-flower"
              weight="thin"
              aria-hidden="true"
            />
          </div>
          <InterestForm />
        </section>
        <section className="faq wrap">
          <p className="eyebrow">A few things to know</p>
          <div>
            {[
              [
                "Can I request a custom design?",
                "Yes. Share your inspiration through the enquiry form. We’ll discuss what’s possible and confirm the artwork, price, and timeline with you.",
              ],
              [
                "Are the watches shown available to order?",
                "The gallery currently shows concept visualisations. Enquire about a design to discuss its availability and the details of a finished piece.",
              ],
              [
                "How do I find out about pricing and delivery?",
                "Send us an enquiry with the design you love and where you’re based. Pricing and delivery timing are confirmed individually before you place an order.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="wrap">
        <a className="footer-brand" href="#">
          VIBRANT<span>WATCH COMPANY</span>
        </a>
        <div className="footer-bottom">
          <p>Hand-painted with purpose. Worn with personality.</p>
          <p>© {new Date().getFullYear()} Vibrant Watch Company</p>
          <a href="#interest">
            Enquire now <ArrowUpRight size={16} />
          </a>
        </div>
      </footer>
    </>
  );
}
