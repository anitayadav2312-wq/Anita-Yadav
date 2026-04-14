import { motion } from "motion/react";
import { ArrowRight, MapPin, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-10">
      <header className="relative h-[50vh] overflow-hidden rounded-3xl border border-border shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1920&auto=format&fit=crop"
          alt="Mumbai Gateway"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-3 tracking-tight"
          >
            Aamchi Mumbai
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-xl max-w-lg font-medium"
          >
            Experience the city of dreams like a local. Plan your perfect trip with ease.
          </motion.p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Explore Places", desc: "Find the best hotels and landmarks", icon: MapPin, link: "/explore", color: "bg-blue-500" },
          { title: "AI Planner", desc: "Get a custom itinerary in seconds", icon: Sparkles, link: "/planner", color: "bg-accent" },
          { title: "Local Transport", desc: "Navigate the lifeline of Mumbai", icon: Compass, link: "/transport", color: "bg-green-500" },
        ].map((item, i) => (
          <Link key={i} to={item.link}>
            <motion.div
              whileHover={{ y: -5 }}
              className="panel h-full hover:shadow-md transition-shadow"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4", item.color)}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              <div className="mt-auto pt-6 flex items-center text-accent font-bold text-sm">
                Get Started <ArrowRight size={16} className="ml-1" />
              </div>
            </motion.div>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Marine Drive", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=400&auto=format&fit=crop" },
            { name: "Colaba Causeway", img: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=400&auto=format&fit=crop" },
            { name: "Juhu Beach", img: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=400&auto=format&fit=crop" },
            { name: "Elephanta Caves", img: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=400&auto=format&fit=crop" },
          ].map((place, i) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-border">
              <img 
                src={place.img} 
                alt={place.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <span className="text-white font-bold text-lg">{place.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


import { cn } from "@/src/lib/utils";
