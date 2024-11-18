// components/TawkToChat.tsx
'use client';

import { useEffect } from 'react';

interface TawkToAPI {
  onLoad?: () => void;
  onChatStarted?: () => void;
  onChatEnded?: () => void;
  onChatMessageVisitor?: (message: any) => void;
  sendMessage?: (message: string) => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkToAPI;
    Tawk_LoadStart?: Date;
  }
}

const AUTO_RESPONSES = {
  greetings: ['hi', 'halo', 'hello', 'hai', 'hey'],
  services: ['layanan', 'jasa', 'service', 'produk'],
  contact: ['kontak', 'hubungi', 'telepon', 'telpon', 'wa', 'whatsapp'],
  location: ['lokasi', 'alamat', 'dimana'],
  hours: ['jam', 'buka', 'operasional', 'kerja'],
  price: ['harga', 'biaya', 'tarif', 'bayar'],
};

export default function TawkToChat() {
  useEffect(() => {
    const generateResponse = (message: any): string => {
      // Check if message is valid and convert to string
      const messageText = String(message?.message || message || '').toLowerCase();
      
      // Cek kategori pesan dan berikan respons yang sesuai
      if (AUTO_RESPONSES.greetings.some(word => messageText.includes(word))) {
        return `Halo! Selamat datang di Daiku Interior. Ada yang bisa kami bantu?\n\nBerikut layanan yang kami sediakan:\n- Konsultasi Desain Interior\n- Renovasi\n- Custom Furniture\n- Kitchen Set\n- Wallpaper`;
      }
      
      if (AUTO_RESPONSES.services.some(word => messageText.includes(word))) {
        return `Daiku Interior menyediakan berbagai layanan:\n\n1. Konsultasi Desain Interior\n2. Renovasi\n3. Custom Furniture\n4. Kitchen Set\n5. Wallpaper\n\nMau tahu lebih detail tentang layanan yang mana?`;
      }
      
      if (AUTO_RESPONSES.contact.some(word => messageText.includes(word))) {
        return `Ada Dapat Menghubungi Kami Melalui:\n\n📞 Telepon/WA: 0811-7597-766\n✉️ Email: fendrabudiono@gmail.com`;
      }
      
      if (AUTO_RESPONSES.location.some(word => messageText.includes(word))) {
        return `Daiku Interior berlokasi di:\n\n📍 Jl. Yos Sudarso, Pekanbaru 28154\n\nAnda bisa mengunjungi showroom kami untuk konsultasi langsung.`;
      }

      if (AUTO_RESPONSES.hours.some(word => messageText.includes(word))) {
        return `Jam operasional kami:\n\n📅 Senin - Jumat: 08:00 - 17:00\n📅 Sabtu: 09:00 - 15:00\n📅 Minggu: Tutup`;
      }
      
      if (AUTO_RESPONSES.price.some(word => messageText.includes(word))) {
        return `Untuk informasi harga akan disesuaikan dengan:\n\n1. Ukuran ruangan\n2. Jenis material\n3. Tingkat kesulitan\n4. Kebutuhan spesifik\n\nSilakan konsultasikan kebutuhan Anda, dan kami akan berikan estimasi terbaik.`;
      }

      // Default response jika tidak ada keyword yang cocok
      return `Terima kasih atas pertanyaan Anda. Untuk informasi lebih detail, Anda bisa:\n\n1. Tanyakan tentang layanan kami\n2. Konsultasikan kebutuhan Anda\n3. Kunjungi showroom kami\n4. Hubungi kami di 0811-7597-766`;
    };

    var Tawk_API: TawkToAPI = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/672c80254304e3196ade970f/1ic2t957e';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode?.insertBefore(s1,s0);
    })();

    if (typeof window !== 'undefined') {
      window.Tawk_API = {
        ...window.Tawk_API,
        onLoad: function() {
          console.log('Tawk.to loaded successfully');
        },
        onChatMessageVisitor: function(message) {
          setTimeout(() => {
            try {
              const response = generateResponse(message);
              window.Tawk_API?.sendMessage?.(response);
            } catch (error) {
              console.error('Error generating response:', error);
              window.Tawk_API?.sendMessage?.('Maaf, terjadi kesalahan teknis. Silakan coba lagi.');
            }
          }, 1000);
        },
        onChatStarted: function() {
          setTimeout(() => {
            window.Tawk_API?.sendMessage?.('Selamat datang di Daiku Interior silahkan tanyakan jika anda memiliki pertanyaan! 👋\nAda yang bisa kami bantu hari ini?');
          }, 500);
        }
      };
    }
  }, []);

  return null;
}