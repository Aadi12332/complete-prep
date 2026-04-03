import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ReusableModal } from '../../components/common/ComPrepComponent/ComPrepComponent';
import { ProfileEditFormMain } from '../../components/common/New-Components/NewComponent';
import { AuthContext } from '../../Context/AuthContext';
import { userApi } from '../../services/apiFunctions';
import images from '../../utils/images';

const courseData = {
  CBSE: {
    'CBSE CLASS 12': [
      'Applied Mathematics Class 12',
      'Biology Class 12',
      'Physics Class 12',
      'History Class 12',
      'Sociology Class 12',
      'English Core Class 12',
      'Chemistry Class 12',
    ],
    'CBSE CLASS 11': [
      'Applied Mathematics Class 11',
      'Biology Class 11',
      'Physics Class 11',
      'History Class 11',
      'Sociology Class 11',
      'English Core Class 11',
      'Chemistry Class 11',
    ],
    'CBSE CLASS 10': [
      'Mathematics Class 10',
      'Biology Class 10',
      'Physics Class 10',
      'History Class 10',
      'Science Class 10',
      'English Class 10',
      'Hindi Class 10',
    ],
    'CBSE CLASS 9': [
      'Mathematics Class 9',
      'Biology Class 9',
      'Physics Class 9',
      'History Class 9',
      'Science Class 9',
      'English Class 9',
      'Hindi Class 9',
    ],
  },
  JEE: {
    'JEE MAINS': ['Physics', 'Chemistry', 'Maths'],
    'JEE ADVANCED': ['Physics Advanced', 'Chemistry Advanced', 'Maths Advanced'],
  },
  NEET: {
    Biology: ['Zoology', 'Botany'],
    'Physics & Chemistry': ['NEET Physics', 'NEET Chemistry'],
  },
  'Govt. Exam': {
    SSC: ['Math', 'Reasoning', 'English'],
    UPSC: ['GS', 'CSAT', 'Essay'],
  },
  'UG & PG': {
    BSc: ['Maths', 'Physics', 'Comp Sci'],
    MSc: ['Physics', 'Data Science'],
  },
};

