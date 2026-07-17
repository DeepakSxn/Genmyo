import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";

const Terms = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service & AI Ethics Standards | GenMyo"
        description="Read the terms governing GenMyo, our WhatsApp communications opt-in, and our commitment to global AI safety and ethics standards."
      />
      <section className="py-16 md:py-24">
        <div className="container-wide px-6 md:px-12 max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-lg">
              Version 3.2 &nbsp;|&nbsp; Last Updated: February 2026
            </p>
          </header>

          <div className="prose prose-lg max-w-none text-foreground/90 space-y-10">
            {/* 1 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">1. Introduction</h2>
              <p>
                GenMyo Pte. Ltd. ("GenMyo", "we", "us") operates an AI-led humanistic platform that cultivates awareness, wellness, resilience, and happiness through inner transformation. By accessing or using the GenMyo App, Founding Members Program, or any related digital channels — including our WhatsApp communication channel (collectively, the "Platform") — you agree to these Terms & Conditions ("Terms") and the Global Privacy & Data Usage Policy.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">2. Nature of Service</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>GenMyo provides preventive, reflective, and educational experiences to support personal awareness and well-being.</li>
                <li>It is not a substitute for therapy, psychiatry, financial advice, or crisis intervention.</li>
                <li>AI reflections and "Mirror" guidance are informational aids only.</li>
                <li>GenMyo adheres to international standards of digital-wellness ethics and responsible AI practice.</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">3. Eligibility and Participation</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must be 18 years or older, or 16–17 with verified guardian consent.</li>
                <li>Participation implies consent to receive reflections and notifications through GenMyo-approved digital channels, including WhatsApp (subject to Section 17).</li>
                <li>You affirm that all data you provide are accurate and lawful for processing.</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">4. Responsible Use and User Safety</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use GenMyo for self-reflection and awareness only.</li>
                <li>Exercise judgment and seek professional help when needed.</li>
                <li>Refrain from misusing AI functions to produce harmful, illegal, or discriminatory content.</li>
              </ul>
              <p>GenMyo may restrict or terminate access to preserve ethical compliance and user safety.</p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">5. Global AI Ethics and Governance Standards</h2>
              <p>
                GenMyo designs and manages its AI in line with: OECD AI Principles (2019), UNESCO Recommendation (2021), EU AI Act (2025), NIST AI RMF (2023), and the Singapore Model AI Framework (2024).
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Principle</th>
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Source</th>
                      <th className="text-left py-3 font-semibold text-foreground">GenMyo Implementation</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Human-Centric & Beneficial</td>
                      <td className="py-3 pr-4">OECD / UNESCO</td>
                      <td className="py-3">All AI enhances human growth; human oversight is mandatory.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Fairness & Non-Discrimination</td>
                      <td className="py-3 pr-4">EU AI Act Art. 10</td>
                      <td className="py-3">Datasets undergo bias detection and fairness audits.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Transparency & Explainability</td>
                      <td className="py-3 pr-4">NIST RMF</td>
                      <td className="py-3">Mirror AI interactions are labelled "AI-Generated Guidance."</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Accountability & Oversight</td>
                      <td className="py-3 pr-4">Singapore Model</td>
                      <td className="py-3">Internal review board and audit logs maintain accountability.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Safety & Reliability</td>
                      <td className="py-3 pr-4">UNESCO</td>
                      <td className="py-3">Continuous testing and risk-mitigation procedures.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Privacy & Data Minimisation</td>
                      <td className="py-3 pr-4">ISO/IEC 27701 / GDPR</td>
                      <td className="py-3">Personal data minimised, encrypted, anonymised.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">6. AI Use Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI outputs are probabilistic, context-limited, and not medical or therapeutic.</li>
                <li>Guidance is provided "as is" and must be interpreted with personal discretion.</li>
                <li>GenMyo accepts no liability for emotional, behavioural, or financial consequences arising from AI content.</li>
              </ul>
            </section>

            {/* 6A */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">6A. User Responsibility and Limitation of Reliance</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>No Clinical or Emergency Function:</strong> The Platform does not provide crisis-intervention or suicide-prevention services. If you are in danger or distress, contact local emergency services immediately. GenMyo is not monitored for crisis alerts.</li>
                <li><strong>No Duty of Care Relationship:</strong> Use of the Platform does not create a doctor-patient, counsellor-client, fiduciary, or duty-of-care relationship. GenMyo and its AI systems have no legal obligation to prevent or respond to user actions.</li>
                <li><strong>User Autonomy and Decision-Making:</strong> You retain full responsibility for your actions, decisions, and outcomes. GenMyo's role is supportive and educational only.</li>
                <li><strong>Limitation of Liability for Adverse Acts:</strong> To the maximum extent permitted by law, GenMyo and its affiliates are not liable for self-harm, harm to others, or any act based on Platform content.</li>
                <li><strong>Ethical Safeguards Without Assumed Liability:</strong> GenMyo maintains AI-safety, content-moderation, and escalation frameworks consistent with UNESCO/OECD principles. These are voluntary best-practice efforts and do not create any additional legal duty.</li>
                <li><strong>Aggregate Liability Cap:</strong> Total liability for all claims is limited to the total fees paid by you in the twelve (12) months preceding the event.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">7. Intellectual Property Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All software, AI models, datasets, and derived materials are the exclusive property of GenMyo Pte. Ltd.</li>
                <li>Users grant GenMyo a perpetual, royalty-free licence to process and anonymise submitted reflections.</li>
                <li>Anonymised and aggregated data, embeddings, and model improvements are trade secrets not subject to disclosure or access.</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">8. Confidentiality and Community Conduct</h2>
              <p>Users must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep reflections and group discussions private — including content shared via WhatsApp.</li>
                <li>Engage respectfully across cultures.</li>
                <li>Avoid harassment, misinformation, or exploitation.</li>
              </ul>
              <p>Violation may result in account suspension, removal from WhatsApp channels, or legal action.</p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">9. Data Protection and Privacy</h2>
              <p>
                GenMyo complies with PDPA, GDPR, CCPA, UK DPA 2018, and equivalent frameworks. We employ encryption, ISO 27001/SOC 2 security, cross-border safeguards (OECD/APEC CBPR), and strict access controls.
              </p>
              <p>
                Data processed through WhatsApp is subject to both GenMyo's Privacy Policy and WhatsApp's own Privacy Policy (Meta Platforms). Users are encouraged to review WhatsApp's terms at{" "}
                <a href="https://www.whatsapp.com/legal" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.whatsapp.com/legal</a>.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">10. User Data Rights and Access</h2>
              <p>
                You may access or correct your personal data as required by law. GenMyo is not obliged to disclose proprietary analytics, model logic, or derived datasets. All anonymised and aggregated data remain GenMyo intellectual property.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">11. Global Well-being Principles</h2>
              <p>
                GenMyo's mission aligns with the WHO Mental Health Action Plan (2023–2030) and UN SDG 3 — Good Health and Well-being. We promote preventive wellness and emotional literacy but do not provide medical or financial remedies.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">12. Limitations of Liability and Warranty Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Platform is provided "as is" and "as available."</li>
                <li>GenMyo disclaims all implied warranties.</li>
                <li>We are not liable for:
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Psychological or financial harm arising from external circumstances;</li>
                    <li>Reliance on AI content;</li>
                    <li>Service interruptions or third-party failures, including WhatsApp outages or delivery failures.</li>
                  </ul>
                </li>
                <li>Aggregate liability cap: same as Section 6A(6). Nothing herein limits liability where prohibited by law.</li>
              </ul>
            </section>

            {/* 13 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">13. Compliance and Audit Rights</h2>
              <p>
                GenMyo maintains internal AI-ethics audits and may provide regulators or partners with summaries of compliance. Users may not conduct external audits or reverse-engineer the Platform without written consent.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">14. Modification and Termination</h2>
              <p>
                We may update these Terms for regulatory or operational reasons. Material revisions take effect 14 days after notice unless accepted sooner by continued use. Accounts breaching these Terms may be terminated immediately. WhatsApp opt-in consent may be withdrawn at any time (see Section 17).
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">15. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of Singapore, with equivalent consumer protections for international users. Disputes will be resolved first by good-faith mediation, then by confidential arbitration under the Singapore International Arbitration Centre (SIAC) Rules. Venue: Singapore | Language: English | English version prevails.
              </p>
            </section>

            {/* 16 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">16. Contact</h2>
              <p>GenMyo Pte. Ltd.</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@genmyo.ai" className="text-primary underline">privacy@genmyo.ai</a>
                {" "}&nbsp;|&nbsp;{" "}
                <a href="mailto:legal@genmyo.ai" className="text-primary underline">legal@genmyo.ai</a>
              </p>
            </section>

            {/* Section 17 */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">Section 17: WhatsApp Communications — Opt-In Terms & Conditions</h2>
              <p className="text-muted-foreground italic mb-6">This section governs your consent to receive communications from GenMyo via WhatsApp.</p>

              {/* 17.1 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.1 Scope of WhatsApp Communications</h3>
              <p>By opting in, you consent to receive the following message types from GenMyo via WhatsApp Business (powered by the WhatsApp Business API — Meta Platforms):</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Message Category</th>
                      <th className="text-left py-3 font-semibold text-foreground">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Wellness Reflections</td>
                      <td className="py-3">Daily or weekly AI-generated reflection prompts, mindfulness nudges, awareness exercises.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Programme Updates</td>
                      <td className="py-3">Founding Members milestones, feature launches, session reminders.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Transactional Alerts</td>
                      <td className="py-3">Subscription confirmations, payment receipts, account notifications.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Community Broadcasts</td>
                      <td className="py-3">Event invitations, group workshops, curated content from GenMyo's partners.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Support & Feedback</td>
                      <td className="py-3">Responses to user queries submitted through the Platform or WhatsApp.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 17.2 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.2 How to Opt In</h3>
              <p>You may opt in to WhatsApp communications by any of the following methods:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>In-App Consent</strong> — Toggle the WhatsApp Notifications switch in your GenMyo App profile settings.</li>
                <li><strong>WhatsApp Keyword</strong> — Send the keyword START GENMYO to our verified WhatsApp Business number.</li>
                <li><strong>Registration Form</strong> — Check the WhatsApp opt-in box during account registration or on any GenMyo digital form.</li>
                <li><strong>QR Code</strong> — Scan a GenMyo-issued QR code that initiates the opt-in flow on WhatsApp.</li>
              </ul>
              <p className="mt-3">
                Opt-in constitutes your express, freely-given, and informed consent under applicable data-protection laws (including PDPA, GDPR, and CCPA). Consent is not a condition of using the Platform or any paid service.
              </p>

              {/* 17.3 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.3 Opt-Out / Unsubscribe</h3>
              <p>You may withdraw your WhatsApp consent at any time with immediate effect by:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Replying <strong>STOP</strong> or <strong>UNSUBSCRIBE</strong> to any GenMyo WhatsApp message.</li>
                <li>Toggling off WhatsApp Notifications in your in-app profile settings.</li>
                <li>Emailing <a href="mailto:privacy@genmyo.ai" className="text-primary underline">privacy@genmyo.ai</a> with the subject line "WhatsApp Opt-Out".</li>
              </ul>
              <p className="mt-3">
                <strong>Important:</strong> Opting out of WhatsApp messages does not affect your Platform account, subscription, or email communications. Transactional messages required by law may still be sent via alternative channels.
              </p>

              {/* 17.4 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.4 Frequency, Costs & Timing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Message frequency:</strong> approximately 3–7 messages per week, subject to your personalised settings and subscription tier.</li>
                <li><strong>Data rates:</strong> standard carrier messaging or data charges may apply. GenMyo does not charge separately for WhatsApp messages.</li>
                <li><strong>Delivery hours:</strong> GenMyo endeavours to send messages during reasonable hours in your local timezone. Delivery is subject to WhatsApp infrastructure and carrier availability.</li>
                <li>Message delivery is not guaranteed. GenMyo is not liable for delayed or undelivered WhatsApp messages.</li>
              </ul>

              {/* 17.5 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.5 Data Processing via WhatsApp</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your phone number and message metadata are processed by Meta Platforms Inc. under WhatsApp's Privacy Policy. GenMyo has no control over Meta's data practices.</li>
                <li>Message content shared with GenMyo via WhatsApp is processed under GenMyo's Global Privacy & Data Usage Policy and stored on GenMyo's secure servers.</li>
                <li>WhatsApp messages may be monitored and recorded by GenMyo for quality assurance, safety compliance, and service improvement.</li>
                <li>GenMyo will not use your WhatsApp number for marketing purposes beyond the categories consented to in Section 17.1.</li>
                <li>Cross-border data transfers are governed by Meta's Standard Contractual Clauses and GenMyo's OECD/APEC CBPR compliance framework.</li>
              </ul>

              {/* 17.6 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.6 WhatsApp Business Compliance</h3>
              <p>GenMyo's WhatsApp Business Account operates in compliance with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Meta Business Messaging Policy (whatsapp.com/legal/business-policy)</li>
                <li>WhatsApp Business Terms of Service</li>
                <li>Applicable national telemarketing and e-communications regulations (including Singapore PDPA Advisory Guidelines on DNCR, EU ePrivacy Directive, and US TCPA where applicable)</li>
              </ul>
              <p className="mt-3">
                GenMyo will not send unsolicited messages and will only contact users who have provided valid opt-in consent. Violation reports can be directed to{" "}
                <a href="mailto:legal@genmyo.ai" className="text-primary underline">legal@genmyo.ai</a>.
              </p>

              {/* 17.7 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.7 Children and WhatsApp</h3>
              <p>
                WhatsApp is restricted to users aged 16 and above (or 18 in certain jurisdictions). GenMyo will not knowingly send WhatsApp communications to users below the applicable minimum age. If you believe a minor has opted in without guardian consent, contact{" "}
                <a href="mailto:privacy@genmyo.ai" className="text-primary underline">privacy@genmyo.ai</a> immediately.
              </p>

              {/* 17.8 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.8 Changes to WhatsApp Communications Programme</h3>
              <p>
                GenMyo may modify the scope, frequency, or nature of WhatsApp communications upon 14 days' notice sent via WhatsApp and/or email. Continued engagement after the notice period constitutes acceptance. You may opt out at any time per Section 17.3.
              </p>

              {/* 17.9 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">17.9 Sample Opt-In Language</h3>
              <div className="bg-muted/50 rounded-lg p-6 mt-2">
                <p className="text-sm italic text-foreground/80">
                  "Yes, I consent to receive wellness reflections, programme updates, and transactional notifications from GenMyo via WhatsApp. I understand I can opt out at any time by replying STOP or adjusting my app settings. Message frequency may vary. Standard messaging rates may apply."
                </p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                This statement should appear as a clearly visible, unchecked checkbox in all digital opt-in interfaces.
              </p>
            </section>

            {/* 18 */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">18. Acknowledgment and Consent</h2>
              <p>By using GenMyo — including opting in to WhatsApp communications — you confirm that you:</p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Understand that GenMyo is a reflective AI platform, not therapy or professional advice.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Consent to responsible AI and data use under GenMyo's Privacy Policy.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Accept full responsibility for personal decisions and actions.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Release GenMyo Pte. Ltd. from liability for outcomes resulting from Platform content.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Understand WhatsApp opt-in is voluntary and may be withdrawn at any time (Section 17.3).</li>
              </ul>
            </section>

            {/* Final Statement */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">Final Statement</h2>
              <p>
                GenMyo upholds the highest global AI-ethics and human-centric standards — fairness, accountability, transparency, and safety — while ensuring its own freedom from undue liability. Our purpose is to empower awareness and resilience; your responsibility is to use that awareness wisely.
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                © 2026 GenMyo Pte. Ltd. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
