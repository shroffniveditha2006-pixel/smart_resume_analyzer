import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, FileSearch, Gauge, Quote, ShieldCheck, Sparkles, Target, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarketingNav } from "@/components/layout/MarketingNav";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Resume Analyzer — AI-powered ATS scoring & job matching" },
      { name: "description", content: "Score your resume against ATS systems, compare to job descriptions, and get AI-driven recommendations." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Gauge, title: "ATS Score (0–100)", desc: "Instant compatibility score against modern applicant tracking systems." },
  { icon: Target, title: "Job Description Match", desc: "Paste any JD and see exactly how your resume aligns." },
  { icon: BrainCircuit, title: "AI Recommendations", desc: "Personalized, line-level suggestions to maximize impact." },
  { icon: FileSearch, title: "Skill Gap Analysis", desc: "Detect missing keywords and skills holding you back." },
  { icon: ShieldCheck, title: "Privacy First", desc: "Your resume stays yours. Encrypted in transit and at rest." },
  { icon: BarChart3, title: "Version History", desc: "Track your score evolution across every revision." },
];

const steps = [
  { n: "01", title: "Upload your resume", desc: "Drag & drop a PDF — no formatting required." },
  { n: "02", title: "Get instant analysis", desc: "ATS score, skill detection, strengths & weaknesses." },
  { n: "03", title: "Match & improve", desc: "Compare to JDs and apply AI-powered fixes." },
];

const testimonials = [
  { name: "Priya S.", role: "Product Manager @ Atlassian", quote: "Took my resume from 64 to 91 ATS in two iterations. Landed three onsite interviews the next week." },
  { name: "Marcus L.", role: "Software Engineer @ Shopify", quote: "The JD matcher is uncanny — it pointed out gaps I would have completely missed." },
  { name: "Elena R.", role: "Data Scientist @ Spotify", quote: "Clean, fast, and the recommendations actually feel written for me, not a template." },
];

const pricing = [
  { name: "Free", price: "$0", tagline: "Get started", features: ["3 analyses / month", "ATS scoring", "Basic recommendations"], cta: "Get started" },
  { name: "Pro", price: "$12", tagline: "Most popular", features: ["Unlimited analyses", "Job match engine", "AI recommendations", "Version history"], cta: "Start Pro", highlight: true },
  { name: "Enterprise", price: "Custom", tagline: "Teams & careers offices", features: ["Bulk analyses", "SSO & SCIM", "Dedicated success manager", "Custom integrations"], cta: "Contact sales" },
];

function Landing() {
  return (
    <div className="bg-background min-h-screen">
      <MarketingNav />

      {/* Hero */}
      <section className="bg-gradient-subtle relative overflow-hidden">
        <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="bg-accent text-accent-foreground mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered resume intelligence
            </span>
            <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-6xl">
              Land more interviews with a <span className="text-primary">resume that beats the ATS</span>.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg">
              Smart Resume Analyzer scores your resume in seconds, matches it against any job description, and tells you exactly what to fix.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground shadow-elegant">
                <Link to="/signup">Analyze my resume <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline"><a href="#how">See how it works</a></Button>
            </div>
            <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-2"><CheckCircle2 className="text-success h-4 w-4" /> Free to try</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="text-success h-4 w-4" /> No credit card</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="text-success h-4 w-4" /> Results in seconds</span>
            </div>
          </div>

          {/* Visual dashboard preview */}
          <div className="relative">
            <Card className="shadow-elegant overflow-hidden p-0">
              <div className="bg-gradient-hero text-primary-foreground flex items-center justify-between p-5">
                <div>
                  <p className="text-xs opacity-80">Resume score</p>
                  <p className="text-3xl font-bold">82 / 100</p>
                </div>
                <Gauge className="h-10 w-10 opacity-80" />
              </div>
              <div className="space-y-4 p-5">
                {[
                  { label: "ATS Compatibility", v: 88 },
                  { label: "Keyword Match", v: 76 },
                  { label: "Impact & Clarity", v: 81 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="font-medium">{r.v}%</span>
                    </div>
                    <div className="bg-muted h-2 overflow-hidden rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${r.v}%` }} />
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">Top recommendation</p>
                  <p className="text-sm">Quantify your leadership impact — team size, revenue, retention.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need to win the screen</h2>
          <p className="text-muted-foreground mt-3">Built for modern hiring pipelines and recruiters.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="shadow-card p-6 transition-shadow hover:shadow-lg">
                <div className="bg-accent text-accent-foreground mb-4 grid h-11 w-11 place-items-center rounded-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-sm">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-muted/40 border-y py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
            <p className="text-muted-foreground mt-3">Three steps from upload to offer-ready.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={s.n} className="relative p-6">
                <span className="text-primary text-sm font-bold">{s.n}</span>
                <div className="bg-accent text-accent-foreground mt-3 grid h-10 w-10 place-items-center rounded-lg">
                  {i === 0 ? <Upload className="h-5 w-5" /> : i === 1 ? <Gauge className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-sm">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Loved by job seekers worldwide</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <Quote className="text-primary h-6 w-6" />
              <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-5">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/40 border-y py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple, transparent pricing</h2>
            <p className="text-muted-foreground mt-3">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <Card key={p.name} className={`p-6 ${p.highlight ? "border-primary shadow-elegant ring-primary/20 ring-2" : ""}`}>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{p.tagline}</p>
                <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2"><span className="text-3xl font-bold">{p.price}</span>{p.price.startsWith("$") && p.price !== "$0" && <span className="text-muted-foreground"> /mo</span>}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />{f}</li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full" variant={p.highlight ? "default" : "outline"}>
                  <Link to="/signup">{p.cta}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-hero text-primary-foreground shadow-elegant overflow-hidden p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to fix your resume in 60 seconds?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Join thousands using Smart Resume Analyzer to land more interviews, faster.</p>
          <Button asChild size="lg" variant="secondary" className="mt-7">
            <Link to="/signup">Get started free <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>

      <MarketingFooter />
    </div>
  );
}
