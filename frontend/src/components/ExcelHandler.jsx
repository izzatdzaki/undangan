import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { Download, Upload, FileSpreadsheet, Copy, Check, MessageCircle, Send } from 'lucide-react';

const ExcelHandler = ({ onImportGuests, guestList }) => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  // Fungsi untuk generate link undangan (hanya gunakan untuk URL, preserve nama asli terpisah)
  const generateInvitationLink = (guestName) => {
    if (!guestName || typeof guestName !== 'string' || !guestName.trim()) {
      console.error('Invalid guest name:', guestName);
      return `${window.location.origin}?guest=unknown`;
    }

    // Clean nama untuk URL (hapus spasi, special characters, convert ke lowercase)
    const cleanName = guestName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, '') // Hapus special characters kecuali spasi
      .replace(/\s+/g, '-') // Ganti spasi dengan dash
      .replace(/-+/g, '-') // Hapus multiple dashes
      .replace(/^-|-$/g, ''); // Hapus dash di awal/akhir

    return `${window.location.origin}?guest=${encodeURIComponent(cleanName)}`;
  };

  // Fungsi export ke Excel
  const exportToExcel = () => {
    try {
      const exportData = guestList.map((guest, index) => {
        const guestName = guest.name || (typeof guest === 'string' ? guest : '') || `Tamu ${index + 1}`;
        return {
          'No': index + 1,
          'Nama Lengkap': guestName,
          'Link Undangan': generateInvitationLink(guestName),
          'Status': guest.status || 'Belum Dibuka'
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Undangan');

      // Set column widths
      worksheet['!cols'] = [
        { wch: 5 },  // No
        { wch: 30 }, // Nama Lengkap
        { wch: 50 }, // Link Undangan
        { wch: 15 }  // Status
      ];

      XLSX.writeFile(workbook, `daftar-undangan-${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({
        title: "Export Berhasil! 📊",
        description: "File Excel daftar undangan telah didownload.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Gagal",
        description: "Terjadi kesalahan saat export file Excel.",
        variant: "destructive",
      });
    }
  };

  // Fungsi import dari Excel
  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Validasi format data
      if (jsonData.length === 0) {
        throw new Error('File Excel kosong');
      }

      // Cek apakah ada kolom nama
      const firstRow = jsonData[0];
      const nameColumn = Object.keys(firstRow).find(key =>
        key.toLowerCase().includes('nama') ||
        key.toLowerCase().includes('name')
      );

      if (!nameColumn) {
        throw new Error('Kolom nama tidak ditemukan. Pastikan ada kolom dengan kata "nama" atau "name"');
      }

      // Proses data tamu
      const nameMapping = {}; // Store mapping dari clean name ke original name
      const importedGuests = jsonData.map((row, index) => {
        const originalName = row[nameColumn]?.toString().trim();
        const cleanName = originalName
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        nameMapping[cleanName] = originalName;
        
        return {
          id: Date.now() + index,
          name: originalName,
          status: 'Belum Dibuka',
          link: generateInvitationLink(originalName)
        };
      }).filter(guest => guest.name && guest.name.length > 0);

      if (importedGuests.length === 0) {
        throw new Error('Tidak ada data nama yang valid');
      }

      // Store mapping ke localStorage untuk lookup di Home.jsx (persistent)
      localStorage.setItem('guestNameMapping', JSON.stringify(nameMapping));

      // Kirim data ke parent component
      onImportGuests(importedGuests);

      toast({
        title: "Import Berhasil! 🎉",
        description: `Berhasil mengimport ${importedGuests.length} tamu undangan.`,
      });

      // Reset file input
      event.target.value = '';

    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Gagal",
        description: error.message || "Terjadi kesalahan saat import file Excel.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  // Fungsi untuk generate pesan WhatsApp
  const generateWhatsAppMessage = (guestName, invitationLink) => {
    const message = `Assalamualaikum Wr. Wb.

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i *${guestName}* untuk menghadiri acara pernikahan kami.

Silakan buka link berikut untuk detail acara dan konfirmasi kehadiran:
${invitationLink}

Atas perhatiannya, kami ucapkan terima kasih.

Wassalamualaikum Wr. Wb.

*#UndanganPernikahan #PutriFajar*`;

    return message;
  };

  // Fungsi untuk kirim via WhatsApp
  const sendViaWhatsApp = (guestName, invitationLink) => {
    const message = generateWhatsAppMessage(guestName, invitationLink);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Fungsi untuk kirim ke semua tamu
  const sendToAllGuests = () => {
    if (guestList.length === 0) {
      toast({
        title: "Tidak Ada Tamu",
        description: "Belum ada daftar tamu untuk dikirim.",
        variant: "destructive",
      });
      return;
    }

    // Buat pesan untuk semua tamu
    let allMessages = `📋 DAFTAR LINK UNDANGAN PERNIKAHAN\n\n`;
    allMessages += `Total tamu: ${guestList.length}\n\n`;

    guestList.forEach((guest, index) => {
      const guestName = guest.name || (typeof guest === 'string' ? guest : '') || `Tamu ${index + 1}`;
      const link = generateInvitationLink(guestName);
      allMessages += `${index + 1}. ${guestName}\n${link}\n\n`;
    });

    allMessages += `💡 Cara penggunaan:\n`;
    allMessages += `1. Copy link untuk setiap tamu\n`;
    allMessages += `2. Kirim ke nomor WhatsApp masing-masing\n`;
    allMessages += `3. Atau bagikan melalui grup WhatsApp\n\n`;
    allMessages += `#UndanganPernikahan #PutriFajar`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(allMessages)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "WhatsApp Dibuka! 📱",
      description: "Daftar link undangan telah dibuat untuk WhatsApp.",
    });
  };

  // Template Excel untuk download
  const downloadTemplate = () => {
    const templateData = [
      { 'Nama Lengkap': 'Ahmad Surya' },
      { 'Nama Lengkap': 'Siti Aminah' },
      { 'Nama Lengkap': 'Budi Santoso' },
      { 'Nama Lengkap': 'Maya Sari' }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    worksheet['!cols'] = [{ wch: 30 }];

    XLSX.writeFile(workbook, 'template-daftar-undangan.xlsx');

    toast({
      title: "Template Downloaded! 📋",
      description: "Template Excel untuk daftar undangan telah didownload.",
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <FileSpreadsheet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-gray-800">Import/Export Excel</h3>
          <p className="text-sm text-gray-600">Kelola daftar undangan dengan mudah</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Template Download */}
        <div>
          <p className="text-sm text-gray-700 mb-2">📋 Template Excel:</p>
          <Button
            onClick={downloadTemplate}
            variant="outline"
            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>

        {/* Import Section */}
        <div>
          <p className="text-sm text-gray-700 mb-2">📤 Import Data:</p>
          <div className="relative">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={importFromExcel}
              disabled={isImporting}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
            />
            {isImporting && (
              <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Format: .xlsx atau .xls dengan kolom "Nama Lengkap"
          </p>
        </div>

        {/* Export Section */}
        <div>
          <p className="text-sm text-gray-700 mb-2">📥 Export Data:</p>
          <Button
            onClick={exportToExcel}
            disabled={guestList.length === 0}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Export ke Excel ({guestList.length} tamu)
          </Button>
        </div>

        {/* WhatsApp Section */}
        <div>
          <p className="text-sm text-gray-700 mb-2">📱 Kirim via WhatsApp:</p>
          <div className="space-y-2">
            <Button
              onClick={sendToAllGuests}
              disabled={guestList.length === 0}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Kirim ke Semua Tamu ({guestList.length})
            </Button>
            <p className="text-xs text-gray-500">
              Membuat daftar lengkap link untuk dibagikan via WhatsApp
            </p>
          </div>
        </div>

        {/* Quick Links Preview */}
        {guestList.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-700 mb-3">🔗 Link Undangan (Preview):</p>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {guestList.slice(0, 5).map((guest, index) => {
                const guestName = guest.name || (typeof guest === 'string' ? guest : '') || `Tamu ${index + 1}`;
                const link = generateInvitationLink(guestName);
                return (
                  <div key={guest.id || index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{guestName}</p>
                      <p className="text-xs text-gray-500 truncate">{link}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyLink(link, guestName)}
                        className="p-1"
                        title="Copy Link"
                      >
                        {copiedLink === guestName ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => sendViaWhatsApp(guestName, link)}
                        className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                        title="Kirim via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              {guestList.length > 5 && (
                <p className="text-xs text-gray-500 text-center py-2">
                  ... dan {guestList.length - 5} tamu lainnya
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelHandler;