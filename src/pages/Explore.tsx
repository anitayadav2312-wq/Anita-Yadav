import { useEffect, useState } from "react";
import { getHotels } from "@/src/api";
import { motion } from "motion/react";
import { Star, MapPin, Loader2 } from "lucide-react";

export default function Explore() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHotels().then((data) => {
      setHotels(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-text-main tracking-tight">Explore Stays</h1>
        <p className="text-text-muted mt-1">Find the perfect place to rest in the city</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 panel">
          <Loader2 className="animate-spin text-accent mb-4" size={40} />
          <p className="text-text-muted font-medium">Searching for best hotels...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="panel p-0 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img
                  src={hotel.photoUrl || `https://picsum.photos/seed/${hotel.name}/400/300`}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {hotel.rating && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center text-sm font-bold text-accent shadow-sm">
                    <Star size={14} className="fill-accent text-accent mr-1" />
                    {hotel.rating}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 line-clamp-1 text-text-main">{hotel.name}</h3>
                <div className="flex items-center text-text-muted text-sm mb-5">
                  <MapPin size={14} className="mr-1 shrink-0" />
                  <span className="line-clamp-1">{hotel.vicinity || "Mumbai Central"}</span>
                </div>
                <button className="w-full py-2.5 bg-text-main text-white rounded-xl font-bold text-sm hover:bg-black transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

