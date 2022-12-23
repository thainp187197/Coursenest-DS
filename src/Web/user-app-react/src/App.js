import { Routes, Route } from 'react-router-dom';

import Home from '~/pages/Home/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Forgot from '~/pages/Forgot';
import ResetPassword from '~/pages/ResetPassword';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                {/* <Route path="/" element={<Home />} exact />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/reset-password" element={<ResetPassword />} /> */}
            </Routes>
        </div>
    );
}

export default App;
