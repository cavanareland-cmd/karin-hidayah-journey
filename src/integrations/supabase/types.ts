export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      about_us_content: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          order_index: number
          section_key: string
          stats: Json | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          order_index?: number
          section_key: string
          stats?: Json | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          order_index?: number
          section_key?: string
          stats?: Json | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      arrangement_section: {
        Row: {
          badge_text: string | null
          button_link: string | null
          button_text: string | null
          created_at: string
          date_text: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location_text: string | null
          order_index: number | null
          section_key: string
          spots_text: string | null
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          badge_text?: string | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          date_text?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_text?: string | null
          order_index?: number | null
          section_key: string
          spots_text?: string | null
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          badge_text?: string | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          date_text?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_text?: string | null
          order_index?: number | null
          section_key?: string
          spots_text?: string | null
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      footer_settings: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_active: boolean
          links: Json | null
          section_key: string
          social_links: Json | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          links?: Json | null
          section_key: string
          social_links?: Json | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          links?: Json | null
          section_key?: string
          social_links?: Json | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          embed_url: string | null
          id: string
          image_url: string
          is_active: boolean
          media_type: string | null
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          embed_url?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          media_type?: string | null
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          embed_url?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          media_type?: string | null
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hajj_packages: {
        Row: {
          agent_info: Json | null
          category: string
          created_at: string
          cta_section: Json | null
          departure_year: number | null
          description: string | null
          duration_days: number
          facilities: Json | null
          facilities_not_included: Json | null
          gallery_images: Json | null
          gallery_section: Json | null
          hero_image: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          itinerary: Json | null
          location_text: string | null
          name: string
          period_text: string | null
          price: number
          related_packages: Json | null
          review_stats: Json | null
          reviews_data: Json | null
          subtitle: string | null
          updated_at: string
          visa_type: string | null
          waiting_period: string | null
        }
        Insert: {
          agent_info?: Json | null
          category?: string
          created_at?: string
          cta_section?: Json | null
          departure_year?: number | null
          description?: string | null
          duration_days: number
          facilities?: Json | null
          facilities_not_included?: Json | null
          gallery_images?: Json | null
          gallery_section?: Json | null
          hero_image?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          itinerary?: Json | null
          location_text?: string | null
          name: string
          period_text?: string | null
          price: number
          related_packages?: Json | null
          review_stats?: Json | null
          reviews_data?: Json | null
          subtitle?: string | null
          updated_at?: string
          visa_type?: string | null
          waiting_period?: string | null
        }
        Update: {
          agent_info?: Json | null
          category?: string
          created_at?: string
          cta_section?: Json | null
          departure_year?: number | null
          description?: string | null
          duration_days?: number
          facilities?: Json | null
          facilities_not_included?: Json | null
          gallery_images?: Json | null
          gallery_section?: Json | null
          hero_image?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          itinerary?: Json | null
          location_text?: string | null
          name?: string
          period_text?: string | null
          price?: number
          related_packages?: Json | null
          review_stats?: Json | null
          reviews_data?: Json | null
          subtitle?: string | null
          updated_at?: string
          visa_type?: string | null
          waiting_period?: string | null
        }
        Relationships: []
      }
      highlight_services: {
        Row: {
          badge_text: string | null
          created_at: string
          description: string | null
          duration: string | null
          guests: number | null
          icon_name: string | null
          id: string
          image_url: string | null
          is_active: boolean
          link_url: string | null
          max_guests: number | null
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          badge_text?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          guests?: number | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          max_guests?: number | null
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          badge_text?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          guests?: number | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          max_guests?: number | null
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_settings: {
        Row: {
          button_link: string | null
          button_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          section_key: string
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          section_key: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          section_key?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      navigation_menu: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          label: string
          order_index: number
          parent_id: string | null
          path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          label: string
          order_index?: number
          parent_id?: string | null
          path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string
          order_index?: number
          parent_id?: string | null
          path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "navigation_menu_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_menu"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_times_settings: {
        Row: {
          asr_azan: string | null
          asr_time: string | null
          chourouk_time: string | null
          created_at: string
          fajr_azan: string | null
          fajr_time: string | null
          id: string
          is_active: boolean
          isha_azan: string | null
          isha_time: string | null
          jumah_azan: string | null
          jumah_time: string | null
          location_name: string
          maghrib_azan: string | null
          maghrib_time: string | null
          updated_at: string
          zuhr_azan: string | null
          zuhr_time: string | null
        }
        Insert: {
          asr_azan?: string | null
          asr_time?: string | null
          chourouk_time?: string | null
          created_at?: string
          fajr_azan?: string | null
          fajr_time?: string | null
          id?: string
          is_active?: boolean
          isha_azan?: string | null
          isha_time?: string | null
          jumah_azan?: string | null
          jumah_time?: string | null
          location_name: string
          maghrib_azan?: string | null
          maghrib_time?: string | null
          updated_at?: string
          zuhr_azan?: string | null
          zuhr_time?: string | null
        }
        Update: {
          asr_azan?: string | null
          asr_time?: string | null
          chourouk_time?: string | null
          created_at?: string
          fajr_azan?: string | null
          fajr_time?: string | null
          id?: string
          is_active?: boolean
          isha_azan?: string | null
          isha_time?: string | null
          jumah_azan?: string | null
          jumah_time?: string | null
          location_name?: string
          maghrib_azan?: string | null
          maghrib_time?: string | null
          updated_at?: string
          zuhr_azan?: string | null
          zuhr_time?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          price: number
          stock: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          price: number
          stock?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          price?: number
          stock?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      service_icons: {
        Row: {
          created_at: string
          icon_name: string
          id: string
          is_active: boolean
          label: string
          order_index: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon_name: string
          id?: string
          is_active?: boolean
          label: string
          order_index?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon_name?: string
          id?: string
          is_active?: boolean
          label?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          order_index: number
          position: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          order_index?: number
          position: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          order_index?: number
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      umrah_packages: {
        Row: {
          agent_info: Json | null
          category: string
          created_at: string
          cta_section: Json | null
          departure_date: string | null
          description: string | null
          duration_days: number
          facilities: Json | null
          facilities_not_included: Json | null
          gallery_images: Json | null
          gallery_section: Json | null
          hero_image: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          itinerary: Json | null
          location_text: string | null
          name: string
          period_text: string | null
          price: number
          rating: number | null
          related_packages: Json | null
          review_stats: Json | null
          reviews_data: Json | null
          subtitle: string | null
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          agent_info?: Json | null
          category?: string
          created_at?: string
          cta_section?: Json | null
          departure_date?: string | null
          description?: string | null
          duration_days: number
          facilities?: Json | null
          facilities_not_included?: Json | null
          gallery_images?: Json | null
          gallery_section?: Json | null
          hero_image?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          itinerary?: Json | null
          location_text?: string | null
          name: string
          period_text?: string | null
          price: number
          rating?: number | null
          related_packages?: Json | null
          review_stats?: Json | null
          reviews_data?: Json | null
          subtitle?: string | null
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          agent_info?: Json | null
          category?: string
          created_at?: string
          cta_section?: Json | null
          departure_date?: string | null
          description?: string | null
          duration_days?: number
          facilities?: Json | null
          facilities_not_included?: Json | null
          gallery_images?: Json | null
          gallery_section?: Json | null
          hero_image?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          itinerary?: Json | null
          location_text?: string | null
          name?: string
          period_text?: string | null
          price?: number
          rating?: number | null
          related_packages?: Json | null
          review_stats?: Json | null
          reviews_data?: Json | null
          subtitle?: string | null
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
