import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, Image, Type, Link, Menu, Layout, Globe } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type HomepageSetting = Tables<"homepage_settings">;
type NavigationMenu = Tables<"navigation_menu">;
type FooterSetting = Tables<"footer_settings">;

const AdminHomepage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Hero Settings State
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroButtonLink, setHeroButtonLink] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");

  // Logo Settings State
  const [logoTitle, setLogoTitle] = useState("");
  const [logoDescription, setLogoDescription] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState("");

  // Fetch homepage settings
  const { data: homepageSettings, isLoading: loadingHomepage } = useQuery({
    queryKey: ["homepage_settings_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*");
      if (error) throw error;
      return data as HomepageSetting[];
    },
  });

  // Fetch navigation menu
  const { data: navigationMenu, isLoading: loadingNav } = useQuery({
    queryKey: ["navigation_menu_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("navigation_menu")
        .select("*")
        .order("order_index");
      if (error) throw error;
      return data as NavigationMenu[];
    },
  });

  // Fetch footer settings
  const { data: footerSettings, isLoading: loadingFooter } = useQuery({
    queryKey: ["footer_settings_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_settings")
        .select("*");
      if (error) throw error;
      return data as FooterSetting[];
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (homepageSettings) {
      const hero = homepageSettings.find((s) => s.section_key === "hero");
      const logo = homepageSettings.find((s) => s.section_key === "logo");

      if (hero) {
        setHeroTitle(hero.title || "");
        setHeroSubtitle(hero.subtitle || "");
        setHeroDescription(hero.description || "");
        setHeroButtonText(hero.button_text || "");
        setHeroButtonLink(hero.button_link || "");
        setHeroImageUrl(hero.image_url || "");
      }

      if (logo) {
        setLogoTitle(logo.title || "");
        setLogoDescription(logo.description || "");
        setLogoImageUrl(logo.image_url || "");
      }
    }
  }, [homepageSettings]);

  // Update homepage setting mutation
  const updateHomepageMutation = useMutation({
    mutationFn: async ({
      sectionKey,
      data,
    }: {
      sectionKey: string;
      data: Partial<HomepageSetting>;
    }) => {
      const { error } = await supabase
        .from("homepage_settings")
        .update(data)
        .eq("section_key", sectionKey);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage_settings_admin"] });
      queryClient.invalidateQueries({ queryKey: ["homepage_settings"] });
      toast({ title: "Berhasil disimpan!" });
    },
    onError: (error) => {
      toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
    },
  });

  // Update navigation menu mutation
  const updateNavMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NavigationMenu> }) => {
      const { error } = await supabase
        .from("navigation_menu")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navigation_menu_admin"] });
      queryClient.invalidateQueries({ queryKey: ["navigation_menu"] });
      toast({ title: "Menu berhasil diupdate!" });
    },
    onError: (error) => {
      toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
    },
  });

  // Update footer settings mutation
  const updateFooterMutation = useMutation({
    mutationFn: async ({ sectionKey, data }: { sectionKey: string; data: Partial<FooterSetting> }) => {
      const { error } = await supabase
        .from("footer_settings")
        .update(data)
        .eq("section_key", sectionKey);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer_settings_admin"] });
      queryClient.invalidateQueries({ queryKey: ["footer_settings"] });
      toast({ title: "Footer berhasil diupdate!" });
    },
    onError: (error) => {
      toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveHero = () => {
    updateHomepageMutation.mutate({
      sectionKey: "hero",
      data: {
        title: heroTitle,
        subtitle: heroSubtitle,
        description: heroDescription,
        button_text: heroButtonText,
        button_link: heroButtonLink,
        image_url: heroImageUrl,
      },
    });
  };

  const handleSaveLogo = () => {
    updateHomepageMutation.mutate({
      sectionKey: "logo",
      data: {
        title: logoTitle,
        description: logoDescription,
        image_url: logoImageUrl,
      },
    });
  };

  const [navItems, setNavItems] = useState<NavigationMenu[]>([]);

  useEffect(() => {
    if (navigationMenu) {
      setNavItems(navigationMenu);
    }
  }, [navigationMenu]);

  const handleNavChange = (id: string, field: keyof NavigationMenu, value: string | number | boolean) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveNav = (id: string) => {
    const item = navItems.find((i) => i.id === id);
    if (item) {
      updateNavMutation.mutate({
        id,
        data: { label: item.label, path: item.path, order_index: item.order_index, is_active: item.is_active },
      });
    }
  };

  // Footer states
  const [footerBrand, setFooterBrand] = useState({ title: "", content: "", socialLinks: "" });
  const [footerServices, setFooterServices] = useState({ title: "", links: "" });
  const [footerContact, setFooterContact] = useState({ title: "", links: "" });

  useEffect(() => {
    if (footerSettings) {
      const brand = footerSettings.find((s) => s.section_key === "brand");
      const services = footerSettings.find((s) => s.section_key === "services");
      const contact = footerSettings.find((s) => s.section_key === "contact");

      if (brand) {
        setFooterBrand({
          title: brand.title || "",
          content: brand.content || "",
          socialLinks: JSON.stringify(brand.social_links || [], null, 2),
        });
      }
      if (services) {
        setFooterServices({
          title: services.title || "",
          links: JSON.stringify(services.links || [], null, 2),
        });
      }
      if (contact) {
        setFooterContact({
          title: contact.title || "",
          links: JSON.stringify(contact.links || [], null, 2),
        });
      }
    }
  }, [footerSettings]);

  const handleSaveFooterBrand = () => {
    try {
      const socialLinks = JSON.parse(footerBrand.socialLinks);
      updateFooterMutation.mutate({
        sectionKey: "brand",
        data: { title: footerBrand.title, content: footerBrand.content, social_links: socialLinks },
      });
    } catch {
      toast({ title: "Format JSON tidak valid", variant: "destructive" });
    }
  };

  const handleSaveFooterServices = () => {
    try {
      const links = JSON.parse(footerServices.links);
      updateFooterMutation.mutate({
        sectionKey: "services",
        data: { title: footerServices.title, links },
      });
    } catch {
      toast({ title: "Format JSON tidak valid", variant: "destructive" });
    }
  };

  const handleSaveFooterContact = () => {
    try {
      const links = JSON.parse(footerContact.links);
      updateFooterMutation.mutate({
        sectionKey: "contact",
        data: { title: footerContact.title, links },
      });
    } catch {
      toast({ title: "Format JSON tidak valid", variant: "destructive" });
    }
  };

  if (loadingHomepage || loadingNav || loadingFooter) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan Homepage</h1>
          <p className="text-muted-foreground">Kelola konten homepage, logo, menu, dan footer</p>
        </div>

        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Hero Banner
            </TabsTrigger>
            <TabsTrigger value="logo" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Logo
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Menu className="w-4 h-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Footer
            </TabsTrigger>
          </TabsList>

          {/* Hero Banner Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Hero Banner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Judul Utama</Label>
                    <Input
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="Your next adventure"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sub Judul</Label>
                    <Input
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="starts here"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="Unique trips to the most fascinating places on Earth"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Teks Tombol CTA</Label>
                    <Input
                      value={heroButtonText}
                      onChange={(e) => setHeroButtonText(e.target.value)}
                      placeholder="Lihat Paket"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link Tombol CTA</Label>
                    <Input
                      value={heroButtonLink}
                      onChange={(e) => setHeroButtonLink(e.target.value)}
                      placeholder="/umrah-packages"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    URL Gambar Hero
                  </Label>
                  <Input
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    placeholder="https://example.com/hero.jpg"
                  />
                  {heroImageUrl && (
                    <img src={heroImageUrl} alt="Hero Preview" className="mt-2 h-40 object-cover rounded-lg" />
                  )}
                </div>

                <Button onClick={handleSaveHero} disabled={updateHomepageMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Hero Banner
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logo Tab */}
          <TabsContent value="logo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Logo & Branding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nama Brand</Label>
                  <Input
                    value={logoTitle}
                    onChange={(e) => setLogoTitle(e.target.value)}
                    placeholder="Karin Hidayah Tour"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Textarea
                    value={logoDescription}
                    onChange={(e) => setLogoDescription(e.target.value)}
                    placeholder="Melayani perjalanan ibadah..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    URL Logo
                  </Label>
                  <Input
                    value={logoImageUrl}
                    onChange={(e) => setLogoImageUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  {logoImageUrl && (
                    <img src={logoImageUrl} alt="Logo Preview" className="mt-2 h-20 object-contain" />
                  )}
                </div>

                <Button onClick={handleSaveLogo} disabled={updateHomepageMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Logo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Menu className="w-5 h-5" />
                  Menu Navigasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs">Label</Label>
                          <Input
                            value={item.label}
                            onChange={(e) => handleNavChange(item.id, "label", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Path</Label>
                          <Input
                            value={item.path}
                            onChange={(e) => handleNavChange(item.id, "path", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Urutan</Label>
                          <Input
                            type="number"
                            value={item.order_index}
                            onChange={(e) => handleNavChange(item.id, "order_index", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleSaveNav(item.id)}>
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer">
            <div className="grid gap-4">
              {/* Brand Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Footer - Brand</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nama Brand</Label>
                    <Input
                      value={footerBrand.title}
                      onChange={(e) => setFooterBrand({ ...footerBrand, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea
                      value={footerBrand.content}
                      onChange={(e) => setFooterBrand({ ...footerBrand, content: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Social Links (JSON)</Label>
                    <Textarea
                      value={footerBrand.socialLinks}
                      onChange={(e) => setFooterBrand({ ...footerBrand, socialLinks: e.target.value })}
                      className="font-mono text-sm"
                      rows={5}
                    />
                  </div>
                  <Button onClick={handleSaveFooterBrand}>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Brand
                  </Button>
                </CardContent>
              </Card>

              {/* Services Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Footer - Layanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Judul</Label>
                    <Input
                      value={footerServices.title}
                      onChange={(e) => setFooterServices({ ...footerServices, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Links (JSON)</Label>
                    <Textarea
                      value={footerServices.links}
                      onChange={(e) => setFooterServices({ ...footerServices, links: e.target.value })}
                      className="font-mono text-sm"
                      rows={5}
                    />
                  </div>
                  <Button onClick={handleSaveFooterServices}>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Layanan
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Footer - Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Judul</Label>
                    <Input
                      value={footerContact.title}
                      onChange={(e) => setFooterContact({ ...footerContact, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kontak Info (JSON)</Label>
                    <Textarea
                      value={footerContact.links}
                      onChange={(e) => setFooterContact({ ...footerContact, links: e.target.value })}
                      className="font-mono text-sm"
                      rows={5}
                    />
                  </div>
                  <Button onClick={handleSaveFooterContact}>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Kontak
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminHomepage;
