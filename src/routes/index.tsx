import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PhoneCall, CalendarCheck, RefreshCcw, Zap, Workflow, Clock, PhoneMissed, Timer, Users,
  Globe, Search, MousePointerClick, TrendingUp, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import founder from "@/assets/founder.png.asset.json";

const CAL = "https://cal.com/kudrotey-khuda-xpfuwm/15min";
const TITLE = "Maxvantage Tech | AI Voice for Real Estate Agencies";
const DESC =
  "Book 25% more appointments from your existing call volume and web leads. AI that answers every call, qualifies leads and books viewings 24/7.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function CTA({ className }: { className?: string }) {
  return (
    <Button asChild variant="gold" size="xl" className={className}>
      <a href={CAL} target="_blank" rel="noopener noreferrer">Book Your Free Assessment</a>
    </Button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{children}</p>;
}

function Header() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setShow(y < 80 || y < last);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <span className="font-display text-lg font-semibold text-primary">Maxvantage Tech</span>
        <Button asChild variant="gold" size="sm" className="h-10 px-4">
          <a href={CAL} target="_blank" rel="noopener noreferrer">Book Your Free Assessment</a>
        </Button>
      </div>
    </header>
  );
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

function ROI() {
  const [calls, setCalls] = useState(15);
  const [gci, setGci] = useState(8000);
  const [cv, setCv] = useState(250);
  const monthly = calls * 30 * 0.25 * gci;
  const rows = [
    { label: "Missed/Unanswered Calls Per Day", v: calls, set: setCalls, min: 5, max: 50, step: 1, f: (n: number) => String(n) },
    { label: "Average GCI Per Transaction", v: gci, set: setGci, min: 1000, max: 10000, step: 500, f: fmt },
    { label: "Average Customer Value", v: cv, set: setCv, min: 100, max: 1000, step: 50, f: fmt },
  ];
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold text-primary md:text-5xl">See Your Potential ROI</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-10 rounded-2xl border bg-card p-8 shadow-soft">
            {rows.map((r) => (
              <div key={r.label}>
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{r.label}</label>
                  <span className="font-display text-xl font-semibold text-primary">{r.f(r.v)}</span>
                </div>
                <Slider value={[r.v]} min={r.min} max={r.max} step={r.step} onValueChange={([x]) => r.set(x ?? r.v)} />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-navy p-8 text-navy-foreground shadow-soft md:p-12">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">Potential Additional GCI Per Month</p>
            <p className="mt-4 font-display text-5xl font-semibold md:text-6xl">{fmt(monthly)}</p>
            <p className="mt-6 text-sm leading-relaxed text-navy-foreground/70">
              This is an estimate of potential revenue recovered by booking 25% more appointments from missed calls and web leads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="bg-hero-glow px-5 pb-24 pt-36 md:pt-44">
        <div className="mx-auto max-w-3xl animate-fade-up text-center">
          <Eyebrow>For Broker-Owners</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-primary md:text-7xl">
            Never Miss a Listing Lead Again
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our AI Voice System answers 100% of your calls, qualifies leads, and books appointments 24/7, so your agents can focus on closing deals. Stop sending potential commissions to voicemail.
          </p>
          <CTA className="mt-10" />
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold" /> Measurable increase in booked appointments within 60 days or the setup fee is refunded.
          </p>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Eyebrow>The leak in your pipeline</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold text-primary md:text-5xl">Every missed call is a commission your competitor banks.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { i: PhoneMissed, t: "After-hours voicemail", d: "A motivated seller calls your office after hours, hits voicemail, and lists with the agency that answered their next call." },
              { i: Timer, t: "Slow speed-to-lead", d: "A hot Zillow lead comes in, but your agents are tied up. By the time someone calls back, the lead has already scheduled three showings with other agents." },
              { i: Users, t: "Overloaded front desk", d: "Your front desk is overwhelmed during peak hours, juggling transfers and taking messages. High-value calls from potential clients slip through the cracks." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-7 shadow-soft">
                <I className="h-6 w-6 text-destructive" />
                <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold text-primary md:text-5xl">Capture and Convert Every Lead in 3 Steps</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { i: PhoneCall, t: "24/7 Call & Lead Capture", d: "Our AI answers every call instantly, any time of day. It also calls your new web leads in under 60 seconds. No more missed opportunities." },
              { i: CalendarCheck, t: "Qualify & Book", d: "The AI asks qualifying questions (e.g., \"Are you pre-approved?\") and books showings or listing appointments directly into your agents' calendars." },
              { i: RefreshCcw, t: "Sync to Your CRM", d: "Every interaction is automatically logged in your brokerage's CRM with call notes and appointment details. Your agents get qualified, booked meetings teed up for them." },
            ].map(({ i: I, t, d }, n) => (
              <div key={t}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary"><I className="h-5 w-5" /></span>
                  <span className="font-display text-sm text-gold">Step {n + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ROI />

      {/* Included */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold text-primary md:text-5xl">Everything Your Brokerage Needs to Automate Lead Capture</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { i: Zap, t: "Instant AI Call-Back", d: "Engage new web leads via phone call within seconds, before they can contact another agent." },
              { i: Workflow, t: "Automated CRM Workflow", d: "Sync call data, notes, and appointments to your existing CRM without manual data entry." },
              { i: Clock, t: "24/7 Appointment Setting", d: "Fill your agents' calendars with qualified buyer and seller appointments, even while your office is closed." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-7 shadow-soft">
                <I className="h-6 w-6 text-gold" />
                <h3 className="mt-5 text-xl font-semibold text-primary">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Websites */}
      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Websites that book appointments</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold text-primary md:text-5xl">Your website should win listings. Not just look nice.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Most brokerage sites are online brochures. Sellers land, browse, and leave to request a valuation elsewhere. You paid for that traffic. Your competitor got the instruction.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We build sites designed around one number: valuations and viewings booked. Every page feeds your AI Voice System and your CRM.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { i: MousePointerClick, t: "More valuation requests", d: "Clear offers and instant booking turn visitors into seller appointments." },
              { i: Search, t: "Found by local sellers", d: "Built to rank for the area searches your next vendor is typing today." },
              { i: Zap, t: "Leads called in 60 seconds", d: "Every form submit triggers an instant AI call-back, before they shop around." },
              { i: TrendingUp, t: "Lower cost per lead", d: "Convert more of the traffic you already pay for. Spend less on portals." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary"><I className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-primary">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-6xl rounded-2xl bg-navy p-10 text-center text-navy-foreground md:p-14">
          <Globe className="mx-auto h-7 w-7 text-gold" />
          <h3 className="mt-4 text-2xl font-semibold md:text-4xl">Ready to capture every lead?</h3>
          <CTA className="mt-8" />
        </div>
      </section>

      {/* About */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative">
            <div className="absolute -inset-3 -z-0 rounded-3xl bg-gold/30" />
            <img src={founder.url} alt="Kudrotey Khuda, founder of Maxvantage Tech" className="relative aspect-square w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
          </div>
          <div>
            <Eyebrow>About Maxvantage Tech</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold text-primary md:text-5xl">We grow brokerages. That's the whole job.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I'm Kudrotey Khuda, founder of Maxvantage Tech. We're a growth partner for real estate agencies, not a freelancer you hand a task list to.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We measure ourselves on your results: more booked appointments, more instructions won, fewer hours lost to admin. The AI voice system and the website are just how we get there.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
              {[["25%", "more appointments"], ["60s", "speed-to-lead"], ["24/7", "every call answered"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-semibold text-primary">{n}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-semibold text-primary md:text-5xl">Your Questions, Answered</h2>
          <Accordion type="single" collapsible className="mt-12">
            {[
              ["Will this sound like a cheap robocall to my clients?", "No. We use the most advanced conversational AI with a natural, human-like voice. It's designed to provide a professional and helpful first impression that reflects the quality of your brokerage."],
              ["Does this integrate with our brokerage's CRM?", "Yes. We have pre-built integrations for major real estate CRMs including Follow Up Boss, LionDesk, BoomTown, and more. We handle the technical setup to ensure data flows correctly."],
              ["How long does it take to set up?", "The basic setup can be completed in just a few days with minimal involvement needed from you. Our goal is to get you capturing more leads within the first couple of weeks."],
              ["Is our client data secure?", "Absolutely. We operate with strict data privacy protocols. All client information is handled securely and is only used for the purposes of qualifying and booking appointments for your agency."],
              ["Is this meant to replace my front desk staff or agents?", "Not at all. It's a tool to make them more effective. It handles the repetitive, time-consuming task of lead capture and qualification, freeing up your skilled agents and staff to focus on high-value activities like negotiations, client relationships, and closing deals."],
            ].map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-primary">{q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy px-5 py-24 text-navy-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">Stop Losing Commissions to Your Voicemail</h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-foreground/75">
            Every day you wait is another day of missed calls and lost opportunities. Let's build a system that turns every phone call and web lead into a booked appointment for your agents. Book a free, no-obligation assessment to see exactly how this can work for your brokerage.
          </p>
          <CTA className="mt-10" />
        </div>
      </section>

      <footer className="border-t px-5 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Maxvantage Tech. All rights reserved.
      </footer>
    </div>
  );
}
