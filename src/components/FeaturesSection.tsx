const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <p className="text-center uppercase font-semibold text-indigo-600">
        Fitur Utama
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-center mt-3">
        Pendampingan Umrah & Haji Terintegrasi
      </h2>

      <p className="text-center text-slate-500 max-w-xl mx-auto mt-4">
        Kami menghadirkan layanan lengkap untuk memastikan ibadah Anda berjalan
        nyaman, tenang, dan sesuai tuntunan.
      </p>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        
        {/* Feature 1 */}
        <div className="rounded-xl border p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">
            Manasik Terstruktur
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Pembekalan manasik Umrah & Haji secara bertahap, mudah dipahami,
            dan dipandu oleh pembimbing berpengalaman.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="rounded-xl border p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">
            E-Guide & Materi Digital
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Akses panduan doa, tata cara ibadah, serta informasi penting
            langsung dari dashboard jamaah.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="rounded-xl border p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">
            Pendampingan Selama Perjalanan
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Tim siap mendampingi jamaah dari keberangkatan hingga kembali
            ke tanah air dengan pelayanan optimal.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
