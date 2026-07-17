import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";

const Privacy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy & Your Data — What GenMyo Stores, and What It Doesn't"
        description="Plain English: what we store from your reflections, how long we keep it, who can read it, whether it trains AI models, and how to delete everything in one message."
      />

      {/* Header */}
      <header className="py-20 md:py-24 text-center bg-background">
        <div className="max-w-[1080px] mx-auto px-6 md:px-10">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B0703E] mb-4">
            Data & Trust
          </div>
          <h1 className="font-serif font-light text-4xl md:text-6xl tracking-tight leading-[1.06] text-[#1C1A16] max-w-3xl mx-auto">
            Privacy, <em className="italic text-[#B0703E] not-italic">plainly stated.</em>
          </h1>
          <p className="text-base md:text-lg text-[#4A463E] max-w-[560px] mx-auto mt-6 leading-relaxed">
            You are sharing your honest thoughts with us. Here is exactly what happens to your data, without the legalese.
          </p>
        </div>
      </header>

      {/* Content Table / Q&A */}
      <section className="pb-24 bg-background">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white border border-border/80 rounded-[22px] overflow-hidden shadow-sm">
            <div className="divide-y divide-border/40">
              
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  Do you store my reflections?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  Yes. To show you patterns and help you track your self-awareness over time, we store your reflection text securely.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  How long do you keep it?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  We retain your reflections for as long as your account is active. You can request deletion of your entire history at any time.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  Can a human at GenMyo read them?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  No, unless you explicitly flag a message for technical support or report a safety concern. All reflection data is processed programmatically.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  Do you use my data to train AI models?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  No. We use API endpoints that explicitly exclude your private reflection data from training base AI models. Your thoughts remain yours.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  Do you sell or share my data?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed font-semibold text-[#1C1A16]">
                  No. We never sell, rent, or monetize your reflection transcripts or personal details with advertisers or third parties.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  Who processes the messages?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  Your messages travel through Meta/WhatsApp to reach us, and are processed securely by our backend services and AWS (Amazon Web Services), in compliance with data privacy standards.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  How do I delete everything?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  Simply reply <code className="bg-[#F4F0E7] px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">DELETE</code> on WhatsApp. Our system will immediately queue your history for permanent, irreversible deletion.
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="font-serif font-medium text-lg text-[#1C1A16]">
                  How do I stop receiving prompts?
                </div>
                <div className="md:col-span-2 text-sm md:text-base text-[#4A463E] leading-relaxed">
                  Reply <code className="bg-[#F4F0E7] px-1.5 py-0.5 rounded text-xs font-mono font-bold text-[#B0703E]">STOP</code> at any point. We will cease all automated prompt outreach immediately.
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
