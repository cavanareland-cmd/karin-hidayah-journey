const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-slate-50">
      <p className="text-center uppercase font-semibold text-indigo-600">
        Paket Layanan
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-center mt-3">
        Pilihan Paket Umrah & Haji
      </h2>

      <p className="text-center text-slate-500 max-w-xl mx-auto mt-4">
        Pilih paket yang sesuai dengan kebutuhan ibadah dan kenyamanan Anda.
      </p>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

        {/* Paket Reguler */}
        <div className="border rounded-xl p-8 bg-white">
          <h3 className="font-semibold text-lg">Umrah Reguler</h3>
          <p className="text-4xl font-bold mt-4">
            Mulai
            <span className="block text-2xl mt-1">Rp29.000.000</span>
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>✔ Tiket & hotel standar</li>
            <li>✔ Manasik sebelum keberangkatan</li>
            <li>✔ Pembimbing ibadah</li>
          </ul>

          <button className="mt-8 w-full py-3 border rounded-md hover:bg-slate-100">
            Lihat Detail
          </button>
        </div>

        {/* Paket VIP */}
        <div className="border-2 border-indigo-600 rounded-xl p-8 bg-white scale-105">
          <h3 className="font-semibold text-lg">Umrah VIP</h3>
          <p className="text-4xl font-bold mt-4">
            Mulai
            <span className="block text-2xl mt-1">Rp39.000.000</span>
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>✔ Hotel dekat Masjid</li>
            <li>✔ Transportasi nyaman</li>
            <li>✔ Pendampingan intensif</li>
          </ul>

          <button className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Pilih Paket
          </button>
        </div>

        {/* Paket Haji */}
        <div className="border rounded-xl p-8 bg-white">
          <h3 className="font-semibold text-lg">Haji Khusus</h3>
          <p className="text-4xl font-bold mt-4">
            Kuota Terbatas
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>✔ Bimbingan eksklusif</li>
            <li>✔ Akomodasi premium</li>
            <li>✔ Tim pendamping khusus</li>
          </ul>

          <button className="mt-8 w-full py-3 border rounded-md hover:bg-slate-100">
            Hubungi Kami
          </button>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
