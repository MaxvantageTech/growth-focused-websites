import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PhoneCall, CalendarCheck, RefreshCcw, Zap, Workflow, Clock, PhoneMissed, Timer, Users,
  Globe, Search, MousePointerClick, TrendingUp, ShieldCheck, Check, AudioLines,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { roi } from "@/lib/roi";
import founder from "@/assets/founder.png.asset.json";

const CAL = "https://cal.com/kudrotey-khuda-xpfuwm/15min";
const TITLE = "Maxvantage Tech | AI Voice for UK Real Estate Agencies";
const DESC =
  "Book 25% more valuations and viewings from your existing calls and web enquiries. AI that answers every call for UK estate agents, 24/7.";

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

function CTA({ className, invert = false }: { className?: string; invert?: boolean }) {
  const label = (
    <>
      Book a Free Call
      <CalendarCheck className="h-4 w-4" />
    </>
  );
  if (invert) {
    return (
      <Button asChild size="xl" className={`bg-white text-primary shadow-none hover:bg-white/90 ${className ?? ""}`}>
        <a href="#book">{label}</a>
      </Button>
    );
  }
  return (
    <Button asChild variant="gold" size="xl" className={className}>
      <a href="#book">{label}</a>
    </Button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
      {children}
    </p>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <span className="flex items-center gap-2 text-lg font-extrabold text-primary">
          <AudioLines className="h-5 w-5" aria-hidden />
          Maxvantage Tech
        </span>
        <Button asChild variant="gold" size="sm" className="h-10 px-4">
          <a href="#book">Book a Free Call</a>
        </Button>
      </div>
    </header>
  );
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

function ROI() {
  const [calls, setCalls] = useState(10);
  const [fee, setFee] = useState(3500);
  const [win, setWin] = useState(10);
  const r = roi(calls, fee, win);
  const rows = [
    { label: "Missed calls & enquiries per day", v: calls, set: setCalls, min: 1, max: 40, step: 1, f: (n: number) => String(n) },
    { label: "Average fee per sale", v: fee, set: setFee, min: 1000, max: 10000, step: 250, f: fmt },
    { label: "Appointments that become instructions", v: win, set: setWin, min: 5, max: 40, step: 1, f: (n: number) => `${n}%` },
  ];
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl leading-tight md:text-5xl">See Your Potential ROI</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-10 rounded-2xl border bg-card p-8 shadow-soft">
            {rows.map((x) => (
              <div key={x.label}>
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{x.label}</label>
                  <span className="text-xl font-bold text-primary">{x.f(x.v)}</span>
                </div>
                <Slider value={[x.v]} min={x.min} max={x.max} step={x.step} onValueChange={([n]) => x.set(n ?? x.v)} />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-accent p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Potential Extra Fee Income Per Month</p>
            <p className="mt-4 text-5xl leading-none text-primary md:text-6xl">{fmt(r.revenue)}</p>
            <ul className="mt-6 space-y-1 text-sm text-foreground/80">
              <li>{r.recovered} calls answered instead of missed a month</li>
              <li>{Math.round(r.appointments)} booked appointments (25%)</li>
              <li>{r.instructions.toFixed(1)} extra instructions won ({win}%)</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-foreground/60">
              Calls per day × 30 days × 25% booked × your win rate × your average fee. An estimate, not a guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Book() {
  return (
    <section id="book" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl leading-tight md:text-5xl">Book a Free Call</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">Pick a time that suits you. 15 minutes, no obligation.</p>
        <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-soft">
          <iframe src={`${CAL}?embed=true&layout=month_view&theme=light&brandColor=%232f74c0`} title="Book a free call" className="h-[720px] w-full bg-card" loading="lazy" />
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
      <section className="bg-hero-glow px-5 pb-20 pt-32 md:pt-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center animate-fade-up">
            <Eyebrow>For UK Estate Agency Owners</Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.08] md:text-6xl">
              Never Miss a <span className="text-primary">Valuation Enquiry</span> Again
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Our AI Voice System answers 100% of your calls, qualifies leads, and books valuations and viewings 24/7, so your agents can focus on closing deals. Stop sending potential fees to voicemail.
            </p>
            <ul className="mt-8 space-y-3 text-left">
              {[
                "Capture new seller & buyer enquiries, 24/7",
                "Book 25% more valuations and viewings",
                "New web leads called back within 60 seconds",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <CTA className="mt-10" />
            <p className="mt-4 flex max-w-md items-start gap-2 text-left text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> Measurable increase in booked appointments within 60 days or the setup fee is refunded.
            </p>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-cream px-5 py-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-8">
          {[
            { i: ShieldCheck, t: "Privacy-first, UK GDPR compliant" },
            { i: Workflow, t: "Fits your CRM & calendar workflow" },
            { i: AudioLines, t: "A natural, human-like voice" },
          ].map(({ i: I, t }) => (
            <div key={t} className="flex items-center justify-center gap-3 text-sm font-medium">
              <I className="h-5 w-5 shrink-0 text-primary" aria-hidden /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* Pain */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>The leak in your pipeline</Eyebrow>
            <h2 className="mt-5 uppercase leading-[1.1] text-3xl md:text-5xl">
              Every missed call is a fee your competitor banks.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { i: PhoneMissed, t: "After-hours voicemail", d: "A motivated seller calls your office after hours, hits voicemail, and instructs the agency that answered their next call." },
              { i: Timer, t: "Slow speed-to-lead", d: "A hot Rightmove or Zoopla enquiry comes in, but your agents are tied up. By the time someone calls back, the lead has already booked valuations with two other agents." },
              { i: Users, t: "Overloaded front desk", d: "Your front desk is overwhelmed during peak hours, juggling transfers and taking messages. High-value calls from potential clients slip through the cracks." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-7 shadow-soft">
                <I className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-xl">{t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center text-3xl leading-tight md:text-5xl">Capture and Convert Every Lead in 3 Steps</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { i: PhoneCall, t: "24/7 Call & Lead Capture", d: "Our AI answers every call instantly, any time of day. It also calls your new web leads in under 60 seconds. No more missed opportunities." },
              { i: CalendarCheck, t: "Qualify & Book", d: "The AI asks qualifying questions (e.g., \"Do you have a mortgage in principle?\") and books viewings or valuation appointments directly into your agents' calendars." },
              { i: RefreshCcw, t: "Sync to Your CRM", d: "Every interaction is automatically logged in your CRM with call notes and appointment details. Your agents get qualified, booked meetings teed up for them." },
            ].map(({ i: I, t, d }, n) => (
              <div key={t}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><I className="h-5 w-5" /></span>
                  <span className="text-sm font-bold uppercase tracking-wider text-primary">Step {n + 1}</span>
                </div>
                <h3 className="mt-5 text-xl">{t}</h3>
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
          <h2 className="mx-auto max-w-3xl text-center text-3xl leading-tight md:text-5xl">Everything Your Real Estate Agency Needs to Automate Lead Capture</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { i: Zap, t: "Instant AI Call-Back", d: "Engage new web leads via phone call within seconds, before they can contact another agent." },
              { i: Workflow, t: "Automated CRM Workflow", d: "Sync call data, notes, and appointments to your existing CRM without manual data entry." },
              { i: Clock, t: "24/7 Appointment Setting", d: "Fill your agents' calendars with qualified buyer viewings and vendor valuations, even while your office is closed." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-2xl border bg-card p-7 shadow-soft">
                <I className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-xl">{t}</h3>
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
            <h2 className="mt-5 leading-[1.1] text-3xl md:text-5xl">Your website should win instructions. <span className="text-primary">Not just look nice.</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Most real estate agency websites are online brochures. Sellers land, browse, and leave to request a valuation elsewhere. You paid for that traffic. Your competitor got the instruction.
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
              { i: TrendingUp, t: "Lower cost per lead", d: "Convert more of the traffic you already pay for. Spend less on Rightmove and Zoopla." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary"><I className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-sans text-base font-bold">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-6xl rounded-2xl bg-accent p-10 text-center md:p-14">
          <Globe className="mx-auto h-7 w-7 text-primary" />
          <h3 className="mt-4 text-2xl md:text-4xl">Ready to capture every lead?</h3>
          <CTA className="mt-8" />
        </div>
      </section>

      {/* About */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[auto_1fr] md:items-center">
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="absolute -inset-3 -z-0 rounded-3xl bg-accent" />
            <img src={founder.url} alt="Kudrotey Khuda, founder of Maxvantage Tech" className="relative aspect-square w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
          </div>
          <div>
            <Eyebrow>About Maxvantage Tech</Eyebrow>
            <h2 className="mt-5 leading-[1.1] text-3xl md:text-5xl">We grow real estate agencies. That's the whole job.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I'm Kudrotey Khuda, founder of Maxvantage Tech. We're a growth partner for real estate agencies, not a freelancer you hand a task list to.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We measure ourselves on your results: more booked appointments, more instructions won, fewer hours lost to admin. The AI voice system and the website are just how we get there.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
              {[["25%", "more appointments"], ["60s", "speed-to-lead"], ["24/7", "every call answered"]].map(([n, l]) => (
                <div key={l}>
                  <p className="text-3xl font-extrabold text-primary">{n}</p>
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
          <h2 className="text-center text-3xl leading-tight md:text-5xl">Your Questions, Answered</h2>
          <Accordion type="single" collapsible className="mt-12">
            {[
              ["Will this sound like a cheap robocall to my clients?", "No. We use the most advanced conversational AI with a natural, human-like voice. It's designed to provide a professional and helpful first impression that reflects the quality of your agency."],
              ["Does this integrate with our CRM?", "Yes. We have pre-built integrations for leading UK property software including Reapit, Alto, Street, Jupix and more. We handle the technical setup to ensure data flows correctly."],
              ["How long does it take to set up?", "The basic setup can be completed in just a few days with minimal involvement needed from you. Our goal is to get you capturing more leads within the first couple of weeks."],
              ["Is our client data secure?", "Absolutely. We operate with strict data privacy protocols. All client information is handled securely in line with UK GDPR and is only used for the purposes of qualifying and booking appointments for your agency."],
              ["Is this meant to replace my front desk staff or agents?", "Not at all. It's a tool to make them more effective. It handles the repetitive, time-consuming task of lead capture and qualification, freeing up your skilled agents and staff to focus on high-value activities like negotiations, client relationships, and closing deals."],
            ].map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary px-5 py-24 text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-tight md:text-5xl">Stop Losing Fees to Your Voicemail</h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
            Every day you wait is another day of missed calls and lost opportunities. Let's build a system that turns every phone call and web lead into a booked appointment for your agents. Book a free, no-obligation call to see exactly how this can work for your agency.
          </p>
          <CTA invert className="mt-10" />
        </div>
      </section>

      <Book />

      <footer className="border-t px-5 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Maxvantage Tech. All rights reserved.
      </footer>
    </div>
  );
}
