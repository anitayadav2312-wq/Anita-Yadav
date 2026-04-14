import { motion } from "motion/react";
import { BookOpen, Camera, Heart, Share2 } from "lucide-react";

export default function Stories() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-text-main tracking-tight">Mumbai Stories</h1>
        <p className="text-text-muted mt-1">Tales from the heart of the city</p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {[
          {
            title: "A Morning at Sassoon Dock",
            author: "Rahul S.",
            date: "Oct 12, 2023",
            img: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=800&auto=format&fit=crop",
            excerpt: "The smell of fish and the sound of Koli women bargaining... it's the true soul of Mumbai."
          },
          {
            title: "The Magic of Irani Cafes",
            author: "Priya M.",
            date: "Sep 28, 2023",
            img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
            excerpt: "Bun Maska and Chai at Kyani & Co. is not just a meal, it's a journey back in time."
          }
        ].map((story, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="panel p-0 overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="h-72 overflow-hidden relative">
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  Travelogue
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center text-[10px] font-bold text-text-muted mb-3 uppercase tracking-widest">
                <span>{story.date}</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-4 text-text-main group-hover:text-accent transition-colors leading-tight">
                {story.title}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8">{story.excerpt}</p>
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-bg border border-border mr-3 flex items-center justify-center text-text-muted font-bold">
                    {story.author[0]}
                  </div>
                  <span className="text-sm font-bold text-text-main">{story.author}</span>
                </div>
                <div className="flex gap-6 text-text-muted">
                  <Heart size={22} className="hover:text-red-500 cursor-pointer transition-colors" />
                  <Share2 size={22} className="hover:text-accent cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-orange-600 transition-colors"
      >
        <Camera size={28} />
      </motion.button>
    </div>
  );
}

