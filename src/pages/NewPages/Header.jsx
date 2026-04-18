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
  const { setUser } = useContext(AuthContext);
  const [nextPage, setNextPage] = useState('');
  const [goalCategory, setGoalCategory] = useState([]);
  const [goal, setGoal] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [topBanner, setTopBanner] = useState('');
  const [selectedGoalCategory, setSelectedGoalCategory] = useState('');
  const [mainUniversities, setMainUniversities] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
const isActive = (path) => location.pathname === path;
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
                className="flex items-center gap-1 cursor-pointer hover:bg-white rounded-3xl px-4 py-2"
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
    isActive('/about') ? 'font-semibold text-black bg-white rounded-3xl px-4 py-2' : 'px-4 py-2'
  }`}
>
  About
</span>

<span
  onClick={() => navigate('/pricing')}
  className={`cursor-pointer ${
    isActive('/pricing') ? 'font-semibold text-black bg-white rounded-3xl px-4 py-2' : 'px-4 py-2'
  }`}
>
  Pricing
</span>

<span
  onClick={() => navigate('/careers')}
  className={`cursor-pointer ${
    isActive('/careers') ? 'font-semibold text-black bg-white rounded-3xl px-4 py-2' : 'px-4 py-2'
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
        </div>

        {/* Sidebar same as-is */}
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
              <img onClick={()=>navigate("/")} src={images.newMainLogo} alt="Logo" className="max-w-[120px]" />{' '}
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

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-4">
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
      </div>
    </>
  );
};

export default Header;
