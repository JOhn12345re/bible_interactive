import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Cette page redirige vers /lessons avec le filtre "histoire_saints"
 * pour éviter la duplication de contenu
 */
const CopticSaintsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/lessons?category=histoire_saints', { replace: true });
  }, [navigate]);

  return null;
};

export default CopticSaintsPage;