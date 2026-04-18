import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMenuBar } from '../../../components/common/MenuBar';
import HOC from '../../../components/layout/HOC';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';
import { formatTimeSpentTimeLine } from '../../../utils/constants';
import images from '../../../utils/images';
import ProfileTab from './ProfileTab';

const SettingPage1 = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  // const { goal = "" } = user || {};
  const goal = user?.goal || '';
  const [activeTab, setActiveTab] = useState('Profile');

  const [profileData, setProfileData] = useState({
    avatar: user?.image || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
    language: user?.language || 'English',
    timezone: '',
    mobileNumber: user?.mobileNumber || '',
    linkedInUrl: user?.linkedInUrl || '',
  });
  const [transactions, setTransactions] = useState([]);
  const [dashboards, setDashboards] = useState([
    {
      title: 'My Success Roadmap',
      icon: images.newSettingDashboardImage1,
      color: 'bg-green-100',
    },
    {
      title: 'Videos Analysis',
      icon: images.newSettingDashboardImage2,
      color: 'bg-red-100',
    },
    {
      title: 'Practice Analysis',
      icon: images.newSettingDashboardImage3,
      color: 'bg-yellow-100',
    },
    {
      title: 'Tests Analysis',
      icon: images.newSettingDashboardImage4,
      color: 'bg-blue-100',
    },
    {
      title: 'My Skills Analysis',
      icon: images.newSettingDashboardImage5,
      color: 'bg-gray-100',
    },
    {
      title: 'Capsule Course Analysis',
      icon: images.newSettingDashboardImage6,
      color: 'bg-purple-100',
    },
    {
      title: 'Handwritten Notes by Toppers Analysis',
      icon: images.newSettingDashboardImage7,
      color: 'bg-indigo-100',
    },
  ]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      navigate('/login');
    } else if (goal) {
      fetchData();
    }
  }, [isAuthenticated, goal]);

  const fetchData = () => {
    userApi.subscriptions.transactions({
      setIsLoading,
      onSuccess: res => {
        setTransactions(res?.data || []);
      },
      onError: err => {
        console.error('Failed to fetch courses:', err);
      },
    });

    userApi.settingPage.getTimeLine({
      onSuccess: res => {
        setTimelineEvents(res?.data || []);
      },
      onError: err => {
        console.error('Failed to fetch timeline events:', err);
      },
    });
  };

  const handleSave = () => {
    userApi.settingPage.updateProfile({
      onSuccess: res => {
        console.log('Profile updated successfully:', res);
      },
      onError: err => {
        console.error('Failed to update profile:', err);
      },
    });
  };

  const handleLogout = () => {
    console.log('Logged out');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    navigate('/');
  };

  const tabs = ['Profile', 'Transactions', 'My Weekly Timeline'];

  return (
    <div className="">
      <div className="">
        <UserMenuBar />
      </div>
      <div className=" bg-white rounded-xl p-6">
        <div className="w-full">
          <div className="w-full">
            <div className="flex flex-wrap justify-between bg-[#f3f4f6] rounded-3xl tab-button-container w-fit p-1">
              {tabs?.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white text-black font-semibold rounded-3xl'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'Profile' && <ProfileTab />}
          {/* {activeTab === 'My Exams' && (
            <div className="p-6 bg-white">
              <h2 className="mb-4 text-2xl font-bold">Your Subscription</h2>
              {isLoading ? (
                <div className="flex justify-center mt-10">
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="grid gap-4 mb-3 sm:grid-cols-2 md:grid-cols-3">
                  {transactions?.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-1 overflow-hidden transition bg-white shadow-sm cursor-pointer rounded-xl hover:shadow-md"
                      onClick={() =>
                        navigate(
                          `/user/course/${course?.course?.courseCategoryId}/${course.course?._id}`
                        )
                      }
                    >
                      <div className="relative">
                        <img
                          src={course.courseImage?.[0] || images.newCoursePage4Image1}
                          alt={course.course?.title}
                          className="max-h-[450px] w-full object-cover"
                        />
                        {course.course?.title && (
                          <span className="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-0.5 rounded-md shadow-sm">
                            {course.course?.title}
                          </span>
                        )}
                      </div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm font-semibold leading-tight text-gray-800">
                          {course.course?.title}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          <span>👥 {course.students || 'N/A'} Students</span>
                          <span>📘 {course.modules || 'N/A'} Modules</span>
                          <span>⏱️ {course.duration || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 mt-2"></div>
                          <div>
                            <button className="w-full px-2 py-1 mt-2 text-sm text-black bg-yellow-300 rounded-lg">
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )} */}
          {activeTab === 'Transactions' && (
            <div className="w-[100%] mt-5">
              <p className="mb-3 text-lg font-semibold mt-3">Transactions</p>
              <div className="course-transactions-wrapper w-[100%]">
                {isLoading ? (
                  <div className="mt-6 text-center">
                    <p className="text-base text-gray-500">Loading transactions...</p>
                  </div>
                ) : transactions?.transactions?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {transactions?.transactions?.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-2 hover:shadow-md cursor-pointer transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-gray-100 rounded-md w-10 h-10 min-w-10 flex items-center justify-center">
                            <Icon
                              icon="mdi:receipt"
                              width="32"
                              height="32"
                              className="text-gray-500"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 line-clamp-2">
                              Transaction #{item?.transactionId}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(item?.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Transaction ID</p>
                            <p className="font-medium">{item?.transactionId}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-medium">₹{item?.finalAmount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-medium capitalize">{item?.paymentStatus}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Mode</p>
                            <p className="font-medium">{item?.paymentMode}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 text-center">
                    <h2 className="mb-2 text-xl sm:text-2xl font-bold">No transactions yet</h2>
                    <p className="text-base text-gray-500">
                      Your transaction history will appear here after your first purchase.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'My Dashboards' && (
            <div>
              <div>
                <div className="mt-5 sm:w-full lg:w-1/2">
                  <div className="p-3">
                    <h1 className="mb-6 text-2xl font-bold">All Dashboards</h1>
                    {isLoading ? (
                      <div className="flex justify-center mt-10">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {dashboards?.map((dashboard, index) => (
                          <div
                            key={index}
                            className={`rounded-lg p-4 flex flex-col items-center justify-center`}
                          >
                            <span className={`${dashboard.color} p-2 rounded-lg mb-2`}>
                              <img
                                src={dashboard.icon}
                                alt={dashboard.title}
                                className="w-12 h-12 mb-2"
                              />
                            </span>
                            <h2 className="text-lg font-semibold text-center">{dashboard.title}</h2>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'My Weekly Timeline' && (
            <div>
              <div className="mt-5">
                <h1 className="mb-3 text-lg font-semibold mt-3">Weekly Timeline</h1>
                {isLoading ? (
                  <div className="flex justify-center mt-10">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute w-1 h-full transform -translate-x-1/2 bg-gray-500 left-1/2"></div>
                    {timelineEvents?.map((event, index) => (
                      <div key={index} className="flex mb-8">
                        <div className="w-full lg:w-1/2 sm:pr-4 pr-2 text-right">
                          <div className="inline-block p-2 bg-gray-300 rounded-lg">
                            <div className="flex items-center">
                              <Icon icon="akar-icons:calendar" className="mr-2 text-gray-500" />
                              <span className="text-gray-700 text-sm md:text-base">
                                {event.startDate} To {event.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-1/2 sm:pl-4 pl-2">
                          <div className="md:p-4 p-2 rounded-lg bg-gray-100">
                            <h3 className="flex gap-2 items-center mb-2 sm:text-lg text-sm font-semibold text-gray-700">
                              <Icon icon="mdi:timer-sand-empty" width="24" height="24" /> Weekly
                              Time Spent
                            </h3>
                            <p className="mb-2 text-gray-700">
                              {formatTimeSpentTimeLine(event.totalTimeSpent)}
                            </p>
                            <p className="grid grid-cols-2 gap-2">
                              <div className="flex items-center p-2 bg-white rounded">
                                <Icon
                                  icon="mingcute:video-fill"
                                  width="24"
                                  height="24"
                                  className="mr-2 text-gray-700"
                                />
                                <span className="text-black-700 text-sm md:text-base">
                                  {event.totalVideosWatched} videos watched
                                </span>
                              </div>
                              <div className="flex items-center p-2 bg-white rounded">
                                <Icon
                                  icon="twemoji:red-question-mark"
                                  width="24"
                                  height="24"
                                  className="mr-2 text-gray-700"
                                />
                                <span className="text-black-700 text-sm md:text-base">
                                  {event.totalPracticeActivities} Practice activities
                                </span>
                              </div>
                              <div className="flex items-center p-2 bg-white rounded">
                                <Icon
                                  icon="solar:test-tube-broken"
                                  width="24"
                                  height="24"
                                  className="mr-2 text-gray-700"
                                />
                                <span className="text-black-700 text-sm md:text-base">
                                  {event.totalTestsTaken} Test Taken
                                </span>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HOC(SettingPage1);
