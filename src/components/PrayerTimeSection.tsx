import { useState, useEffect } from "react";
import prayerBg from "@/assets/prayer-time-bg.jpg";

const PrayerTimeSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const prayerTimes = [
    { name: "Fajr", time: "5:00 PM", azan: "Azan: 4:30 PM", active: true },
    { name: "Zuhr", time: "5:00 PM", azan: "Azan: 4:30 PM", active: false },
    { name: "Asr", time: "5:00 PM", azan: "Azan: 4:30 PM", active: false },
    { name: "Mugrib", time: "5:00 PM", azan: "Azan: 4:30 PM", active: false },
    { name: "Isha", time: "5:00 PM", azan: "Azan: 4:30 PM", active: false },
  ];

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
                Vaxjo Muslimska Samfundet
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
                <p className="text-white/80 text-sm">5:00 PM</p>
                <p className="text-white/60 text-xs">Azan: 4:30 PM</p>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-1">Chouruk</h4>
                <p className="text-white/80 text-sm">5:00 PM</p>
                <p className="text-white/60 text-xs">Azan: 4:30 PM</p>
              </div>
            </div>

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`text-center py-3 px-2 md:px-4 rounded-xl transition-all ${
                    prayer.active
                      ? "bg-white text-secondary"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <h4 className={`font-semibold text-sm md:text-base mb-1 ${
                    prayer.active ? "text-secondary" : "text-white"
                  }`}>
                    {prayer.name}
                  </h4>
                  <p className={`text-xs md:text-sm font-medium ${
                    prayer.active ? "text-secondary/80" : "text-white/80"
                  }`}>
                    {prayer.time}
                  </p>
                  <p className={`text-xs mt-1 ${
                    prayer.active ? "text-secondary/60" : "text-white/60"
                  }`}>
                    {prayer.azan}
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
