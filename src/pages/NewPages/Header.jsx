import React, { useRef, useEffect, useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { userApi } from '../../services/apiFunctions';
import { AuthContext } from '../../Context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReusableModal } from '../../components/common/ComPrepComponent/ComPrepComponent';
import { ProfileEditFormMain } from '../../components/common/New-Components/NewComponent';
import images from '../../utils/images';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef();
  const [currentState, setCurrentState] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalJoinVisible, setModalJoinVisible] = useState(false);
  const { setUser } = useContext(AuthContext);
  const [nextPage, setNextPage] = useState('');
  const [goalCategory, setGoalCategory] = useState([]);
  const [goal, setGoal] = useState([]);
  const [form, setForm] = useState({
    name: '',
    university: '',
    courses: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [topBanner, setTopBanner] = useState('');
  const [selectedGoalCategory, setSelectedGoalCategory] = useState('');
  const [mainUniversities, setMainUniversities] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const isActive = path => location.pathname === path;

  const resetForm = () => {
    setForm({
      name: '',
      university: '',
      courses: '',
      email: '',
      phone: '',
    });
    setErrors({});
  };

  const handleModalClose = () => {
    setModalJoinVisible(false);
    resetForm();
  };
  const toggleDropdown = state => {
    setCurrentState(currentState === state ? null : state);
  };
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

  const fetchUniversities = async () => {
    userApi.university.getAll({
      onSuccess: data => setMainUniversities(data?.data || []),
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

  useEffect(() => {
    fetchUniversities();
    fetchGoalCategory();
    fetchPopularCourses();
    fetchTopBanner();
  }, []);

  // Validate individual field
  const validateField = (name, value) => {
    const err = { ...errors };
    const trimmedValue = value.trim();

    switch (name) {
      case 'name':
        if (!trimmedValue) {
          err.name = 'Name is required';
        } else if (trimmedValue.length < 2) {
          err.name = 'Name must be at least 2 characters';
        } else {
          delete err.name;
        }
        break;
      case 'university':
        if (!trimmedValue) {
          err.university = 'University is required';
        } else {
          delete err.university;
        }
        break;
      case 'courses':
        if (!trimmedValue) {
          err.courses = 'Courses is required';
        } else {
          delete err.courses;
        }
        break;
      case 'email':
        if (!trimmedValue) {
          err.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          err.email = 'Please enter a valid email address';
        } else {
          delete err.email;
        }
        break;
      case 'phone':
        if (!trimmedValue) {
          err.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(trimmedValue)) {
          err.phone = 'Phone number must be 10 digits';
        } else {
          delete err.phone;
        }
        break;
      default:
        break;
    }

    return err;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Validate field on change
    const newErrors = validateField(name, value);
    setErrors(newErrors);
  };

  // Validate all fields
  const validate = () => {
    const err = {};

    // Validate each field
    err.name = validateField('name', form.name).name;
    err.university = validateField('university', form.university).university;
    err.courses = validateField('courses', form.courses).courses;
    err.email = validateField('email', form.email).email;
    err.phone = validateField('phone', form.phone).phone;

    // Remove undefined errors
    Object.keys(err).forEach(key => !err[key] && delete err[key]);

    return err;
  };

  const handleSubmit = async () => {
    const err = validate();

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));

      // Show success message
      setSuccess(true);

      // Clear form data
      resetForm();

      // Close modal after showing success
      setModalJoinVisible(false);

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error('Error submitting form:', e);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
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
      <div className="w-full max-h-[600px] object-cover rounded-lg sticky top-0 bg-white z-[99]">
        <div className="flex flex-wrap gap-3 items-center justify-between md:px-6 px-3 py-3 pb-3">
          <img
            src={images.newMainLogo}
            alt="Logo"
            onClick={() => navigate('/')}
            className="md:max-w-[150px] w-[120px] object-contain"
          />

          <span className="lg:hidden block cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>

          {/* Desktop */}
          <div className="items-center gap-3 hidden lg:flex justify-between w-full max-w-[75%] xl:max-w-[70%]">
            <div className="relative flex flex-wrap items-center gap-2 p-1 bg-[#efefef] text-gray-500 hover:text-gray-700 rounded-3xl">
              <span
                onClick={() => toggleDropdown(0)}
                className="flex items-center gap-1 cursor-pointer hover:bg-white rounded-3xl xl:px-4 px-3 py-2"
              >
                Universities
                {currentState === 0 ? (
                  <Icon icon="akar-icons:chevron-up" />
                ) : (
                  <Icon icon="akar-icons:chevron-down" />
                )}
              </span>

              <span
                onClick={() => navigate('/about')}
                className={`cursor-pointer ${
                  isActive('/about')
                    ? 'font-semibold text-black bg-white rounded-3xl xl:px-4 px-3 py-2'
                    : 'xl:px-4 px-3 py-2'
                }`}
              >
                About
              </span>

              <span
                onClick={() => navigate('/pricing')}
                className={`cursor-pointer ${
                  isActive('/pricing')
                    ? 'font-semibold text-black bg-white rounded-3xl xl:px-4 px-3 py-2'
                    : 'xl:px-4 px-3 py-2'
                }`}
              >
                Pricing
              </span>

              <span
                onClick={() => navigate('/careers')}
                className={`cursor-pointer ${
                  isActive('/careers')
                    ? 'font-semibold text-black bg-white rounded-3xl xl:px-4 px-3 py-2'
                    : 'xl:px-4 px-3 py-2'
                }`}
              >
                Careers
              </span>

              {currentState === 0 && (
                <div className="absolute top-[110%] left-0 bg-white text-black rounded-xl border w-full md:w-[491px] p-2 z-50">
                  <div className="flex flex-wrap gap-2 pb-2 border-b md:gap-3">
                    {mainUniversities?.map(cat => (
                      <button
                        key={cat?._id}
                        onClick={() => setSelectedGoalCategory(cat?._id)}
                        className={`whitespace-nowrap px-2 py-1 text-sm rounded-3xl ${
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
                    {goal?.map((item, index) => (
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
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setModalJoinVisible(true)}
                className="px-3 py-2 font-bold text-black bg-transparent border border-black rounded-3xl hover:!bg-[#3DD455] hover:text-white"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => setModalVisible(true)}
                className="px-3 py-2 font-bold text-black bg-transparent border border-black rounded-3xl hover:!bg-[#3DD455] hover:text-white"
              >
                Register
              </button>

              <button
                onClick={() => setModalVisible(true)}
                className="px-3 py-2 font-bold bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className={`fixed inset-0 z-50 transition ${isSidebarOpen ? 'visible' : 'invisible'}`}>
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          <div
            ref={sidebarRef}
            className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-lg p-3 transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              {' '}
              <img
                onClick={() => navigate('/')}
                src={images.newMainLogo}
                alt="Logo"
                className="max-w-[120px]"
              />{' '}
              <button onClick={() => setIsSidebarOpen(false)}>✕</button>{' '}
            </div>{' '}
            <div className="flex flex-col gap-3 relative">
              <span
                onClick={() => toggleDropdown(0)}
                className="cursor-pointer flex items-center gap-1"
              >
                Universities
                {currentState === 0 ? (
                  <Icon icon="akar-icons:chevron-up" />
                ) : (
                  <Icon icon="akar-icons:chevron-down" />
                )}
              </span>

              <span onClick={() => navigate('/about')} className="cursor-pointer">
                About
              </span>

              <span onClick={() => navigate('/pricing')} className="cursor-pointer">
                Pricing
              </span>

              <span onClick={() => navigate('/careers')} className="cursor-pointer">
                Careers
              </span>

              {currentState === 0 && (
                <div className="bg-white text-black rounded-lg shadow-lg w-full p-2 mt-2 absolute top-6 left-0">
                  <div className="flex flex-wrap gap-2 pb-2 mb-3 border-b">
                    {mainUniversities?.map(cat => (
                      <button
                        key={cat?._id}
                        onClick={() => setSelectedGoalCategory(cat?._id)}
                        className={`text-start text-sm px-3 py-1 rounded-3xl ${
                          selectedGoalCategory === cat?._id
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-black border border-gray-300'
                        }`}
                      >
                        {cat?.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto">
                    {goal?.map((item, index) => (
                      <div key={index}>
                        <h5
                          className="px-3 py-1 text-sm bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-3xl w-fit"
                          onClick={() => {
                            setNextPage(`/semester-exam/${selectedGoalCategory}/${item?._id}`);
                            setModalVisible(true);
                            setIsSidebarOpen(false);
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
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => {
                    setModalJoinVisible(true);
                    setIsSidebarOpen(false);
                  }}
                  className="px-4 py-2 border border-black rounded-3xl"
                >
                  Join Waitlist
                </button>

                <button
                  onClick={() => {
                    setModalVisible(true);
                    setIsSidebarOpen(false);
                  }}
                  className="px-4 py-2 border border-black rounded-3xl"
                >
                  Register
                </button>

                <button
                  onClick={() => {
                    setModalVisible(true);
                    setIsSidebarOpen(false);
                  }}
                  className="px-4 py-2 bg-[#3DD455] rounded-3xl"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {modalJoinVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
              <button
                onClick={handleModalClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
                title="Close"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">Join Waitlist</h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3DD455] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                  <input
                    type="text"
                    name="university"
                    value={form.university}
                    onChange={handleChange}
                    placeholder="Enter your university name"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3DD455] ${
                      errors.university ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  {errors.university && (
                    <p className="text-red-500 text-xs mt-1">{errors.university}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Courses</label>
                  <input
                    type="text"
                    name="courses"
                    value={form.courses}
                    onChange={handleChange}
                    placeholder="Enter your courses"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3DD455] ${
                      errors.courses ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  {errors.courses && <p className="text-red-500 text-xs mt-1">{errors.courses}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3DD455] ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3DD455] ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                    maxLength="10"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {errors.submit && <p className="text-red-500 text-xs">{errors.submit}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-2 rounded-lg text-white font-medium ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3DD455]'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-8 text-center max-w-sm w-full mx-4 animate-in">
              <div className="text-5xl mb-4 flex items-center justify-center">
                <Icon icon="emojione:check-mark-button" className="text-[#3DD455]" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-green-600">Success!</h2>
              <p className="text-gray-700 mb-6 font-medium">
                You have successfully joined the waitlist. We will contact you soon!
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2 bg-[#3DD455] text-white rounded-lg font-medium hover:bg-green-600 transition-colors w-full"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
