import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthContextProvider from './context/authContext.jsx'; // Correct import for the provider.
import './index.css';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>  {/* Use AuthContextProvider here */}
    <App />
  </AuthContextProvider>
);
