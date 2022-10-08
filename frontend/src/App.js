import { Register } from "./components/Register/Register";
import { Login } from "./components/Register/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CategoryNav } from "./components/CategoryNav/CategoryNav";
import { ServiceList } from "./components/ServiceList/ServiceList";
import { ServiceProviderAvatar } from "./components/ServiceProviderPage/ServiceProviderAvatar.jsx";
import { ServiceProviderOffers } from "./components/ServiceProviderPage/ServiceProviderOffers";


function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <CategoryNav/> */}
      {/* <ServiceList/> */}
      <ServiceProviderAvatar/>
      {/* <ServiceProviderOffers/> */}
      {/* <Register/>
      <Login/> */}
    </div>
  );
}

export default App;
