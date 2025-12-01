import { Navigate } from 'react-router-dom';

/**
 * Cette page redirige vers /lessons avec le filtre "histoire_saints"
 * pour éviter la duplication de contenu
 */
const CopticSaintsPage: React.FC = () => {
  return <Navigate to="/lessons?category=histoire_saints" replace />;
};

export default CopticSaintsPage;