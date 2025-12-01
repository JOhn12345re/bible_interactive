import { Navigate } from 'react-router-dom';

/**
 * Cette page redirige vers /lessons avec le filtre "icones_coptes"
 * pour éviter la duplication de contenu
 */
const CopticIconsPage: React.FC = () => {
  return <Navigate to="/lessons?category=icones_coptes" replace />;
};

export default CopticIconsPage;