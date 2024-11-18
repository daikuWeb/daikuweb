import React from 'react';
import Image from 'next/image';

export function Contact() {
  return (
    <div className="bg-white pb-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <h2 className="text-4xl font-bold text-center mb-2">Kunjungi Kami</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Temukan showroom kami dan dapatkan konsultasi langsung untuk desain impian Anda
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col-reverse lg:flex-row bg-white">
        {/* Left Container */}
        <div className="flex-1 bg-white p-10 flex justify-center items-center lg:min-h-[600px]">
          <div className="text-right lg:max-w-[450px] lg:pr-[170px] w-full">
            <h1 className="text-3xl lg:text-5xl font-bold mb-5 text-[#1a1a1a] text-center lg:text-right">
              DAIKU
              <span className="block">INTERIOR</span>
            </h1>
            
            <div className="flex items-center justify-center lg:justify-end mb-4">
              <p className="text-[#1a1a1a] text-base lg:text-lg mr-3">
                Jl Yos Sudarso, Pekanbaru 28154
              </p>
              <i className="fas fa-map-marker-alt text-2xl text-[#E9C13F]"></i>
            </div>
            
            <div className="flex items-center justify-center lg:justify-end mb-4">
              <p className="text-[#1a1a1a] text-base lg:text-lg mr-3">
                0811-7597-766
              </p>
              <i className="fas fa-phone-alt text-2xl text-[#E9C13F]"></i>
            </div>
            
            <div className="flex items-center justify-center lg:justify-end mb-4">
              <p className="text-[#1a1a1a] text-base lg:text-lg mr-3">
                fendrabudiono@gmail.com
              </p>
              <i className="fas fa-envelope text-2xl text-[#E9C13F]"></i>
            </div>
          </div>
        </div>

        {/* Right Container */}
        <div className="flex-1 relative min-h-[350px] lg:min-h-[600px] w-full flex justify-center items-center mb-4 lg:mb-0">
          {/* Background Image */}
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/contact/map.png"
              alt="Map Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Map Container */}
          <div className="lg:absolute lg:top-1/2 lg:left-0 lg:-translate-x-1/2 lg:-translate-y-1/2 w-[90%] md:w-[85%] lg:w-[400px] mx-auto">
            {/* Map Shadow */}
            <div className="absolute top-14 lg:top-5 left-[15px] lg:left-[60%] lg:-translate-x-1/2 w-full lg:w-[400px] h-[280px] lg:h-[500px] bg-[#FFDC7F] z-10"></div>
            
            {/* Map */}
            <div className="relative z-20 w-full h-[280px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Jalan%20Yos%20Sudarso,%20Rumbai,%20Pekanbaru&output=embed&gestureHandling=none"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="map"
                className="w-full h-full rounded-xl"
              ></iframe>

              {/* Mobile Location Preview Image */}
              <div className="lg:hidden absolute -top-4 left-[85%] -translate-x-1/2 w-[100px] h-[100px] rounded-xl overflow-hidden border-4 border-white shadow-lg z-30">
                <Image
                  src="/contact/map.png"
                  alt="Location Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}