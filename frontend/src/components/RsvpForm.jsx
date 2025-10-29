import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { Heart, Gift, Copy, Check, MapPin, Package } from 'lucide-react';
import { SundaDivider, SundaBatikPattern } from './SundaOrnaments';

const RsvpForm = () => {
  const { toast } = useToast();
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

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
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Gift className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Wedding Gift</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Doa restu Anda adalah hadiah terbesar bagi kami. Namun jika memberi adalah ungkapan kasih Anda, 
            Anda dapat memberi melalui:
          </p>
        </div>

        {/* Bank Accounts */}
        <div className="space-y-6">
          {bankAccounts.map((account, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Bank Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg text-3xl">
                    {account.logo}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-gray-800">{account.bank}</h3>
                    <p className="text-amber-700 font-medium">{account.accountName}</p>
                  </div>
                </div>

                {/* Account Number */}
                <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-6 mb-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Nomor Rekening:</p>
                  <p className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wider font-mono">
                    {account.accountNumber}
                  </p>
                </div>

                {/* Copy Button */}
                <Button
                  onClick={() => copyToClipboard(account.accountNumber, index)}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {copiedAccount === index ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Berhasil Disalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Salin Nomor Rekening
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Address Section */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose-400"></div>
              <Package className="w-6 h-6 text-rose-600" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose-400"></div>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-gray-800 mb-2">Kirim Hadiah</h3>
            <p className="text-gray-600 font-light">Atau kirim hadiah langsung ke alamat kami</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-rose-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            {/* Decorative corner */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-rose-100 to-transparent rounded-br-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative z-10">
              {/* Address Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl md:text-3xl text-gray-800">Alamat Pengiriman</h4>
                  <p className="text-rose-700 font-medium">{shippingAddress.recipient}</p>
                </div>
              </div>

              {/* Address Details */}
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-6 mb-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Alamat:</p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {shippingAddress.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">No. Telepon:</p>
                  <p className="text-lg text-gray-800 font-semibold">
                    {shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Copy Button */}
              <Button
                onClick={copyAddress}
                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Salin Alamat
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Thank you message */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-gray-700 text-lg font-light italic">
            Terima kasih atas kehadiran dan doa restu Anda
          </p>
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
