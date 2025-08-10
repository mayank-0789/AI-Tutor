"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "./ResizableNavbar";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { name: "Proof", link: "/proof" },
    { name: "Help", link: "/help" },
    { name: "Pricing", link: "/pricing" },
    { name: "Does it work?", link: "/does-it-work" },
  ];

  return (
    <ResizableNavbar className="top-0">
      <NavBody>
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/10 w-8 h-8">
              <BookOpen className="text-white w-4 h-4" />
            </div>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">TutorAI</span>
        </Link>

        <NavItems items={items} />

        <div className="hidden lg:flex items-center gap-2">
          {session?.user ? (
            <NavbarButton as="button" onClick={() => signOut()} variant="dark">
              Sign out
            </NavbarButton>
          ) : (
            <NavbarButton as="button" onClick={() => signIn("google")} variant="primary">
              Sign in
            </NavbarButton>
          )}
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/10 w-8 h-8">
                <BookOpen className="text-white w-4 h-4" />
              </div>
            </div>
            <span className="font-bold text-slate-900 tracking-tight">TutorAI</span>
          </Link>
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {items.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-base text-slate-800 rounded-xl hover:bg-slate-100/60"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 w-full">
            {session?.user ? (
              <NavbarButton as="button" onClick={() => signOut()} className="w-full" variant="dark">
                Sign out
              </NavbarButton>
            ) : (
              <NavbarButton as="button" onClick={() => signIn("google")} className="w-full" variant="primary">
                Sign in with Google
              </NavbarButton>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

export default Navbar;
