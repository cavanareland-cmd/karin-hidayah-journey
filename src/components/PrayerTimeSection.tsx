import { useState, useEffect } from "react";
import { MapPin, RefreshCw } from "lucide-react";
import makkahBg from "@/assets/makkah-landscape.jpg";

interface PrayerTime {
  name: string;
  time: string;
}

const PrayerTimeSection = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: "Fajr", time: "05:41" },
    { name: "Sunrise", time: "07:00" },
    { name: "Dhuhr", time: "12:33" },
    { name: "Asr", time: "15:43" },
    { name: "Maghrib", time: "18:06" },
    { name: "Isha", time: "19:36" },
  ]);
  const [activePrayer, setActivePrayer] = useState("Dhuhr");
  const [remainingTime, setRemainingTime] = useState("00:45:23");
  const [location, setLocation] = useState("Makkah");

  useEffect(() => {
    // Simulate countdown
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(Math.floor(Math.random() * 2)).padStart(2, "0");
      const mins = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setRemainingTime(`${hours}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background */}
        <img
          src={makkahBg}
          alt="Makkah"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 to-secondary/90" />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="text-white font-medium">{location}</span>
            <button className="ml-auto p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <RefreshCw className="w-4 h-4 text-white/60" />
            </button>
          </div>

          {/* Remaining Time */}
          <div className="mb-6">
            <p className="text-white/70 text-sm mb-1">
              Remaining time to {activePrayer} pray
            </p>
            <p className="text-3xl font-bold text-white tracking-wider">
              {remainingTime}
            </p>
          </div>

          {/* Prayer Times Grid */}
          <div className="grid grid-cols-6 gap-2">
            {prayerTimes.map((prayer) => (
              <div
                key={prayer.name}
                className={`text-center p-2 rounded-xl transition-all ${
                  prayer.name === activePrayer
                    ? "bg-white text-secondary"
                    : "bg-white/10 text-white"
                }`}
              >
                <p className="text-[10px] opacity-70">{prayer.name}</p>
                <p className="text-xs font-semibold mt-0.5">{prayer.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimeSection;
