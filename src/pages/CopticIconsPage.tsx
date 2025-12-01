import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Cette page redirige vers /lessons avec le filtre "icones_coptes"
 * pour éviter la duplication de contenu
 */
const CopticIconsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/lessons?category=icones_coptes', { replace: true });
  }, [navigate]);

  return null;
};

export default CopticIconsPage;