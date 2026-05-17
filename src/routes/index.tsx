import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, Target, FileSearch, BarChart3, Zap, Shield,
  ArrowRight, CheckCircle2, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { ScoreMeter } from "@/components/ScoreMeter";
import { TESTIMONIALS, FAQS } from "@/constants/dummy";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Target, title: "ATS Compatibility Score", desc: "Instant 0–100 score showing exactly how well your resume parses through major ATS systems." },
  { icon: FileSearch, title: "Keyword Gap Analysis", desc: "See which JD keywords are matched, partially matched, and completely missing from your resume." },
  { icon: BarChart3, title: "Section-by-Section Audit", desc: "Granular scores for Skills, Projects, Experience, Education, and Formatting." },
  { icon: Zap, title: "AI Improvement Roadmap", desc: "Personalized suggestions, skills to learn, and projects to build to land your target role." },
  { icon: Sparkles, title: "Job Match Engine", desc: "Compare your resume to thousands of roles and discover where you'll have the strongest match." },
  { icon: Shield, title: "Private & Secure", desc: "Your resume is encrypted, never shared, and you can delete it anytime." },
];

const steps = [
  { n: "01", title: "Upload your resume", desc: "Drop in your PDF or DOCX. We parse it like a real ATS does." },
  { n: "02", title: "Paste a job description", desc: "Add the JD you're targeting. Our AI extracts the key signals." },
  { n: "03", title: "Get your action plan", desc: "See your score, gaps, suggestions, and a learning roadmap — in seconds." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered ATS analysis
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Optimize Your Resume with{" "}
              <span className="text-gradient">AI-Powered ATS Analysis</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              75% of resumes never reach a human. SmartResume scores your resume against the exact ATS rules recruiters use, finds the gaps, and tells you what to fix — in under 30 seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="bg-gradient-primary shadow-elegant hover:opacity-95">
                <Link to="/dashboard/upload">Analyze Resume <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Get Started Free</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> No credit card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Instant results</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Private</div>
            </div>
          </div>

          {/* Score preview card */}
          <div className="animate-scale-in">
            <Card className="relative overflow-hidden border-border/60 shadow-elegant">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
              <CardContent className="p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Live ATS Preview</p>
                    <p className="mt-1 font-semibold">Senior Frontend Engineer</p>
                  </div>
                  <Badge className="bg-success/15 text-success hover:bg-success/15">Excellent</Badge>
                </div>
                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                  <ScoreMeter value={86} label="ATS Score" />
                  <div className="space-y-3">
                    {[
                      { label: "Keywords matched", value: "24 / 28", good: true },
                      { label: "Formatting", value: "Single column", good: true },
                      { label: "Missing", value: "GraphQL, Redis", good: false },
                      { label: "Read time", value: "32s", good: true },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className={r.good ? "font-medium text-foreground" : "font-medium text-destructive"}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Features</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Everything you need to beat the bots</h2>
          <p className="mt-4 text-muted-foreground">Built with the same parsing logic as the leading ATS platforms.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group transition-all hover:-translate-y-1 hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-gradient-subtle py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary">How it works</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">From upload to action plan in 30 seconds</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} className="relative overflow-hidden border-border/60">
                <CardContent className="p-6">
                  <div className="mb-3 font-display text-5xl font-bold text-gradient">{s.n}</div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Loved by job seekers</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Real results, real interviews</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="transition-all hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="mb-3 flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm text-foreground">"{t.quote}"</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gradient-subtle py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Questions, answered</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Card className="overflow-hidden border-0 bg-gradient-hero text-primary-foreground shadow-glow">
          <CardContent className="grid gap-6 p-10 md:grid-cols-[1fr_auto] md:items-center md:p-14">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to get past the bots?</h2>
              <p className="mt-2 max-w-xl opacity-90">Upload your resume and get your first ATS report — free, instantly.</p>
            </div>
            <Button size="lg" variant="secondary" asChild className="shadow-elegant">
              <Link to="/signup">Start free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