const founders = [
  {
    name: 'Mr. Varun Kumar',
    role: 'Modern Education',
    image: images.newDashboardUserMainAboutImage2,
  },
  {
    name: 'Mr. Rahul Kumar',
    role: 'Modern Education',
    image: images.newDashboardUserMainAboutImage3,
  },
  {
    name: 'Mr. Ravi Kumar',
    role: 'Modern Education',
    image: images.newDashboardUserMainAboutImage4,
  },
];
const ProfileEditForm = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('login');
  const navigate = useNavigate();

  const onSubmitLogin = async data => {
    localStorage.clear();
    userApi.auth.login({
      data: { email: data.email, password: data.password },
      onSuccess: res => {
        console.log(res);
        localStorage.setItem('authToken', res?.data?.token);
        const savedToken = localStorage.getItem('authToken');
        {
          savedToken && navigate('/choose-curriculum');
        }
      },
    });
  };

  const onSubmitForgot = data => {
    console.log(data);
    setStep('confirmation');
  };
  const onSubmitRegister = data => {
    localStorage.clear();
    userApi.auth.registerUser({
      data: data,
      showMsg: true,
      onSuccess: res => {
        console.log(res);
        userApi.auth.login({
          data: { email: data.email, password: data.password },
          onSuccess: res => {
            localStorage.setItem('authToken', res?.data?.token);
            const savedToken = localStorage.getItem('authToken');
            {
              savedToken && navigate('/choose-curriculum');
            }
          },
        });
      },
    });
  };

  return (
    <div
      className="bg-cover"
      // style={{
      //   backgroundImage: `url(${images.newHomePageLoginModalImage2})`,
      //   backgroundSize: "cover",
      // }}
    >
      <div className="p-5">
        <p className="flex justify-end">
          <Icon icon="material-symbols:close" className="cursor-pointer" />
        </p>
        <div className="mx-auto sm:w-full md:w-80">
          <p className="text-center">
            <img
              src={images.newHomePageLoginModalImage}
              className="w-[70px] h-[70px] mx-auto"
              alt="logo"
            />
          </p>

          {step === 'login' && (
            <>
              <h2 className="text-2xl font-semibold text-center text-green-600">Log in</h2>
              <p className="text-sm text-center">
                No account yet?{' '}
                <button onClick={() => setStep('register')} className="text-blue-500 underline">
                  Register
                </button>
              </p>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmitLogin)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs italic text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    className="w-full px-3 py-2 pr-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-xs italic text-red-500">{errors.password.message}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-[36px] text-gray-500"
                  >
                    <Icon
                      icon={showPassword ? 'basil:eye-closed-solid' : 'basil:eye-solid'}
                      size={18}
                    />
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-black transition bg-yellow-300 rounded-md hover:bg-yellow-400"
                >
                  Log in
                </button>
              </form>

              {/* <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm text-gray-500">
                  <span className="px-2 bg-white">or</span>
                </div>
              </div>

              <button className="w-full bg-[#3b5998] text-white font-semibold py-2 rounded-md mb-2">
                Log in with Facebook
              </button>
              <button className="w-full bg-[#4285F4] text-white font-semibold py-2 rounded-md">
                Log in with Google
              </button> */}
            </>
          )}
          {step === 'register' && (
            <>
              <h2 className="text-2xl font-semibold text-center text-green-600">Register</h2>
              <p className="text-sm text-center">
                Already have an account?{' '}
                <button onClick={() => setStep('login')} className="text-blue-500 underline">
                  Log in
                </button>
              </p>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmitRegister)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    {...register('fullName', {
                      required: 'Full name is required',
                    })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-xs italic text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    {...register('mobileNumber', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Enter a valid 10-digit number',
                      },
                    })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="9876543210"
                  />
                  {errors.mobileNumber && (
                    <p className="text-xs italic text-red-500">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs italic text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    How did you hear about us?
                  </label>
                  <select
                    {...register('hearAboutUs', {
                      required: 'This field is required',
                    })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="">Select an option</option>
                    <option value="FaceBook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Websites">Websites</option>
                  </select>
                  {errors.hearAboutUs && (
                    <p className="text-xs italic text-red-500">{errors.hearAboutUs.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="w-full px-3 py-2 pr-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-xs italic text-red-500">{errors.password.message}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-[36px] text-gray-500"
                  >
                    <Icon
                      icon={showPassword ? 'basil:eye-closed-solid' : 'basil:eye-solid'}
                      size={18}
                    />
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-black transition bg-yellow-300 rounded-md hover:bg-yellow-400"
                >
                  Register
                </button>
              </form>
            </>
          )}

          {step === 'forgot' && (
            <>
              <h2 className="text-xl font-semibold text-center text-green-600">
                Forgot your password?
              </h2>
              <form onSubmit={handleSubmit(onSubmitForgot)} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs italic text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-black transition bg-yellow-300 rounded-md hover:bg-yellow-400"
                >
                  Reset
                </button>
              </form>
              <p className="mt-4 text-center">
                <span
                  className="text-sm text-blue-600 underline cursor-pointer"
                  onClick={() => setStep('login')}
                >
                  Return to the login page
                </span>
              </p>
            </>
          )}

          {step === 'confirmation' && (
            <div className="text-center">
              <h2 className="mt-4 text-xl font-semibold text-green-600">
                We have sent you a message.
              </h2>
              <p className="text-green-700">Go to the mail</p>
              <p className="mt-4">
                <span
                  className="text-sm text-blue-600 underline cursor-pointer"
                  onClick={() => setStep('login')}
                >
                  Return to the login page
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const categories = Object.keys(courseData);

const AboutMainPage = () => {
  const [currentState, setCurrentState] = useState(null);
  const [activeCategory, setActiveCategory] = useState('CBSE');
  const [openIndex, setOpenIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [goalCategory, setGoalCategory] = useState([]);
  const [goal, setGoal] = useState([]);
  const [selectedGoalCategory, setSelectedGoalCategory] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const { setUser } = useContext(AuthContext);

  const [nextPage, setNextPage] = useState('');

  const fetchGoalCategory = async () => {
    userApi.goalCategory.getAll({
      onSuccess: data => setGoalCategory(data?.data || []),
    });
  };
  useEffect(() => {
    fetchGoalCategory();
  }, []);

  const fetchGoal = async () => {
    userApi.subjects.getByGoalCategory({
      params: { goalCategory: selectedGoalCategory },
      onSuccess: data => setGoal(data?.data || []),
    });
  };
  useEffect(() => {
    fetchGoal();
  }, [selectedGoalCategory]);
  const toggleDropdown = state => {
    setCurrentState(currentState === state ? null : state);
  };
  const [aboutUs, setAboutUs] = useState({});

  const fetchAboutUs = async () => {
    userApi.aboutUs.getAll({
      onSuccess: data => setAboutUs(data?.data?.[0] || {}),
    });
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

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
      <div className="p-3 sm:p-1 h-full mainMaxWidth">
        <div className="w-full min-h-[54px] max-h-[600px] object-cover rounded-lg relative">
          <div
            style={{
              backgroundImage: `url(${images.newHomePageTopBannerImage})`,
              backgroundSize: 'cover',
            }}
            className="w-full min-h-[54px] max-h-[600px] object-cover rounded-lg relative"
          >
            <div className="flex flex-wrap justify-between items-center px-4 py-3">
              <img
                src={images.newMainLogo}
                alt="Logo"
                onClick={() => navigate('/')}
                className="max-w-[150px]"
              />

              <div className="relative flex flex-wrap items-center gap-2 px-4 py-2 mt-3 bg-[#efefef] text-gray-500 hover:text-gray-700 rounded-3xl md:mt-0">
                <span
                  onClick={() => toggleDropdown(0)}
                  className="cursor-pointer flex items-center gap-1 hover:bg-white px-2 py-1 rounded-3xl"
                >
                  Universities{' '}
                  {currentState === 0 ? (
                    <Icon icon="akar-icons:chevron-up" />
                  ) : (
                    <Icon icon="akar-icons:chevron-down" />
                  )}
                </span>
                {['About', 'Pricing', 'Testimonial'].map(tab => (
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
                    className="cursor-pointer hover:bg-white px-2 py-1 rounded-3xl"
                  >
                    {tab}
                  </span>
                ))}

                {currentState === 0 && (
                  <div className="absolute top-[110%] left-0 bg-white text-black rounded-3xl shadow-lg w-full md:w-[600px] p-4 z-50">
                    <div className="flex gap-2 pb-2 mb-4 overflow-x-auto border-b md:gap-4">
                      {goalCategory?.map(cat => (
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
                        const { name: className } = item;

                        return (
                          <div key={index}>
                            <h5 className="mb-2 font-semibold">{item?.goalName}</h5>
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

              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  className="bg-transparent text-white border border-white rounded-3xl px-4 py-2 font-bold"
                  onClick={() => setModalVisible(true)}
                >
                  Register
                </button>
                <button
                  className="px-8 py-2 font-bold bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl"
                  onClick={() => setModalVisible(true)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-slate-600 text-white space-y-16">
            <section className="text-center mx-auto">
              <img src={images.newDashboardUserMainAboutImage1} alt="About Us" />
            </section>

            <section className="max-w-5xl mx-auto space-y-8">
              <div>
                <h2 className="text-3xl font-semibold mb-4">{aboutUs?.title || ''}</h2>
                <div dangerouslySetInnerHTML={{ __html: aboutUs?.desc || '' }}></div>
              </div>
              {/* <hr className="border-gray-500 my-8" />

              <div>
                <h2 className="text-3xl font-semibold mb-4">
                  Who Came Up With The Idea?
                </h2>
                <p className="text-white">
                  At Complete Prep, we’re flipping the script on education with
                  our never-before-made platform that tailors one-on-one
                  tutoring for students navigating the international waters of
                  IB and Cambridge curricula.
                </p>
              </div>
              <hr className="border-gray-500 my-8" /> */}
            </section>

            <section className="flex flex-col space-y-12 max-w-6xl mx-auto pb-4">
              {aboutUs?.team?.map((founder, index) => {
                const isReversed = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col-reverse lg:flex-row ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }  items-center gap-8`}
                  >
                    <div className="lg:w-1/2 w-full">
                      <p className="text-white text-sm mb-4">{founder.desc || ''}</p>
                    </div>
                    <div className="lg:w-1/2 w-full relative">
                      {founder.image && (
                        <img
                          src={founder.image}
                          alt={founder.name}
                          width={500}
                          height={500}
                          className="rounded-lg w-full h-auto object-cover"
                        />
                      )}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-transparent bg-opacity-70 px-4 py-2 rounded-t-lg text-center w-full">
                        {/* <h3 className="text-xl font-bold text-lime-400">
                          {founder.title || ""}
                        </h3> */}
                        {/* <p className="text-sm text-white">{founder.role}</p> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>

        <footer className="">
          <div className="bg-[#0e2d2c] text-white pt-14 px-6 md:px-20">
            <div className="grid grid-cols-2 gap-12">
              <div className="flex flex-col gap-6 lg:max-w-sm">
                <h1 className="text-2xl font-bold leading-snug">
                  <span className="text-lime-400">c</span>
                  <span className="text-white">p</span> Complete
                  <br />
                  <span className="text-white">Prep</span>
                </h1>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full p-4 rounded-lg bg-[#1c1c1c] text-white placeholder-gray-400 outline-none"
                  />
                  <button className="absolute right-2 top-2.5 bg-[#222] p-2 rounded-md">
                    <Icon icon="mdi:send" className="text-white w-5 h-5"></Icon>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-5 gap-10 text-sm flex-1">
                <div>
                  <h3 className="font-semibold text-base mb-4">Home</h3>
                  <ul className="space-y-2 text-white">
                    <li>Hero Section</li>
                    <li>Features</li>
                    <li>Properties</li>
                    <li>Testimonials</li>
                    <li>FAQs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-4">About Us</h3>
                  <ul className="space-y-2 text-white">
                    <li>Our Story</li>
                    <li>Our Works</li>
                    <li>How It Works</li>
                    <li>Our Team</li>
                    <li>Our Clients</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-4">Properties</h3>
                  <ul className="space-y-2 text-white">
                    <li>Portfolio</li>
                    <li>Categories</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-4">Services</h3>
                  <ul className="space-y-2 text-white">
                    <li>Valuation Mastery</li>
                    <li>Strategic Marketing</li>
                    <li>Negotiation Wizardry</li>
                    <li>Closing Success</li>
                    <li>Property Management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-white">
                    <li>Contact Form</li>
                    <li>Our Offices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-teal-800 flex flex-row justify-between items-center text-xs text-white px-6 py-2 pb-0">
            <p className="flex flex-row text-sm justify-content-between gap-2 pt-3">
              <p>©2023 Estaten. All Rights Reserved.</p>
              <p href="#" className="hover:text-white">
                Terms & Conditions
              </p>
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-black p-2 rounded-full">
                <Icon icon="mdi:facebook" className="text-white w-5 h-5"></Icon>
              </a>
              <a href="#" className="bg-black p-2 rounded-full">
                <Icon icon="mdi:linkedin" className="text-white w-5 h-5"></Icon>
              </a>
              <a href="#" className="bg-black p-2 rounded-full">
                <Icon icon="mdi:twitter" className="text-white w-5 h-5"></Icon>
              </a>
              <a href="#" className="bg-black p-2 rounded-full">
                <Icon icon="mdi:youtube" className="text-white w-5 h-5"></Icon>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutMainPage;
