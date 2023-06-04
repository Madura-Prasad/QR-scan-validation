import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import WelcomePage from "./components/WelcomePage"
import ScanQR from "./components/ScanQR"
import Profile from "./components/Profile"
import GiftDetails from "./components/GiftDetails"
import ScanSuccess from "./components/QrSuccess"
import ScanError from "./components/QrError"
import DiningProfile from './components/DiningProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
        <Route exact path="/welcome/:roleType/:roleName" element={<WelcomePage/>}/>
        <Route exact path="/scan/:roleName/:roleType" element={<ScanQR/>}/>
        <Route exact path="/profile/:shortenedUrl/:roleName/:roleType" element={<Profile/>}/>
        <Route exact path="/gift/:shortenedUrl/:roleName/:roleType" element={<GiftDetails/>}/>
        <Route exact path="/dine/:shortenedUrl/:roleName/:roleType" element={<DiningProfile/>}/>
        <Route exact path="/scan-success/:shortenedUrl/:roleName/:roleType" element={<ScanSuccess/>}/>
        <Route exact path="/scan-error" element={<ScanError/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
