import { Play, BookOpen, Users, Headphones } from "lucide-react";

const resources = [
  {
    icon: Play,
    type: "Video",
    title: "Navigating Career Uncertainty",
    author: "Expert Series",
    description: "Practical frameworks for building clarity when the path ahead feels unclear.",
    comingSoon: true,
  },
  {
    icon: BookOpen,
    type: "Guide",
    title: "Building Emotional Resilience",
    author: "GenMyo Originals",
    description: "Evidence-based approaches to developing inner strength that compounds over time.",
    comingSoon: true,
  },
  {
    icon: Headphones,
    type: "Audio",
    title: "Reflective Practices for Daily Life",
    author: "Practitioner Talks",
    description: "Short, grounding exercises designed to fit into the rhythm of everyday life.",
    comingSoon: true,
  },
  {
    icon: Users,
    type: "Workshop",
    title: "From Burnout to Purpose",
    author: "Community Sessions",
    description: "Group-led sessions exploring the transition from overwhelm to intentional living.",
    comingSoon: true,
  },
];

const ResourcesSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Coming Soon
          </p>
          <h2 className="heading-section text-foreground mb-6">
            The GenMyo Repository
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Curated content from experts and practitioners: videos, guides, and 
            resources designed to support your journey of inner change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="card-elevated group relative overflow-hidden"
            >
              {resource.comingSoon && (
                <span className="absolute top-4 right-4 text-xs font-medium uppercase tracking-wider px-3 py-1 bg-accent/15 text-accent rounded-full">
                  Coming Soon
                </span>
              )}
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6">
                <resource.icon size={24} className="text-muted-foreground" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                {resource.type}
              </p>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                {resource.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{resource.author}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
