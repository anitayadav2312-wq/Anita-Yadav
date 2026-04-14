import { useEffect, useState } from "react";
import { getTrains } from "@/src/api";
import { motion } from "motion/react";
import { Train, Clock, MapPin, Loader2, Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Transport() {
  const [trains, setTrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrains().then((data) => {
      setTrains(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-text-main tracking-tight">Local Transport</h1>
        <p className="text-text-muted mt-1">Navigate Mumbai's lifeline like a pro</p>
      </header>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start shadow-sm">
        <Info className="mr-4 shrink-0 text-blue-600" size={24} />
        <div>
          <h3 className="font-bold text-blue-900 mb-1">Travel Tip</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Avoid peak hours (8 AM - 11 AM and 5 PM - 8 PM) unless you want the "Super Dense Crush Load" experience!
          </p>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-h2 text-text-main">
          <Train size={18} className="text-accent" />
          Local Train Lines
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-accent" size={32} />
          </div>
        ) : (
          <div className="space-y-4">
            {trains.map((train, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-5 rounded-xl border-l-4 flex items-center gap-5 transition-transform hover:translate-x-1",
                  train.line === "Western" ? "bg-red-50 border-l-red-500" : 
                  train.line === "Central" ? "bg-yellow-50 border-l-yellow-500" : 
                  "bg-blue-50 border-l-blue-500"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm", train.color)}>
                  <Train size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-text-main uppercase text-xs tracking-widest">{train.line} Line</h3>
                    <span className="text-[10px] font-bold bg-white/50 text-text-muted px-2 py-1 rounded-md flex items-center border border-black/5">
                      <Clock size={12} className="mr-1" /> {train.freq}
                    </span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-text-main">
                    {train.from} <span className="mx-3 text-text-muted">→</span> {train.to}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="panel">
          <h4 className="font-bold text-red-600 mb-2 uppercase text-xs tracking-widest">BEST Bus</h4>
          <p className="text-sm text-text-muted leading-relaxed">Extensive network covering the entire city. Look for red buses.</p>
        </div>
        <div className="panel">
          <h4 className="font-bold text-yellow-600 mb-2 uppercase text-xs tracking-widest">Auto Rickshaws</h4>
          <p className="text-sm text-text-muted leading-relaxed">Available in suburbs. Always insist on the meter.</p>
        </div>
      </section>
    </div>
  );
}

