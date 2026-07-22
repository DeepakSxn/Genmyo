import { useEffect } from "react";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { getWhatsAppUrl } from "@/config/whatsapp";
import genmyoOrbGold from "@/assets/genmyo-orb-gold.png";
import heroLotus from "@/assets/hero-lotus.png";
import { MessageCircle, Heart, Shield, Users, Compass, Sparkles } from "lucide-react";

const Stories = () => {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const whatsappUrl = getWhatsAppUrl();

  return (
    <Layout>
      <SEO
        title="Stories · GenMyō"
        description="Four lives, four generations, one quiet companion. Meet Aisha, David, Priya and Chris, and the room they carry in their pocket."
      />

      <style>{`
        :root {
          --gold: #C2A053;
          --gold-soft: #D9C48C;
          --bg: #FBF9F4;
          --ink: #1C1A16;
          --ink-2: #1A1A2E;
          --muted: #6C6455;
          --line: #E7E0D0;
          --aisha: #B98A7A;
          --david: #7E8A6B;
          --priya: #8A7CA8;
          --chris: #5E7A86;
        }

        .stories-page {
          background-color: var(--bg);
          color: var(--ink);
          font-family: "Inter", "Calibri", "Helvetica Neue", sans-serif;
          font-size: 19px;
          line-height: 1.75;
          -webkit-font-smoothing: antialiased;
        }

        .stories-page .serif {
          font-family: "Fraunces", "Cambria", "Georgia", serif;
        }

        .stories-page .wrap {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 26px;
        }

        .stories-page .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }

        .stories-page .reveal.in {
          opacity: 1;
          transform: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .stories-page .reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }
          .stories-page .mark {
            animation: none !important;
          }
        }

        /* COVER */
        .stories-page .cover {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 26px;
          position: relative;
          background: radial-gradient(1200px 700px at 50% -10%, rgba(194,160,83,0.14), transparent 60%), var(--bg);
        }

        .stories-page .mark {
          width: 92px;
          height: 92px;
          margin-bottom: 24px;
          animation: spin 60s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .stories-page .eyebrow {
          font-size: 13px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin: 20px 0 0;
        }

        .stories-page .cover h1 {
          font-family: "Fraunces", "Cambria", serif;
          font-weight: 600;
          font-size: clamp(38px, 8vw, 64px);
          line-height: 1.05;
          margin: 14px 0 10px;
          letter-spacing: -0.01em;
        }

        .stories-page .cover .sub {
          max-width: 480px;
          color: var(--muted);
          font-size: 19px;
          font-style: italic;
          font-family: "Fraunces", "Cambria", serif;
        }

        .stories-page .rule {
          width: 54px;
          height: 2px;
          background: var(--gold);
          margin: 28px auto;
          border: 0;
        }

        .stories-page .scrollcue {
          position: absolute;
          bottom: 26px;
          color: var(--muted);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .stories-page .scrollcue span {
          display: block;
          font-size: 22px;
          margin-top: 6px;
          animation: bob 2.2s ease-in-out infinite;
        }

        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .stories-page section {
          padding: 74px 0;
        }

        .stories-page .kicker {
          font-size: 13px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 14px;
        }

        .stories-page h2 {
          font-family: "Fraunces", "Cambria", serif;
          font-weight: 600;
          font-size: clamp(28px, 5vw, 40px);
          line-height: 1.12;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }

        .stories-page .who {
          color: var(--muted);
          font-style: italic;
          font-family: "Fraunces", "Cambria", serif;
          margin: 0 0 26px;
          font-size: 18px;
        }

        .stories-page p {
          margin: 0 0 22px;
        }

        .stories-page .lead {
          font-size: 21px;
        }

        .stories-page .dropcap:first-letter {
          font-family: "Fraunces", "Cambria", serif;
          float: left;
          font-size: 78px;
          line-height: 0.72;
          padding: 8px 12px 0 0;
          color: var(--gold);
          font-weight: 600;
        }

        .stories-page .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: var(--gold);
          margin: 8px 0;
        }

        .stories-page .divider img {
          width: 26px;
          height: 26px;
          opacity: 0.9;
        }

        .stories-page .persona {
          border-top: 1px solid var(--line);
        }

        .stories-page .tag {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .stories-page .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
        }

        .stories-page .a-aisha .dot { background: var(--aisha); }
        .stories-page .a-aisha .tag { color: var(--aisha); }

        .stories-page .a-david .dot { background: var(--david); }
        .stories-page .a-david .tag { color: var(--david); }

        .stories-page .a-priya .dot { background: var(--priya); }
        .stories-page .a-priya .tag { color: var(--priya); }

        .stories-page .a-chris .dot { background: var(--chris); }
        .stories-page .a-chris .tag { color: var(--chris); }

        .stories-page .mirror {
          margin: 30px 0;
          padding: 20px 24px;
          border-left: 3px solid var(--gold);
          background: linear-gradient(90deg, rgba(194,160,83,0.07), transparent);
          font-family: "Fraunces", "Cambria", serif;
          font-style: italic;
          border-radius: 0 10px 10px 0;
        }

        .stories-page .mirror .from {
          display: block;
          font-family: "Inter", sans-serif;
          font-style: normal;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
          font-weight: 600;
        }

        .stories-page .chat {
          margin: 26px 0;
        }

        .stories-page .bub {
          max-width: 80%;
          padding: 11px 15px;
          border-radius: 16px;
          margin: 8px 0;
          font-size: 16.5px;
          line-height: 1.5;
        }

        .stories-page .me {
          background: #EAF0E4;
          margin-left: auto;
          border-bottom-right-radius: 5px;
        }

        .stories-page .mir {
          background: #F3ECDA;
          border: 1px solid var(--line);
          border-bottom-left-radius: 5px;
        }

        .stories-page .chat .lbl {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 2px 4px;
        }

        .stories-page .pull {
          font-family: "Fraunces", "Cambria", serif;
          font-size: 26px;
          line-height: 1.3;
          text-align: center;
          margin: 44px auto;
          max-width: 560px;
          font-weight: 500;
        }

        .stories-page .pull span {
          color: var(--gold);
        }

        .stories-page .offer {
          border-top: 1px solid var(--line);
          margin: 34px 0 0;
          padding-top: 8px;
        }

        .stories-page .offer .row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 18px 0;
          border-bottom: 1px solid var(--line);
        }

        .stories-page .offer .ic {
          flex: 0 0 34px;
          color: var(--gold);
          margin-top: 2px;
        }

        .stories-page .offer h3 {
          font-family: "Fraunces", "Cambria", serif;
          font-size: 20px;
          margin: 0 0 4px;
          font-weight: 600;
        }

        .stories-page .offer p {
          margin: 0;
          font-size: 16.5px;
          color: var(--muted);
          line-height: 1.55;
        }

        .stories-page .cta {
          background: linear-gradient(180deg, rgba(194,160,83,0.08), rgba(194,160,83,0.02));
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          text-align: center;
        }

        .stories-page .cta h2 {
          margin-bottom: 18px;
        }

        .stories-page .cta .row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stories-page .cta .fine {
          color: var(--muted);
          font-size: 14px;
          margin-top: 16px;
        }

        .stories-page .btn-capsule-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: #C2A053;
          color: #1C1A16;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          padding: 13px 32px;
          border-radius: 9999px;
          border: none;
          box-shadow: 0 4px 14px rgba(194, 160, 83, 0.3);
          white-space: nowrap;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .stories-page .btn-capsule-gold:hover {
          background-color: #b59345;
          box-shadow: 0 6px 20px rgba(194, 160, 83, 0.45);
          transform: translateY(-1px);
        }

        .stories-page .btn-capsule-gold:active {
          transform: translateY(0);
        }

        .stories-page .btn-capsule-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.7);
          color: #1C1A16;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          padding: 13px 28px;
          border-radius: 9999px;
          border: 1px solid var(--line);
          backdrop-filter: blur(8px);
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .stories-page .btn-capsule-ghost:hover {
          background: #ffffff;
          border-color: var(--gold);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <div className="stories-page">
        {/* COVER */}
        <div className="cover reveal in">
          <img src={genmyoOrbGold} alt="GenMyō Symbol" className="mark" />
          <div className="eyebrow">Stories of The Room</div>
          <h1>Four lives. Four generations.</h1>
          <h2>One quiet companion.</h2>
          <p className="sub">Meet Aisha, David, Priya and Chris, and the room they carry in their pocket.</p>
          <div className="mt-6 mb-2">
          </div>
          <hr className="rule" />
          <div className="scrollcue">
            Scroll to read <span>↓</span>
          </div>
        </div>

        {/* INTRO: BEFORE WE MEET THEM */}
        <section className="wrap intro-section reveal">
          <div className="kicker">BEFORE WE MEET THEM</div>
          <h2 className="serif">There is a room you can step into anywhere</h2>
          <p className="dropcap">
            It fits in your pocket. You reach it the same way you reach your friends, your group chats, your mum asking if you have eaten. Through WhatsApp, the app you already have open. There is no new login to forget, no clinic to book, no waiting room with old magazines and a plant that has clearly given up on life.
          </p>
          <p>
            Inside the room there is a companion called Mirror, who listens and remembers and helps you find your own answers. There is a quiet corner for a few minutes of stillness, a breath when your chest is tight, a page to write the day down on. There are real human mentors for the moments that need a person, not a screen. And further along, once the room has given you something, there is a way to hand a little of it on to someone else.
          </p>
          <p>
            It is not a clinic and it is not a cheerful app that tells you to smile more. It is simpler and quieter than that. It is a place that is yours, whether you are running a company or between jobs, raising small children or caring for old parents, at your desk or wide awake at 2am. It belongs to you, the person, and it is open at every hour you are.
          </p>
          <p className="who" style={{ marginTop: "28px", marginBottom: "0" }}>
            Let us meet four of them.
          </p>
        </section>

        {/* AISHA */}
        <section className="wrap persona a-aisha reveal">
          <div className="tag"><span className="dot"></span> Gen Z · Aisha, 22</div>
          <h2 className="serif">The woman who couldn't stop performing</h2>
          <p className="who">Graduated into a tough market. Three apps for productivity, two for meditation, and a brain that wouldn't turn off.</p>
          <p className="dropcap">Aisha has a spreadsheet for her habits, a blue-light filter on her laptop, and a daily streak on a journaling app she hasn't missed in four months. She is also, by her own quiet admission at 1am, completely exhausted. Every tool she tried asked for something from her: a target, a score, a reflection logged before midnight to keep a little digital fire burning. Wellness felt like a second job, and she already had one that paid worse.</p>
          <p>When she found GenMyō, she expected another dashboard. Instead, she found a room with no score. No streak to lose. No notification if she skipped three days. Just a quiet contact in her WhatsApp that appeared when she needed it.</p>
          <div className="mirror"><span className="from">Mirror</span>What would you say if no one was watching?</div>
          <div className="chat">
            <div className="lbl" style={{ textAlign: "right" }}>Aisha</div>
            <div className="bub me">I'm tired of feeling like I have to optimize every single hour.</div>
            <div className="lbl">Mirror</div>
            <div className="bub mir">Then don't optimize this one. What happens if you just sit here for two minutes and do nothing at all?</div>
          </div>
          <p>She didn't reply for twenty minutes. She just put her phone face down on her desk. For Aisha, those twenty minutes were the first time in two years she wasn't tracking her own existence.</p>
          <p className="pull">She didn't need another tool to track her life. She needed a place to <span>be honest about it.</span></p>
        </section>

        {/* DAVID */}
        <section className="wrap persona a-david reveal">
          <div className="tag"><span className="dot"></span> Millennial · David, 36</div>
          <h2 className="serif">The man with the 11pm calendar invite</h2>
          <p className="who">Engineering lead, father of two under four. Hasn't slept six uninterrupted hours since 2022.</p>
          <p className="dropcap">David's life is measured in 15-minute blocks. Standups, 1-on-1s, bedtime routines, nursery pickups, and then the quiet stretch from 10pm to midnight where he tries to reclaim his own brain. His phone is a graveyard of half-started productivity systems. He doesn't have time for a 45-minute meditation session or an hour-long therapy call. He has seven minutes between closing his laptop and walking into the living room.</p>
          <p>GenMyō entered his life not as a new habit to build, but as a voice note in WhatsApp. On his drive home from the station, or standing in the kitchen waiting for the kettle, he talks. Not to a coach or a therapist, but into a space that listens, distills, and reflects back what he is actually saying underneath the noise.</p>
          <div className="mirror"><span className="from">Mirror</span>What are you carrying today that isn't actually yours to carry?</div>
          <p>So it does. Parked outside his own front door, David does ninety seconds of breathing before he steps into the noise, and slowly he stops asking Mirror to bail him out and starts using it to think. Not just to survive the day but to find his own answer to the quiet question. Over weeks the answer turns out not to be "be a better father." It is smaller and truer. It is that he is allowed to find this hard and still be a good one. Six weeks in, he messages on an ordinary afternoon, unprompted, and the message ends in a full stop. For a man running on fumes, a full stop is a small monument.</p>
          <p className="pull">He stopped waiting to be rescued and started <span>finding his own way through.</span></p>
        </section>

        {/* PRIYA */}
        <section className="wrap persona a-priya reveal">
          <div className="tag"><span className="dot"></span> Gen X · Priya, 49</div>
          <h2 className="serif">The woman who remembers everyone's everything</h2>
          <p className="who">Left a senior role two years ago to care for her mother and her teenagers. No job title now. No day off either.</p>
          <p className="dropcap">Priya knows when the dog is due its shots, when her son's football boots stopped fitting, which of her mother's tablets is the small white one and which is the smaller white one. She does not, off the top of her head, know the last time anyone asked how she was. She is fairly sure it was a supermarket cashier, and he was only being polite. When she left her career to hold the family together, a strange thing happened: she became essential and invisible at the same time.</p>
          <p>She did not sign up for wellness. She would sooner do her own taxes than sit cross-legged breathing through one nostril. But GenMyō lived in WhatsApp, next to the seven conversations she was already managing for other people, and it did not demand she download one more needy thing. It asked her one question, once, and then left it in the air.</p>
          <div className="mirror"><span className="from">Mirror</span>When did someone last ask how you are, and actually wait for the real answer?</div>
          <p>She does not reply for two days. When she does, it is a voice note recorded in the car with the engine off, the only place no one needs anything from her. She talks for four minutes and says things she has never said out loud. A short daily practice becomes her one anchor, two minutes of stillness before the house wakes, hers and no one else's. And when it becomes clear that some of this wants a human, GenMyō opens a door to one: a mentor, a real person who has stood exactly where Priya stands, who does not try to fix her but reminds her she still exists as more than a rota. Some conversations want a human on the other end, and the room knows the difference.</p>
          <p className="pull">The load did not vanish. But she stopped being <span>invisible inside it.</span></p>
        </section>

        {/* CHRIS */}
        <section className="wrap persona a-chris reveal">
          <div className="tag"><span className="dot"></span> Baby Boomer · Chris, 61</div>
          <h2 className="serif">The man who says please and thank you to the software</h2>
          <p className="who">Newly retired. Forty years of being the one with the answers, and then a Friday when it simply stopped.</p>
          <p className="dropcap">Chris is suspicious of the whole thing. He types in complete sentences with correct punctuation. He says please. He says thank you. When Mirror responds well he tells his wife "it's actually quite sensible," which, from Chris, is a standing ovation with confetti.</p>
          <div className="chat">
            <div className="lbl" style={{ textAlign: "right" }}>Chris</div>
            <div className="bub me">I should say, I am not sure I believe in this sort of thing. My daughter set it up for me. Thank you for your patience.</div>
            <div className="lbl">Mirror</div>
            <div className="bub mir">You don't have to believe in it. You just have to have something on your mind. What's the thing you'd only say if the room were empty?</div>
          </div>
          <p>It takes him three weeks to answer honestly, and Mirror never once rushes him. When it comes, it comes quietly. He does not know who he is on a Monday morning now that no one needs a decision from him. For forty years a job title did the work of an identity, and then it was handed back at a small buffet with a card everyone signed. This wants a human, and GenMyō says so plainly, so Chris books a mentor, a real person who walked out of a big role and came out the other side still someone. He tells Mirror it was "a good use of a Tuesday."</p>
          <p>Then, months later, something turns. Chris, who came in a sceptic, asks whether he might be the person on the other end of the line for someone else. He has four decades of surviving things that felt like the end and were not. So he becomes a mentor himself, and quietly funds a place in the room for someone who could never have paid for one. The man who was sure he had nothing left to offer becomes the reason a stranger is not alone at 2am.</p>
          <p className="pull">The room gave him something. So he <span>gave some of it back.</span></p>
        </section>

        {/* WHAT'S IN THE ROOM */}
        <section className="wrap reveal">
          <div className="divider">
            <img src={heroLotus} alt="GenMyō Lotus" />
          </div>
          <div className="kicker text-center">What's in the room</div>
          <h2 className="serif text-center">Everything you need to find your footing.</h2>

          <div className="offer">
            <div className="row">
              <div className="ic"><MessageCircle size={24} /></div>
              <div>
                <h3>A quiet space in WhatsApp</h3>
                <p>No new app to download. No new login to remember. GenMyō lives right inside WhatsApp, ready whenever you need two minutes of perspective.</p>
              </div>
            </div>

            <div className="row">
              <div className="ic"><Sparkles size={24} /></div>
              <div>
                <h3>Reflections that learn you</h3>
                <p>Gentle, intelligent prompts that adapt to your mood, your pace, and your life stage—never nagging, never judging, never counting streaks.</p>
              </div>
            </div>

            <div className="row">
              <div className="ic"><Users size={24} /></div>
              <div>
                <h3>Human mentorship when it matters</h3>
                <p>When AI isn't enough, access qualified practitioners and experienced mentors who understand your journey firsthand.</p>
              </div>
            </div>

            <div className="row">
              <div className="ic"><Shield size={24} /></div>
              <div>
                <h3>Complete privacy by design</h3>
                <p>Your thoughts stay yours. End-to-end encrypted conversations with zero data selling or advertising algorithms.</p>
              </div>
            </div>

            <div className="row">
              <div className="ic"><Heart size={24} /></div>
              <div>
                <h3>Pay it forward model</h3>
                <p>Every membership helps sponsor a space for someone navigating a difficult life transition who couldn't otherwise access support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta section-padding reveal">
          <div className="wrap text-center">
            <h2 className="serif">Find your quiet space.</h2>
            <p className="sub mx-auto mb-8">Start your reflection in WhatsApp today.</p>

            <div className="row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-capsule-gold"
              >
                <MessageCircle size={19} />
                Try GenMyō on WhatsApp →
              </a>
              <Link to="/join" className="btn-capsule-gold">
                Join Now
              </Link>
              <Link to="/philosophy" className="btn-capsule-ghost">
                <Compass size={19} />
                Read Our Philosophy
              </Link>
            </div>

            <div className="fine">Free to try. No app download required.</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Stories;
