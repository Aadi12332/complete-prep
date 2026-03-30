import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserMenuBar } from '../../../components/common/MenuBar';
import HOC from '../../../components/layout/HOC';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';
import images from '../../../utils/images';

const CoursePage3 = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { goal = '' } = user || {};
  const { id, courseId, subjectId } = useParams();
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeTab, setActiveTab] = useState('Videos');
  const [chapters, setChapters] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      navigate('/login');
    } else if (goal) {
      fetchChapters();
    }
  }, [isAuthenticated, goal]);

  const fetchChapters = () => {
    userApi.courses.getById({
      params: { courseId, CourseType: id, subjectId, page: 1, limit: 9999 },
      setIsLoading,
      onSuccess: res => {
        const fetchedData = res?.data || [];
        const currentSubjectData = fetchedData?.[0]?.subjects?.find(
          item => item.subject?._id === subjectId
        );
        setCurrentSubject(currentSubjectData);
        setChapters(fetchedData);
        setIsLoading(false);
      },
      onError: err => {
        console.error('Failed to fetch chapters:', err);
        setIsLoading(false);
      },
    });
  };

  const filterContent = (courseVideos, tab) => {
    switch (tab) {
      case 'Videos':
        return courseVideos.filter(item => item.videoLink);
      case 'Docs':
        return courseVideos.filter(item => item.educatorNotes && item.educatorNotes.length > 0);
      case 'Tests':
        return courseVideos.filter(item => item.testSeries && item.testSeries.length > 0);
      default:
        return courseVideos;
    }
  };

  return (
    <div className="user_container">
      <div className="">
        <UserMenuBar />
      </div>

      <div className="space-y-4 p-4 m-4 rounded-xl bg-[#efefef] border">
        <div>
          <img
            src={images.newAboutPageBannerCoursePageImage}
            alt="banner"
            style={{ maxHeight: '300px', width: '100%' }}
          />
        </div>
        <div className="overflow-hidden rounded-xl"></div>
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentSubject?.subject?.name || ''}
          </h1>
          <p className="text-sm text-gray-500">
            {chapters?.[0]?.courseCategoryId?.students || '42,826'} students learning this week
          </p>
        </div>
        <div className="w-full">
          {isLoading ? (
            <div className="flex justify-center mt-10">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {currentSubject?.subSubjects?.map((subSubject, subSubIndex) => (
                <div key={subSubIndex} className="bg-white rounded-xl overflow-hidden">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={() =>
                      setActiveChapter(activeChapter === subSubIndex ? null : subSubIndex)
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-semibold text-black w-10">
                        {String(subSubIndex + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black">
                          {subSubject.subSubject?.name || 'Chapter'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Total {subSubject?.totalHours || '12'} Hours |{' '}
                          {subSubject?.totalLectures || '111'} lectures
                        </p>
                      </div>
                    </div>
                    <Icon
                      icon={activeChapter === subSubIndex ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                      className="text-xl text-gray-500"
                    />
                  </div>

                  {activeChapter === subSubIndex && (
                    <div className="px-2 pb-5 space-y-3">
                      <div className="flex bg-[#efefef] rounded-3xl p-1 gap-2 justify-between sm:flex-wrap text-sm font-medium text-gray-700">
                        {['Videos', 'Docs', 'Tests'].map(tab => (
                          <button
                            key={tab}
                            className={`px-4 py-1 rounded-3xl ${
                              activeTab === tab ? 'bg-[#122826] text-[#f7f700]' : 'text-gray-800'
                            }`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab} {subSubject?.chapters?.[0]?.topics?.length} {console.log(tab)}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-3">
                        {subSubject?.chapters?.map((chapterData, chapIndex) => (
                          <div key={chapIndex} className="space-y-2 ">
                            {/* <h3 className="font-semibold text-md text-black">
                              {chapterData.chapter?.name || "Topic"}
                            </h3> */}
                            {chapterData?.topics?.map((topic, topicIndex) =>
                              filterContent(topic.courseVideos || [], activeTab).map(
                                (filteredContent, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between p-3 bg-[#efefef] rounded-xl cursor-pointer hover:shadow transition py-1"
                                    onClick={() => {
                                      if (activeTab === 'Videos' && filteredContent.videoLink) {
                                        return navigate(
                                          `/user/course/${id}/${courseId}/${subjectId}/${subSubject._id}/${chapterData._id}?topicId=${topic._id}&videoId=${filteredContent._id}`
                                        );
                                      }
                                      if (activeTab === 'Docs' && filteredContent.educatorNotes) {
                                        return navigate(
                                          `/user/handwritten-notes/${filteredContent._id}/view`,
                                          {
                                            state: {
                                              pdfUrl:
                                                filteredContent?.handwrittenNotes?.[0]
                                                  ?.subjects?.[0]?.subSubjects?.[0]?.chapters?.[0]
                                                  ?.topics?.[0]?.handwrittenNotes?.[0],
                                            },
                                          }
                                        );
                                      }
                                      if (activeTab === 'Tests' && filteredContent._id) {
                                        return navigate(
                                          `/user/test-series/${filteredContent?.testSeries?.[0]}?testVariant=studyPlannerTest&studyPlannerId=${id}`
                                        );
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-4">
                                      <img
                                        src={images.newHandwrittenNotesImage1}
                                        alt={
                                          filteredContent.videoName ||
                                          filteredContent.educatorNotes?.[0] ||
                                          'Content'
                                        }
                                        className="object-cover rounded-md w-14 h-14"
                                      />
                                      <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                          {topic?.name || `Topic ${topicIndex + 1}`}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {activeTab.slice(0, -1)} | 12 Pages
                                        </p>
                                      </div>
                                    </div>
                                    <Icon
                                      icon="mdi:chevron-right"
                                      className="text-lg text-gray-400"
                                    />
                                  </div>
                                )
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HOC(CoursePage3);
