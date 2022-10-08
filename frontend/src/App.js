import { Register } from "./components/Register/Register";
import { Login } from "./components/Register/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CategoryNav } from "./components/CategoryNav/CategoryNav";
import { ServiceList } from "./components/ServiceList/ServiceList";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <CategoryNav/>
      <ServiceList/>
      {/* <Register/>
      <Login/> */}
    </div>
  );
}

export default App;
