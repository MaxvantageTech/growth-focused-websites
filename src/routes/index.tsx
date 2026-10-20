import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PhoneCall, CalendarCheck, RefreshCcw, Zap, Workflow, PhoneMissed, Timer, Users,
  Search, MousePointerClick, TrendingUp, ShieldCheck, Check, AudioLines,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { roi } from "@/lib/roi";
import founder from "@/assets/founder.png.asset.json";

const CAL = "https://cal.com/kudrotey-khuda-xpfuwm/15min";
const TITLE = "Maxvantage Tech | AI Lead Capture for UK Estate Agents";
const DESC =
  "Win more instructions from the calls you already get. AI that answers every call and rings back every portal lead in under 60 seconds, 24/7.";

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
      Get My Free Missed-Call Audit
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
          <a href="#book">Free Missed-Call Audit</a>
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
        <h2 className="text-center text-3xl leading-tight md:text-5xl">How much are missed calls costing you right now?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Fees you're currently handing to competitors, every month</p>
            <p className="mt-4 text-5xl leading-none text-primary md:text-6xl">{fmt(r.revenue)}</p>
            <ul className="mt-6 space-y-1 text-sm text-foreground/80">
              <li>{r.recovered} calls answered instead of missed a month</li>
              <li>{Math.round(r.appointments)} booked appointments (25%)</li>
              <li>{r.instructions.toFixed(1)} extra instructions won ({win}%)</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-foreground/60">
              Assumes 25% of answered calls book an appointment. Adjust the sliders to match your office. An estimate, not a guarantee.
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
        <h2 className="text-center text-3xl leading-tight md:text-5xl">Get Your Free Missed-Call Audit</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">Pick a time that suits you. 15 minutes, no obligation.</p>
        <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-soft">
          <iframe src={`${CAL}?embed=true&layout=month_view&theme=light&brandColor=%232f74c0`} title="Book your free missed-call audit" className="h-[720px] w-full bg-card" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Card({ i: I, t, d }: { i: React.ComponentType<{ className?: string }>; t: string; d: string }) {
  return (
    <div className="rounded-2xl border bg-card p-7 shadow-soft">
      <I className="h-6 w-6 text-primary" />
      <h3 className="mt-5 text-xl">{t}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="bg-hero-glow px-5 pb-20 pt-32 md:pt-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center animate-fade-up">
          <Eyebrow>For UK Estate Agency Owners & Branch Directors</Eyebrow>
          <h1 className="mt-6 text-4xl leading-[1.08] md:text-6xl">
            Win More <span className="text-primary">Instructions</span> From the Calls You're Already Getting
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our AI answers every call and rings back every Rightmove, Zoopla and website lead in under 60 seconds, day, night and weekends. Then it books the valuation straight into your diary. No new hires. No new CRM.
          </p>
          <CTA className="mt-10" />
          <p className="mt-4 flex max-w-md items-start gap-2 text-left text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> 10 extra booked valuations or viewings in 60 days, or your setup fee back and we keep working free until you get them.
          </p>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-cream px-5 py-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-8">
          {[
            { i: ShieldCheck, t: "Privacy-first, UK GDPR compliant" },
            { i: Workflow, t: "Fits your CRM & diary" },
            { i: AudioLines, t: "A natural, human-like voice" },
          ].map(({ i: I, t }) => (
            <div key={t} className="flex items-center justify-center gap-3 text-sm font-medium">
              <I className="h-5 w-5 shrink-0 text-primary" aria-hidden /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>The leak in your pipeline</Eyebrow>
            <h2 className="mt-5 leading-[1.1] text-3xl md:text-5xl">You don't have a lead problem. You have a leak.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Every unanswered call is a vendor who instructs whoever picks up next.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card i={PhoneMissed} t="6:45pm. Voicemail. Instruction lost." d="A motivated seller rings after you've closed, hits voicemail, and books a valuation with the agent who answered their next call." />
            <Card i={Timer} t="The 2-hour call-back that's 1 hour 59 minutes too late." d="A hot Rightmove enquiry lands while your negotiators are out on viewings. By the time anyone rings back, they've booked two other agents." />
            <Card i={Users} t="Saturday rush, Monday regret." d="Your busiest hours are when the phones ring most and get answered least. The highest-value calls slip through while your team juggles transfers and messages." />
          </div>
        </div>
      </section>

      {/* Time saving */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="leading-[1.1] text-3xl md:text-5xl">Give your negotiators their afternoons back</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              No more chasing call-backs, copying notes into the CRM, or diary ping-pong with vendors. The AI qualifies, books and logs every call, so your team spends its time where fees are actually won: in front of sellers.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              "Every call answered, without adding headcount",
              "Notes and appointments logged to your CRM automatically",
              "Your team only speaks to people who've already booked",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl border bg-card p-5 shadow-soft">
                <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center text-3xl leading-tight md:text-5xl">From ring to booked valuation in 3 steps, while you sleep</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { i: PhoneCall, t: "Every call answered, every lead rung back", d: "The AI picks up instantly, 24/7, and calls new portal and website leads in under 60 seconds, before they ring another agent." },
              { i: CalendarCheck, t: "Qualified and booked", d: "It asks the questions your best negotiator would (\"Are you selling to buy?\", \"Do you have a mortgage in principle?\") and books valuations and viewings straight into your diary." },
              { i: RefreshCcw, t: "Logged in your CRM", d: "Call notes and appointment details sync automatically. Your agents arrive at a booked, qualified meeting with the context already there." },
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

      {/* Offer stack */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl leading-tight md:text-5xl">Introducing <span className="text-primary">The Instruction Engine</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">Everything you need to turn every call and web lead into a booked appointment, done for you.</p>
          <div className="mt-12 overflow-hidden rounded-2xl border bg-card shadow-soft">
            <div className="hidden grid-cols-[1fr_1.6fr] gap-6 border-b bg-accent px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary md:grid">
              <span>What you get</span><span>What it does for you</span>
            </div>
            {[
              ["24/7 AI receptionist", "Every call answered, evenings and weekends included. No more fees lost to voicemail."],
              ["60-second AI call-back", "Every Rightmove, Zoopla and website lead rung back before they contact another agent."],
              ["Direct diary booking + CRM sync", "Valuations and viewings land in your diary, fully logged. Zero admin for your team."],
              ["Bonus 1: Missed-Call Audit", "We mystery-shop your office and show you exactly how many calls, and fees, you're losing today."],
              ["Bonus 2: Valuation-booking website", "A site built to rank in your patch and turn browsing sellers into booked valuations."],
              ["Bonus 3: Monthly Fee Report", "See exactly which appointments and instructions the system won for you."],
              ["Done-for-you setup", "We build, connect and test everything. Your team doesn't lift a finger."],
            ].map(([a, b]) => (
              <div key={a} className="grid gap-1 border-b px-6 py-5 last:border-b-0 md:grid-cols-[1fr_1.6fr] md:gap-6">
                <p className="flex items-start gap-2 font-bold"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{a}</p>
                <p className="text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-semibold">One extra instruction a month typically covers the whole system. Everything after that is profit.</p>
          <div className="mt-8 flex justify-center"><CTA /></div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary bg-accent p-10 text-center md:p-14">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-3xl md:text-5xl">The Fee-Back Guarantee</h2>
          <p className="mt-6 text-lg leading-relaxed">
            If we don't book you at least 10 extra valuations or viewings in your first 60 days, we refund your full setup fee and keep working for free until we do. You take no risk. We take all of it.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">"Extra" means appointments booked by the AI, shown in your Monthly Fee Report.</p>
        </div>
      </section>

      <ROI />

      {/* Websites */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Websites that book valuations</Eyebrow>
            <h2 className="mt-5 leading-[1.1] text-3xl md:text-5xl">Your website should win instructions, <span className="text-primary">not just look nice.</span></h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Most estate agency websites are online brochures. Sellers land, browse, and leave to request a valuation elsewhere. You paid for that traffic; your competitor got the instruction.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We build sites around one number: valuations and viewings booked. Every enquiry feeds straight into your AI call-back and your CRM.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { i: MousePointerClick, t: "More valuation requests", d: "Clear offers and instant booking turn visitors into seller appointments." },
              { i: Search, t: "Found by local sellers", d: "Built to rank for the searches your next vendor is typing today." },
              { i: Zap, t: "Rung back in 60 seconds", d: "Every form triggers an instant AI call-back, before they shop around." },
              { i: TrendingUp, t: "Lower cost per lead", d: "Convert more of the traffic you already pay for, and lean less on the portals." },
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
      </section>

      {/* About */}
      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[auto_1fr] md:items-center">
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="absolute -inset-3 -z-0 rounded-3xl bg-accent" />
            <img src={founder.url} alt="Kudrotey Khuda, founder of Maxvantage Tech" className="relative aspect-square w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
          </div>
          <div>
            <Eyebrow>About Maxvantage Tech</Eyebrow>
            <h2 className="mt-5 leading-[1.1] text-3xl md:text-5xl">We grow estate agencies. That's the whole job.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I'm Kudrotey Khuda, founder of Maxvantage Tech. We're a growth partner for estate agencies, not a freelancer you hand a task list to.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We measure ourselves on your results: more booked appointments, more instructions won, fewer hours lost to admin. The AI and the website are just how we get there.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
              {[["<60s", "call-back"], ["24/7", "every call answered"], ["0", "new hires needed"]].map(([n, l]) => (
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
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl leading-tight md:text-5xl">Your Questions, Answered</h2>
          <Accordion type="single" collapsible className="mt-12">
            {[
              ["Will this sound like a cheap robocall to my clients?", "No. It speaks naturally, uses your agency's name, and is trained on how your office handles calls. Callers get a fast, helpful answer instead of voicemail."],
              ["Does this integrate with our CRM?", "Yes. We connect it to leading UK property software such as Reapit, Alto, Street and Jupix, so every call, note and appointment logs automatically. Not on the list? Tell us on the call."],
              ["How long does it take to set up?", "Just a few days, done for you. We build, connect and test everything; your team just turns up to the booked appointments."],
              ["Is our client data secure?", "Yes. All client information is handled in line with UK GDPR and is only used to qualify and book appointments for your agency."],
              ["Is this meant to replace my front desk staff or agents?", "No. It handles the calls your team can't get to, after hours, at lunch and in the Saturday rush, so your people spend their time with sellers instead of on admin."],
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
          <h2 className="text-3xl leading-tight md:text-5xl">Every missed call is someone else's instruction.</h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
            In 15 minutes we'll show you how many calls your office missed last month and what they were worth. If it's not a fit, you still walk away with the numbers.
          </p>
          <CTA invert className="mt-10" />
          <p className="mt-4 text-sm text-primary-foreground/80">15 minutes. No obligation.</p>
        </div>
      </section>

      <Book />

      <footer className="border-t px-5 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Maxvantage Tech. All rights reserved.
      </footer>
    </div>
  );
}
