import { useState } from 'react';
import { motion } from 'framer-motion';

export const HomePageBenifitComponent = () => {
  const tabData = [
    {
      name: 'Ask Galileo',
      title: 'Ask anything instantly',
      desc: 'AI assistant helps you understand difficult concepts quickly.',
      media: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      type: 'image',
    },
    {
      name: 'Visualize concept',
      title: 'See it visually',
      desc: 'Generate videos, images, and diagrams to break down any concept.',
      media: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
      type: 'image',
    },
    {
      name: 'Connect your resourses',
      title: 'Bring all resources together',
      desc: 'Upload notes, PDFs, and lectures to study in one place.',
      media: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      type: 'image',
    },
    {
      name: 'Proactive suggestions',
      title: 'Smart recommendations',
      desc: 'Get suggestions on what to study next based on progress.',
      media: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      type: 'image',
    },
    {
      name: 'Practice & Retain',
      title: 'Practice and retain better',
      desc: 'Test yourself with quizzes and revision prompts.',
      media: 'https://www.w3schools.com/html/mov_bbb.mp4',
      type: 'video',
    },
  ];

  const [activeTab, setActiveTab] = useState(tabData[0]);

  return (
    <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }} className="my-16 md:px-6 px-3">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 text-center">Ask Anything. Understand Everything.</h1>

            <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto text-center mb-10">
              Your AI-powered study partner that helps you solve doubts, learn faster, and master concepts instantl
            </p>
      <div className="flex flex-nowrap md:gap-2 bg-[#f3f4f6] max-w-[calc(100vw-32px)] overflow-auto rounded-3xl p-1 w-fit mx-auto">
        {tabData.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab)}
            className={`lg:!px-4 px-2 py-2 text-[13px] sm:text-base font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab.name === tab.name
                ? 'bg-white text-black rounded-3xl'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-3 md:flex bg-[#f4b93b] md:rounded-xl rounded-lg overflow-hidden">
        <div className="md:p-10 text-black flex-1 max-w-[350px]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 px-3 md:px-0 pt-5 md:pt-0">{activeTab.title}</h2>

          <p className="text-sm md:text-base text-black/80 max-w-sm px-3 md:px-0 pb-5 md:pb-0">{activeTab.desc}</p>
        </div>

        <div className="relative h-[320px] md:h-[420px] overflow-hidden p-8 md:p-12 flex-1">
          {activeTab.type === 'video' ? (
            <video
              src={activeTab.media}
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={activeTab.media}
              alt={activeTab.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};
