import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';
import images from '../../../utils/images';

const SelectUniversity = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { nextPage } = location.state || {};
  const { setUser } = useContext(AuthContext);

  const fetchUniversities = async () => {
    setIsLoading(true);
    await userApi.goalCategory.getAll({
      onSuccess: res => {
        setUniversities(res?.data || []);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const handleNext = () => {
    if (!selectedUniversity) {
      alert('Please select a university.');
      return;
    }
    navigate('/choose/university-course', {
      state: { universityId: selectedUniversity, nextPage },
    });
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  return (
    <div>
      <div className="bg-white text-white p-3">
        <img src={images.navBarLogo2} alt="Logo" className="max-w-60 py-2 max-h-[60px] ml-4" />
      </div>

      <div className="bg-white px-4 py-4 pt-0">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black text-left">
            Which University do you take?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 sm:p-6">
            {universities?.map(u => (
              <label
                key={u?._id}
                className={`group flex items-center gap-4 rounded-xl border bg-white p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedUniversity === u?._id ? 'border-black shadow-sm' : 'border-gray-200'
                }`}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={u?.imageUrl}
                    alt={u?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{u?.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {u?.description?.slice(0, 100)}
                  </div>
                </div>

                <input
                  type="radio"
                  name="universityOption"
                  className="w-5 h-5 accent-black"
                  checked={selectedUniversity === u?._id}
                  onChange={() => setSelectedUniversity(u?._id)}
                />
              </label>
            ))}
          </div>

          {isLoading && (
            <div className="text-center mt-4 text-sm text-gray-600">Loading universities...</div>
          )}

          {selectedUniversity && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-4 py-2 rounded-3xl"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectUniversity;
