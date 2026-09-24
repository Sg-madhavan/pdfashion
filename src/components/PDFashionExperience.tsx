import {
  ArrowRight,
  Award,
  Baby,
  Building2,
  CalendarHeart,
  CheckCircle2,
  ChevronDown,
  Gift,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Camera,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  PartyPopper,
  Phone,
  Play,
  Send,
  Sparkles,
  Star,
  Upload,
  Users,
} from "lucide-react";
import Lenis from "lenis";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP_NUMBER, assetUrl } from "@/config/env";
import { submitGiftEnquiry } from "@/services/enquiries";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Occasions", href: "#occasions" },
  { label: "How It Works", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const products = [
  {
    category: "Personalized Mugs",
    icon: "☕",
    mood: "Daily smiles with your favorite memory.",
    items: [
      ["White Mug", "₹250"],
      ["Tea Mug", "₹250"],
      ["Magic Mug", "₹400"],
      ["Heart Handle Mug", "₹400"],
    ],
  },
  {
    category: "Water Bottles",
    icon: "🥤",
    mood: "Premium hydration, personalized for every journey.",
    items: [["Steel Water Bottle (750ml)", "₹600"]],
  },
  {
    category: "Mouse Pads",
    icon: "🖱️",
    mood: "Turn work desks into emotional spaces.",
    items: [["Personalized Mouse Pad", "₹200"]],
  },
  {
    category: "Frames",
    icon: "🖼️",
    mood: "Luxury walls for stories that deserve attention.",
    items: [
      ["Aluminum Frame", "₹400"],
      ["Wood Wall Frame", "₹1200"],
      ["Wood Wall Clock Frame", "₹1100"],
      ["Box Type LED Frame", "₹700"],
      ["Gold Foil LED Frame", "₹900"],
      ["Wood Title Frame", "₹850"],
      ["Sparkling LED Frame", "₹950"],
    ],
  },
  {
    category: "Wood Caricatures",
    icon: "🪵",
    mood: "Playful handcrafted characters for joyful gifting.",
    items: [["Personalized Wood Caricature", "₹450"]],
  },
  {
    category: "Lamps",
    icon: "💡",
    mood: "Warm memories illuminated like festive lanterns.",
    items: [
      ["Night Lamp", "₹500"],
      ["Rotating Lamp", "₹1000"],
      ["Crystal LED Photo Lamp", "₹1100"],
      ["Magic Mirror Round", "₹500"],
    ],
  },
  {
    category: "Cushions",
    icon: "🎀",
    mood: "Soft, colorful, huggable memories.",
    items: [
      ["Magic Sequin Cushion", "₹700"],
      ["Fun Heart Cushion", "₹550"],
      ["Rainbow Cushion", "₹550"],
      ["Ludo Pillow", "₹600"],
    ],
  },
  {
    category: "Clocks",
    icon: "🕰️",
    mood: "Personal moments that keep time beautifully.",
    items: [
      ["Round Wooden Clock", "₹850"],
      ["Square Wooden Clock", "₹950"],
      ["Family Photo Clock", "₹1200"],
      ["Acrylic LED Clock", "₹1300"],
      ["Premium Acrylic Clock", "₹1450"],
      ["Wooden Table Clock", "₹450"],
      ["Crystal Table Clock", "₹650"],
      ["Anniversary Photo Clock", "₹1500"],
      ["Birthday Photo Clock", "₹1400"],
    ],
  },
  {
    category: "Wooden Cutouts",
    icon: "✨",
    mood: "Names, neon hearts, and dimensional keepsakes.",
    items: [
      ["Wooden Photo Cutout", "₹700"],
      ["Name Arch Cutout", "₹1000"],
      ["Neon Heart Cutout", "₹1500"],
    ],
  },
];

const featuredProducts = [
  "Magic Mug",
  "Crystal LED Photo Lamp",
  "Family Photo Clock",
  "Magic Sequin Cushion",
  "Gold Foil LED Frame",
  "Neon Heart Cutout",
];

const occasions = [
  { title: "Festival Collection", icon: PartyPopper, copy: "Christmas, Diwali, New Year, and every homecoming wrapped in glow." },
  { title: "Birthday Gifts", icon: Gift, copy: "Playful photo memories, cushions, clocks, mugs, and surprise boxes." },
  { title: "Anniversary Gifts", icon: CalendarHeart, copy: "Romantic keepsakes crafted for two hearts and one story." },
  { title: "Wedding Gifts", icon: Heart, copy: "Premium frames, lamps, and couple memories for new beginnings." },
  { title: "Baby Gifts", icon: Baby, copy: "Soft, adorable, personalized memories for little miracles." },
  { title: "Corporate Gifts", icon: Building2, copy: "Bulk branding, event hampers, and thoughtful team appreciation." },
];

const whyChoose = [
  ["Design Preview", "We guide your photo placement, names, dates, and finish before production."],
  ["Premium Materials", "Carefully sourced mugs, wood, acrylic, LED parts, fabrics, and print surfaces."],
  ["Fast Local Support", "Talk to a real gift expert through WhatsApp or the enquiry form."],
  ["Emotional Craft", "Every product is prepared to feel personal, festive, and memorable."],
];

const timeline = [
  ["01", "Share Your Idea", "Send photos, names, occasion, and your preferred product."],
  ["02", "Design Magic", "Our team prepares personalization guidance and confirms details."],
  ["03", "Craft & Quality Check", "Your gift is printed, assembled, checked, packed, and made celebration-ready."],
  ["04", "Pickup / Delivery", "Collect locally or coordinate convenient delivery with our gift expert."],
];

const testimonials = [
  ["The LED frame looked premium and emotional. My parents were speechless.", "Aarav Sharma", "Anniversary Gift"],
  ["They helped me choose the perfect birthday mug and cushion combo on WhatsApp.", "Meera Joshi", "Birthday Surprise"],
  ["Corporate bulk gifts were delivered beautifully packed with our branding.", "Rohan Mehta", "Bulk Order"],
];

const faqs = [
  ["Do you provide design help?", "Yes. Share your photo, name, date, and occasion. Our gift expert will guide layout, product fit, and finishing options."],
  ["Can I enquire without adding to cart?", "Absolutely. PD Fashion is enquiry-first so every personalized gift can be discussed and customized properly."],
  ["How do photo uploads work?", "Upload a reference photo in the form or share high-resolution files directly on WhatsApp for final production."],
  ["Do you accept bulk or corporate orders?", "Yes. We support event gifting, employee appreciation, festival hampers, branded products, and custom packaging discussions."],
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function whatsappUrl(product = "a personalized gift") {
  const text = `Hi PD Fashion, I want to enquire about ${product}. Please help me customize it.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function PDFashionExperience() {
  const heroRef = useRef<HTMLElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(featuredProducts[0]);
  const [activeSection, setActiveSection] = useState("home");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mobileOpen, setMobileOpen] = useState(false);

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 86 }, (_, index) => ({
        left: (index * 37) % 100,
        size: 4 + ((index * 11) % 18),
        duration: 9 + ((index * 7) % 18),
        delay: -((index * 13) % 20),
        opacity: 0.28 + (((index * 5) % 52) / 100),
        drift: ((index % 9) - 4) * 10,
      })),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        left: (index * 29) % 100,
        top: (index * 17) % 92,
        delay: -((index * 3) % 12),
        scale: 0.55 + ((index % 6) * 0.16),
      })),
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.88,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.set(".hero-copy > *", { opacity: 0, y: 34, filter: "blur(14px)" });
      gsap.set(".hero-actions", { opacity: 0, y: 22 });
      gsap.set(".trust-row .trust-pill", { opacity: 0, y: 18, scale: 0.94 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo("#hero-video", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo(".cinematic-overlay", { opacity: 0 }, { opacity: 1, duration: 0.9 }, "-=0.7")
        .fromTo(".nav-shell", { opacity: 0, y: -28 }, { opacity: 1, y: 0, duration: 0.85 }, "-=0.35")
        .to(".hero-copy > *", { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.12, duration: 0.85 }, "-=0.2")
        .to(".hero-actions", { opacity: 1, y: 0, duration: 0.75 }, "-=0.25")
        .to(".trust-row .trust-pill", { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.65 }, "-=0.35")
        .fromTo(".mission-card", { opacity: 0, x: 42, y: 16 }, { opacity: 1, x: 0, y: 0, duration: 0.9 }, "-=0.8");

      gsap.to(".nav-shell", {
        backgroundColor: "rgba(6, 18, 38, 0.72)",
        borderColor: "rgba(255,255,255,0.18)",
        boxShadow: "0 24px 90px rgba(0,0,0,0.33)",
        backdropFilter: "blur(22px)",
        scrollTrigger: { trigger: ".hero-section", start: "top -10", end: "top -220", scrub: true },
      });

      gsap.to(".logo-mark", {
        scale: 0.88,
        scrollTrigger: { trigger: ".hero-section", start: "top -40", end: "top -280", scrub: true },
      });

      gsap.to(".hero-camera", {
        y: -72,
        scale: 1.09,
        rotation: 0.22,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.9 },
      });

      gsap.to(".hero-headline", {
        y: -118,
        opacity: 0.82,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.85 },
      });

      gsap.to(".hero-actions", {
        y: -72,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "20% top", end: "bottom top", scrub: 0.75 },
      });

      gsap.to(".hero-overlay-intensity", {
        opacity: 0.42,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.7 },
      });

      gsap.to(".moon-layer", {
        x: -88,
        y: 42,
        scale: 0.88,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.to(".fog-layer", {
        x: 110,
        opacity: 0.56,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 },
      });

      gsap.to(".gift-elephant", {
        y: -42,
        x: 32,
        scale: 1.035,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 72, filter: "blur(15px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 84%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".gift-card").forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 64, rotateX: 8, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.85,
            delay: (index % 4) * 0.06,
            ease: "back.out(1.3)",
            scrollTrigger: { trigger: element, start: "top 88%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".float-card").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -14 : 14,
          duration: 2.8 + index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, heroRef);

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section instanceof Element);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      ctx.revert();
      observer.disconnect();
      lenis.destroy();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--mx", x.toFixed(3));
    event.currentTarget.style.setProperty("--my", y.toFixed(3));
    if (lightRef.current) {
      lightRef.current.style.transform = `translate3d(${x * 56}px, ${y * 38}px, 0)`;
    }
  };

  const openEnquiry = (product: string) => {
    setSelectedProduct(product);
    setMobileOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("loading");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("product", selectedProduct);

    try {
      await submitGiftEnquiry(formData);
      setFormState("success");
      form.reset();
      setSelectedProduct(featuredProducts[0]);
    } catch {
      setFormState("error");
    }
  };

  return (
    <main ref={heroRef} className="relative isolate min-h-screen overflow-hidden bg-[#061124]">
      <a href="#products" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-slate-950">
        Skip to products
      </a>

      <header className="nav-shell fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-24px))] -translate-x-1/2 rounded-full border border-white/0 px-4 py-3 opacity-0 transition-colors duration-300 md:top-6 md:px-5">
        <nav className="flex items-center justify-between gap-4" aria-label="Main navigation">
          <a href="#home" className="group flex items-center gap-3" aria-label="PD Fashion home">
            <span className="logo-mark relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-amber-300 text-xl font-black shadow-[0_18px_50px_rgba(244,63,94,0.35)] transition-transform">PD<span className="absolute -right-1 -top-2 text-lg">🎅</span></span>
            <span className="leading-tight">
              <span className="block text-base font-black tracking-wide text-white">PD Fashion</span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-[0.32em] text-amber-100/80">Personalized Gifts</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  "relative rounded-full px-4 py-2 text-sm font-semibold text-white/72 transition hover:text-white",
                  activeSection === item.href.slice(1) && "text-white",
                )}
              >
                {activeSection === item.href.slice(1) && <span className="absolute inset-0 -z-10 rounded-full bg-white/12 shadow-inner shadow-white/10" />}
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => openEnquiry("Personalized Gift Consultation")} className="hidden rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/16 md:inline-flex">
              <Gift className="mr-2 h-4 w-4" /> Enquire
            </button>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="hidden rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-[#052414] shadow-[0_18px_45px_rgba(37,211,102,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(37,211,102,0.44)] sm:inline-flex">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
            <button onClick={() => setMobileOpen((value) => !value)} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl lg:hidden" aria-label="Open menu" aria-expanded={mobileOpen}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="mt-4 grid gap-2 rounded-3xl border border-white/10 bg-[#081a35]/95 p-3 shadow-2xl shadow-black/30 lg:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold text-white/86 hover:bg-white/10">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section id="home" onMouseMove={handleMouseMove} className="hero-section relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-10 pt-28 md:px-10 lg:px-16" style={{ "--mx": 0, "--my": 0 } as CSSProperties}>
        <div className="hero-camera absolute inset-0 will-change-transform">
          <video autoPlay muted loop playsInline id="hero-video" className="absolute inset-0 h-full w-full object-cover">
            <source
              src={assetUrl("videos/santa-slowmo.mp4")}
              type="video/mp4"
            />
          </video>
          <div className="video-placeholder absolute inset-0" aria-hidden="true" />
          <div className="village-silhouette absolute inset-x-0 bottom-0 h-[34%]" aria-hidden="true" />
        </div>

        <div className="cinematic-overlay absolute inset-0 opacity-0" aria-hidden="true">
          <div className="hero-overlay-intensity absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.9)_0%,rgba(5,17,37,0.72)_40%,rgba(4,13,28,0.42)_72%,rgba(2,8,23,0.76)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_27%_44%,rgba(255,82,98,0.25),transparent_31%),radial-gradient(circle_at_70%_20%,rgba(172,204,255,0.2),transparent_27%),radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.66)_100%)]" />
          <div ref={lightRef} className="mouse-light absolute left-[18%] top-[32%] h-72 w-72 rounded-full bg-amber-200/18 blur-3xl will-change-transform" />
          <div className="light-rays absolute inset-0" />
        </div>

        <div className="moon-layer pointer-events-none absolute right-[13%] top-[12%] hidden h-24 w-24 rounded-full bg-[radial-gradient(circle_at_36%_34%,#fff,rgba(213,228,255,0.86)_34%,rgba(120,160,220,0.34)_68%,transparent_72%)] shadow-[0_0_70px_rgba(180,210,255,0.55)] md:block" aria-hidden="true" />
        <div className="fog-layer pointer-events-none absolute inset-x-[-12%] bottom-[10%] h-48 bg-[radial-gradient(ellipse_at_center,rgba(216,235,255,0.18),transparent_68%)] blur-2xl" aria-hidden="true" />

        <div className="particle-field pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {snowflakes.map((flake, index) => (
            <span
              key={`snow-${index}`}
              className={cx("snowflake", index % 3 === 0 && "snowflake-foreground")}
              style={{
                left: `${flake.left}%`,
                width: flake.size,
                height: flake.size,
                opacity: flake.opacity,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`,
                "--drift": `${flake.drift}px`,
              } as CSSProperties}
            />
          ))}
          {sparkles.map((sparkle, index) => (
            <span
              key={`sparkle-${index}`}
              className="magic-sparkle"
              style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%`, animationDelay: `${sparkle.delay}s`, transform: `scale(${sparkle.scale})` }}
            />
          ))}
          <span className="cinema-dust dust-a" />
          <span className="cinema-dust dust-b" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hero-copy max-w-3xl pt-6 md:pt-10">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-amber-100 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <Sparkles className="mr-2 h-4 w-4 text-amber-300" /> World of Personalized Gifts
            </div>
            <h1 className="hero-headline mt-7 text-[clamp(3.2rem,8vw,7.6rem)] font-black leading-[0.88] tracking-[-0.08em] text-white drop-shadow-[0_16px_55px_rgba(0,0,0,0.45)]">
              We Craft <span className="block text-rose-400">Happiness,</span>
              <span className="block bg-gradient-to-r from-amber-100 via-white to-rose-200 bg-clip-text text-transparent">Not Just Gifts.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/82 md:text-xl">
              Premium personalized mugs, frames, lamps, cushions, clocks, cutouts, and festival keepsakes made for family, friendship, love, celebrations, and unforgettable memories.
            </p>
            <div className="hero-actions mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="ripple group inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 px-7 py-4 text-base font-black text-white shadow-[0_24px_70px_rgba(244,63,94,0.38)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(244,63,94,0.55)]">
                Explore Gifts <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button onClick={() => openEnquiry("Personalized Gift Consultation")} className="group inline-flex items-center justify-center rounded-3xl border border-white/18 bg-white/10 px-7 py-4 text-base font-black text-white shadow-2xl shadow-black/15 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/16">
                <Play className="mr-3 h-5 w-5 rounded-full bg-white/15 p-1" /> Contact Us
              </button>
            </div>
            <div className="trust-row mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="trust-pill rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
                <div className="text-3xl font-black text-white">50K+</div>
                <div className="text-sm text-white/68">Happy families</div>
              </div>
              <div className="trust-pill rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-1 text-amber-300"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
                <div className="mt-2 text-sm text-white/68">Loved by gift givers</div>
              </div>
              <div className="trust-pill rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
                <div className="text-3xl font-black text-white">24h</div>
                <div className="text-sm text-white/68">Expert response</div>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[620px] lg:block">
            <div className="gift-elephant absolute bottom-2 right-0 h-[560px] w-[700px] will-change-transform">
              <div className="absolute right-2 top-0 rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl mission-card">
                <div className="flex items-center gap-3 text-white"><Gift className="h-7 w-7 text-rose-400" /><span className="font-black">Today's Mission</span></div>
                <p className="mt-5 text-sm text-white/58">Gifts Personalized</p>
                <div className="mt-1 text-3xl font-black tracking-tight">12,540</div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-rose-500 to-amber-300" /></div>
                <p className="mt-5 flex items-center gap-2 text-sm font-bold text-white/82"><MapPin className="h-4 w-4" /> Next stop: Your celebration</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 hidden w-[min(1040px,calc(100%-40px))] -translate-x-1/2 rounded-[2rem] border border-white/12 bg-[#06172f]/72 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl xl:grid xl:grid-cols-4 xl:gap-3">
          {[
            ["🎅", "Personalized Gifts", "Made just for your favorite people."],
            ["✅", "Premium Approved", "Materials and finish selected with care."],
            ["🕰️", "On-Time Guidance", "We confirm details before crafting."],
            ["🍪", "100% Magic", "Powered by memories, love, and cheer."],
          ].map(([icon, title, copy]) => (
            <div key={title} className="flex items-center gap-4 rounded-3xl px-4 py-3">
              <span className="text-4xl">{icon}</span>
              <span><strong className="block text-lg">{title}</strong><span className="text-sm text-white/58">{copy}</span></span>
            </div>
          ))}
        </div>

        <a href="#products" aria-label="Scroll to products" className="absolute bottom-6 right-6 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/20 md:bottom-8 md:right-10">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      <section id="products" className="relative z-10 -mt-1 overflow-hidden bg-[linear-gradient(180deg,#061124_0%,#0a1830_42%,#fbf5ed_42%,#fff8f1_100%)] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="reveal-up mx-auto max-w-3xl text-center">
            <span className="section-kicker">Signature Gift Shop</span>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.07em] text-white">Premium products, crafted around your story.</h2>
            <p className="mt-5 text-lg leading-8 text-blue-50/70">No carts. No generic checkout. Every product starts with an enquiry so we can personalize it perfectly.</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((group) => (
              <article key={group.category} className="gift-card group rounded-[2rem] border border-white/14 bg-white/[0.09] p-5 text-white shadow-[0_26px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-amber-200/38 hover:bg-white/[0.13]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-5xl drop-shadow-lg">{group.icon}</div>
                    <h3 className="mt-4 text-2xl font-black tracking-tight">{group.category}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">{group.mood}</p>
                  </div>
                  <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-black text-amber-100">Enquiry</span>
                </div>
                <div className="mt-5 grid gap-2">
                  {group.items.map(([name, price]) => (
                    <div key={name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.065] p-3">
                      <span className="text-sm font-bold text-white/88">{name}</span>
                      <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm font-black text-amber-100">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button onClick={() => openEnquiry(group.items[0][0])} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-100">Enquire Now</button>
                  <a href={whatsappUrl(group.category)} target="_blank" rel="noreferrer" className="rounded-2xl border border-[#25D366]/35 bg-[#25D366]/16 px-4 py-3 text-center text-sm font-black text-[#d6ffe3] transition hover:-translate-y-0.5 hover:bg-[#25D366]/24">WhatsApp</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#fff8f1] px-5 py-24 text-slate-950 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="reveal-up">
              <span className="section-kicker dark">Best Sellers & New Arrivals</span>
              <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-[-0.07em]">Gifts people remember long after the celebration.</h2>
            </div>
            <p className="reveal-up text-lg leading-8 text-slate-600">Choose an emotion, not just an item. Our best sellers combine warm lights, premium textures, names, dates, photos, and story-led personalization.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((item, index) => (
              <div key={item} className="float-card reveal-up rounded-[2rem] border border-orange-200/70 bg-white p-5 shadow-[0_24px_70px_rgba(83,45,15,0.1)]">
                <div className="relative grid aspect-[1.1] place-items-center overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_35%_25%,rgba(255,214,132,0.85),transparent_32%),linear-gradient(135deg,#fff3df,#ffe2e8_46%,#dcecff)]">
                  <span className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-black text-white">{index < 3 ? "Best Seller" : "New"}</span>
                  <span className="text-7xl">{["☕", "💡", "🕰️", "🎀", "🖼️", "💖"][index]}</span>
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/55 px-3 py-1 text-xs font-black backdrop-blur-xl">Personalized</span>
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-tight">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">A premium keepsake designed with photos, names, festive warmth, and PD Fashion craftsmanship.</p>
                <button onClick={() => openEnquiry(item)} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-rose-600">Enquire Now <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="occasions" className="relative overflow-hidden bg-[#fff8f1] px-5 py-24 text-slate-950 md:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="reveal-up max-w-3xl">
            <span className="section-kicker dark">Occasion Worlds</span>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-[-0.07em]">For festivals, family milestones, friendship, and forever moments.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {occasions.map(({ title, icon: Icon, copy }) => (
              <article key={title} className="reveal-up rounded-[2rem] border border-orange-200/70 bg-white/82 p-7 shadow-[0_24px_80px_rgba(83,45,15,0.09)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(244,63,94,0.12)]">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-300 text-white shadow-lg shadow-rose-500/20"><Icon className="h-7 w-7" /></div>
                <h3 className="mt-5 text-2xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07152c] px-5 py-24 md:px-10 lg:px-16">
        <div className="absolute left-[-10%] top-[-20%] h-96 w-96 rounded-full bg-rose-500/18 blur-3xl" />
        <div className="absolute right-[-12%] bottom-[-20%] h-96 w-96 rounded-full bg-amber-300/14 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal-up">
            <span className="section-kicker">Why Choose Us</span>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-[-0.07em]">Luxury feeling. Local warmth. Personal guidance.</h2>
            <p className="mt-6 text-lg leading-8 text-blue-50/68">PD Fashion is built around enquiries because personalized gifting deserves conversation, care, and emotion-first design.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map(([title, copy], index) => (
              <div key={title} className="reveal-up rounded-[2rem] border border-white/12 bg-white/[0.08] p-6 shadow-2xl shadow-black/15 backdrop-blur-2xl">
                <div className="text-4xl font-black text-amber-200">0{index + 1}</div>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="bg-[#07152c] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="reveal-up text-center">
            <span className="section-kicker">Order Timeline</span>
            <h2 className="mx-auto mt-4 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-[-0.07em]">From idea to celebration-ready gift.</h2>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {timeline.map(([step, title, copy]) => (
              <div key={step} className="reveal-up relative rounded-[2rem] border border-white/12 bg-white/[0.08] p-6 shadow-2xl shadow-black/15 backdrop-blur-2xl">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white text-2xl font-black text-rose-600">{step}</div>
                <h3 className="mt-7 text-2xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f1] px-5 py-24 text-slate-950 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="reveal-up">
              <span className="section-kicker dark">Customer Gallery</span>
              <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-[-0.07em]">A gallery of smiles, lights, names, and memories.</h2>
              <p className="mt-6 leading-8 text-slate-600">Real photography can be added later. The layout is ready for customer stories, product closeups, festive reels, and social proof.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 9 }, (_, index) => (
                <div key={index} className={cx("reveal-up group relative overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br p-5 shadow-[0_24px_70px_rgba(83,45,15,0.1)]", index % 3 === 0 ? "from-rose-200 via-orange-100 to-amber-100" : index % 3 === 1 ? "from-blue-100 via-white to-rose-100" : "from-amber-100 via-white to-emerald-100", index === 1 || index === 5 ? "md:row-span-2" : "")}>
                  <div className="grid min-h-36 place-items-center rounded-[1.4rem] border border-white/60 bg-white/45 backdrop-blur-xl md:min-h-44">
                    <ImageIcon className="h-10 w-10 text-slate-700/45" />
                  </div>
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/70 px-3 py-1 text-xs font-black text-slate-800 backdrop-blur-xl">Memory #{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f1] px-5 py-24 text-slate-950 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map(([quote, name, context]) => (
              <figure key={name} className="reveal-up rounded-[2rem] border border-orange-200/70 bg-white p-7 shadow-[0_24px_80px_rgba(83,45,15,0.09)]">
                <div className="flex text-amber-400">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}</div>
                <blockquote className="mt-6 text-xl font-bold leading-8 tracking-tight">“{quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-amber-300 font-black text-white">{name.charAt(0)}</span>
                  <span><strong className="block">{name}</strong><span className="text-sm text-slate-500">{context}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07152c] px-5 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2.4rem] border border-white/12 bg-white/[0.08] p-7 shadow-[0_34px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-up">
            <span className="section-kicker">Bulk Orders</span>
            <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.8rem)] font-black leading-none tracking-[-0.07em]">Corporate gifts with soul.</h2>
            <p className="mt-6 text-lg leading-8 text-blue-50/68">Plan festival hampers, employee appreciation, event souvenirs, branded mugs, acrylic clocks, LED frames, and custom packaging with a human gift expert.</p>
          </div>
          <div className="reveal-up grid gap-4 sm:grid-cols-3">
            {[[Users, "Teams"], [Award, "Branding"], [PackageCheck, "Packing"]].map(([Icon, label]) => {
              const TypedIcon = Icon as typeof Users;
              return (
                <div key={label as string} className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-6 text-center">
                  <TypedIcon className="mx-auto h-10 w-10 text-amber-200" />
                  <div className="mt-4 font-black">{label as string}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#fff8f1] px-5 py-24 text-slate-950 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="reveal-up mx-auto max-w-3xl text-center">
            <span className="section-kicker dark">Contact Gift Expert</span>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-black leading-none tracking-[-0.07em]">Tell us the memory. We’ll help shape the gift.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={submitEnquiry} className="reveal-up rounded-[2.4rem] border border-orange-200/70 bg-white p-6 shadow-[0_28px_90px_rgba(83,45,15,0.11)] md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="field-label">Name<input required name="name" placeholder="Your name" className="field-input" /></label>
                <label className="field-label">Phone<input required name="phone" placeholder="Phone number" className="field-input" inputMode="tel" /></label>
                <label className="field-label">Email<input name="email" placeholder="Email address" className="field-input" type="email" /></label>
                <label className="field-label">City<input name="city" placeholder="Your city" className="field-input" /></label>
                <label className="field-label">Product
                  <select required name="product" value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)} className="field-input">
                    {products.flatMap((group) => group.items.map(([name]) => name)).map((name) => <option key={name} value={name}>{name}</option>)}
                    <option value="Personalized Gift Consultation">Personalized Gift Consultation</option>
                    <option value="Bulk Corporate Order">Bulk Corporate Order</option>
                  </select>
                </label>
                <label className="field-label">Occasion<input name="occasion" placeholder="Birthday, wedding, festival..." className="field-input" /></label>
                <label className="field-label md:col-span-2">Upload Photo
                  <span className="field-input flex items-center justify-between gap-3 text-slate-500"><span className="inline-flex items-center gap-2"><Upload className="h-4 w-4" /> Choose reference photo</span><input name="photo" type="file" accept="image/*" className="sr-only" /></span>
                </label>
                <label className="field-label md:col-span-2">Message<textarea name="message" placeholder="Tell us names, dates, gift idea, delivery need, or customization details." className="field-input min-h-36 resize-y" /></label>
              </div>
              <button disabled={formState === "loading"} className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-slate-950 to-rose-700 px-7 py-4 text-base font-black text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
                {formState === "loading" ? "Sending Enquiry..." : "Send Premium Enquiry"} <Send className="ml-3 h-5 w-5" />
              </button>
              {formState === "success" && <div className="success-pop mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-800"><CheckCircle2 className="mr-2 inline h-5 w-5" /> Your enquiry is in! Our gift expert will contact you soon.</div>}
              {formState === "error" && <div className="mt-5 rounded-3xl border border-rose-200 bg-rose-50 p-4 font-bold text-rose-800">We couldn’t submit right now. Please try WhatsApp for fastest support.</div>}
            </form>

            <aside className="reveal-up grid gap-6">
              <div className="rounded-[2.4rem] border border-[#25D366]/25 bg-[#052414] p-8 text-white shadow-[0_28px_90px_rgba(37,211,102,0.16)]">
                <div className="grid h-20 w-20 place-items-center rounded-[1.6rem] bg-[#25D366] text-[#052414] shadow-[0_18px_50px_rgba(37,211,102,0.35)]"><MessageCircle className="h-11 w-11" /></div>
                <h3 className="mt-7 text-3xl font-black tracking-tight">Chat with our Gift Expert</h3>
                <p className="mt-4 leading-8 text-white/70">Need help choosing photos, product size, text, finish, or delivery timing? WhatsApp us for fast customization assistance.</p>
                <a href={whatsappUrl(selectedProduct)} target="_blank" rel="noreferrer" className="whatsapp-pulse mt-7 inline-flex w-full items-center justify-center rounded-3xl bg-[#25D366] px-7 py-4 text-base font-black text-[#052414] transition hover:-translate-y-0.5">
                  Start WhatsApp Chat <MessageCircle className="ml-3 h-5 w-5" />
                </a>
              </div>
              <div className="rounded-[2rem] border border-orange-200/70 bg-white p-6 shadow-[0_24px_70px_rgba(83,45,15,0.09)]">
                <div className="flex items-center gap-3 font-black"><Phone className="h-5 w-5 text-rose-600" /> Phone / WhatsApp</div>
                <p className="mt-2 text-slate-600">Replace the placeholder number in code with your official WhatsApp Business number.</p>
                <div className="mt-5 flex items-center gap-3 font-black"><Mail className="h-5 w-5 text-rose-600" /> hello@pdfashiongifts.com</div>
                <div className="mt-5 flex items-center gap-3 font-black"><MapPin className="h-5 w-5 text-rose-600" /> Visit our gifting studio</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid bg-[#fff8f1] px-5 py-16 text-slate-950 md:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-up rounded-[2rem] border border-orange-200/70 bg-white p-7 shadow-[0_24px_80px_rgba(83,45,15,0.09)]">
            <span className="section-kicker dark">FAQ</span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">Questions before you personalize?</h2>
            <div className="mt-8 grid gap-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>{question}</span><HelpCircle className="h-5 w-5 text-rose-600 transition group-open:rotate-45" /></summary>
                  <p className="mt-3 leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="reveal-up overflow-hidden rounded-[2rem] border border-orange-200/70 bg-white shadow-[0_24px_80px_rgba(83,45,15,0.09)]">
            <iframe
              title="PD Fashion location map"
              src="https://www.google.com/maps?q=personalized%20gifts%20India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[520px] w-full border-0 grayscale-[0.2]"
            />
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#041022] px-5 py-14 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-300 font-black">PD</span><span><strong className="block text-xl">PD Fashion</strong><span className="text-xs font-bold uppercase tracking-[0.3em] text-white/48">World of Personalized Gifts</span></span></div>
            <p className="mt-5 max-w-md leading-8 text-white/58">A cinematic gifting destination for love, family, festivals, friendship, weddings, babies, corporate memories, and Christmas magic.</p>
          </div>
          <div>
            <h3 className="font-black">Explore</h3>
            <div className="mt-4 grid gap-3 text-white/62">{navItems.map((item) => <a key={item.href} href={item.href} className="hover:text-white">{item.label}</a>)}</div>
          </div>
          <div>
            <h3 className="font-black">Social</h3>
            <div className="mt-4 flex gap-3">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/8 hover:bg-white/14" aria-label="WhatsApp"><MessageCircle className="h-5 w-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/8 hover:bg-white/14" aria-label="Instagram"><Camera className="h-5 w-5" /></a>
              <a href="mailto:hello@pdfashiongifts.com" className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/8 hover:bg-white/14" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
            <p className="mt-8 text-sm text-white/42">© {new Date().getFullYear()} PD Fashion. Crafted with ❤️ by Noob-Devs</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
