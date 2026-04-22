import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { ReusableModal } from '../../components/common/ComPrepComponent/ComPrepComponent';
import { ProfileEditFormMain } from '../../components/common/New-Components/NewComponent';
import { AuthContext } from '../../Context/AuthContext';
import { userApi } from '../../services/apiFunctions';
import images from '../../utils/images';
import './NewPages.css';
import { HomePageBenifitComponent } from './HomePageBenifitComponent';
import StackCards from './StackCards';
import Footer from './Footer';
import Header from './Header';
import { HomePagePrepoComponent } from './HomePagePrepoComponent';
import { FeaturesGrid } from './FeaturesGrid';
import { motion } from 'framer-motion';

const courses = [
  {
    title: 'NEET',
    image: images.newHomePageCourseImage1,
    cardBg: '#A8D5A2',
    imageBg: '#ffffff',
  },
  {
    title: '12th Board',
    image: images.newHomePageCourseImage2,
    cardBg: '#FFE88D',
    imageBg: '#fff1b8',
  },
  {
    title: '10th Board',
    image: images.newHomePageCourseImage3,
    cardBg: '#FFCB89',
    imageBg: '#fff0d1',
  },
  {
    title: 'BA (Online)',
    image: images.newHomePageCourseImage4,
    cardBg: '#E7D1FB',
    imageBg: '#d3bff7',
  },
  {
    title: 'UPSC 2026',
    image: images.newHomePageCourseImage5,
    cardBg: '#B6D7A8',
    imageBg: '#c6e1b6',
  },
  {
    title: 'SSC CGL',
    image: images.newHomePageCourseImage6,
    cardBg: '#D6E0FF',
    imageBg: '#dce7ff',
  },
];

const brands = [
  images.newHomePageBrandsImage1,
  images.newHomePageBrandsImage2,
  images.newHomePageBrandsImage3,
  images.newHomePageBrandsImage4,
  images.newHomePageBrandsImage5,
  images.newHomePageBrandsImage6,
];
const howWeWork = [
  {
    icon: 'heroicons-solid:eye',
    title: 'Tell Us About Your Vision',
    description:
      "Share your pitch deck or business plan, and we'll review your vision, market potential, and growth strategy to explore collaboration.",
  },
  {
    icon: 'streamline:magnifying-glass-circle',
    title: 'Assessing Potential',
    description: '',
  },
  {
    icon: 'game-icons:tree-growth',
    title: 'Fueling Your Growth',
    description: '',
  },
  {
    icon: 'fluent:arrow-growth-20-regular',
    title: 'Long-Term Growth Support',
    description: '',
  },
];

const communityCards = [
  {
    title: 'Discussion Forums',
    description:
      'Engage in topic-based discussions, post questions, and participate in debates on key subjects.',
    image: images.newHomePageCommunityImage1,
  },
  {
    title: 'Study Groups',
    description:
      'Join study groups based on your exam or subject area. Work together, share strategies, and track each other’s progress.',
    image: images.newHomePageCommunityImage2,
  },
  {
    title: 'Challenges & Leaderboards',
    description:
      'Participate in weekly or monthly challenges. Earn points by solving quizzes, contributing to discussions, and climb the leaderboard.',
    image: images.newHomePageCommunityImage3,
  },
  {
    title: 'Doubts & Solutions',
    description:
      'Post your doubts, and receive solutions from other learners and mentors. Respond to queries and help others along the way.',
    image: images.newHomePageCommunityImage4,
  },
];

const exploreCourses = [
  {
    title: 'JEE',
    description:
      'Unlock Your Online JEE Main/Advanced, a digital self-paced course is designed for any JEE aspirant in any corner of the country.',
    bgImage: images?.newHomePageExploreCourseImage1,
  },
  {
    title: 'NEET',
    description:
      'Embark on your NEET UG journey with our Comprehensive Medical Course, designed to give you an edge in the world of medical entrance exams.',
    bgImage: images?.newHomePageExploreCourseImage2,
  },
  {
    title: 'SSC COL',
    description:
      'Download Your SSC Answer Key 2023. Check your answers and calculate your expected score.',
    bgImage: images?.newHomePageExploreCourseImage3,
  },
  {
    title: 'className 12th',
    description:
      'Order Your Sample Papers for className 12th CBSE Board Exams. Prepare from the best resources, score high, and shine bright.',
    bgImage: images?.newHomePageExploreCourseImage4,
  },
];

