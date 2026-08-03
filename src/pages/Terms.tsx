import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";

const Terms = () => {
  return (
    <Layout>
      <SEO
        title="Terms & Conditions | GenMyo"
        description="Read the terms governing GenMyo, our WhatsApp communications opt-in, and our commitment to global AI safety and ethics standards."
      />
      <section className="py-16 md:py-24">
        <div className="container-wide px-6 md:px-12 max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-lg">
              Version 4.3 &nbsp;|&nbsp; Effective 2 August 2026 &nbsp;|&nbsp; Supersedes Version 4.2 (6 July 2026)
            </p>
          </header>

          <div className="prose prose-lg max-w-none text-foreground/90 space-y-10">
            {/* Plain-language summary */}
            <div className="bg-muted/30 border border-border/80 rounded-2xl p-6 md:p-8 space-y-3">
              <h2 className="font-serif text-xl font-medium text-foreground mt-0 mb-4">
                Key things to know (plain-language summary; the full Terms below govern):
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-foreground/90">
                <li>GenMyo is non-clinical, non-religious inner wellness. It is not therapy, medical care or crisis support, and it is not a substitute for them.</li>
                <li>Guidance you receive from Mirror is AI-generated. Use your own judgment; you remain responsible for your decisions.</li>
                <li>In an emergency, contact local emergency services immediately (in Singapore: 999 for police, 995 for ambulance). If you are struggling, the Samaritans of Singapore are available 24 hours on 1767.</li>
                <li>You must be 18 or older to use GenMyo.</li>
                <li>You can stop WhatsApp messages at any time by replying STOP, and you can ask us to delete your data.</li>
                <li>We do not use the content of your WhatsApp messages to train general-purpose AI models.</li>
                <li>If you join through your employer, they never see your individual reflections; they receive only anonymised group reporting (minimum group size of ten).</li>
              </ul>
            </div>

            {/* 1 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">1. Introduction</h2>
              <p>
                GenMyo Pte. Ltd. (“GenMyo”, “we”, “us”) operates an AI-guided inner wellness platform that cultivates awareness, resilience and wellbeing through guided reflection. These Terms & Conditions (“Terms”) govern your access to and use of the GenMyo platform, comprising: (a) our WhatsApp reflection service, including the programme currently offered as The Mirror Project; (b) the GenMyo web portal; and (c) any related digital channels we operate (together, the “Platform”).
              </p>
              <p>
                These Terms take effect on the Effective Date shown above. By accessing or using the Platform you agree to these Terms and to the GenMyo Global Privacy & Data Usage Policy, which forms part of these Terms.
              </p>
              <p>
                <strong>Electronic acceptance and proof of consent.</strong> You may accept these Terms electronically, including by tapping an accept control, selecting an accept button, or replying with an affirmative keyword (for example, ACCEPT) in a GenMyo message on WhatsApp. Any such action is a clear, informed and affirmative acceptance of these Terms and constitutes your consent under the Personal Data Protection Act (PDPA) and other applicable data-protection laws. GenMyo records the accepting phone number or account identifier, the date and time, and the version of these Terms accepted, as its proof of consent.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">2. Nature of Service</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>GenMyo provides preventive, reflective and educational experiences to support personal awareness and wellbeing.</li>
                <li>GenMyo is non-clinical and non-religious. It is not therapy, psychiatry, medical care, religious instruction, financial advice or crisis intervention, and it is not a substitute for any of these.</li>
                <li>AI reflections and Mirror guidance are informational aids only.</li>
                <li>GenMyo adheres to recognised standards of digital-wellness ethics and responsible AI practice.</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">3. Eligibility and Participation</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must be 18 years or older.</li>
                <li><strong>Core service communications:</strong> the Platform is a messaging-based reflection service. By joining, you consent to receive the reflections and service messages that constitute the service itself, on the channel through which you joined (see Section 20). You may stop the service at any time.</li>
                <li>Optional communications, including community broadcasts and partner content, require a separate opt-in and are never a condition of using the Platform or any paid service.</li>
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
                <li>Refrain from misusing AI functions to produce harmful, illegal or discriminatory content.</li>
              </ul>
              <p className="mt-3">GenMyo may restrict or terminate access to preserve ethical compliance and user safety.</p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">5. AI Ethics and Governance</h2>
              <p>
                GenMyo designs and manages its AI with reference to the OECD AI Principles (2019), the UNESCO Recommendation on the Ethics of AI (2021), the EU AI Act (2024), the NIST AI Risk Management Framework (2023) and the Singapore Model AI Governance Framework.
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Principle</th>
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Reference</th>
                      <th className="text-left py-3 font-semibold text-foreground">GenMyo practice</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Human-centric and beneficial</td>
                      <td className="py-3 pr-4">OECD / UNESCO</td>
                      <td className="py-3">AI is designed to support human growth, with human oversight of the system.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Fairness and non-discrimination</td>
                      <td className="py-3 pr-4">EU AI Act</td>
                      <td className="py-3">Content and models are reviewed for bias as they evolve.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Transparency and explainability</td>
                      <td className="py-3 pr-4">NIST AI RMF</td>
                      <td className="py-3">Interactions with GenMyo's AI are identified as AI-generated guidance.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Accountability and oversight</td>
                      <td className="py-3 pr-4">Singapore Model Framework</td>
                      <td className="py-3">Internal review processes and audit logs support accountability.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Safety and reliability</td>
                      <td className="py-3 pr-4">UNESCO</td>
                      <td className="py-3">Automated safety screening, with ongoing testing and risk mitigation.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Privacy and data minimisation</td>
                      <td className="py-3 pr-4">PDPA / GDPR principles</td>
                      <td className="py-3">Personal data is minimised, encrypted and, where used for analytics, anonymised.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground italic">
                These practices reflect commitments that GenMyo implements proportionately to its stage and scale. They do not create duties beyond those stated in these Terms.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">6. AI Use Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI outputs are probabilistic, context-limited and not medical or therapeutic.</li>
                <li>Guidance is provided “as is” and must be interpreted with personal discretion.</li>
                <li>GenMyo accepts no liability for emotional, behavioural or financial consequences arising from AI content.</li>
              </ul>
            </section>

            {/* 6A */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">6A. User Responsibility and Limitation of Reliance</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>No Clinical or Emergency Function:</strong> The Platform is not an emergency, crisis-intervention or suicide-prevention service. The Platform includes automated safety filters that help keep interactions appropriate and may surface helpline information. These filters are a design safeguard, not a monitoring or alert service; they do not guarantee detection or intervention and do not create any duty of care. If you are in danger or distress, contact local emergency services immediately.</li>
                <li><strong>No Duty of Care Relationship:</strong> Use of the Platform does not create a doctor-patient, counsellor-client, fiduciary or duty-of-care relationship. GenMyo and its AI systems have no legal obligation to prevent or respond to user actions.</li>
                <li><strong>User Autonomy and Decision-Making:</strong> You retain full responsibility for your actions, decisions and outcomes. GenMyo's role is supportive and educational only.</li>
                <li><strong>Limitation of Liability for Adverse Acts:</strong> To the maximum extent permitted by law, GenMyo and its affiliates are not liable for self-harm, harm to others, or any act based on Platform content.</li>
                <li><strong>Ethical Safeguards Without Assumed Liability:</strong> GenMyo maintains AI-safety, content-moderation and escalation practices consistent with recognised principles. These are voluntary best-practice efforts and do not create any additional legal duty.</li>
                <li><strong>Aggregate Liability Cap:</strong> To the maximum extent permitted by law, GenMyo’s total aggregate liability for all claims arising out of or in connection with the Platform or these Terms, whether in contract, tort (including negligence), breach of statutory duty or otherwise, is limited to the greater of: (a) the total fees paid by you to GenMyo in the twelve (12) months preceding the event giving rise to the claim (or the first in a series of connected events); and (b) one hundred Singapore dollars (S$100). This cap does not apply to liability for death or personal injury caused by negligence, to fraud or fraudulent misrepresentation, or to any liability that cannot be excluded or limited under applicable law.</li>
              </ol>
            </section>

            {/* 7 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">7. Intellectual Property Rights and User Content</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>All Platform software, AI systems, frameworks, content and derived materials are the exclusive property of GenMyo Pte. Ltd.</li>
                <li><strong>Licence to your reflections:</strong> you grant GenMyo a licence to process the reflections and messages you submit solely to operate the Platform: delivering and personalising the service to you, safety screening, quality assurance, and producing anonymised, aggregated analytics and insights.</li>
                <li><strong>No model training on WhatsApp content:</strong> GenMyo does not use the content of messages received via WhatsApp to train or improve general-purpose AI models.</li>
                <li>Anonymised and aggregated data and analytics derived under this Section remain the property of GenMyo and constitute trade secrets not subject to disclosure or access.</li>
              </ul>
              
              <h3 className="font-serif text-xl font-medium text-foreground mt-6 mb-3">GenMyo Content and your licence to it:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All audio, video, text, courses, prompts, imagery and other materials published by GenMyo (“GenMyo Content”) are protected by copyright, trademark, trade secret and other laws, and remain the exclusive property of GenMyo Pte. Ltd. or its licensors.</li>
                <li>GenMyo grants you a personal, non-exclusive, non-transferable, revocable licence to access and use GenMyo Content for your own personal, non-commercial wellbeing. You may not copy, reproduce, record, download (except where a download function is provided), distribute, publish, publicly perform, resell, scrape or create derivative works from GenMyo Content without our prior written consent.</li>
                <li><strong>No AI training on GenMyo Content:</strong> you may not use GenMyo Content, in whole or in part, to train, fine-tune, develop or improve any artificial intelligence model, dataset or automated system. All text and data mining rights are expressly reserved.</li>
                <li><strong>AI-assisted production:</strong> some GenMyo Content, including narration and voices, is produced with the assistance of AI tools under commercial licences held by GenMyo. GenMyo retains all available rights in such content, including copyright in the underlying human-authored scripts, curricula, recordings, and the selection and arrangement of its content library.</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">8. Confidentiality and Community Conduct</h2>
              <p>Users must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep reflections and group discussions private, including content shared via WhatsApp.</li>
                <li>Engage respectfully across cultures.</li>
                <li>Avoid harassment, misinformation or exploitation.</li>
              </ul>
              <p className="mt-3">Violation may result in account suspension, removal from WhatsApp channels, or legal action.</p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">9. Data Protection and Privacy</h2>
              <p>
                GenMyo's data practices are designed to comply with applicable data-protection laws, including Singapore's Personal Data Protection Act (PDPA) and, where applicable to our users, the GDPR and equivalent frameworks. We employ security controls aligned with recognised industry standards, including encryption in transit and at rest, strict access controls and role-based data segregation.
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
                You may request access to, correction of, or deletion of your personal data as provided by applicable law. Deletion requests are actioned through GenMyo's data-deletion process within thirty (30) days. Deletion is subject to records that GenMyo is required or permitted by law to retain, such as proof of consent and opt-in, transaction and billing records, and records relevant to an investigation, legal claim or legal hold; any such records are kept only as long as the applicable legal or business purpose requires. GenMyo is not obliged to disclose proprietary analytics, model logic or derived datasets. All anonymised and aggregated data remain GenMyo intellectual property.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">11. Employer and Organisational Programmes</h2>
              <p>Where you access the Platform through an employer or other organisation:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your individual reflections, responses, scores and profile are never shared with your employer or organisation.</li>
                <li>Organisational reporting is aggregate and anonymised only, and no metric is reported for any group of fewer than ten (10) participants.</li>
                <li>Your employer receives only the seat, participation-count and billing information necessary to administer the programme.</li>
              </ul>
            </section>

            {/* 12 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">12. Human Connection Services</h2>
              <p>
                The Platform may offer optional sessions with independent guides and mentors. These practitioners are independent contractors, not employees, agents or clinical providers of GenMyo. Sessions are non-clinical mindfulness and mentorship only. Separate terms, including scheduling, conduct and any fees, will be presented before you book a session and will form part of these Terms.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">13. Paid Services</h2>
              <p>
                Parts of the Platform are currently provided free of charge. Before any paid subscription or purchase is introduced, the applicable pricing, billing, renewal and refund terms will be presented for your acceptance at the point of purchase and will form part of these Terms.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">14. Global Well-being Principles</h2>
              <p>
                GenMyo's mission aligns with the WHO Comprehensive Mental Health Action Plan 2013 to 2030 and UN Sustainable Development Goal 3, Good Health and Well-being. We promote preventive wellness and emotional literacy but do not provide medical or financial remedies.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">15. Limitations of Liability and Warranty Disclaimer</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Platform is provided “as is” and “as available”.</li>
                <li>GenMyo disclaims all implied warranties.</li>
                <li>We are not liable for:
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Psychological or financial harm arising from external circumstances;</li>
                    <li>Reliance on AI content;</li>
                    <li>Service interruptions or third-party failures, including WhatsApp outages or delivery failures.</li>
                  </ul>
                </li>
                <li>The aggregate liability cap in Section 6A(6) applies. Nothing in these Terms limits liability where such limitation is prohibited by law.</li>
              </ul>
            </section>

            {/* 16 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">16. Compliance and Audit Rights</h2>
              <p>
                GenMyo maintains internal AI-ethics review processes and may provide regulators or partners with summaries of compliance. Users may not conduct external audits or reverse-engineer the Platform without written consent.
              </p>
            </section>

            {/* 17 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">17. Modification and Termination</h2>
              <p>
                We may update these Terms for regulatory or operational reasons. Material revisions take effect 14 days after notice unless accepted sooner by continued use. Accounts breaching these Terms may be terminated immediately. WhatsApp consent may be withdrawn at any time (see Section 20.3).
              </p>
            </section>

            {/* 18 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">18. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of Singapore, with equivalent consumer protections for international users. Disputes will be resolved first by good-faith mediation, then by confidential arbitration under the Singapore International Arbitration Centre (SIAC) Rules. Venue: Singapore. Language: English. The English version prevails.
              </p>
            </section>

            {/* 19 */}
            <section>
              <h2 className="font-serif text-2xl font-medium text-foreground">19. Contact</h2>
              <p>GenMyo Pte. Ltd.</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>General enquiries: <a href="mailto:hello@genmyo.ai" className="text-primary underline">hello@genmyo.ai</a></li>
                <li>Data and privacy requests: <a href="mailto:hello@genmyo.ai" className="text-primary underline">hello@genmyo.ai</a> with the subject line “Privacy”</li>
                <li>Legal notices: <a href="mailto:admin@genmyo.ai" className="text-primary underline">admin@genmyo.ai</a></li>
              </ul>
            </section>

            {/* Section 20 */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">20. WhatsApp Communications: Opt-In Terms & Conditions</h2>
              <p className="text-muted-foreground italic mb-6">This Section governs your consent to receive communications from GenMyo via WhatsApp.</p>

              {/* 20.1 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.1 Scope of WhatsApp Communications</h3>
              <p>By opting in, you consent to receive the following message types from GenMyo via WhatsApp Business (powered by the WhatsApp Business API, Meta Platforms):</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Message category</th>
                      <th className="text-left py-3 font-semibold text-foreground">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Wellness Reflections (core service)</td>
                      <td className="py-3">Daily or weekly AI-generated reflection prompts, mindfulness practices, awareness exercises. These constitute the reflection service itself.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Programme and Service Updates</td>
                      <td className="py-3">Programme milestones, feature launches, session reminders.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Transactional Alerts</td>
                      <td className="py-3">Subscription confirmations, payment receipts, account notifications.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Community Broadcasts (optional, separate opt-in)</td>
                      <td className="py-3">Event invitations, group workshops, curated content from GenMyo's partners.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Support and Feedback</td>
                      <td className="py-3">Responses to user queries submitted through the Platform or WhatsApp.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 20.2 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.2 How to Opt In</h3>
              <p>You may opt in to WhatsApp communications by any of the following methods:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>WhatsApp keyword:</strong> sending a join message or keyword (for example, START) to our verified WhatsApp Business number.</li>
                <li><strong>Registration form:</strong> checking the WhatsApp opt-in box on a GenMyo registration, waitlist or onboarding form.</li>
                <li><strong>QR code:</strong> scanning a GenMyo-issued QR code that initiates the opt-in flow on WhatsApp.</li>
                <li><strong>Written confirmation:</strong> confirming your opt-in in writing during onboarding with the GenMyo team.</li>
                <li><strong>In-thread acceptance:</strong> tapping an accept button, or replying with an affirmative keyword (for example, ACCEPT), in response to a GenMyo message or card on WhatsApp.</li>
              </ul>
              <p className="mt-3">
                Opt-in constitutes your express, freely given and informed consent under applicable data-protection laws (including PDPA and, where applicable, GDPR). Consent to optional categories is never a condition of using the Platform or any paid service.
              </p>

              {/* 20.3 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.3 Opt-Out / Unsubscribe</h3>
              <p>You may withdraw your WhatsApp consent at any time with immediate effect by:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Replying <strong>STOP</strong> or <strong>UNSUBSCRIBE</strong> to any GenMyo WhatsApp message.</li>
                <li>Emailing <a href="mailto:hello@genmyo.ai" className="text-primary underline">hello@genmyo.ai</a> with the subject line “WhatsApp Opt-Out”.</li>
              </ul>
              <p className="mt-3">
                Because the reflection service is delivered on WhatsApp, opting out of all WhatsApp messages pauses delivery of the reflection service itself. Your account and data are otherwise unaffected unless you separately request deletion (Section 10). Transactional messages required by law may still be sent via alternative channels.
              </p>

              {/* 20.4 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.4 Frequency, Costs and Timing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Message frequency:</strong> approximately 3 to 7 messages per week, subject to your personalised settings and subscription tier.</li>
                <li><strong>Data rates:</strong> standard carrier messaging or data charges may apply. GenMyo does not charge separately for WhatsApp messages.</li>
                <li><strong>Delivery hours:</strong> GenMyo endeavours to send messages during reasonable hours in your local timezone. Delivery is subject to WhatsApp infrastructure and carrier availability.</li>
                <li>Message delivery is not guaranteed. GenMyo is not liable for delayed or undelivered WhatsApp messages.</li>
              </ul>

              {/* 20.5 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.5 Data Processing via WhatsApp</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your phone number and message metadata are processed by Meta Platforms Inc. under WhatsApp's Privacy Policy. GenMyo has no control over Meta's data practices.</li>
                <li>Message content shared with GenMyo via WhatsApp is processed under GenMyo's Global Privacy & Data Usage Policy and stored on GenMyo's secure servers.</li>
                <li>GenMyo does not use the content of your WhatsApp messages to train or improve general-purpose AI models.</li>
                <li>WhatsApp messages may be reviewed and recorded by GenMyo for quality assurance, safety compliance and service improvement of the service provided to you.</li>
                <li>GenMyo will not use your WhatsApp number for marketing purposes beyond the categories consented to in Section 20.1.</li>
                <li>Cross-border data transfers are governed by Meta's Standard Contractual Clauses and GenMyo's cross-border compliance safeguards.</li>
              </ul>

              {/* 20.6 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.6 WhatsApp Business Compliance</h3>
              <p>
                GenMyo's WhatsApp Business Account operates in compliance with the Meta Business Messaging Policy (<a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">whatsapp.com/legal/business-policy</a>), the WhatsApp Business Terms of Service, and applicable national e-communications regulations (including Singapore PDPA Advisory Guidelines on the DNC Registry, the EU ePrivacy Directive, and the US TCPA where applicable). GenMyo will not send unsolicited messages and will only contact users who have provided valid opt-in consent. Violation reports can be directed to <a href="mailto:admin@genmyo.ai" className="text-primary underline">admin@genmyo.ai</a>.
              </p>

              {/* 20.7 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.7 Children and WhatsApp</h3>
              <p>
                WhatsApp's own minimum-age requirements apply in your jurisdiction. Independently of WhatsApp's rules, the GenMyo Platform is restricted as set out in Section 3 (18 years or older). GenMyo will not knowingly send WhatsApp communications to users below these thresholds. If you believe a minor has opted in, contact <a href="mailto:hello@genmyo.ai" className="text-primary underline">hello@genmyo.ai</a> immediately.
              </p>

              {/* 20.8 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.8 Changes to WhatsApp Communications Programme</h3>
              <p>
                GenMyo may modify the scope, frequency or nature of WhatsApp communications upon 14 days' notice sent via WhatsApp and/or email. Continued engagement after the notice period constitutes acceptance. You may opt out at any time per Section 20.3.
              </p>

              {/* 20.9 */}
              <h3 className="font-serif text-xl font-medium text-foreground mt-8 mb-3">20.9 Sample Opt-In Language</h3>
              <div className="bg-muted/50 rounded-lg p-6 mt-2 space-y-3">
                <p className="text-sm italic text-foreground/80">
                  <strong>Core service:</strong> “Yes, I agree to receive GenMyo wellness reflections and service updates on WhatsApp. I can stop at any time by replying STOP. Message frequency varies; standard data rates may apply.”
                </p>
                <p className="text-sm italic text-foreground/80">
                  <strong>Optional (separate, unchecked by default):</strong> “I would also like to receive community broadcasts and curated partner content from GenMyo.”
                </p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Each statement should appear as a clearly visible, unchecked checkbox in all digital opt-in interfaces.
              </p>
            </section>

            {/* 21 */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">21. Additional Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>No professional advice:</strong> Nothing on the Platform constitutes medical, psychological, psychiatric, legal, financial or other professional advice. Always seek the advice of a qualified professional for questions about a medical or mental health condition.</li>
                <li><strong>AI-generated content:</strong> Reflections and guidance are generated by artificial intelligence. They may be incomplete, imprecise or unsuitable for your circumstances, and are provided for reflective and educational purposes only.</li>
                <li><strong>No guaranteed outcomes:</strong> Wellbeing outcomes vary by individual. GenMyo makes no representation that any particular result will be achieved.</li>
                <li><strong>Third-party platforms:</strong> GenMyo is an independent service. It is not affiliated with, endorsed by or sponsored by Meta Platforms, Inc. or WhatsApp LLC. WhatsApp and Meta are trademarks of Meta Platforms, Inc. GenMyo is not responsible for the availability, policies or practices of third-party platforms.</li>
                <li><strong>Partner content:</strong> Where the Platform carries content from partners, that content reflects the views of its authors and is provided for general wellbeing education only.</li>
                <li><strong>Synthetic media:</strong> Narration and voices in GenMyo audio and video content may be AI-generated. They are synthetic, and do not depict or represent any real practitioner or individual unless expressly stated.</li>
              </ul>
            </section>

            {/* 22 */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">22. General Provisions</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Entire agreement:</strong> These Terms, together with the GenMyo Global Privacy & Data Usage Policy and any terms presented at the point of purchase or booking, form the entire agreement between you and GenMyo regarding the Platform. If these Terms conflict with the Privacy Policy on a dataprotection matter, the Privacy Policy prevails; on all other matters, these Terms prevail.</li>
                <li><strong>Severability:</strong> If any provision of these Terms is held invalid or unenforceable, that provision will be enforced to the maximum extent permissible and the remaining provisions will remain in full force.</li>
                <li><strong>No waiver:</strong> A failure or delay by GenMyo to enforce any provision is not a waiver of that provision or of the right to enforce it later.</li>
                <li><strong>Assignment:</strong> You may not assign or transfer these Terms. GenMyo may assign these Terms in connection with a merger, acquisition, corporate reorganisation or sale of assets, with notice to you.</li>
                <li><strong>Force majeure:</strong> GenMyo is not liable for any failure or delay caused by events beyond its reasonable control, including outages of WhatsApp or other third-party infrastructure, telecommunications failures, and acts of government.</li>
                <li><strong>Survival:</strong> Sections that by their nature should survive termination (including Sections 6, 6A, 7, 8, 10, 15, 18, 21 and 22) survive any termination of these Terms.</li>
                <li><strong>Headings:</strong> Headings are for convenience only and do not affect interpretation.</li>
              </ul>
            </section>

            {/* 23 */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">23. Acknowledgment and Consent</h2>
              <p>By using GenMyo, including opting in to WhatsApp communications, you confirm that you:</p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Understand that GenMyo is a reflective AI platform, non-clinical and non-religious, and not therapy or professional advice.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Consent to responsible AI and data use under GenMyo's Privacy Policy.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Accept full responsibility for personal decisions and actions.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Release GenMyo Pte. Ltd. from liability for outcomes resulting from Platform content, to the maximum extent permitted by law.</li>
                <li className="flex items-start gap-2"><span className="text-primary">✅</span> Understand that WhatsApp opt-in for optional categories is voluntary and may be withdrawn at any time (Section 20.3).</li>
              </ul>
            </section>

            {/* Final Statement */}
            <section className="border-t border-border pt-10">
              <h2 className="font-serif text-2xl font-medium text-foreground">Final Statement</h2>
              <p>
                GenMyo upholds human-centric standards of fairness, accountability, transparency and safety. Our purpose is to empower awareness and resilience; your responsibility is to use that awareness wisely.
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

