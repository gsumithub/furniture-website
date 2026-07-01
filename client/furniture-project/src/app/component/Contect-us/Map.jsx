import React from 'react'

export default function Map() {
  return (
    <div>
        <div className="max-w-[1320px] mx-auto py-10 border-t-2 border-[#ebebeb]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.631421124823!2d73.0283626508787!3d26.27362318332549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1ea7d0c7%3A0xf14d81eb1531921c!2sLaxmi%20Kirana%20Store!5e0!3m2!1sen!2sin!4v1580291833220!5m2!1sen!2sin"
              width="100%"
              height={450}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen=""
            />
        </div>

    </div>
  )
}