const HomePage = () => {
  const [currentState, setCurrentState] = useState(null);
  const [activeCategory, setActiveCategory] = useState('CBSE');
  const [openIndex, setOpenIndex] = useState(0);
  const bgColors = ['#FFFECF', '#FEE5E5', '#E3FCD0', '#DDE8FF', '#FFFFFF'];
  const borderColors = ['#C3B900', '#B82020', '#1F7A1F', '#003E9D', '#E0E0E0'];
  const titleColors = ['#D4B300', '#D62828', '#228B22', '#003B95', '#000000'];
  const [testimonials, setTestimonials] = useState([]);
  const [mainUniversities, setMainUniversities] = useState([]);

  const universities = [
    {
      title: 'IIT',

      image: images.newHomePageCourseImage1,
      cardBg: '#A8D5A2',
      imageBg: '#ffffff',
    },
    {
      title: 'NIT',
      image: images.newHomePageCourseImage2,
      cardBg: '#FFE88D',
      imageBg: '#fff1b8',
    },
    {
      title: 'IIIT',
      image: images.newHomePageCourseImage3,
      cardBg: '#FFCB89',
      imageBg: '#fff0d1',
    },
    {
      title: 'IIM',
      image: images.newHomePageCourseImage4,
      cardBg: '#E7D1FB',
      imageBg: '#d3bff7',
    },
    {
      title: 'NIFT',
      image: images.newHomePageCourseImage5,
      cardBg: '#B6D7A8',
      imageBg: '#c6e1b6',
    },
    {
      title: 'NIRF',
      image: images.newHomePageCourseImage6,
      cardBg: '#D6E0FF',
      imageBg: '#dce7ff',
    },
  ];
  const [nextPage, setNextPage] = useState('');
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();
  const toggleDropdown = state => {
    setCurrentState(currentState === state ? null : state);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const [goalCategory, setGoalCategory] = useState([]);
  const [goal, setGoal] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGoalCategory, setSelectedGoalCategory] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [topBanner, setTopBanner] = useState('');
  const { setUser } = useContext(AuthContext);

  const [popularCourses, setPopularCourses] = useState([]);

  const fetchTopBanner = async () => {
    userApi.landingPage.getTopBanner({
      params: { position: 'TOP' },
      onSuccess: data => {
        setTopBanner(data?.data?.[data?.data?.length - 1]?.image || '');
      },
    });
  };

  const fetchPopularCourses = async () => {
    userApi.landingPage.getAll({
      onSuccess: data => setPopularCourses(data?.data || []),
    });
  };

  const fetchGoalCategory = async () => {
    userApi.goalCategory.getAll({
      onSuccess: data => setGoalCategory(data?.data || []),
    });
  };

  const fetchGoal = async () => {
    userApi.universityCourse.getAll({
      params: { universityId: selectedGoalCategory },
      onSuccess: data => setGoal(data || []),
    });
  };
  useEffect(() => {
    if (selectedGoalCategory) fetchGoal();
  }, [selectedGoalCategory]);

  const fetchUniversities = async () => {
    userApi.university.getAll({
      onSuccess: data => setMainUniversities(data?.data || []),
    });
  };

  useEffect(() => {
    fetchUniversities();
    fetchGoalCategory();
    fetchPopularCourses();
    fetchTopBanner();
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    userApi.testMonial.getAll({
      onSuccess: data => setTestimonials(data?.data || []),
    });
  };

  const fetchFaqs = async () => {
    userApi.faq.getAll({
      onSuccess: data => setFaqs(data?.data || []),
    });
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const getRandomStaticStyle = () => {
    const all = [...courses, ...universities];
    return all[Math.floor(Math.random() * all.length)];
  };

  const mergeCourseData = apiItem => {
    const random = getRandomStaticStyle();
    return {
      title: apiItem?.title ?? apiItem?.name ?? random?.title ?? 'Untitled',
      name: apiItem?.name ?? apiItem?.title ?? random?.title ?? 'Untitled',
      cardBg: random?.cardBg ?? '#FFFFFF',
      imageBg: random?.imageBg ?? '#FFFFFF',
      courseImage: apiItem?.image
        ? [apiItem.image]
        : apiItem?.courseImage
          ? apiItem.courseImage
          : random?.image
            ? [random.image]
            : [],
      logo: apiItem?.image ?? apiItem?.logo ?? random?.image ?? '',
      id: apiItem?._id,
      courseCategoryId: apiItem?.courseCategoryId || null,
      ...apiItem,
    };
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      <ReusableModal
        size="md"
        body={
          <ProfileEditFormMain
            nextPage={nextPage}
            closeModal={() => setModalVisible(false)}
            setUser={setUser}
          />
        }
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        footer={false}
        header={false}
      />

      <div className="h-full mainMaxWidth bg-white">
        <Header />
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center justify-center text-center bg-white md:px-6 px-3 mb-4 mt-20"
          >
            <img
              src={images.navBarLogo}
              alt="SemPrep Logo"
              className="w-48 mb-4 object-contain md:block hidden"
            />

            <h2 className="text-3xl md:text-4xl font-bold text-black">Now</h2>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">Semesters Made Easy!</h1>

            <p className="text-sm md:text-base text-gray-700 max-w-xl">
              Video Explanation, Prepo AI, Notes, Mind Maps, One Shot, PYQ & Sample Papers All In
              One Place
            </p>

            <button
              onClick={() => setModalVisible(true)}
              className="mt-3 px-8 py-2 font-bold bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl"
            >
              TRY FOR FREE
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="my-16 md:my-24 text-center md:px-6 px-3"
          >
            <p className="text-zinc-800 text-lg fw-semibold">
              Trusted by over 14,540 businesses to enhance learning and drive educational growth.
            </p>
            <div className="overflow-hidden w-full mt-4">
              <div className="flex w-max animate-scroll gap-3">
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center px-6 border rounded-lg border-gray-300"
                  >
                    <img src={brand} className="w-24 h-14 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <HomePageBenifitComponent />

          <HomePagePrepoComponent />

          <FeaturesGrid />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="md:px-6 px-3"
          >
            <div className="mt-16 md:mt-24 flex justify-center">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-3xl text-lg font-medium text-gray-700 border border-gray-300">
                <Icon icon="proicons:emoji" className="text-xl" />
                <span>Our Testimonials</span>
              </div>
            </div>

            <h2 className="text-center text-4xl font-bold mt-4 text-black">
              User Reviews and Feedback
            </h2>
            <p className="text-center text-gray-500 mt-2 text-sm md:text-base max-w-xl mx-auto">
              See how Capcable has transformed users’ social experiences through their own words.
            </p>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                {testimonials.map((t, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="md:p-4 p-3 md:rounded-xl rounded-lg bg-[#efefef]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <img src={t.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
                        <div className="text-yellow-500">{'★'.repeat(t.rating)}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">{t.review}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="md:px-6 px-3 my-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="space-y-4 flex items-center flex-wrap justify-between gap-3 mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Still have any questions? Contact our Team via <br />
                  <a href="mailto:support@completeprep.com" className="text-blue-600 underline">
                    support@completeprep.com
                  </a>
                </p>
              </div>
              <button
                onClick={() => navigate('/faqs')}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                See All FAQ’s
              </button>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg md:p-4 p-3 bg-[#efefef]"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      <div className={`p-1 rounded ${isOpen ? '' : ''}`}>
                        {isOpen ? (
                          <Icon icon={'line-md:minus'} size={18} />
                        ) : (
                          <Icon icon={'akar-icons:plus'} size={18} />
                        )}
                      </div>
                    </div>
                    {isOpen && faq.answer && (
                      <div className="mt-4 text-gray-700 space-y-3">
                        <p>{faq.answer}</p>
                        {faq.link && (
                          <div className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 cursor-pointer">
                            <span>{faq.link}</span>
                            {/* <ArrowRight size={16} /> */}
                            <Icon icon={'si:arrow-right-duotone'} />
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
