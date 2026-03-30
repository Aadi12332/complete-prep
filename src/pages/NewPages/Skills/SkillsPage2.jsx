import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMenuBar } from '../../../components/common/MenuBar';
import HOC from '../../../components/layout/HOC';
import { triggerRazorpay } from '../../../components/ThirdParty/RazorpayCheckout';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';
import { showNotification } from '../../../services/exportComponents';

const SkillsPage2 = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { goal = '' } = user || {};
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      navigate('/login');
    } else if (goal) {
      fetchCourses();
    }
  }, [isAuthenticated, goal]);

  const fetchCourses = () => {
    userApi.skills.getAll({
      params: {
        page: 1,
        limit: 999,
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
  const fetchCourseSubjectsByCourseId = courseId => {
    userApi.courses.getById({
      params: { courseCategoryId: courseId },
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
      onError: err => {
        showNotification({
          type: 'error',
          message: 'No subjects found for this course',
        });
      },
    });
  };

  return (
    <div className="user_container">
      <div>
        <div className="user_container_width">
          <UserMenuBar />
        </div>
        <div className="p-4 bg-white rounded-sm">
          {isLoading ? (
            <div className="flex justify-center mt-10">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
              {courses?.map(course => (
                <div
                  key={course._id}
                  className="bg-[#efefef] rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col border border-[#efefef]"
                >
                  <div className="w-full aspect-[1/1.2]">
                    <img
                      src={course?.locale}
                      alt={course?.name}
                      className="w-full h-full object-cover p-2 rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col gap-1 p-1 px-2 flex-1 bg-[#efefef]">
                    <p className="font-semibold text-lg text-gray-800 line-clamp-2">
                      {course?.name}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-2">{course?.desc}</p>

                    <div className="mt-auto flex flex-col gap-3">
                      <p className="text-xl font-bold text-green-600">₹{course?.price || 0}</p>

                      <button
                        onClick={() => {
                          if (course?.isPurchased) {
                            navigate(
                              `/user/skill/${course?._id}/${course?.subjects?.[0]?.subject?._id}`
                            );
                            return;
                          }

                          triggerRazorpay({
                            amount: course?.price,
                            name: user?.fullName || 'User',
                            email: user?.email || 'email@example.com',
                            contact: user?.mobileNumber || '0000000000',

                            onSuccess: paymentRes => {
                              if (paymentRes?.payload?.payment?.id)
                                userApi.cart.addToCart({
                                  data: {
                                    skills: [course._id],
                                  },
                                  onSuccess: () => {
                                    userApi.cart.checkOut({
                                      onSuccess: data => {
                                        userApi.cart.placeOrder({
                                          id: data?.data?.orderId,
                                          data: { paymentStatus: 'completed' },

                                          onSuccess: () => {
                                            navigate(`/user/skill/${course._id}`);
                                          },
                                        });
                                      },
                                    });
                                  },
                                });
                            },

                            onFailure: () => {
                              setButtonLoading(false);
                            },

                            onCancel: () => {
                              setButtonLoading(false);
                            },
                          });
                        }}
                        className={`w-full py-2 mt-1 mb-3 font-bold ${
                          course?.isPurchased ? 'bg-[#3DD455]' : 'bg-[#3DD455]'
                        } hover:bg-black text-black hover:!text-[#3DD455] rounded-3xl`}
                      >
                        {course?.isPurchased ? 'Start' : 'Unlock Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HOC(SkillsPage2);
