import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './profiles/Login'
import Register from './profiles/Register';
import {PortfolioReport} from "./reports/PortfolioReport";
import {WalletReport} from "./reports/WalletReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
          <Route path="/portfolio" element={<PortfolioReport/>} />
          <Route path="/wallet" element={<WalletReport/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;