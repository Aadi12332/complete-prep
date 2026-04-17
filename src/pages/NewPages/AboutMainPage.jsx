import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ReusableModal } from '../../components/common/ComPrepComponent/ComPrepComponent';
import { ProfileEditFormMain } from '../../components/common/New-Components/NewComponent';
import { AuthContext } from '../../Context/AuthContext';
import { userApi } from '../../services/apiFunctions';
import images from '../../utils/images';
import Header from './Header';
import Footer from './Footer';

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
      <div className="h-full mainMaxWidth">
        <Header />
        <div>
          <div className="bg-white text-gray-800 pb-10 lg:pb-16">
            <section className="mb-12 about-bg">
              <img
                src={images.newDashboardUserMainAboutImage1}
                alt="About Us"
                className="w-full h-auto lg:rounded-xl object-cover"
              />
            </section>

            <section className="mb-16">
              <div
                className="text-sm lg:text-base leading-relaxed text-gray-600 text-center"
                dangerouslySetInnerHTML={{ __html: aboutUs?.desc || '' }}
              />
            </section>

            <section className="space-y-12 md:px-6 px-3">
              {aboutUs?.team?.map((founder, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <div
                    key={index}
                    className={`md:flex gap-10 ${
                      isReversed ? 'md:flex-row-reverse' : ''
                    } items-center`}
                  >
                    <div className="w-full lg:w-1/2">
                      {founder.image && (
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-auto rounded-xl object-cover shadow-sm"
                        />
                      )}
                    </div>

                    <div className="w-full lg:w-1/2 mt-10 md:mt-0">
                      {founder.name && (
                        <h3 className="text-lg lg:text-xl font-semibold mb-3">{founder.name}</h3>
                      )}

                      <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                        {founder.desc || ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMainPage;
