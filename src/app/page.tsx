import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <Navbar />

    {/* Enhanced demo content with glass effects */}
    <div className="pt-24 px-6">
      <div className="max-w-4xl mx-auto space-y-20">
        <section id="hero" className="text-center py-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Welcome to TutorAI</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience personalized learning with our AI-powered tutoring platform designed for modern education.
          </p>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-xl shadow-slate-900/5">
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/10 rounded-2xl" />
            <p className="relative z-10 text-slate-700 leading-relaxed">
              Scroll down to see the navbar's smooth transformation with professional glass morphism styling and
              refined interactions.
            </p>
          </div>
        </section>

        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 tracking-tight">Why Choose TutorAI</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Learning",
                description:
                  "Adaptive AI that understands your unique learning style and adjusts content accordingly.",
              },
              {
                title: "Expert Tutors",
                description:
                  "Access to qualified tutors who provide guidance and support throughout your learning journey.",
              },
              {
                title: "Progress Tracking",
                description: "Comprehensive analytics to monitor your progress and identify areas for improvement.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="relative bg-white/25 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="relative z-10 text-xl font-semibold mb-4 text-slate-900 tracking-tight">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-12 border border-white/40 shadow-xl shadow-slate-900/5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/10 rounded-2xl" />
            <h2 className="relative z-10 text-3xl font-bold text-center mb-8 text-slate-900 tracking-tight">
              About Our Mission
            </h2>
            <p className="relative z-10 text-lg text-slate-600 text-center max-w-3xl mx-auto leading-relaxed">
              We believe that quality education should be accessible to everyone. Our platform combines cutting-edge
              AI technology with proven pedagogical methods to create personalized learning experiences that adapt to
              each student's needs, pace, and learning style.
            </p>
          </div>
        </section>

        <section id="testimonials" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 tracking-tight">What Students Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "TutorAI helped me understand complex concepts that I struggled with for months. The personalized approach made all the difference.",
                author: "Sarah Chen",
                role: "Computer Science Student",
              },
              {
                quote:
                  "The progress tracking feature keeps me motivated and shows exactly where I need to focus my efforts.",
                author: "Marcus Johnson",
                role: "Mathematics Student",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="relative bg-white/25 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg shadow-slate-900/5 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="relative z-10 text-slate-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="relative z-10 border-t border-white/20 pt-4">
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16 pb-24">
          <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl p-12 text-center text-white border border-white/10 shadow-2xl shadow-slate-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl" />
            <h2 className="relative z-10 text-3xl font-bold mb-6 tracking-tight">Ready to Start Learning?</h2>
            <p className="relative z-10 text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who have transformed their learning experience with TutorAI.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative bg-white/90 backdrop-blur-sm text-slate-900 px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-white hover:shadow-lg hover:shadow-white/20 group overflow-hidden border border-white/20">
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
              </button>
              <button className="relative border border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-white/20 hover:border-white/50 group">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
}
