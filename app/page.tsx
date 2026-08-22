"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Watch,
  Heart,
  Activity,
  Smartphone,
  Droplets,
  Sun,
  Battery,
  Wifi,
  ArrowRight,
  ChevronDown,
  Zap,
  Shield,
  Compass,
} from "lucide-react";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <Watch className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <span className="text-white font-medium tracking-tight">ORION</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#666666] hover:text-white transition-colors">
              Features
            </a>
            <a href="#specs" className="text-sm text-[#666666] hover:text-white transition-colors">
              Specs
            </a>
            <a href="#gallery" className="text-sm text-[#666666] hover:text-white transition-colors">
              Gallery
            </a>
          </div>

          <Button className="bg-white text-[#0A0A0A] hover:bg-[#E8E8E8] text-sm font-medium px-6">
            Pre-Order
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageScale = 1 + Math.min(scrollY / 2000, 0.3);
  const imageRotate = Math.min(scrollY / 20, 15);
  const textOpacity = Math.max(1 - scrollY / 400, 0);
  const imageOpacity = Math.min(0.3 + scrollY / 500, 1);

  return (
    <section className="relative min-h-[200vh] bg-[#0A0A0A] overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/[0.01] rounded-full blur-2xl" />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-100"
          style={{
            transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
            opacity: imageOpacity,
          }}
        >
          <div className="relative w-[500px] h-[500px] lg:w-[700px] lg:h-[700px]">
            <Image
              src="/images/hero.png"
              alt="Orion X Smartwatch"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0A0A0A]/50" />
          </div>
        </div>

        <div
          className="relative z-20 text-center px-6 transition-opacity duration-300"
          style={{ opacity: textOpacity }}
        >
          <Badge variant="outline" className="mb-6 border-white/10 text-[#666666] bg-white/5">
            Introducing
          </Badge>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6">
            Orion X
          </h1>
          <p className="text-xl md:text-2xl text-[#666666] max-w-xl mx-auto mb-10 font-light">
            The future on your wrist. Precision engineering meets limitless capability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-[#0A0A0A] hover:bg-[#E8E8E8] px-8 h-14 text-base font-medium">
              Pre-Order Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 px-8 h-14 text-base"
            >
              Watch Film
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#666666]" />
        </div>
      </div>
    </section>
  );
}

