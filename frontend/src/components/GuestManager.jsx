import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Copy, ExternalLink, Users, MessageCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { weddingData } from '../mock';
import ExcelHandler from './ExcelHandler';

const GuestManager = () => {
  const { toast } = useToast();
  const [selectedGuest, setSelectedGuest] = useState('');
  const [customGuest, setCustomGuest] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [guestList, setGuestList] = useState(
    (weddingData.guestList || []).map((guest, index) => ({
      id: Date.now() + index,
      name: typeof guest === 'string' ? guest : guest.name,
      status: 'Belum Dibuka'
    }))
  );

  // Handle import dari Excel
  const handleImportGuests = (importedGuests) => {
    setGuestList(importedGuests);
    toast({
      title: "Data Diperbarui! 📊",
      description: `${importedGuests.length} tamu telah ditambahkan ke daftar.`,
    });
  };

  const generateInvitationLink = (guestName) => {
    if (!guestName.trim()) {
      toast({
        title: "Error",
        description: "Mohon pilih atau masukkan nama tamu.",
        variant: "destructive",
      });
      return;
    }

    // Encode nama tamu untuk URL (replace spaces with underscores)
    const encodedName = encodeURIComponent(guestName.replace(/\s+/g, '_'));
    const baseUrl = window.location.origin;
    const invitationLink = `${baseUrl}?to=${encodedName}`;

    setGeneratedLink(invitationLink);
    setSelectedGuest(guestName);

    toast({
      title: "Link Berhasil Dibuat! 🎉",
      description: `Link undangan untuk ${guestName} telah dibuat.`,
    });
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;

    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "Link Disalin! 📋",
      description: "Link undangan telah disalin ke clipboard.",
    });
  };

  const openInvitation = () => {
    if (!generatedLink) return;
    window.open(generatedLink, '_blank');
  };

  const sendViaWhatsApp = () => {
    if (!generatedLink || !selectedGuest) return;

    const message = `Assalamualaikum Wr. Wb.

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i *${selectedGuest}* untuk menghadiri acara pernikahan kami.

Silakan buka link berikut untuk detail acara dan konfirmasi kehadiran:
${generatedLink}

Atas perhatiannya, kami ucapkan terima kasih.

Wassalamualaikum Wr. Wb.

*#UndanganPernikahan #PutriFajar*`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "WhatsApp Dibuka! 📱",
      description: "Pesan undangan siap dikirim via WhatsApp.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <Users className="w-12 h-12 text-amber-600" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
          Guest Manager
        </h1>
        <p className="text-lg text-gray-600 font-light">
          Buat link undangan yang dipersonalisasi untuk setiap tamu
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Guest List */}
        <Card className="shadow-lg border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Users className="w-5 h-5" />
              Daftar Tamu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-64 overflow-y-auto space-y-2">
              {guestList.map((guest, index) => (
                <button
                  key={guest.id}
                  onClick={() => setSelectedGuest(guest.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    selectedGuest === guest.name
                      ? 'bg-amber-100 border-amber-400 text-amber-800'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {guest.name}
                </button>
              ))}
            </div>

            <Button
              onClick={() => generateInvitationLink(selectedGuest)}
              disabled={!selectedGuest}
              className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white"
            >
              Buat Link untuk {selectedGuest || 'Pilih Tamu'}
            </Button>
          </CardContent>
        </Card>

        {/* Custom Guest */}
        <Card className="shadow-lg border-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <Users className="w-5 h-5" />
              Tamu Custom
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Tamu
              </label>
              <Input
                value={customGuest}
                onChange={(e) => setCustomGuest(e.target.value)}
                placeholder="Masukkan nama tamu..."
                className="border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <Button
              onClick={() => generateInvitationLink(customGuest)}
              disabled={!customGuest.trim()}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              Buat Link Custom
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generated Link */}
      {generatedLink && (
        <Card className="shadow-lg border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <ExternalLink className="w-5 h-5" />
              Link Undangan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-600 mb-2">Untuk: <strong>{selectedGuest}</strong></p>
              <p className="text-sm font-mono break-all text-gray-800">{generatedLink}</p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Link
              </Button>

              <Button
                onClick={sendViaWhatsApp}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>

              <Button
                onClick={openInvitation}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Buka Undangan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="shadow-lg border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Cara Penggunaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <p>1. <strong>Pilih tamu</strong> dari daftar atau masukkan nama custom</p>
          <p>2. <strong>Klik "Buat Link"</strong> untuk menghasilkan link undangan</p>
          <p>3. <strong>Salin link</strong> dan bagikan ke tamu melalui WhatsApp, email, dll</p>
          <p>4. <strong>Tamu akan melihat</strong> nama mereka di cover page undangan</p>
          <p className="text-xs text-gray-500 mt-4">
            💡 Tip: Gunakan nama lengkap dengan gelar untuk lebih formal
          </p>
        </CardContent>
      </Card>

      {/* Excel Import/Export */}
      <ExcelHandler onImportGuests={handleImportGuests} guestList={guestList} />
    </div>
  );
};

export default GuestManager;