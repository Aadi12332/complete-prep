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
import { motion } from 'framer-motion';
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
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12 about-bg"
            >
              <img
                src={images.newDashboardUserMainAboutImage1}
                alt="About Us"
                className="w-full h-auto lg:rounded-xl object-cover"
              />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div
                className="text-sm lg:text-base leading-relaxed text-gray-600 text-center"
                dangerouslySetInnerHTML={{ __html: aboutUs?.desc || '' }}
              />
            </motion.section>

            <section className="space-y-12 md:px-6 px-3">
              {aboutUs?.team?.map((founder, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  </motion.div>
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