function FeaturesBento() {
  const { ref, isInView } = useInView(0.2);

  const features = [
    {
      icon: Heart,
      title: "Cardiac Intelligence",
      description: "24/7 heart rhythm analysis with medical-grade ECG and blood oxygen monitoring.",
      size: "large",
    },
    {
      icon: Activity,
      title: "Motion Mastery",
      description: "Tracks 150+ workouts with real-time biomechanical feedback.",
      size: "medium",
    },
    {
      icon: Droplets,
      title: "100m Water Resistant",
      description: "Dive into any adventure. Engineered for ocean depths.",
      size: "medium",
    },
    {
      icon: Battery,
      title: "7-Day Battery",
      description: "A week of power on a single charge. Fast-charge to 80% in 45 minutes.",
      size: "small",
    },
    {
      icon: Wifi,
      title: "Always Connected",
      description: "5G, Wi-Fi 6E, and satellite SOS for global connectivity.",
      size: "small",
    },
  ];

  return (
    <section id="features" className="py-32 px-6 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#666666] uppercase tracking-[0.3em] text-sm mb-4">Capabilities</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Beyond Measurement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`md:col-span-2 md:row-span-2 group relative rounded-3xl bg-[#141414] p-8 lg:p-12 overflow-hidden transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <Image src="/images/feature.png" alt="Feature" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
                {features[0].title}
              </h3>
              <p className="text-[#666666] text-lg max-w-md">{features[0].description}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#141414] to-transparent" />
          </div>

          {features.slice(1, 3).map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative rounded-3xl bg-[#141414] p-8 overflow-hidden transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-[#666666] text-sm">{feature.description}</p>
            </div>
          ))}

          {features.slice(3).map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative rounded-3xl bg-[#141414] p-6 overflow-hidden transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-[#666666] text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  const { ref, isInView } = useInView(0.3);

  const stats = [
    { value: "1.9", unit: "mm", label: "Ultra-thin profile" },
    { value: "500", unit: "nits", label: "Peak brightness" },
    { value: "60", unit: "Hz", label: "Always-on display" },
    { value: "64", unit: "GB", label: "Onboard storage" },
  ];

  return (
    <section id="specs" className="py-24 bg-[#141414]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xl text-[#666666]">{stat.unit}</span>
              </div>
              <p className="text-[#666666] text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryGrid() {
  const { ref, isInView } = useInView(0.2);

  const features = [
    { icon: Zap, title: "Instant Wake", desc: "Raise to wake in milliseconds" },
    { icon: Shield, title: "Titanium Frame", desc: "Aerospace-grade durability" },
    { icon: Compass, title: "Precision GPS", desc: "Dual-frequency L1/L5 tracking" },
    { icon: Sun, title: "Adaptive Display", desc: "2000 nits outdoor visibility" },
    { icon: Smartphone, title: "Seamless Sync", desc: "Works with iOS and Android" },
    { icon: Activity, title: "Sleep Insights", desc: "REM and deep sleep stages" },
  ];

  return (
    <section id="gallery" className="py-32 px-6 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#666666] uppercase tracking-[0.3em] text-sm mb-4">Craftsmanship</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Every Detail Matters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className={`lg:col-span-2 relative h-80 rounded-3xl overflow-hidden group transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Image
              src="/images/hero.png"
              alt="Orion X detail"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-xl font-semibold">Ceramic back. Sapphire crystal.</p>
              <p className="text-[#666666]">Built to endure everything you do.</p>
            </div>
          </div>

          {features.slice(0, 4).map((feature, i) => (
            <div
              key={feature.title}
              className={`relative h-80 rounded-3xl bg-[#141414] p-8 flex flex-col justify-end group overflow-hidden transition-all duration-700 hover:bg-[#1a1a1a] ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-[#666666] text-sm">{feature.desc}</p>
            </div>
          ))}

          <div
            className={`relative h-80 rounded-3xl overflow-hidden group transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Image
              src="/images/feature.png"
              alt="Orion X band"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-lg font-semibold">Interchangeable bands</p>
              <p className="text-[#666666] text-sm">Sport, leather, or link bracelet.</p>
            </div>
          </div>

          {features.slice(4).map((feature, i) => (
            <div
              key={feature.title}
              className={`relative h-80 rounded-3xl bg-[#141414] p-8 flex flex-col justify-end group overflow-hidden transition-all duration-700 hover:bg-[#1a1a1a] ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(i + 6) * 100}ms` }}
            >
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-[#666666] text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFull() {
  const { ref, isInView } = useInView(0.3);

  return (
    <section className="py-32 px-6 bg-[#141414] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Badge variant="outline" className="mb-6 border-white/10 text-[#666666] bg-white/5">
          Limited Release
        </Badge>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          Experience Orion X
        </h2>
        <p className="text-xl text-[#666666] max-w-2xl mx-auto mb-10">
          Pre-order now and be among the first to wear the future. Ships worldwide starting Q4 2026.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-white text-[#0A0A0A] hover:bg-[#E8E8E8] px-10 h-14 text-base font-medium">
            Pre-Order Orion X
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="text-[#666666] text-sm">Starting from $799</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Watch className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <span className="text-white font-medium text-lg tracking-tight">ORION</span>
            </div>
            <p className="text-[#666666] max-w-sm">
              Precision engineering for those who refuse to compromise. The Orion X represents the
              pinnacle of wearable technology.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#specs" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Specifications
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Compare Models
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-[#666666] text-sm mb-4 md:mb-0">
            © 2026 Orion Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-[#666666] hover:text-white transition-colors text-sm">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Nav />
      <Hero />
      <FeaturesBento />
      <StatsBanner />
      <GalleryGrid />
      <CTAFull />
      <Footer />
    </main>
  );
}
