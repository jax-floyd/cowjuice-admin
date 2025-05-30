// src/pages/Terms.js
import React, { useState, useEffect, useRef } from "react";

/**
 * Terms & Conditions – The (mostly) serious legal stuff, delivered in Cow Juice style.
 * Uses Contact-style paragraph animations and the three-column / sidebar layout
 * you employ on Questions.jsx.
 */

const Terms = () => {

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
                  These Terms and Conditions of Use (“Terms”) apply to gotcowjuice.com, all linked pages, and any bovine-related hallucination you may experience while consuming Cow Juice™. This site is owned and operated by Cow Juice Inc. ("We", "Us", "The Moo Force"). BY ACCESSING THIS WEBSITE, YOU AGREE TO THESE TERMS. IF YOU DO NOT AGREE, CLOSE THE TAB, CHUG A GLASS OF WATER - OR WORSE, OATMILK - AND FORGET THIS EVER HAPPENED.<sup>[1]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[250ms]")}>
                  We reserve the right to modify these Terms whenever the cows say so. Changes will be posted here, and your continued mooing around the site means you’re cool with whatever strange new clause we added. Consider yourself warned.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[375ms]")}>
                  All content on this site — including but not limited to our logo, phrases like “Drink the Truth,” and absurd declarations about milk’s role in the cosmos — is the intellectual property of Cow Juice Inc. You may not reuse, remix, or milk it for personal gain without our written consent.<sup>[2]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[500ms]")}>
                  You may not attempt to reverse-engineer our site, automate milk purchases using spiders or cowbots, or otherwise behave like someone trying to steal milk tech from the future. We will find you, and we will out-moo you.<sup>[3]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[625ms]")}>
                  If you do gain unauthorized access to our site, please enjoy your 0.001 seconds of glory before the barn doors close. Unauthorized actions may result in pastural banishment or a permanent milk embargo.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[750ms]")}>
                  Any purchase of Cow Juice is subject to additional terms, some of which we invented and others which are just good ol’ American law. Basically: if you open the can, it’s yours. There are no take-backs, and refunds available only if legally required or if we experience a bovine-induced moral epiphany.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[875ms]")}>
                  Don’t use our site to impersonate people, harass cows, or forge headers. Cow Juice Man is watching. He sees all. Especially if you’re running Internet Explorer.<sup>[4]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1000ms]")}>
                  Occasionally, we may suspend, update, or completely destroy parts of the website. This may occur with or without notice, because, in the illustrious words of Frank Sinatra, that’s life, and also because we are a beverage company, not a 24/7 uptime guarantee machine.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1125ms]")}>
                  In the event of user dissatisfaction, our official policy is: that sucks. Your sole remedy is to stop drinking Cow Juice and move on. Refunds are capped at $4.20 or one high-five from our unpaid intern.<sup>[5]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1250ms]")}>
                  We are not liable for damages including — but not limited to — fridge explosions, lactose awakenings, existential dairy crises, or sudden urges to become a dairy farmer. Use Cow Juice responsibly and consult a cow if symptoms persist.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1375ms]")}>
                  Any disputes arising from this site will be governed by the State of Delaware, where the cows graze and the lawyers roam free. You agree to resolve issues with civility, mediation, or thumb wrestling in a Delaware court.<sup>[6]</sup>
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1500ms]")}>
                  You agree to indemnify Cow Juice Inc. against any lawsuits, complaints, or lactose-fueled rants triggered by your use of this site. Don’t blame us if your great aunt thinks canned milk is an affront to tradition.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1625ms]")}>
                  If you violate these Terms, we may block your IP, revoke your moo privileges, and send you a cease-and-desist written in Comic Sans. You’ve been warned.
                </p>

                <p className={anim("font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1750ms]")}>
                  These Terms were last updated on May 27, 2025, and are subject to change the next time the cows get inspired or we discover an obscure legal loophole shaped like a bottle cap.
                </p>

                
            </div>

            {/* Responsive Footnotes */}
            <div className="w-full border-t-[0.5px] border-black pt-4 mt-6 animate-fade animate-delay-75">
              {/* lg+: two-column footnotes */}
              <div className="flex items-start justify-start flex-col space-y-2 sm:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 text-[10px] font-mono uppercase leading-3">
                <div className="space-y-2 pr-0 sm:pr-4">
                  <p>
                    <sup>[1]</sup> You knew what this was. We both did. This is not your
                    grandma’s terms of use, though she’s welcome to read it if she can still
                    handle a little chaos. By staying, you acknowledge you might encounter
                    dairy puns, emotional turbulence, and the occasional philosophical
                    provocation regarding milk’s role in society.
                  </p>
                  <p>
                    <sup>[2]</sup> Seriously — don’t milk our branding. We worked hard on
                    this. Our legal team may be small, but
                    they are high-flying - and fully prepared to send emails that begin with
                    “Per the cow's last message...”
                  </p>
                  <p>
                    <sup>[3]</sup> “Scraping” our site is not only deeply uncool, it also
                    risks unleashing the Cow Juice Man from eternal resting place on TikTok lives. He lives in
                    our servers and feeds on data packets and irony. Proceed accordingly.
                  </p>
                </div>
                <div className="flex flex-col w-full h-full space-y-2 pl-0 sm:pl-4">
                  <p>
                    <sup>[4]</sup> Internet Explorer are strictly prohibited from existing. Please log off and seek
                    immediate assistance. Also, impersonating a Cow Juice executive may
                    result in being sentenced to drink warm milk in public without shame
                    protection.
                  </p>
                  <p>
                    <sup>[5]</sup> The maximum refund you’ll receive (legally or
                    metaphysically) is $4.20, or a sticker that says “I Drank The Truth.”
                    You may also request a high five, but fulfillment is subject to our
                    intern’s mood, moo-fein levels, and current existential state.
                  </p>
                  <p>
                    <sup>[6]</sup> Legal battles will be resolved in Delaware, where cows
                    roam free and judges tolerate jokes about “the dairy docket.” You may choose
                    to represent yourself or summon a sentient milk crate as counsel. We would
                    strongly counsel the latter.
                  </p>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Terms;
