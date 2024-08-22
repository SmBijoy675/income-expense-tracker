import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Forms/007 Login";
import Register from "./components/Forms/Register";
import Navbar from "./components/Navbar/Navbar";
import AddTransaction from "./components/Forms/AddTransaction";
import AccountDashboard from "./components/Dashboard/AccountDashboard";
import AccountDetails from "./components/Dashboard/AccountDetails";
import AddAccount from "./components/Forms/AddAccount";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/add-transaction/:id" element={<AddTransaction />}></Route>
        <Route path="/dashboard" element={<AccountDashboard />}></Route>
        <Route path="/dashboard" element={<AccountDashboard />}></Route>
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        ></Route>
        <Route
          path="/dashboard/accounts/create"
          element={<AddAccount />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
