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
                
                <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[125ms]"
                )}
              >
                By accessing gotcowjuice.com, purchasing a can of Cow Juice™, or
                belting any variation of the Full Moon Moo™, you hereby affirm
                that you have read, understood, and agreed to these Terms &
                Conditions (<span className="font-bold">“Terms”</span>) in
                full.<sup>[1]</sup>
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[250ms]"
                )}
              >
                You represent that you are at least thirteen (13) years old and
                possess the legal capacity to enter into this agreement. If
                not, please close this tab, finish your homework, and revisit
                once responsible adulthood has ripened.
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[375ms]"
                )}
              >
                All sales of Cow Juice are deemed final. Because each can is
                technically a perishable love letter from a cow, we cannot
                accept returns once the tab has been kissed. Statutory
                “cool-off” periods or mandatory refund rights in your locale
                remain, of course, undefeated.<sup>[2]</sup>
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[500ms]"
                )}
              >
                The content on this website — including but not limited to
                marketing copy, nutritional bravado, and any representation by
                Cow Juice Man — is provided for entertainment and information
                only and does not constitute medical, nutritional, or bovine
                psychiatry advice.<sup>[3]</sup>
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[625ms]"
                )}
              >
                To the maximum extent permitted by law, Cow Juice Inc. disclaims
                all warranties (express or implied) and shall not be liable for
                any loss, damage, or existential dread arising from your
                ingestion, chugging, or interpretive dance with Cow Juice,
                except up to the modest cap described in footnote [4].
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[750ms]"
                )}
              >
                These Terms are governed by and construed in accordance with the
                laws of the State of Delaware without regard to conflict-of-law
                provisions. Any dispute shall be brought exclusively in the
                (cow-friendly) courts of Delaware.<sup>[5]</sup>
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[875ms]"
                )}
              >
                All trademarks, trade dress, and assorted witty phrases on this
                site are the intellectual property of Cow Juice Inc. Nothing
                herein grants you a license to milk our IP without written
                consent.<sup>[6]</sup>
              </p>
              <p
                className={anim(
                  "font-mono text-xs uppercase text-left animate-flip-down animate-delay-[1000ms]"
                )}
              >
                If any provision of these Terms is found unenforceable, the
                remaining provisions shall continue in full force (like a
                never-ending can chug). These Terms were last updated on
                May 27, 2025 and are subject to change whenever the cows feel
                inspired.
              </p>
            </div>

            {/* Footnotes below. */}
            <div class="flex w-full flex-1 flex-col max-w-3xl items-center justify-end space-y-2 py-2">
                <div class="flex flex-col w-full items-center justify-center space-y-2 py-2 border-t-[0.5px] border-black animate-fade animate-delay-75">
                    
                </div>
            </div>
        </div>
    );
};

export default Terms;
