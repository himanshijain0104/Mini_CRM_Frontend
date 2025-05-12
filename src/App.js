import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import OrderForm from './components/OrderForm';
import Customers from './components/Customers';
import Orders from './components/Orders';
import Campaign from './components/Campaign';
import CreateCampaign from './components/CreateCampaign';
import CreateCustomerForm from './components/CreateCustomerForm';
import Segments from './components/Segments';
import CreateSegment from './components/CreateSegment';
import CampaignHistory from './components/CampaignHistory';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Login />}  />
          <Route path="/home" element={<Home />}  />
          <Route path="/dashboard" element={<Dashboard />}  />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders-form" element={<OrderForm />}  />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers-form" element={<CreateCustomerForm />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/create-segment" element={<CreateSegment />} />
          <Route path="/campaigns" element={<Campaign />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-history/:id" element={<CampaignHistory />} />

          

        </Routes>
      
      </BrowserRouter>

    </AuthProvider>
    
  );
}

export default App;
