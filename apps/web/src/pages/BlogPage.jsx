import blogHero from "@/assets/blog-hero.png";
import { Clock, Users, TrendingUp, MessageSquare, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";

const sections = [
  {
    icon: Clock,
    title: "Always Open, Always Selling",
    content:
      "Unlike a physical store or a human salesperson, your website never clocks out. Whether it's 2 AM on a holiday or a busy Monday morning, your website is ready to greet visitors, answer their questions, and guide them toward a purchase. It works tirelessly across time zones — capturing leads from New York to New Delhi while you sleep.",
  },
  {
    icon: Users,
    title: "It Greets Every Visitor Personally",
    content:
      "A great website uses smart design and personalization to make each visitor feel welcome. Dynamic content, tailored recommendations, and intuitive navigation create an experience that feels one-on-one — just like a skilled salesperson reading body language and adapting their pitch in real-time.",
  },
  {
    icon: MessageSquare,
    title: "It Answers Questions Instantly",
    content:
      "FAQ sections, chatbots, knowledge bases, and well-structured product pages act as your round-the-clock customer support. Visitors get the information they need without waiting on hold or sending an email. This instant gratification builds trust and keeps potential customers engaged.",
  },
  {
    icon: TrendingUp,
    title: "It Nurtures and Converts Leads",
    content:
      "Through strategically placed calls-to-action, lead magnets, email opt-ins, and landing pages, your website captures interest and funnels visitors toward conversion. It's not just a brochure — it's an active pipeline that qualifies leads, collects data, and moves prospects down the sales funnel automatically.",
  },
  {
    icon: ShieldCheck,
    title: "It Builds Credibility While You're Away",
    content:
      "Testimonials, case studies, portfolio pieces, certifications, and blog content all work together to establish authority. Every piece of social proof on your website is a silent endorsement — convincing visitors that you're the right choice, even when no one from your team is online to make the case.",
  },
  {
    icon: BarChart3,
    title: "It Tracks Everything",
    content:
      "No salesperson can remember every interaction perfectly, but your website can. Analytics tools track every click, scroll, and conversion. You know exactly where visitors come from, what they look at, and where they drop off — giving you data-driven insights to continuously improve your sales process.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-6 py-20 md:py-32 max-w-5xl">
          <div className="flex flex-col items-center text-center gap-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/80">
              <Clock className="w-4 h-4" /> Business Growth
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
              How a Website Works Like a{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--text-gradient)" }}
              >
                24×7 Salesperson
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-primary-foreground/70 leading-relaxed">
              Your website doesn't take breaks, doesn't call in sick, and never asks for a raise.
              It's the most dedicated employee you'll ever have.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50">
              <span>March 4, 2026</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="container mx-auto px-6 max-w-4xl -mt-12 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
          <img
            src={blogHero}
            alt="Illustration of a website robot salesperson greeting customers 24/7"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Intro */}
      <article className="container mx-auto px-6 max-w-3xl py-16 md:py-24">
        <div className="prose-section">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-12">
            Think about your best salesperson. They know the product inside out, handle objections
            gracefully, follow up consistently, and always close the deal. Now imagine that person
            never sleeps, never takes a vacation, and can talk to thousands of people simultaneously.
            That's exactly what a well-designed website does for your business.
          </p>

          {/* Section Cards */}
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-accent-foreground group-hover:scale-110 transition-transform duration-300">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-16 rounded-2xl p-8 md:p-12 text-center" style={{ background: "var(--hero-gradient)" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              The Bottom Line
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
              A website isn't just a digital placeholder — it's your hardest-working team member.
              It sells, supports, and scales without limits. If your website isn't working as your
              24×7 salesperson yet, it's time to rethink your digital strategy and invest in a
              presence that truly performs.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
              style={{ boxShadow: "var(--glow-orange)" }}
            >
              Get Started Today <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 max-w-3xl text-center text-sm text-muted-foreground">
          © 2026 · Built with purpose. Your website should work as hard as you do.
        </div>
      </footer>
    </div>
  );
};

export default Index;