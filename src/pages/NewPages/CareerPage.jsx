import React from 'react';
import Header from './Header';
import Footer from './Footer';

const jobs = [
  {
    title: 'Campus Ambassador',
    type: 'Remote',
    description:
      'Represent our brand on your campus, organize events, and help students discover better learning opportunities.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Content Creator',
    type: 'Full Time',
    description:
      'Create engaging educational content, reels, and videos to help students learn smarter and faster.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Social Media Manager',
    type: 'Remote',
    description:
      'Manage and grow our social media presence by planning content, analyzing trends, and engaging with our audience.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Video Editor',
    type: 'Remote',
    description:
      'Edit high-quality educational and promotional videos to enhance student engagement across platforms.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Graphic Designer',
    type: 'Remote',
    description:
      'Design creative visuals, banners, and thumbnails that align with our brand and attract student attention.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Marketing Intern',
    type: 'Remote',
    description:
      'Assist in executing marketing campaigns, researching trends, and helping grow the platform reach.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Community Manager',
    type: 'Remote',
    description:
      'Build and manage student communities, handle queries, and ensure an engaging user experience.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Content Writer',
    type: 'Remote',
    description:
      'Write blogs, scripts, and educational content that simplifies learning for students.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'SEO Intern',
    type: 'Remote',
    description:
      'Optimize content and pages for search engines to improve visibility and organic traffic.',
    link: 'https://forms.gle/your-google-form-link',
  },
  {
    title: 'Product Intern',
    type: 'Remote',
    description:
      'Work closely with the team to improve product features, user experience, and overall platform growth.',
    link: 'https://forms.gle/your-google-form-link',
  },
];

const CareerPage = () => {
  return (
    <>
    <div className="mainMaxWidth">

      <Header />

      <div className="px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team 🚀</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Be a part of a fast-growing platform that is transforming the way students learn. Work
            with us, grow with us, and make an impact.
          </p>
        </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
  <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Growth"
      className="w-16 h-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-xl mb-2">Growth</h3>
    <p className="text-base text-gray-600 leading-relaxed">
      Learn, grow, and build real-world skills while working on impactful projects with a fast-growing team.
    </p>
  </div>

  <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
    <img
      src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
      alt="Remote Work"
      className="w-16 h-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-xl mb-2">Remote Work</h3>
    <p className="text-base text-gray-600 leading-relaxed">
      Enjoy flexibility and work from anywhere while collaborating with a dynamic and creative team.
    </p>
  </div>

  <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
    <img
      src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
      alt="Impact"
      className="w-16 h-16 mx-auto mb-4"
    />
    <h3 className="font-semibold text-xl mb-2">Impact</h3>
    <p className="text-base text-gray-600 leading-relaxed">
      Contribute to a platform that is helping thousands of students learn better and achieve their goals.
    </p>
  </div>
</div>

        <div className="text-center mb-8">
  <h2 className="text-2xl md:text-3xl font-bold mb-2">
    Open Positions
  </h2>
  <p className="text-gray-600 max-w-xl mx-auto">
    Explore exciting opportunities and join us to build something impactful.
  </p>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {jobs.map((job, index) => (
    <div
      key={index}
      className="border rounded-lg p-3 shadow-sm hover:shadow-lg transition"
    >
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">💼</span>
          <h2 className="text-lg font-semibold">{job.title}</h2>
        </div>

        <span className="text-sm px-2 py-1 bg-green-100 text-green-600 rounded-xl mt-4 block w-fit">
          {job.type}
        </span>
      </div>

      <p className="text-gray-600 text-base mb-6 leading-relaxed">
        {job.description}
      </p>

      <button
        onClick={() => window.open(job.link, "_blank")}
        className="w-full py-2 bg-black text-white rounded-lg text-base font-medium hover:opacity-90"
      >
        Apply Now
      </button>
    </div>
  ))}
</div>

        {jobs.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No openings available right now</div>
        )}
      </div>
    </div>

      <Footer />
    </>
  );
};

export default CareerPage;
