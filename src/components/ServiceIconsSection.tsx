import { useServiceIcons } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

const ServiceIconsSection = () => {
  const { data: services, isLoading } = useServiceIcons();

  const getIcon = (iconName: string): LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || LucideIcons.HelpCircle;
  };

  if (isLoading) {
    return (
      <section className="py-6 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4 md:gap-8 lg:gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-12 h-12 md:w-14 md:h-14 rounded-xl" />
                <Skeleton className="w-12 h-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-6 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 md:gap-8 lg:gap-12">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon_name);
            return (
              <div
                key={service.id}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-border bg-white flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  {service.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceIconsSection;
