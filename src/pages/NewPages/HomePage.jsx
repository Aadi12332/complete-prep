import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useEffect, useState } from 'react';
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
  const [mainUniversities, setMainUniversities] = useState([]);
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

      <div className="h-full p-3 sm:p-1 mainMaxWidth bg-white">
        <div className="w-full max-h-[600px] object-cover rounded-lg relative">
          <div className="flex flex-wrap items-center justify-between px-4 py-3">
            <img
              src={images.newMainLogo}
              alt="Logo"
              onClick={() => navigate('/')}
              className="max-w-[150px] object-contain"
            />

            <div className="relative flex flex-wrap items-center gap-2 p-1 mt-3 bg-[#efefef] text-gray-500 hover:text-gray-700 rounded-3xl md:mt-0">
              <span
                onClick={() => toggleDropdown(0)}
                className="flex items-center gap-1 cursor-pointer hover:bg-white rounded-3xl px-4 py-2"
              >
                Universities
                {currentState === 0 ? (
                  <Icon icon="akar-icons:chevron-up" />
                ) : (
                  <Icon icon="akar-icons:chevron-down" />
                )}
              </span>
              {['About', 'Pricing', 'Testimonial']?.map(tab => (
                <span
                  key={tab}
                  onClick={() => {
                    tab === 'Testimonial'
                      ? navigate('/testimonials')
                      : tab === 'Pricing'
                        ? navigate('/pricing')
                        : tab === 'About'
                          ? navigate('/about')
                          : setCurrentState(null);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-white rounded-3xl"
                >
                  {tab}
                </span>
              ))}

              {currentState === 0 && (
                <div className="absolute top-[110%] left-0 bg-white text-black rounded-3xl shadow-lg w-full md:w-[800px] p-4 z-50">
                  <div className="flex gap-2 pb-2 mb-4 overflow-x-auto border-b md:gap-4">
                    {mainUniversities?.map(cat => (
                      <button
                        key={cat?._id}
                        onClick={() => setSelectedGoalCategory(cat?._id)}
                        className={`whitespace-nowrap px-3 py-1 rounded-3xl ${
                          selectedGoalCategory === cat?._id
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-black border border-gray-300'
                        }`}
                      >
                        {cat?.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                    {goal?.map((item, index) => {
                      return (
                        <div key={index}>
                          <h5
                            className="px-3 py-1 text-sm bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-3xl w-fit"
                            onClick={() => {
                              setNextPage(`/semester-exam/${selectedGoalCategory}/${item?._id}`);
                              setModalVisible(true);
                            }}
                          >
                            {item?.name}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {item?.subjects?.map((subject, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-sm bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-3xl"
                              >
                                {subject?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* {Object.entries(courseData[activeCategory]).map(
                      ([className, subjects]) => (
                        <div key={className}>
                          <h5 className="mb-2 font-semibold">{className}</h5>
                          <div className="flex flex-wrap gap-2">
                            {subjects.map((subject, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-sm bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-3xl"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )} */}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-3 md:mt-0 pb-4 ml-[5rem] md:ml-0">
              <button
                onClick={() => setModalVisible(true)}
                className="px-4 py-2 font-bold text-black bg-transparent border border-black rounded-3xl hover:!bg-[#3DD455] hover:text-white"
              >
                Register
              </button>
              <button
                onClick={() => setModalVisible(true)}
                className="px-4 py-2 font-bold bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl"
              >
                Login
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-4 md:mt-10 text-center text-yellow-300 md:text-white pb-4"></div>
        </div>
        <div className="">
          <div className="flex flex-col items-center justify-center text-center bg-white px-6 mb-4">
            <img src={images.navBarLogo} alt="SemPrep Logo" className="w-48 mb-4 object-contain" />

            <h2 className="text-3xl md:text-4xl font-bold text-black">Now</h2>

            <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
              Semesters Made Easy!
            </h1>

            <p className="text-sm md:text-base text-gray-700 max-w-xl">
              Video Explanation, Prep AI, Handwritten Notes, One Shot, PYQ & Sample Papers All In
              One Place
            </p>

            <button
              onClick={() => setModalVisible(true)}
              className="mt-6 px-8 py-2 font-bold bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl"
            >
              TRY FOR FREE
            </button>
          </div>
          {/* <div>
            <p className="text-[#f7f700] text-2xl font-bold bg-gray-900 px-4 py-2 inline-block rounded-3xl">
              Popular Courses
            </p>
            <div className="w-full px-4 py-6">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={2.2}
                breakpoints={{
                  640: { slidesPerView: 3.2 },
                  768: { slidesPerView: 4.2 },
                  1024: { slidesPerView: 6.2 },
                }}
              >
                {popularCourses?.popularCourses?.map((course, index) => {
                  const merged = mergeCourseData(course);
                  return (
                    <SwiperSlide key={index}>
                      <div
                        className="rounded-xl px-3 py-4 shadow-md relative min-h-[200px] flex flex-col justify-between cursor-pointer"
                        style={{ backgroundColor: merged.cardBg }}
                        onClick={() => {
                          setNextPage(`/user/course/${merged.courseCategoryId}/${merged.id}`);
                          setModalVisible(true);
                        }}
                      >
                        <div className="text-sm fw-bold">{merged.title}</div>
                        <div
                          className="mx-auto w-[100px] h-[100px] rounded-full flex items-end justify-center overflow-hidden border-4 border-white"
                          style={{ backgroundColor: merged.imageBg }}
                        >
                          <img
                            src={merged?.courseImage?.[0]}
                            alt={merged.title}
                            className="w-[80px] h-[80px] object-contain rounded-full mb-[-10px]"
                          />
                        </div>

                        <div className="text-xl fw-bold absolute top-5 right-3">›</div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div> */}
          {/* <div className="mt-4">
            <p className="text-[#f7f700] text-2xl font-bold bg-gray-900 px-4 py-2 inline-block rounded-3xl">
              Select University
            </p>
            <div className="w-full px-4 py-6">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={2.2}
                breakpoints={{
                  450: { slidesPerView: 1 },
                  640: { slidesPerView: 3.2 },
                  768: { slidesPerView: 4.2 },
                  1024: { slidesPerView: 6.2 },
                }}
              >
                {popularCourses?.selectUniversities?.map((course, index) => {
                  const merged = mergeCourseData(course);
                  return (
                    <SwiperSlide key={index}>
                      <div
                        className="rounded-xl px-3 py-4 shadow-md relative min-h-[200px] flex flex-col justify-between cursor-pointer"
                        style={{ backgroundColor: merged.cardBg }}
                        onClick={() => {
                          setNextPage(`/semester-exam/${merged.id}`);
                          setModalVisible(true);
                        }}
                      >
                        <div className="text-sm fw-bold text-lg">{merged.name ?? merged.title}</div>
                        <div
                          className="mx-auto w-[100px] h-[100px] rounded-full flex items-end justify-center overflow-hidden border-4 border-white"
                          style={{ backgroundColor: merged.imageBg }}
                        >
                          <img
                            src={merged.logo}
                            alt={merged.name ?? merged.title}
                            className="w-[80px] h-[80px] object-contain rounded-full mb-[-10px]"
                          />
                        </div>
                        <div className="text-xl fw-bold absolute top-5 right-3">›</div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div> */}
          <div className="mt-4 text-center">
            <p className="text-zinc-800 text-lg fw-semibold">
              Trusted by over 14,540 businesses to enhance learning and drive educational growth.
            </p>
            <div className="overflow-hidden w-full mt-4">
              <div className="flex w-max animate-scroll">
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <div key={index} className="flex items-center justify-center px-6">
                    <img src={brand} className="w-24 h-14 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HomePageBenifitComponent />
          {/* <div className="mt-4">
            <div
              style={{
                backgroundImage: `url(${images?.newHomePageCommunityImage})`,
              }}
              className="min-h-[300px] bg-no-repeat bg-cover mt-7 pt-7 pb-7"
            >
              <div className="text-white text-center p-4 flex flex-col justify-center items-center pt-7">
                <img
                  src={images?.newHomePageCommunityImage5}
                  alt="Community"
                  className="w-22 h-16 object-contain"
                />
              </div>
              <div className="text-white text-center p-4">
                <p className="text-3xl fw-semibold mb-2">
                  Join the Learning <span className="text-yellow-300">Community</span> and Grow
                  Together 🤝🏼
                </p>
                <p className="text-md">
                  Connect, Share, and Learn with Fellow Students and Experts in Our Engaging
                  Community
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4  w-80 mx-auto py-4 text-white">
                {communityCards?.slice(0, 2).map((card, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: card.cardBg }}
                    className="rounded-xl px-3 py-4 shadow-md relative min-h-[200px] flex flex-col gap-2 justify-between cursor-pointer bg-transparent"
                  >
                    <span>
                      <img src={card.image} alt={card.title} />
                    </span>
                    <span>{card.title}</span>
                    <span>{card.description}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4 p-4  w-80 mx-auto py-4 text-white md:grid-cols-2">
                {communityCards?.slice(2).map((card, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: card.cardBg }}
                    className="rounded-xl px-3 py-4 shadow-md relative min-h-[200px] flex flex-col gap-2 justify-between cursor-pointer bg-transparent"
                  >
                    <span>
                      <img src={card.image} alt={card.title} />
                    </span>
                    <span>{card.title}</span>
                    <span>{card.description}</span>
                  </div>
                ))}
              </div>
              <p className="text-center mt-4">
                <button className=" px-6 py-2 font-bold bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl">
                  Get Started
                </button>
              </p>
            </div>
          </div> */}
          {/* <div className="mt-4">
            <div className="w-80 mx-auto mt-4">
              <h2 className="text-4xl font-bold mb-4 text-center mt-4">How We Work</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src={images?.newHomePageHowWeWorkImage1}
                    alt="Work"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <p className="flex flex-col gap-4">
                    {howWeWork?.map((item, index) => (
                      <span
                        key={index}
                        className={`flex flex-col gap-2 p-3 rounded-md ${
                          index === 0 ? 'bg-teal-800 text-white' : 'bg-white text-black'
                        }`}
                      >
                        <span
                          className={`rounded-full p-2 w-fit text-2xl ${
                            index === 0 ? 'bg-white text-black' : 'bg-white text-black'
                          }`}
                        >
                          <Icon icon={item.icon} />
                        </span>
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-sm">{item.description}</span>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="mt-4">
            <div
              style={{
                backgroundImage: `url(${images?.newHomePageCommunityImage})`,
              }}
              className="min-h-[300px] bg-no-repeat bg-cover mt-7 pt-7 pb-7"
            >
              <div className="w-80 mx-auto mt-4">
                <p className="text-3xl fw-semibold mb-2 text-white text-center">
                  Explore <span className="text-yellow-300 ">Our Courses</span>
                </p>
                <p className="text-md text-center text-white">
                  Our comprehensive range of services includes web design, mobile app development,
                  SEO, social media marketing, and more. Whether you're a startup or an established
                  enterprise, our experts will craft solutions that drive results.
                </p>

                <div className="mt-4 d-grid grid-cols-2 gap-4">
                  {exploreCourses?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 mt-4 justify-center items-center p-4 rounded-md h-[250px] relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center filter blur-sm"
                        style={{ backgroundImage: `url(${item.bgImage})` }}
                      ></div>
                      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                        <span className="text-white text-lg font-semibold">{item.title}</span>
                        <span className="text-gray-200 text-sm">{item.description}</span>
                        <span className="mt-4">
                          <button className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-4 py-2 rounded-3xl flex items-center gap-1">
                            <span>Learn More</span> <Icon icon={'lucide:arrow-right'} />
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
          <div className="bg-[#2e3537] relative">
      <StackCards />
    </div>
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-3xl text-xl font-medium text-gray-700 border border-gray-300">
              <Icon icon="proicons:emoji" className="text-base text-2xl" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {testimonials.map((t, index) => (
                <div key={index} className="p-6 rounded-2xl bg-[#efefef]">
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <img src={t.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
                      <div className="text-yellow-500">{'★'.repeat(t.rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col md:flex-row gap-8 p-6">
              {/* Left Sidebar */}
              <div className="md:w-1/3 space-y-4">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Still have any questions? Contact our Team via <br />
                  <a href="mailto:support@completeprep.com" className="text-blue-600 underline">
                    support@completeprep.com
                  </a>
                </p>
                <button className="px-4 py-2 rounded-md border-gray-300 ">See All FAQ’s</button>
              </div>

              <div className="md:w-2/3 space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className="rounded-xl p-4 bg-[#efefef]">
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-[#efefef] text-black pt-14 px-6 md:px-20 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col gap-6 lg:max-w-sm">
              <img src={images.navBarLogo} alt="Company Logo" className="w-60" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              <div>
                <ul className="space-y-4 text-[15px]">
                  <li className="cursor-pointer hover:text-gray-300 transition">Our Mission</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Pricing</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Community</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Careers</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">
                    Invite and Earn!
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-4 text-[15px]">
                  <li className="cursor-pointer hover:text-gray-300 transition">Blog</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Privacy Policy</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Terms of Usage</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Cookie Policy</li>
                  <li className="cursor-pointer hover:text-gray-300 transition">Contact Us</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-2  flex justify-center md:justify-start gap-6 px-6 py-6 text-xl text-black">
              <Icon
                icon="mdi:instagram"
                className="cursor-pointer hover:scale-110 hover:text-gray-300 transition"
                aria-label="Instagram"
              />
              <Icon
                icon="mdi:youtube"
                className="cursor-pointer hover:scale-110 hover:text-gray-300 transition"
                aria-label="YouTube"
              />
              <Icon
                icon="mdi:discord"
                className="cursor-pointer hover:scale-110 hover:text-gray-300 transition"
                aria-label="Discord"
              />
              <Icon
                icon="mdi:twitter"
                className="cursor-pointer hover:scale-110 hover:text-gray-300 transition"
                aria-label="Twitter"
              />
              <Icon
                icon="mdi:linkedin"
                className="cursor-pointer hover:scale-110 hover:text-gray-300 transition"
                aria-label="LinkedIn"
              />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
