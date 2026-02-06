import { useHighlightServices, useTeamMembers } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import scholar1 from "@/assets/scholar-1.jpg";

const HighlightsSection = () => {
  const { data: highlights, isLoading: loadingHighlights } = useHighlightServices();
  const { data: teamMembers, isLoading: loadingTeam } = useTeamMembers();

  const isLoading = loadingHighlights || loadingTeam;
  
  // Use team members if available, otherwise show highlights
  const displayItems = teamMembers && teamMembers.length > 0 ? teamMembers : [];

  if (isLoading) {
    return (
      <section className="py-10 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-4 w-24 mx-auto mb-2" />
            <Skeleton className="h-8 w-64 mx-auto mb-3" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="flex justify-center gap-4 overflow-x-auto pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-28 md:w-32 text-center">
                <Skeleton className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-2xl mb-3" />
                <Skeleton className="h-4 w-20 mx-auto mb-1" />
                <Skeleton className="h-3 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="py-10 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-primary text-sm font-medium mb-2">
            Our Service
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
            Explore our Highlights services
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            With a steadfast commitment to excellence, Karin Hidayah Tour has achieved 
            remarkable milestones in serving the pilgrims' community
          </p>
        </div>

        {/* Team/Scholars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {displayItems.map((member) => (
            <div
              key={member.id}
              className="text-center group cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary/30 transition-all">
                  <img
                    src={member.image_url || scholar1}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {member.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
