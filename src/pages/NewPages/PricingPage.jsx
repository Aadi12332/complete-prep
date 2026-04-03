import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReusableModal } from "../../components/common/ComPrepComponent/ComPrepComponent";
import { userApi } from "../../services/apiFunctions";
import images from "../../utils/images";
import { useForm } from "react-hook-form";
import { ProfileEditFormMain } from '../../components/common/New-Components/NewComponent';
import { AuthContext } from '../../Context/AuthContext';

const courseData = {
  CBSE: {
    "CBSE CLASS 12": [
      "Applied Mathematics Class 12",
      "Biology Class 12",
      "Physics Class 12",
      "History Class 12",
      "Sociology Class 12",
      "English Core Class 12",
      "Chemistry Class 12",
    ],
    "CBSE CLASS 11": [
      "Applied Mathematics Class 11",
      "Biology Class 11",
      "Physics Class 11",
      "History Class 11",
      "Sociology Class 11",
      "English Core Class 11",
      "Chemistry Class 11",
    ],
    "CBSE CLASS 10": [
      "Mathematics Class 10",
      "Biology Class 10",
      "Physics Class 10",
      "History Class 10",
      "Science Class 10",
      "English Class 10",
      "Hindi Class 10",
    ],
    "CBSE CLASS 9": [
      "Mathematics Class 9",
      "Biology Class 9",
      "Physics Class 9",
      "History Class 9",
      "Science Class 9",
      "English Class 9",
      "Hindi Class 9",
    ],
  },
  JEE: {
    "JEE MAINS": ["Physics", "Chemistry", "Maths"],
    "JEE ADVANCED": [
      "Physics Advanced",
      "Chemistry Advanced",
      "Maths Advanced",
    ],
  },
  NEET: {
    Biology: ["Zoology", "Botany"],
    "Physics & Chemistry": ["NEET Physics", "NEET Chemistry"],
  },
  "Govt. Exam": {
    SSC: ["Math", "Reasoning", "English"],
    UPSC: ["GS", "CSAT", "Essay"],
  },
  "UG & PG": {
    BSc: ["Maths", "Physics", "Comp Sci"],
    MSc: ["Physics", "Data Science"],
  },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    billingFrequency: "per user/month, billed annually",
    features: {
      workspace: {
        seats: "Up to 3",
        objects: "Up to 3",
      },
      automations: {
        credits: "200",
      },
      emailAndCalendar: {
        sync: "1 account per user",
        sharing: "Individual metadata",
        sendsAmount: "500 sends per month",
        bulkEmailSending: "10 sends at a time",
        removeEmailWatermark: false,
      },
      reporting: {
        reports: "3 reports",
        insightReports: false,
        salesReports: false,
        activityReports: false,
        emailReports: false,
      },
      dataModel: {
        accessPermissions: "Fully visible",
      },
      admin: {
        paymentInvoice: false,
        sso: false,
      },
      support: {
        helpCenter: true,
        chatAndEmail: true,
        prioritySupport: false,
        migrationAssistance: false,
      },
    },
  },
  {
    name: "Basic",
    price: "$39",
    discount: "15%",
    billingFrequency: "per user/month, billed annually",
    features: {
      workspace: {
        seats: "Unlimited",
        objects: "Up to 8",
      },
      automations: {
        credits: "2000",
      },
      emailAndCalendar: {
        sync: "2 account per user",
        sharing: "Individual attachments",
        sendsAmount: "1000 sends per month",
        bulkEmailSending: "20 sends at a time",
        removeEmailWatermark: true,
      },
      reporting: {
        reports: "20 reports",
        insightReports: true,
        salesReports: true,
        activityReports: false,
        emailReports: false,
      },
      dataModel: {
        accessPermissions: "Private",
      },
      admin: {
        paymentInvoice: true,
        sso: false,
      },
      support: {
        helpCenter: true,
        chatAndEmail: true,
        prioritySupport: true,
        migrationAssistance: false,
      },
    },
  },
  {
    name: "Pro",
    price: "$59",
    discount: "19%",
    billingFrequency: "per user/month, billed annually",
    features: {
      workspace: {
        seats: "Unlimited",
        objects: "Up to 12",
      },
      automations: {
        credits: "4000",
      },
      emailAndCalendar: {
        sync: "4 account per user",
        sharing: "Specific contacts",
        sendsAmount: "Unlimited",
        bulkEmailSending: "50 sends at a time",
        removeEmailWatermark: true,
      },
      reporting: {
        reports: "100 reports",
        insightReports: true,
        salesReports: true,
        activityReports: true,
        emailReports: true,
      },
      dataModel: {
        accessPermissions: "Advanced",
      },
      admin: {
        paymentInvoice: true,
        sso: true,
      },
      support: {
        helpCenter: true,
        chatAndEmail: true,
        prioritySupport: true,
        migrationAssistance: true,
      },
    },
  },
];

 const ProfileEditForm = ({ closeModal }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState("login");
    const navigate = useNavigate();

    const onSubmitLogin = async (data) => {
      localStorage.clear();
      userApi.auth.login({
        data: { email: data.email, password: data.password },
        onSuccess: (res) => {
          console.log(res);
          localStorage.setItem("authToken", res?.data?.token);
          const savedToken = localStorage.getItem("authToken");
          {
            savedToken && navigate("/choose-curriculum");
          }
        },
      });
    };

    const onSubmitForgot = (data) => {
      console.log(data);
      setStep("confirmation");
    };
    const onSubmitRegister = (data) => {
      localStorage.clear();
      userApi.auth.registerUser({
        data: data,
        showMsg: true,
        onSuccess: (res) => {
          console.log(res);
          userApi.auth.login({
            data: { email: data.email, password: data.password },
            onSuccess: (res) => {
              localStorage.setItem("authToken", res?.data?.token);
              const savedToken = localStorage.getItem("authToken");
              {
                savedToken && navigate("/choose-curriculum");
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
            <Icon
              icon="material-symbols:close"
              className="cursor-pointer"
              onClick={closeModal}
            />
          </p>
          <div className="mx-auto sm:w-full md:w-80">
            <p className="text-center">
              <img
                src={images.newHomePageLoginModalImage}
                className="w-[70px] h-[70px] mx-auto"
                alt="logo"
              />
            </p>

            {step === "login" && (
              <>
                <h2 className="text-2xl font-semibold text-center text-green-600">
                  Log in
                </h2>
                <p className="text-sm text-center">
                  No account yet?{" "}
                  <button
                    onClick={() => setStep("register")}
                    className="text-blue-500 underline"
                  >
                    Register
                  </button>
                </p>

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(onSubmitLogin)}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs italic text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full px-3 py-2 pr-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-xs italic text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-[36px] text-gray-500"
                    >
                      <Icon
                        icon={
                          showPassword
                            ? "basil:eye-closed-solid"
                            : "basil:eye-solid"
                        }
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
            {step === "register" && (
              <>
                <h2 className="text-2xl font-semibold text-center text-green-600">
                  Register
                </h2>
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <button
                    onClick={() => setStep("login")}
                    className="text-blue-500 underline"
                  >
                    Log in
                  </button>
                </p>

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(onSubmitRegister)}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-xs italic text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      {...register("mobileNumber", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit number",
                        },
                      })}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="9876543210"
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs italic text-red-500">
                        {errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs italic text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      How did you hear about us?
                    </label>
                    <select
                      {...register("hearAboutUs", {
                        required: "This field is required",
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
                      <p className="text-xs italic text-red-500">
                        {errors.hearAboutUs.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full px-3 py-2 pr-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-xs italic text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-[36px] text-gray-500"
                    >
                      <Icon
                        icon={
                          showPassword
                            ? "basil:eye-closed-solid"
                            : "basil:eye-solid"
                        }
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

            {step === "forgot" && (
              <>
                <h2 className="text-xl font-semibold text-center text-green-600">
                  Forgot your password?
                </h2>
                <form
                  onSubmit={handleSubmit(onSubmitForgot)}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs italic text-red-500">
                        {errors.email.message}
                      </p>
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
                    onClick={() => setStep("login")}
                  >
                    Return to the login page
                  </span>
                </p>
              </>
            )}

            {step === "confirmation" && (
              <div className="text-center">
                <h2 className="mt-4 text-xl font-semibold text-green-600">
                  We have sent you a message.
                </h2>
                <p className="text-green-700">Go to the mail</p>
                <p className="mt-4">
                  <span
                    className="text-sm text-blue-600 underline cursor-pointer"
                    onClick={() => setStep("login")}
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

const PricingPage = () => {
  const [currentState, setCurrentState] = useState(null);
  const [activeCategory, setActiveCategory] = useState("CBSE");
  const [modalVisible, setModalVisible] = useState(false);
  const [subScriptions, setSubScriptions] = useState([]);
  const [faqs, setFaqs] = useState([]);
   const [goalCategory, setGoalCategory] = useState([]);
  const [goal, setGoal] = useState([]);
    const [selectedGoalCategory, setSelectedGoalCategory] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("");
    const { setUser } = useContext(AuthContext);

  const [nextPage, setNextPage] = useState('');
 const fetchFaqs = async () => {
    userApi.faq.getAll({
      onSuccess: (data) => setFaqs(data?.data || []),
    });
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  useEffect(() => {
    fetchSubScriptions();
  }, []);
  const fetchGoalCategory = async () => {
    userApi.goalCategory.getAll({
      onSuccess: (data) => setGoalCategory(data?.data || []),
    });
  };
  useEffect(()=>{fetchGoalCategory()},[])

  const fetchGoal = async () => {
    userApi.subjects.getByGoalCategory({
      params: { goalCategory: selectedGoalCategory },
      onSuccess: (data) => setGoal(data?.data || []),
    });
  };
  useEffect(() => {
    fetchGoal();
  }, [selectedGoalCategory]);
  const fetchSubScriptions = async () => {
    userApi.subscription.getAll({
      onSuccess: (res) => setSubScriptions(res?.data),
    });
  };
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const toggleDropdown = (state) => {
    setCurrentState(currentState === state ? null : state);
  };

  const PricingCard = ({ title, price, savings, features, isPro = false, discount }) => {
    return (
      <div
        className={`flex flex-col p-6 rounded-lg border w-full ${
          isPro ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-bold text-left">{title}</h2>
        <div className="my-4 text-left">
          <div className="text-3xl font-bold">
            ${price}{" "}
            {discount>0 && (
              <span className="text-sm text-white bg-gray-500 rounded px-2 py-1 ml-2">
              -{discount}%
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">{savings}</div>
        </div>
        <ul className="my-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          className={`mt-auto w-full py-2 rounded ${
            isPro ? "bg-white text-gray-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          Get Started
        </button>
      </div>
    );
  };



  return (
    <>
      {" "}
      <ReusableModal
        size="md"
        body={<ProfileEditFormMain nextPage={nextPage} closeModal={() => setModalVisible(false)} setUser={setUser} />}
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
              backgroundSize: "cover",
            }}
            className="w-full min-h-[54px] max-h-[600px] object-cover rounded-lg relative"
          >
            <div className="flex flex-wrap justify-between items-center px-4 py-3">
              <img
                src={images.newMainLogo}
                alt="Logo"
                onClick={() => navigate("/")}
                className="max-w-[150px]"
              />

              <div className="flex flex-wrap items-center gap-2 text-white bg-gray-700 rounded-3xl px-4 py-2 relative mt-3 md:mt-0">
                <span
                  onClick={() => toggleDropdown(0)}
                  className="cursor-pointer flex items-center gap-1 hover:bg-gray-800 px-2 py-1 rounded-3xl"
                >
                  Courses
                  {currentState === 0 ? (
                    <Icon icon="akar-icons:chevron-up" />
                  ) : (
                    <Icon icon="akar-icons:chevron-down" />
                  )}
                </span>
                {["About", "Pricing", "Testimonial"].map((tab) => (
                  <span
                    key={tab}
                    onClick={() => {
                      tab === "Testimonial"
                        ? navigate("/testimonials")
                        : tab === "Pricing"
                        ? navigate("/pricing")
                        : tab === "About"
                        ? navigate("/about")
                        : setCurrentState(null);
                    }}
                    className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-3xl"
                  >
                    {tab}
                  </span>
                ))}

                {currentState === 0 && (
                  <div className="absolute top-[110%] left-0 bg-white text-black rounded-3xl shadow-lg w-full md:w-[600px] p-4 z-50">
                    <div className="flex gap-2 pb-2 mb-4 overflow-x-auto border-b md:gap-4">
                      {goalCategory?.map((cat) => (
                        <button
                          key={cat?._id}
                          onClick={() => setSelectedGoalCategory(cat?._id)}
                          className={`whitespace-nowrap px-3 py-1 rounded-3xl ${
                            selectedGoalCategory === cat?._id
                              ? "bg-gray-900 text-white"
                              : "bg-white text-black border border-gray-300"
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
                            <h5 className="mb-2 font-semibold">
                              {item?.goalName}
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
          <div className="">
            <div>
              <h2 className="text-center text-4xl font-bold mt-4 text-black">
                Complete Prep pricing plan for your startup
              </h2>
              <p className="text-center text-gray-500 mt-2 text-sm md:text-base max-w-xl mx-auto">
                Perfectly tailored for every stage of your growth.Get started
                today, no credit card needed.
              </p>
              <div></div>
            </div>
            <div className="">
              <div className="flex justify-center mt-5 mb-5">
                <p className="inline-flex justify-center border border-gray-300 p-2 rounded-lg gap-2 text-center">
                  <button className="bg-white text-black border-0 rounded-lg px-4 py-2 font-bold">
                    Billed Monthly
                  </button>
                  <button className="bg-gray-700 text-white border-0 rounded-lg px-4 py-2 font-bold">
                    Billed Annually
                  </button>
                </p>
              </div>
              <div>
                <div className="flex justify-between p-4 items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
                    {subScriptions?.map((plan, index) => (
                      <PricingCard
                        key={plan._id ?? index}
                        {...plan}
                        title={plan.name}
                        price={plan.price}
                        features={plan.features?.map((feature) => feature.name)}
                        isPro={plan.name === "Pro"}
                        discount={plan.discount}
                      />
                    ))}

                    {/* {pricingPlans.map((plan, index) => (
                      <PricingCard key={index} {...plan} />
                    ))} */}
                  </div>
                </div>
              </div>
              <div>
                <div class="container mx-auto px-4 py-8">
                  <h1 class="text-3xl font-bold text-center mb-8">
                    Compare Plans
                  </h1>

                  <div class="flex justify-center mb-8">
                    <div class="inline-flex justify-center border border-gray-300 p-2 rounded-lg gap-2 text-center">
                      <button class="bg-white text-black border-0 rounded-lg px-4 py-2 font-bold">
                        Billed Monthly
                      </button>
                      <button class="bg-gray-700 text-white border-0 rounded-lg px-4 py-2 font-bold">
                        Billed Annually
                      </button>
                    </div>
                  </div>

                  <div class="flex justify-center gap-4">
                    <div class="bg-white rounded-lg shadow-lg p-6 text-center w-64">
                      <h2 class="text-2xl font-bold mb-2">Free</h2>
                      <p class="text-3xl font-bold mb-2">$0</p>
                      <p class="text-gray-600 mb-4">
                        per user/month, billed annually
                      </p>
                      <button class="bg-gray-200 text-black border-0 rounded-lg px-4 py-2 font-bold w-full">
                        Get Started
                      </button>
                    </div>

                    <div class="bg-white rounded-lg shadow-lg p-6 text-center w-64">
                      <h2 class="text-2xl font-bold mb-2">Basic</h2>
                      <p class="text-3xl font-bold mb-2">
                        $39{" "}
                        <span class="text-sm bg-red-500 text-white rounded px-2 py-1">
                          -15%
                        </span>
                      </p>
                      <p class="text-gray-600 mb-4">
                        per user/month, billed annually
                      </p>
                      <button class="bg-gray-200 text-black border-0 rounded-lg px-4 py-2 font-bold w-full">
                        Get Started
                      </button>
                    </div>

                    <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6 text-center w-64">
                      <h2 class="text-2xl font-bold mb-2">Pro</h2>
                      <p class="text-3xl font-bold mb-2">
                        $59{" "}
                        <span class="text-sm bg-red-500 text-white rounded px-2 py-1">
                          -15%
                        </span>
                      </p>
                      <p class="text-gray-400 mb-4">
                        per user/month, billed annually
                      </p>
                      <button class="bg-gray-700 text-white border-0 rounded-lg px-4 py-2 font-bold w-full">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Comparison */}
              <div className="">
                <h2 className="text-xl font-bold mb-4">Workspace</h2>
                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Number of seats</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.workspace.seats}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Number of objects</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.workspace.objects}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-xl font-bold mb-4">Automations</h2>
                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Number of credits</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.automations.credits}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-xl font-bold mb-4">Email and Calendar</h2>
                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Email and calendar sync</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.emailAndCalendar.sync}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Email sharing</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.emailAndCalendar.sharing}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Email sends amount</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.emailAndCalendar.sendsAmount}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Bulk email sending</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.emailAndCalendar.bulkEmailSending}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Remove email watermark</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.emailAndCalendar
                            .removeEmailWatermark ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-xl font-bold mb-4">Reporting</h2>
                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Number of reports</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.reporting.reports}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Insight Reports</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.reporting.insightReports ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Sales Reports</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.reporting.salesReports ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Activity Reports</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.reporting.activityReports ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Email Reports</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.reporting.emailReports ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-xl font-bold mb-4">Data Model</h2>
                <table className="w-full mb-4">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Access permissions</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.dataModel.accessPermissions}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-xl font-bold mb-4">Admin</h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Payment invoice</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.admin.paymentInvoice ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">SAML (SSO)</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.admin.sso ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <h2 className="text-xl font-bold mb-4 mt-5">Support</h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="text-left p-2">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left p-2">Help Center</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.support.helpCenter ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Chat and Email Support</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.support.chatAndEmail ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Priority Support</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.support.prioritySupport ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="text-left p-2">Migration Assistance</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="text-left p-2">
                          {plan.features.support.migrationAssistance ? (
                            <Icon
                              icon="akar-icons:check"
                              className="text-green-500"
                            />
                          ) : (
                            <Icon
                              icon="akar-icons:cross"
                              className="text-red-500"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <div>
                  <div className="flex flex-col md:flex-row gap-8 p-6 mt-4">
                    {/* Left Sidebar */}
                    <div className="md:w-1/3 space-y-4">
                      <h2 className="text-3xl font-bold">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-gray-600">
                        Still have any questions? Contact our Team via <br />
                        <a
                          href="mailto:support@completeprep.com"
                          className="text-blue-600 underline"
                        >
                          support@completeprep.com
                        </a>
                      </p>
                      <button className="px-4 py-2 rounded-md border-gray-300 ">
                        See All FAQ’s
                      </button>
                    </div>

                    <div>
                      <div className="flex flex-col md:flex-row gap-8 p-6">
                        <div className="md:w-1/3 space-y-4">
                          <h2 className="text-3xl font-bold">
                            Frequently Asked Questions
                          </h2>
                          <p className="text-gray-600">
                            Still have any questions? Contact our Team via{" "}
                            <br />
                            <a
                              href="mailto:support@completeprep.com"
                              className="text-blue-600 underline"
                            >
                              support@completeprep.com
                            </a>
                          </p>
                          <button className="px-4 py-2 rounded-md border-gray-300 ">
                            See All FAQ’s
                          </button>
                        </div>

                        <div className="md:w-2/3 space-y-4">
                          {faqs?.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                              <div
                                key={index}
                                className="rounded-xl p-4 border bg-white"
                              >
                                <div
                                  className="flex justify-between items-center cursor-pointer"
                                  onClick={() =>
                                    setOpenIndex(isOpen ? -1 : index)
                                  }
                                >
                                  <h3 className="font-medium text-gray-900 text-base md:text-lg">
                                    {faq.question}
                                  </h3>
                                  <div className="p-1 rounded text-gray-600">
                                    {isOpen ? (
                                      <Icon icon="line-md:minus" size={18} />
                                    ) : (
                                      <Icon icon="akar-icons:plus" size={18} />
                                    )}
                                  </div>
                                </div>

                                {isOpen && faq.answer && (
                                  <div className="mt-4 text-gray-700 space-y-3 text-sm md:text-base leading-relaxed">
                                    <p>{faq.answer}</p>

                                    {faq?.link && (
                                      <div className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 cursor-pointer text-blue-600 text-sm font-medium">
                                        <span className="truncate">
                                          {faq.link}
                                        </span>
                                        <Icon icon="si:arrow-right-duotone" />
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
                </div>
              </div>
            </div>
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

export default PricingPage;
