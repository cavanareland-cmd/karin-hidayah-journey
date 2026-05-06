import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CategoryPageData {
  id: string;
  page_key: string;
  hero: any;
  items: any[];
  features: string[];
  extra: any;
  cta: any;
  is_active: boolean;
}

export function useCategoryPage(pageKey: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`category_pages_${pageKey}_${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "category_pages", filter: `page_key=eq.${pageKey}` },
        () => queryClient.invalidateQueries({ queryKey: ["category_page", pageKey] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageKey, queryClient]);

  return useQuery({
    queryKey: ["category_page", pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("category_pages")
        .select("*")
        .eq("page_key", pageKey)
        .maybeSingle();
      if (error) throw error;
      return data as CategoryPageData | null;
    },
  });
}
