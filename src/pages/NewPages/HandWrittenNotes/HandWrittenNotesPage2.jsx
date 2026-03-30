import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PdfFlipBook from '../../../components/ThirdParty/PdfFlipBook';
import { AuthContext } from '../../../Context/AuthContext';
import images from '../../../utils/images';

const HandWrittenNotesPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { pdfUrl } = location.state || {};

  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <div className="bg-white text-white p-3">
        <img src={images.navBarLogo2} alt="Logo" className="max-w-60 py-2 max-h-[60px] ml-4" />
      </div>

      <div className="mainMaxWidth mx-auto mt-1">
        <div className="bg-white rounded-lg p-6">
          <PdfFlipBook pdfPath={pdfUrl || '/flipbook/sample.pdf'} />
        </div>
      </div>
    </div>
  );
};

export default HandWrittenNotesPage2;
