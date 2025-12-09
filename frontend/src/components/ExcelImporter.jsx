import React, { useState } from 'react';
import { Upload, Copy, Download, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import * as XLSX from 'xlsx';

const ExcelImporter = () => {
  const { toast } = useToast();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Process guest names and create URLs
        const processedGuests = jsonData
          .filter(row => row.Nama || row.nama || row.Name || row.name)
          .map((row, index) => {
            const name = row.Nama || row.nama || row.Name || row.name;
            const urlName = name
              .trim()
              .toLowerCase()
              .replace(/\s+/g, '_') // Replace spaces with underscores
              .replace(/[^\w_]/g, ''); // Remove special characters

            const baseUrl = window.location.origin;
            const invitationUrl = `${baseUrl}?to=${encodeURIComponent(urlName)}`;

            return {
              id: index + 1,
              nama: name,
              urlName: urlName,
              invitationUrl: invitationUrl
            };
          });

        setGuests(processedGuests);

        if (processedGuests.length > 0) {
          toast({
            title: "Berhasil!",
            description: `${processedGuests.length} tamu undangan berhasil diimport.`
          });
        }
      } catch (error) {
        console.error('Error processing Excel file:', error);
        toast({
          title: "Error",
          description: "Gagal membaca file Excel. Pastikan format file benar.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const copyToClipboard = (url, index) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      toast({
        title: "Copied!",
        description: "URL undangan berhasil disalin ke clipboard."
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const downloadAsExcel = () => {
    if (guests.length === 0) {
      toast({
        title: "Warning",
        description: "Tidak ada data tamu untuk diunduh.",
        variant: "destructive"
      });
      return;
    }

    const exportData = guests.map(guest => ({
      'No': guest.id,
      'Nama': guest.nama,
      'URL Undangan': guest.invitationUrl
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Undangan');

    // Set column widths
    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 30 },
      { wch: 60 }
    ];

    XLSX.writeFile(workbook, `undangan_urls_${new Date().getTime()}.xlsx`);

    toast({
      title: "Berhasil!",
      description: "File Excel berhasil diunduh."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">
            Pembuat URL Undangan
          </h1>
          <p className="text-gray-600">
            Upload file Excel berisi daftar tamu untuk membuat URL undangan personal
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Upload className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Upload File Excel</h2>
          </div>

          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              disabled={loading}
              className="block w-full"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-gray-600 mt-2">
                <p className="font-semibold">Klik untuk memilih file</p>
                <p className="text-sm">Format: .xlsx, .xls, atau .csv</p>
                <p className="text-sm text-gray-500 mt-2">
                  File harus memiliki kolom "Nama" atau "name"
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Results Section */}
        {guests.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                URL Undangan ({guests.length})
              </h2>
              <button
                onClick={downloadAsExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">URL Undangan</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest, index) => (
                    <tr key={guest.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{guest.id}</td>
                      <td className="py-3 px-4 text-gray-700">{guest.nama}</td>
                      <td className="py-3 px-4">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-800 break-all">
                          {guest.invitationUrl}
                        </code>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => copyToClipboard(guest.invitationUrl, index)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Bagikan URL undangan di atas kepada setiap tamu melalui WhatsApp, Email, atau platform komunikasi lainnya.
              </p>
            </div>
          </div>
        )}

        {guests.length === 0 && !loading && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-500">
              Upload file Excel untuk memulai membuat URL undangan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelImporter;
