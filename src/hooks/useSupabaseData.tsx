import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

// Generic fetch hook with realtime support
function useRealtimeQuery<T>(
  queryKey: string[],
  tableName: string,
  queryFn: () => Promise<T>,
  enabled = true
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const channel = supabase
      .channel(`${tableName}_changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tableName },
        () => {
          queryClient.invalidateQueries({ queryKey });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, queryKey, tableName, enabled]);

  return useQuery({
    queryKey,
    queryFn,
    enabled,
  });
}

// Homepage Settings
export function useHomepageSettings() {
  return useRealtimeQuery<Tables<"homepage_settings">[]>(
    ["homepage_settings"],
    "homepage_settings",
    async () => {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data || [];
    }
  );
}

// Navigation Menu
export function useNavigationMenu() {
  return useRealtimeQuery<Tables<"navigation_menu">[]>(
    ["navigation_menu"],
    "navigation_menu",
    async () => {
      const { data, error } = await supabase
        .from("navigation_menu")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// Footer Settings
export function useFooterSettings() {
  return useRealtimeQuery<Tables<"footer_settings">[]>(
    ["footer_settings"],
    "footer_settings",
    async () => {
      const { data, error } = await supabase
        .from("footer_settings")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data || [];
    }
  );
}

// Service Icons
export function useServiceIcons() {
  return useRealtimeQuery<Tables<"service_icons">[]>(
    ["service_icons"],
    "service_icons",
    async () => {
      const { data, error } = await supabase
        .from("service_icons")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// Prayer Times
export function usePrayerTimes() {
  return useRealtimeQuery<Tables<"prayer_times_settings"> | null>(
    ["prayer_times"],
    "prayer_times_settings",
    async () => {
      const { data, error } = await supabase
        .from("prayer_times_settings")
        .select("*")
        .eq("is_active", true)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    }
  );
}

// Umrah Packages
export function useUmrahPackages(featured?: boolean) {
  return useRealtimeQuery<Tables<"umrah_packages">[]>(
    ["umrah_packages", featured ? "featured" : "all"],
    "umrah_packages",
    async () => {
      let query = supabase
        .from("umrah_packages")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (featured) {
        query = query.eq("is_featured", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  );
}

// Hajj Packages
export function useHajjPackages(featured?: boolean) {
  return useRealtimeQuery<Tables<"hajj_packages">[]>(
    ["hajj_packages", featured ? "featured" : "all"],
    "hajj_packages",
    async () => {
      let query = supabase
        .from("hajj_packages")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (featured) {
        query = query.eq("is_featured", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  );
}

// Get single Umrah Package by ID
export function useUmrahPackageById(id: string | undefined) {
  return useRealtimeQuery<Tables<"umrah_packages"> | null>(
    ["umrah_package", id || ""],
    "umrah_packages",
    async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("umrah_packages")
        .select("*")
        .eq("id", id)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    !!id
  );
}

// Get single Hajj Package by ID
export function useHajjPackageById(id: string | undefined) {
  return useRealtimeQuery<Tables<"hajj_packages"> | null>(
    ["hajj_package", id || ""],
    "hajj_packages",
    async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("hajj_packages")
        .select("*")
        .eq("id", id)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    !!id
  );
}

// Highlight Services
export function useHighlightServices() {
  return useRealtimeQuery<Tables<"highlight_services">[]>(
    ["highlight_services"],
    "highlight_services",
    async () => {
      const { data, error } = await supabase
        .from("highlight_services")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// Blog Posts
export function useBlogPosts(featured?: boolean) {
  return useRealtimeQuery<Tables<"blog_posts">[]>(
    ["blog_posts", featured ? "featured" : "all"],
    "blog_posts",
    async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      
      if (featured) {
        query = query.eq("is_featured", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  );
}

// Gallery Items
export function useGalleryItems() {
  return useRealtimeQuery<Tables<"gallery_items">[]>(
    ["gallery_items"],
    "gallery_items",
    async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// Team Members
export function useTeamMembers() {
  return useRealtimeQuery<Tables<"team_members">[]>(
    ["team_members"],
    "team_members",
    async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// About Us Content
export function useAboutUsContent() {
  return useRealtimeQuery<Tables<"about_us_content">[]>(
    ["about_us_content"],
    "about_us_content",
    async () => {
      const { data, error } = await supabase
        .from("about_us_content")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// Products
export function useProducts() {
  return useRealtimeQuery<Tables<"products">[]>(
    ["products"],
    "products",
    async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    }
  );
}

// Arrangement Section
export function useArrangementSection() {
  return useRealtimeQuery<Tables<"arrangement_section">[]>(
    ["arrangement_section"],
    "arrangement_section",
    async () => {
      const { data, error } = await supabase
        .from("arrangement_section")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
      if (error) throw error;
      return data || [];
    }
  );
}

// Site Settings
export function useSiteSettings() {
  return useRealtimeQuery<Record<string, string>>(
    ["site_settings"],
    "site_settings",
    async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (error) throw error;
      
      const settings: Record<string, string> = {};
      data?.forEach((item) => {
        if (item.key && item.value) {
          settings[item.key] = item.value;
        }
      });
      return settings;
    }
  );
}

// Submit Contact Message
import { z } from "zod";

const contactMessageSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  email: z.string().trim().email("Email tidak valid").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Pesan terlalu pendek").max(2000, "Pesan maksimal 2000 karakter"),
});

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const validated = contactMessageSchema.parse(data);
  const { error } = await supabase.from("contact_messages").insert([validated]);
  if (error) throw error;
  return true;
}