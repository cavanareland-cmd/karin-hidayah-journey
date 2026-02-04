import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, Trash2, Mail, MailOpen, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);

    if (!message.is_read) {
      try {
        await supabase
          .from("contact_messages")
          .update({ is_read: true })
          .eq("id", message.id);
        
        setMessages(messages.map(m => 
          m.id === message.id ? { ...m, is_read: true } : m
        ));
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;

    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast({ title: "Berhasil", description: "Pesan berhasil dihapus" });
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">Pesan Kontak</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} pesan belum dibaca` : "Semua pesan telah dibaca"}
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                Belum ada pesan masuk.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subjek</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow 
                      key={message.id}
                      className={!message.is_read ? "bg-primary/5" : ""}
                    >
                      <TableCell>
                        {message.is_read ? (
                          <MailOpen className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Mail className="w-4 h-4 text-primary" />
                        )}
                      </TableCell>
                      <TableCell className={`font-medium ${!message.is_read ? "font-semibold" : ""}`}>
                        {message.name}
                      </TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {message.subject || "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(message.created_at), "dd/MM/yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(message)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(message.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Message Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Detail Pesan</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nama</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <p className="text-muted-foreground">Telepon</p>
                      <p className="font-medium">{selectedMessage.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Tanggal</p>
                    <p className="font-medium">
                      {format(new Date(selectedMessage.created_at), "dd/MM/yyyy HH:mm")}
                    </p>
                  </div>
                </div>
                {selectedMessage.subject && (
                  <div>
                    <p className="text-muted-foreground text-sm">Subjek</p>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Pesan</p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Balas Email
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
