import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';
import images from '../../../utils/images';
import TutorialVideoImage from '../../../assets/images/tutorialBanner.jpg';
import { showNotification } from '../../../services/exportComponents';

const ProfileTab = () => {
  const { user, setUser } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(user?.image || null);
  const [loading, setLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [isReferalButtonVisible, setIsReferalButtonVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      linkedInUrl: '',
      email: '',
      image: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobileNumber: user.mobileNumber || '',
        linkedInUrl: user.linkedInUrl || '',
        email: user.email || '',
        image: null,
      });
      setImagePreview(user.image || null);
    }
  }, [user, reset]);

  const watchedImage = watch('image');

  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }, [watchedImage]);

  const onSubmit = async data => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
        userApi.settingPage.updateProfileImage({
          data: formData,
          onSuccess: res => {
            setUser({
              ...user,
              ...res?.data,
            });
            reset({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              mobileNumber: user.mobileNumber || '',
              linkedInUrl: user.linkedInUrl || '',
              email: user.email || '',
              image: null,
            });
            setImagePreview(res?.data?.image || null);
          },
          onError: err => {
            console.error('Profile update failed', err);
          },
        });
      }

      userApi.settingPage.updateProfile({
        data: data,
        onSuccess: res => {
          setUser({
            ...user,
            ...res?.data,
          });
          reset({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            mobileNumber: user.mobileNumber || '',
            linkedInUrl: user.linkedInUrl || '',
            email: user.email || '',
            image: null,
          });
          setImagePreview(res?.data?.image || null);
        },
        onError: err => {
          console.error('Profile update failed', err);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, icon, name, type, validation }) => (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>

      <div
        className={`flex items-center rounded-3xl px-3 py-2 border ${
          errors[name] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
        }`}
      >
        <Icon icon={icon} className="mr-2 text-black" />
        <input
          type={type}
          {...register(name, validation)}
          className="bg-transparent w-full outline-none"
        />
      </div>

      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  );

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

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-3 border rounded-lg bg-white'>
        <div className="lg:col-span-2 p-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-gray-600 text-sm">
              Your personal information and account security settings.
            </p>
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Avatar</p>

              <div className="flex items-center gap-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}

                <label className="cursor-pointer bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-4 py-2 rounded-3xl">
                  Change
                  <input type="file" accept="image/*" {...register('image')} className="hidden" />
                </label>
              </div>
            </div>

            <div></div>

            <InputField
              label="First Name"
              icon="akar-icons:person"
              name="firstName"
              type="text"
              validation={{ required: 'First name is required' }}
            />

            <InputField
              label="Last Name"
              icon="akar-icons:person"
              name="lastName"
              type="text"
              validation={{ required: 'Last name is required' }}
            />

            <InputField
              label="Phone Number"
              icon="akar-icons:phone"
              name="mobileNumber"
              type="text"
              validation={{ required: 'Phone number is required' }}
            />

            <InputField
              label="LinkedIn"
              icon="akar-icons:link-chain"
              name="linkedInUrl"
              type="text"
              validation={{
                pattern: {
                  message: 'Enter valid LinkedIn URL',
                },
              }}
            />

            <InputField
              label="Email"
              icon="akar-icons:envelope"
              name="email"
              type="email"
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter valid email',
                },
              }}
            />

            {isDirty && (
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold rounded-3xl py-2 px-4"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

        </div>
          <div className="w-full bg-white lg:border-l border-[#d0d0d0] p-6">
                    <div className="space-y-6">
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
                          <div className="mt-2">
                            <p className="text-sm text-black text-center">
                              Your Current Plan : -{' '}
                              <span className="text-sm text-gray-500">
                                {currentSubscription?.subscriptionPlanId?.name}
                              </span>
                            </p>
                            <p className="text-sm text-black text-center items-center justify-center flex gap-2">
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
                      <div className="bg-yellow-100 rounded-lg p-3 flex flex-col items-center gap-2">
                        <p className="font-semibold text-sm text-center">
                          ■ Limited Time Offer: 50% Off All Courses! ■
                        </p>
                        <p className="text-xs text-center">
                          Boost your exam prep with half off on our top-rated courses. Hurry, offer ends soon!
                        </p>
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
                      <div className="flex lg:flex-col flex-wrap gap-2">
                        {isReferalButtonVisible && (
                          <div className="flex items-center justify-between gap-2 bg-gray-100 px-3 py-2 rounded-2xl">
                            <span className="text-sm font-medium text-gray-700">
                              {user?.refferalCode || ''}
                            </span>
          
                            <button
                              onClick={() => {
                                showNotification({ type: 'success', message: 'Copied to clipboard' });
                                navigator.clipboard.writeText(user?.refferalCode);
                              }}
                              className="p-1 hover:bg-gray-200 rounded-md transition"
                            >
                              <Icon icon="solar:copy-outline" width={16} />
                            </button>
                          </div>
                        )}
          
                        {/* <button
                          className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-medium text-sm px-3 py-2 rounded-3xl transition"
                          onClick={() => {
                            setIsReferalButtonVisible(true);
                            showNotification({ type: 'success', message: 'Copied to clipboard' });
                            navigator.clipboard.writeText(user?.refferalCode);
                          }}
                        >
                          Referral & Earn
                        </button> */}
                        <a
                          href="mailto:support@completeprep.com"
                          className="inline-flex items-center justify-center bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-medium text-sm px-4 py-2 rounded-3xl transition-colors duration-200 hover:no-underline"
                        >
                          Help us improve
                        </a>
                        <button className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-medium text-sm px-2.5 py-2 rounded-3xl">
                          Become as an Ambassador
                        </button>
                      </div>
                    </div>
          </div>
      </form>
    </div>
  );
};

export default ProfileTab;
