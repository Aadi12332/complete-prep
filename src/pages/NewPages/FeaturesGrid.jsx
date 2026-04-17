import { motion } from 'framer-motion';

export const FeaturesGrid = () => {
  const features = [
    {
      title: 'Video Lectures',
      desc: 'Learn concepts with structured video lectures designed for quick understanding.',
      icon: '🎥',
    },
    {
      title: 'Notes',
      desc: 'Access concise and well-structured notes for fast revision anytime.',
      icon: '📚',
    },
    {
      title: 'AI Chat',
      desc: 'Ask doubts instantly and get smart answers with our AI assistant.',
      icon: '🤖',
    },
    {
      title: 'Last Minute Prep',
      desc: 'Revise important topics quickly before exams with curated content.',
      icon: '⚡',
    },
    {
      title: 'PYQ Solutions',
      desc: 'Practice previous year questions with detailed solutions.',
      icon: '📝',
    },
    {
      title: 'Important Questions',
      desc: 'Focus on high-weightage questions to maximize your score.',
      icon: '⭐',
    },
  ];

  return (
    <div className="my-16 md:px-6 px-3">
      <h2 className="text-center text-2xl md:text-4xl font-bold mb-10">
        Everything You Need to Ace Your Exams
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-4xl mb-4">{item.icon}</div>

            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};