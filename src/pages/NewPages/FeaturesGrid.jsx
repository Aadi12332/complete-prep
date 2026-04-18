import { motion } from 'framer-motion';

export const FeaturesGrid = () => {
  const features = [
    {
      title: 'Video Lectures',
      desc: 'Learn concepts with structured video lectures designed for quick understanding.',
      points: [
        'Visual Concepts',
        'Ask Prepo',
        'Last Minute Prep',
        'Trusted Notes',
        'Cheat Sheet',
        'Practice Papers',
      ],
      icon: '🎥',
    },
    {
      title: 'AI Tools',
      desc: 'Smart AI-powered tools to simplify learning and boost productivity.',
      points: [
        'Ask Prepo',
        'Summarise Topics',
        'Assignment Assistance',
        'Interview Prep',
      ],
      icon: '🤖',
    },
    {
      title: 'Smart Learning',
      desc: 'Personalized learning experience tailored to your progress and goals.',
      points: [
        'Personalized Study Plans',
        'Progress Tracking',
        'Daily Goals',
        'Smart Recommendations',
      ],
      icon: '📈',
    },
    {
      title: 'Exam Preparation',
      desc: 'Everything you need to prepare effectively and score better.',
      points: [
        'Mock Tests',
        'Previous Year Questions',
        'Important Questions',
        'Revision Strategies',
      ],
      icon: '📝',
    },
    {
      title: 'Resources',
      desc: 'Access all your study materials in one place for easy learning.',
      points: [
        'PDF Notes',
        'Recorded Lectures',
        'Topic-wise Content',
        'Quick Revision Material',
      ],
      icon: '📚',
    },
    {
      title: 'Career Growth',
      desc: 'Prepare beyond exams with tools that help you build your career.',
      points: [
        'Interview Preparation',
        'Resume Guidance',
        'Skill Development',
        'Career Roadmaps',
      ],
      icon: '🚀',
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

            <p className="text-gray-600 text-sm mb-4">
              {item.desc}
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              {item.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};