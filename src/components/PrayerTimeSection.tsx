import { useState, useEffect } from "react";
import { usePrayerTimes } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import prayerBg from "@/assets/prayer-time-bg.jpg";

const PrayerTimeSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: prayerSettings, isLoading } = usePrayerTimes();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrayerTime = (time: string | null) => {
    if (!time) return "--:--";
    return time.slice(0, 5);
  };

  // Determine active prayer based on current time
  const getActivePrayer = () => {
    if (!prayerSettings) return null;
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    const times = [
      { name: "Fajr", time: prayerSettings.fajr_time },
      { name: "Zuhr", time: prayerSettings.zuhr_time },
      { name: "Asr", time: prayerSettings.asr_time },
      { name: "Maghrib", time: prayerSettings.maghrib_time },
      { name: "Isha", time: prayerSettings.isha_time },
    ];

    for (let i = times.length - 1; i >= 0; i--) {
      if (times[i].time) {
        const [h, m] = times[i].time!.split(":").map(Number);
        if (now >= h * 60 + m) {
          return times[i].name;
        }
      }
    }
    return times[0].name;
  };

  const activePrayer = getActivePrayer();

  const prayerTimes = prayerSettings ? [
    { name: "Fajr", time: formatPrayerTime(prayerSettings.fajr_time), azan: formatPrayerTime(prayerSettings.fajr_azan) },
    { name: "Zuhr", time: formatPrayerTime(prayerSettings.zuhr_time), azan: formatPrayerTime(prayerSettings.zuhr_azan) },
    { name: "Asr", time: formatPrayerTime(prayerSettings.asr_time), azan: formatPrayerTime(prayerSettings.asr_azan) },
    { name: "Maghrib", time: formatPrayerTime(prayerSettings.maghrib_time), azan: formatPrayerTime(prayerSettings.maghrib_azan) },
    { name: "Isha", time: formatPrayerTime(prayerSettings.isha_time), azan: formatPrayerTime(prayerSettings.isha_azan) },
  ] : [];

  if (isLoading) {
    return (
      <section className="py-6 px-4 lg:px-8">
        <div className="container mx-auto">
          <Skeleton className="h-80 w-full rounded-3xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Image */}
          <img
            src={prayerBg}
            alt="Mosque"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/60 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-white/90 text-sm md:text-base font-medium mb-2">
                {prayerSettings?.location_name || "Waktu Sholat"}
              </h2>
              <div className="text-white text-4xl md:text-6xl font-bold tracking-wider">
                {formatTime(currentTime)}
              </div>
              <p className="text-white/70 text-sm mt-2">
                {formatDate(currentTime)}
              </p>
            </div>

            {/* Side Times */}
            <div className="flex justify-between items-start mb-8">
              <div className="text-center">
                <h4 className="text-white font-semibold mb-1">Jumah</h4>
                <p className="text-white/80 text-sm">{formatPrayerTime(prayerSettings?.jumah_time)}</p>
                <p className="text-white/60 text-xs">Azan: {formatPrayerTime(prayerSettings?.jumah_azan)}</p>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-1">Chourouk</h4>
                <p className="text-white/80 text-sm">{formatPrayerTime(prayerSettings?.chourouk_time)}</p>
              </div>
            </div>

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {prayerTimes.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`text-center py-3 px-2 md:px-4 rounded-xl transition-all ${
                    activePrayer === prayer.name
                      ? "bg-white text-secondary"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <h4 className={`font-semibold text-sm md:text-base mb-1 ${
                    activePrayer === prayer.name ? "text-secondary" : "text-white"
                  }`}>
                    {prayer.name}
                  </h4>
                  <p className={`text-xs md:text-sm font-medium ${
                    activePrayer === prayer.name ? "text-secondary/80" : "text-white/80"
                  }`}>
                    {prayer.time}
                  </p>
                  <p className={`text-xs mt-1 ${
                    activePrayer === prayer.name ? "text-secondary/60" : "text-white/60"
                  }`}>
                    Azan: {prayer.azan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimeSection;
