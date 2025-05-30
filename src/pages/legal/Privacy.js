// src/pages/Terms.js
import React, { useState, useEffect, useRef } from "react";

/**
 * Terms & Conditions – The (mostly) serious legal stuff, delivered in Cow Juice style.
 * Uses Contact-style paragraph animations and the three-column / sidebar layout
 * you employ on Questions.jsx.
 */

const Privacy = () => {

    const termsRef = useRef(null);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const el = termsRef.current;
      if (!el) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();          // fire once
          }
        },
        { threshold: 0.30 }
      );
  
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
  
    /* identical helper to Footer’s */
    const anim = (cls) => (visible ? cls : 'opacity-0'); // or 'animate-none'

    return (
        <div ref={termsRef} className="inset-0 flex flex-col flex-1 min-h-screen max-w-3xl mx-auto px-6 pb-6 pt-24 w-full h-full items-center justify-between overflow-hidden">
            <div className="flex flex-col items-center justify-start space-y-4 w-full animate-fade">
                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[125ms]")}>
                Cow Juice cares about privacy. Not enough to go live in a cave or anything, but enough to write this policy. This document explains what we collect, how we use it, and how your data might accidentally end up in a spreadsheet labeled “People Who Liked Milk Too Much.”<sup>[1]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[250ms]")}>
                We collect information you voluntarily provide — name, email, shipping address, flavor preferences, cow-related anecdotes. We also collect data passively, like IP address and browser type, because that’s what websites do now. Even cows are doing it.<sup>[2]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[375ms]")}>
                We use this data to fulfill orders, improve our milk-based offerings, and send you emails like “Your can has shipped!” or “It’s not too late to drink more.” We do not sell your data. We don’t even like selling milk that much, if we’re honest.<sup>[3]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[500ms]")}>
                Occasionally, we may share your information with third parties — like shipping providers, analytics services, or a guy named Lou who swears he can “optimize engagement.” These third parties are contractually obligated not to do anything sketchy (Lou included).<sup>[4]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[625ms]")}>
                Your data is stored securely, behind at least three firewalls, two mild-mannered sysadmins, and a cow-shaped CAPTCHA that defeats most bots. Still, no system is perfect. If we ever get hacked by rogue dairy activists, we’ll let you know.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[750ms]")}>
                You have rights. You can request to see what info we have, correct it, or delete it altogether. If you want to be scrubbed from our records like a rogue milk mustache, email us. Just please don’t fax — we don’t have a fax machine, and neither should you.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[875ms]")}>
                We may update this policy as needed — if privacy laws change, if our milk dreams evolve, or if our legal intern discovers a new clause generator. Check back occasionally. Or don’t — it's a [lactose] free country.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1000ms]")}>
                If you’re in California, Europe, or anywhere else with privacy laws written by actual philosophers, we respect your rights and will comply with applicable regulations.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1125ms]")}>
                For any questions, complaints, or dairy confessions, contact us at cowjuiceman@gotcowjuice.com. You may also send carrier pigeons, but again — we’re a digital milk company. We generally do not accept avian submissions. (Bovine ones are of course a different matter.)
                </p>

                <p className={anim("font-mono w-full text-xs uppercase text-left animate-flip-down animate-delay-[1250ms]")}>
                Last updated May 27, 2025. May be revised next time someone spills milk on the legal pad.
                </p>


                
            </div>

            {/* Responsive Footnotes */}
            <div className="w-full border-t-[0.5px] border-black pt-4 mt-6 animate-fade animate-delay-75">
              {/* lg+: two-column footnotes */}
              <div className="flex items-start justify-start flex-col space-y-2 sm:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 text-[10px] font-mono uppercase leading-3">
                <div className="space-y-2 pr-0 sm:pr-4">
                    <p>
                        <sup>[1]</sup> This document is written in English, legally, emotionally,
                        and spiritually. By reading it, you acknowledge you’ve entered a realm
                        where milk metaphors are abundant and dignity is optional.
                    </p>
                    <p>
                        <sup>[2]</sup> Yes, your IP address is public. No, we’re not going to use
                        it to find your house and moo outside. Probably.
                    </p>
                    <p>
                        <sup>[3]</sup> We’re a beverage company, not a data broker. We’d rather
                        sell you canned dairy than your soul to an ad network.
                    </p>
                </div>
                <div className="flex flex-col w-full h-full space-y-2 pl-0 sm:pl-4">
                    <p>
                        <sup>[4]</sup> Lou is fine, really. He just uses a lot of buzzwords and
                        once tried to rebrand the site “Moo-Commerce.” He’s on thin ice.
                    </p>
                    <p>
                        <sup>[5]</sup> If you're reading this and you're a lawyer, yes, we're
                        being serious. We do respect privacy. We just also respect satire, milk,
                        and the fragile absurdity of the modern digital condition.
                    </p>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Privacy;
