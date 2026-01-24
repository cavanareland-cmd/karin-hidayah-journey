import { Play, Youtube } from "lucide-react";

const videos = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&q=80",
    isLive: true,
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&q=80",
    isLive: true,
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400&q=80",
    isLive: false,
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=400&q=80",
    isLive: false,
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&q=80",
    isLive: false,
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400&q=80",
    isLive: false,
  },
];

const YoutubeSection = () => {
  return (
    <section className="section-padding">
      <div className="flex items-center gap-2 mb-4">
        <Youtube className="w-5 h-5 text-red-600" />
        <span className="font-medium text-foreground">Video Islami</span>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-3" style={{ width: "max-content" }}>
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative w-36 h-24 rounded-xl overflow-hidden hover-lift cursor-pointer group"
            >
              <img
                src={video.thumbnail}
                alt={`Video ${video.id}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                </div>
              </div>

              {/* Live Badge */}
              {video.isLive && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;
