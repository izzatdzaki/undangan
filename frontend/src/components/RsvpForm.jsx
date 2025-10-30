import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useToast } from '../hooks/use-toast';
import { Heart, Gift, Copy, Check, MapPin, Package, X } from 'lucide-react';
import { SundaDivider, SundaBatikPattern } from './SundaOrnaments';

const RsvpForm = () => {
  const { toast } = useToast();
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bankAccounts = [
    {
      bank: 'Bank BCA',
      accountNumber: '1234567890',
      accountName: 'Putri Sundari',
      logo: '🏦'
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'Iteng Permana',
      logo: '🏦'
    }
  ];

  const shippingAddress = {
    recipient: 'Putri & Iteng',
    address: 'Jl. Contoh Alamat No. 123, Bandung, Jawa Barat 40123',
    phone: '+62 812-3456-7890'
  };

  const copyToClipboard = (accountNumber, index) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(index);
    toast({
      title: "Berhasil Disalin!",
      description: "Nomor rekening telah disalin ke clipboard.",
    });

    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  const copyAddress = () => {
    const fullAddress = `${shippingAddress.recipient}\n${shippingAddress.address}\n${shippingAddress.phone}`;
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    toast({
      title: "Berhasil Disalin!",
      description: "Alamat pengiriman telah disalin ke clipboard.",
    });

    setTimeout(() => {
      setCopiedAddress(false);
    }, 2000);
  };

  return (
    <section id="rsvp" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-white to-rose-50 relative overflow-hidden">
      {/* Batik Pattern Background */}
      <SundaBatikPattern />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Gift className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Wedding Gift</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-8">
            Doa restu Anda adalah hadiah terbesar bagi kami. Namun jika memberi adalah ungkapan kasih Anda,
            Anda dapat memberi melalui:
          </p>

          {/* Modal Trigger Button */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Gift className="w-6 h-6 mr-2" />
                Lihat Wedding Gift
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-0 shadow-2xl">
              <DialogHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                </div>
                <DialogTitle className="font-serif text-3xl md:text-4xl text-gray-800">
                  Wedding Gift
                </DialogTitle>
                <p className="text-gray-600 mt-2">
                  Pilih cara Anda ingin memberikan hadiah kepada kami
                </p>
              </DialogHeader>

              <div className="space-y-8">
                {/* Bank Accounts */}
                <div>
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl text-gray-800 mb-2">Transfer Bank</h3>
                    <p className="text-gray-600 text-sm">Kirim hadiah melalui transfer bank</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {bankAccounts.map((account, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Bank Icon & Name */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg text-2xl">
                            {account.logo}
                          </div>
                          <div>
                            <h4 className="font-serif text-xl text-gray-800">{account.bank}</h4>
                            <p className="text-amber-700 font-medium text-sm">{account.accountName}</p>
                          </div>
                        </div>

                        {/* Account Number */}
                        <div className="bg-white rounded-xl p-4 mb-4">
                          <p className="text-xs text-gray-600 mb-1 font-medium">Nomor Rekening:</p>
                          <p className="text-2xl font-bold text-gray-800 tracking-wider font-mono">
                            {account.accountNumber}
                          </p>
                        </div>

                        {/* Copy Button */}
                        <Button
                          onClick={() => copyToClipboard(account.accountNumber, index)}
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          {copiedAccount === index ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Berhasil Disalin!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Salin Nomor Rekening
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent to-rose-400"></div>
                      <Package className="w-5 h-5 text-rose-600" />
                      <div className="w-8 h-px bg-gradient-to-l from-transparent to-rose-400"></div>
                    </div>
                    <h3 className="font-serif text-2xl text-gray-800 mb-2">Kirim Hadiah</h3>
                    <p className="text-gray-600 text-sm">Atau kirim hadiah langsung ke alamat kami</p>
                  </div>

                  <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-6 border-2 border-rose-200">
                    {/* Address Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl text-gray-800">Alamat Pengiriman</h4>
                        <p className="text-rose-700 font-medium text-sm">{shippingAddress.recipient}</p>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="bg-white rounded-xl p-4 mb-4 space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1 font-medium">Alamat:</p>
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {shippingAddress.address}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1 font-medium">No. Telepon:</p>
                        <p className="text-sm text-gray-800 font-semibold">
                          {shippingAddress.phone}
                        </p>
                      </div>
                    </div>

                    {/* Copy Button */}
                    <Button
                      onClick={copyAddress}
                      className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Berhasil Disalin!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Salin Alamat
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Thank you message */}
                <div className="text-center pt-6 border-t border-amber-200">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                  </div>
                  <p className="text-gray-700 text-lg font-light italic">
                    Terima kasih atas kehadiran dan doa restu Anda
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Divider Bottom */}
        <div className="mt-16">
          <SundaDivider />
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
