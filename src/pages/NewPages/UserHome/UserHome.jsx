import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialVideoImage from '../../../assets/images/tutorialBanner.jpg';
import { ReusableModal } from '../../../components/common/ComPrepComponent/ComPrepComponent';
import { UserMenuBar } from '../../../components/common/MenuBar';
import HOC from '../../../components/layout/HOC';
import NotificationDrawer from '../../../components/ThirdParty/NotificationDrawer';
import { triggerRazorpay } from '../../../components/ThirdParty/RazorpayCheckout';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';
import { showNotification } from '../../../services/exportComponents';
import images from '../../../utils/images';
import ModalBannerVideos from './ModalBannerVideos';

const UserHome = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [topContent, setTopContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursePercentage, setCoursePercentage] = useState([]);
  const [banners, setBanners] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [isReferalButtonVisible, setIsReferalButtonVisible] = useState(false);

  const fetchCourses = () => {
    userApi.courses.getAll({
      params: {
        limit: 999999,
        page: 1,
        search: searchQuery,
        semester: user?.semester,
      },
      setIsLoading,
      onSuccess: res => {
        setCourses(res?.data || []);
      },
      onError: err => {
        console.error('Failed to fetch courses:', err);
      },
    });
  };
  const fetchCoursePercentage = () => {
    userApi.courses.getCoursePercentage({
      params: {
        limit: 999999,
        page: 1,
        search: searchQuery,
        semester: user?.semester,
      },
      setIsLoading,
      onSuccess: res => {
        setCoursePercentage(res?.data || []);
      },
      onError: err => {
        console.error('Failed to fetch courses:', err);
      },
    });
  };

  useEffect(() => {
    fetchCourses();
    fetchCoursePercentage();
  }, [searchQuery]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    let params = {};
    if (user?.firstVideoBanner) {
      params = { position: 'MID' };
    } else if (user?.secondVideoBanner) {
      params = { position: 'BOTTOM' };
    } else {
      params = { position: 'TOP' };
    }
    userApi.landingPage.getTopBanner({
      params,
      onSuccess: data => setBanners(data?.data || data || []),
      onError: () => setBanners([]),
    });
  };

  const updateUserBanner = async () => {
    userApi.landingPage.updateBannerStatus({
      data: {
        goalCategory: user?.goalCategory || '',
        goal: user?.goal || '',
        semester: user?.semester || '',
        firstVideoBanner: true,
      },
      onSuccess: res => {
        setUser({ ...user, firstVideoBanner: true });
        setShowBannerModal(true);
      },
      onError: () => {
        showNotification({ type: 'error', message: 'Failed to update banner status' });
      },
    });
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };
  const fetchSubScription = async () => {
    try {
      const res = await userApi.subscriptions.getSubscription({
        params: { semester: user?.semester },
      });
      if (res?.data?.isActive) {
        setSubscriptionStatus(true);
        setCurrentSubscription(res.data);
        setUser(prev => ({ ...prev, isSubscribed: true }));
      } else {
        setSubscriptionStatus(false);
        setUser(prev => ({ ...prev, isSubscribed: false }));
        const subs = await userApi.subscriptions.getAll({ params: { semester: user?.semester } });
        setSubscriptions(subs?.data || []);
      }
    } catch (err) {
      setSubscriptionStatus(false);
      setUser(prev => ({ ...prev, isSubscribed: false }));
      showNotification({ type: 'error', message: 'Failed to fetch subscription status' });
    }
  };

  const fetchCoupons = () => {
    userApi.subscriptions.coupons.getAll({
      onSuccess: res => {
        setAllCoupons(res?.data || []);
      },
      onError: err => {
        console.log(err, 'err');
      },
    });
  };

  useEffect(() => {
    fetchSubScription();
    fetchCoupons();
  }, [user?._id]);

  const fetchCourseSubjectsByCourseId = courseId => {
    userApi.courses.getById({
      params: {
        courseCategoryId: courseId,
        semesterId: user?.semester,
      },
      setIsLoading,
      onSuccess: res => {
        if (!res?.data?.length) {
          showNotification({
            type: 'error',
            message: 'No subjects found for this course',
          });
          return;
        }
        navigate(`/user/course/${courseId}/${res?.data?.[0]?._id}`);
      },
      onError: () => {
        showNotification({
          type: 'error',
          message: 'No subjects found for this course',
        });
      },
    });
  };

  const handleSubscribe = sub => {
    setButtonLoading(true);
    userApi.subscriptions.create({
      showMsg: true,
      data: {
        subscriptionPlanId: sub._id,
        paymentMode: 'pending',
        taxAmount: 0,
        paymentStatus: 'pending',
        couponCode: selectedCoupons,
        useWallet: true,
      },
      onSuccess: response => {
        triggerRazorpay({
          amount: response?.data?.finalPrice,
          name: user?.fullName || 'User',
          email: user?.email || 'email@example.com',
          contact: user?.mobileNumber || '0000000000',
          onSuccess: paymentRes => {
            if (paymentRes?.payload?.payment?.id)
              userApi.subscriptions.update({
                id: response?.data?._id,
                data: {
                  paymentMode: 'upi',
                  paymentStatus: 'completed',
                  transactionId: paymentRes?.payload?.payment?.id,
                },
                onSuccess: res => {
                  if (res?.data?.paymentStatus === 'completed') {
                    fetchSubScription();
                    setModalVisible(false);
                  }
                },
                onError: () => {
                  setButtonLoading(false);
                },
              });
          },
          onFailure: err => {
            setButtonLoading(false);
          },
          onCancel: () => {
            setButtonLoading(false);
          },
        });
      },
      onError: () => {
        setButtonLoading(false);
      },
    });
  };
  return (
    <>
      <ReusableModal
        size="md"
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        footer={false}
        header={false}
        body={
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Subscribe to Continue</h2>
            <p className="mb-4">Please choose a subscription plan to access this feature.</p>
            <div className="space-y-4">
              {subscriptions?.map(sub => (
                <div key={sub._id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{sub.name}</h3>
                  <p className="text-sm text-gray-600">{sub.desc}</p>
                  <p className="text-lg font-bold">
                    ₹{sub.discountActive ? sub.discountPrice : sub.originalPrice}
                    {sub.discountActive && (
                      <span className="ml-2 text-sm line-through text-gray-400">
                        ₹{sub.originalPrice}
                      </span>
                    )}
                  </p>
                  {allCoupons?.length > 0 && (
                    <select
                      className="mt-2 w-full p-2 border rounded"
                      value={selectedCoupons}
                      onChange={e => setSelectedCoupons(e.target.value)}
                    >
                      <option value="">Select Coupon (Optional)</option>
                      {allCoupons.map(coupon => (
                        <option key={coupon._id} value={coupon.code}>
                          {coupon.code} - {coupon.discount}% off
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    className="mt-2 px-4 py-2 bg-[#3DD455] text-[#f7f700] rounded-lg hover:bg-[#f7f700] hover:text-[#3DD455] disabled:opacity-50"
                    onClick={() => handleSubscribe(sub)}
                    disabled={buttonLoading}
                  >
                    {buttonLoading ? 'Processing...' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
      ></ReusableModal>
      <div className="w-full flex sm:flex-col lg:flex-row bg-white">
        <div className="w-full sm:w-full md:w-[70%]">
          <div>
            <UserMenuBar />
          </div>
          <div className="p-4">
            <div
              className="relative text-white rounded-xl p-3 bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${images.userDashboardImageHome})`,
              }}
            >
              <div className="relative z-10 flex flex-col justify-center h-full gap-2 p-3">
                <div>
                  <h4 className="text-lg sm:text-xl md:text-xl font-bold mb-1 sm:mb-2">
                    Sharpen Your Skills With
                  </h4>
                  <h4 className="text-lg sm:text-xl md:text-xl font-bold">
                    Professional Online Courses
                  </h4>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => navigate('/user/skill')}
                    className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold text-sm sm:text-base py-1.5 px-4 rounded-3xl inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span>Join Now</span>
                    <Icon icon="lsicon:play-filled" width="16" height="16" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-xl font-semibold mb-2">Courses</h3>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses?.map((course, idx) => (
                    <div
                      key={idx}
                      className="bg-[#efefef] rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden p-2"
                      onClick={() => {
                        user?.isSubscribed
                          ? fetchCourseSubjectsByCourseId(course._id)
                          : showNotification({
                              message: 'Please Subscribe to Continue',
                              type: 'error',
                            });
                      }}
                    >
                      <div className="relative">
                        <img
                          src={course?.image}
                          alt={course?.name}
                          loading={idx < 6 ? 'eager' : 'lazy'}
                          fetchpriority={idx < 3 ? 'high' : 'auto'}
                          decoding="async"
                          width={800}
                          height={450}
                          className="max-h=[450px] rounded-xl w-full object-cover"
                        />
                        <div className="w-full flex items-center mt-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={
                              coursePercentage?.find(item => item._id === course._id)?.progress || 0
                            }
                            style={{
                              width: '100%',
                              accentColor: '#2563eb',
                              cursor: 'pointer',
                              appearance: 'none',
                              height: '4px',
                              borderRadius: '8px',
                              background: '#e5e7eb',
                            }}
                            className="range-slider"
                          />
                        </div>

                        {course.tag && (
                          <span className="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-0.5 rounded-md shadow-sm">
                            {course.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm font-semibold text-black leading-tight">
                          {course?.name || ''}
                        </p>
                        <div className="text-xs text-gray-500 flex flex-wrap gap-2">
                          {course.modules && <span>📘 {course.modules} Module</span>}
                          {course.duration && <span>⏱️ {course.duration}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full ssh md:w-[30%] bg-white h-svh border-l border-[#d0d0d0]">
          <div className="space-y-6 max-w-md mx-auto px-3">
            <div className="flex flex-col justify-center relative">
              <p className="flex justify-end absolute right-2 top-2 text-2xl">
                <Icon
                  icon="mdi:bell-outline"
                  className="cursor-pointer"
                  onClick={() => setShowNotifications(true)}
                />
              </p>
              <div className="flex flex-col items-center justify-center text-center gap-4 mt-4 mb-4">
                <img
                  src={user?.image || images.newHandwrittenNotesImage1}
                  alt="User Profile"
                  className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold text-gray-900">{user?.fullName || ''}</h2>
                <p className="text-sm text-gray-500">
                  Continue Your Journey And Achieve Your Target
                </p>
              </div>

              {subscriptionStatus ? (
                <div className='mt-2'>
                  <p className="text-sm text-black">
                    Your Current Plan : -{' '}
                    <span className="text-sm text-gray-500">
                      {currentSubscription?.subscriptionPlanId?.name}
                    </span>
                  </p>
                  <p className="text-sm text-black flex gap-2">
                    <span className="text-sm text-black"> Expire On : </span>
                    <span className="text-sm text-gray-500">
                      {currentSubscription?.endDate?.slice(0, 10)?.split('-').reverse().join('-')}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center gap-4 mt-2 mb-4">
                  <p className="text-sm text-black">Please Subscribe to Continue</p>
                  <button
                    className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-4 py-2 rounded-3xl"
                    onClick={() => setModalVisible(true)}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
            {/* <div>
              <img
                src={images.userDashboardTopBanner}
                alt="Dashboard Banner"
                className="object-cover"
                style={{ width: '100%', height: '100%', minHeight: 30 }}
              />
            </div> */}
            <div className='bg-yellow-100 rounded-lg p-3 flex flex-col items-center gap-2'>
              <p className='font-semibold text-sm text-center'>■ Limited Time Offer: 50% Off All Courses! ■</p>
              <p className='text-xs text-center'>Boost your exam prep with half off on our top-rated courses. Hurry, offer ends soon!</p>
            </div>
            <div>
              <img
                src={TutorialVideoImage || images.userDashboardTopBanner}
                alt="Dashboard Banner"
                className="rounded-lg"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '170px',
                  // border: ' 1px solid red',
                  cursor: 'pointer',
                }}
                onClick={updateUserBanner}
              />
              {
                user?.firstVideoBanner
                  ? // <img
                    //   src={TutorialVideoImage || images.userDashboardTopBanner}
                    //   alt="Dashboard Banner"
                    //   className=""
                    //   style={{
                    //     width: '100%',
                    //     height: '100%',
                    //     minHeight: '170px',
                    //     // border: ' 1px solid red',
                    //     cursor: 'pointer',
                    //   }}
                    //   onClick={updateUserBanner}
                    // />
                    null
                  : null
                // (
                // <img
                //   src={images.userDashboardTopBanner}
                //   alt="Dashboard Banner"
                //   onClick={updateUserBanner}
                //   className=""
                //   style={{ width: '100%', height: '100%', minHeight: '170px', cursor: 'pointer' }}
                // />
                // )
              }
            </div>
            <div>
              <button
                className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-2.5 py-2 rounded-3xl"
                onClick={() => {
                  setIsReferalButtonVisible(true);
                  showNotification({ type: 'success', message: 'Copied to clipboard' });
                  navigator.clipboard.writeText(user?.refferalCode);
                }}
              >
                Referral & Earn
              </button>
              <button
                className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-2.5 py-2 rounded-3xl mt-3"
              >
                Become as an Ambassador
              </button>
              {isReferalButtonVisible && (
                <span
                  className="text-green-600 "
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    showNotification({ type: 'success', message: 'Copied to clipboard' });
                    navigator.clipboard.writeText(user?.refferalCode);
                  }}
                >
                  {' '}
                  {user?.refferalCode || ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <NotificationDrawer open={showNotifications} onClose={() => setShowNotifications(false)} />

      <ModalBannerVideos
        open={showBannerModal}
        onClose={() => setShowBannerModal(false)}
        onWatched={() => {
          setShowBannerModal(false);
          navigate('/user/first-banner');
        }}
      />
    </>
  );
};

export default HOC(UserHome);
