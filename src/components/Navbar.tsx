"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, BookOpen } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const Navbar = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth interpolation values based on scroll
  const scrollProgress = Math.min(scrollY / 100, 1) // 0 to 1 over 100px
  const isScrolled = scrollY > 20

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transform: `translateY(${scrollProgress * 16}px)`,
          paddingLeft: `${scrollProgress * 100}px`,
          paddingRight: `${scrollProgress * 100}px`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="relative w-full"
          style={{
            borderRadius: `${scrollProgress * 16}px`,
            background: `rgba(255, 255, 255, ${0.25 + scrollProgress * 0.15})`,
            backdropFilter: `blur(${12 + scrollProgress * 12}px)`,
            border: `1px solid rgba(255, 255, 255, ${0.2 + scrollProgress * 0.2})`,
            boxShadow: `0 ${4 + scrollProgress * 16}px ${24 + scrollProgress * 16}px rgba(15, 23, 42, ${0.05 + scrollProgress * 0.1})`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Glass overlays */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-white/30"
            style={{
              borderRadius: `${scrollProgress * 16}px`,
              opacity: scrollProgress * 0.8,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/5"
            style={{
              borderRadius: `${scrollProgress * 16}px`,
              opacity: scrollProgress * 0.6,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          <div
            className="relative z-10"
            style={{
              padding: `${16 - scrollProgress * 6}px ${32 - scrollProgress * 8}px`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center group">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="relative">
                    <div
                      className="bg-slate-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:shadow-xl group-hover:shadow-slate-900/30 transition-all duration-300 group-hover:scale-105 border border-white/10"
                      style={{
                        width: `${36 - scrollProgress * 4}px`,
                        height: `${36 - scrollProgress * 4}px`,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <BookOpen
                        className="text-white"
                        style={{
                          width: `${16 - scrollProgress * 2}px`,
                          height: `${16 - scrollProgress * 2}px`,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-slate-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span
                    className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-200 drop-shadow-sm tracking-tight"
                    style={{
                      fontSize: `${20 - scrollProgress * 2}px`,
                      fontFamily: "var(--font-geist-sans)",
                      letterSpacing: "-0.025em",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    TutorAI
                  </span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div
                className="hidden md:flex items-center"
                style={{
                  gap: `${24 - scrollProgress * 8}px`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {[
                  { href: "/proof", label: "Proof" },
                  { href: "/help", label: "Help" },
                  { href: "/pricing", label: "Pricing" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium tracking-wide group rounded-lg"
                    style={{
                      padding: `8px ${16 - scrollProgress * 4}px`,
                      fontSize: `${14 - scrollProgress * 1}px`,
                      fontFamily: "var(--font-geist-sans)",
                      fontWeight: "500",
                      letterSpacing: "0.01em",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 border border-white/20" />
                    <div className="absolute inset-0 bg-slate-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="absolute -bottom-1 left-4 right-4 h-0.5 bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                  </Link>
                ))}

                <Link
                  href="/does-it-work"
                  className="relative text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium tracking-wide group flex items-center space-x-2 rounded-lg"
                  style={{
                    padding: `8px ${16 - scrollProgress * 4}px`,
                    fontSize: `${14 - scrollProgress * 1}px`,
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: "500",
                    letterSpacing: "0.01em",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span className="relative z-10">Does it work?</span>
                  <span className="relative z-10 bg-amber-200/80 backdrop-blur-sm text-amber-900 text-xs font-medium px-2 py-0.5 rounded-md border border-amber-300/50 shadow-sm">
                    NEW
                  </span>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 border border-white/20" />
                  <div className="absolute inset-0 bg-amber-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span className="absolute -bottom-1 left-4 right-4 h-0.5 bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                </Link>
              </div>

              {/* Auth Buttons */}
              <div
                className="hidden md:flex items-center"
                style={{
                  gap: `${12 - scrollProgress * 4}px`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {!session?.user && (
                  <button
                    onClick={() => signIn("google")}
                    className="relative bg-slate-900/90 backdrop-blur-sm text-white font-medium rounded-lg transition-all duration-200 hover:bg-slate-800/90 group overflow-hidden border border-white/10 cursor-pointer"
                    style={{
                      padding: `${8 - scrollProgress * 2}px ${16 - scrollProgress * 4}px`,
                      fontSize: `${14 - scrollProgress * 1}px`,
                      fontFamily: "var(--font-geist-sans)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <span className="relative z-10">Sign in</span>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60" />
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative p-2.5 text-slate-700 hover:text-slate-900 transition-all duration-300 rounded-lg group"
                >
                  <span className="relative z-10">
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </span>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-40 md:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{
          top: `${80 + scrollProgress * 16}px`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl shadow-slate-900/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10" />

          <div className="relative z-10 p-6 space-y-1">
            {[
              { href: "/proof", label: "Proof" },
              { href: "/help", label: "Help" },
              { href: "/pricing", label: "Pricing" },
              { href: "/does-it-work", label: "Does it work?", isNew: true },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center justify-between p-3 text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium text-sm tracking-wide rounded-xl group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="bg-amber-200/80 backdrop-blur-sm text-amber-900 text-xs font-medium px-2 py-0.5 rounded-md border border-amber-300/50">
                      NEW
                    </span>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/15 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20" />
              </Link>
            ))}

            <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
              {session?.user ? (
                <div className="space-y-2">
                  <div className="p-3 text-center text-sm text-slate-700 bg-white/10 rounded-xl border border-white/20">
                    {session.user.email}
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="relative block w-full p-3 text-center bg-slate-900/90 backdrop-blur-sm text-white rounded-xl font-medium text-sm tracking-wide transition-all duration-200 hover:bg-slate-800/90 group overflow-hidden border border-white/10"
                  >
                    <span className="relative z-10">Sign out</span>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn("google");
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative block w-full p-3 text-center bg-slate-900/90 backdrop-blur-sm text-white rounded-xl font-medium text-sm tracking-wide transition-all duration-200 hover:bg-slate-800/90 group overflow-hidden border border-white/10"
                >
                  <span className="relative z-10">Sign in with Google</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar
