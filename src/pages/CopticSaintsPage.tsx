import { Navigate } from 'react-router-dom';

/**
 * Cette page redirige vers /coptic-church
 */
const CopticSaintsPage: React.FC = () => {
  return <Navigate to="/coptic-church" replace />;
};

export default CopticSaintsPage;