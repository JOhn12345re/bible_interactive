import { Navigate } from 'react-router-dom';

/**
 * Cette page redirige vers /coptic-church
 */
const CopticIconsPage: React.FC = () => {
  return <Navigate to="/coptic-church" replace />;
};

export default CopticIconsPage;