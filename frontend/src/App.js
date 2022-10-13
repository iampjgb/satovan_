import { Navbar } from "./components/Navbar/Navbar";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CategoryNav } from "./components/CategoryNav/CategoryNav";
import { ServiceList } from "./components/ServiceList/ServiceList";
import { ServiceProviderAvatar } from "./components/ServiceProviderPage/ServiceProviderAvatar.jsx";
import { ServiceProviderOffers } from "./components/ServiceProviderPage/ServiceProviderOffers";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ChatComponent } from "./components/ChatComponent/ChatComponent";
import { SignIn } from "./components/SignIn/SignIn";
import { AuthContextProvider } from "./context/AuthContext";



function App() {
  return (
    <AuthContextProvider>
      <div className="App">
      <Navbar/>
      <CategoryNav/>
      <ServiceList/> 
      {/* <ServiceProviderAvatar/>
      <ServiceProviderOffers/> */}
      <SignIn/>
      {/* <ChatComponent/> */}
    </div>
    </AuthContextProvider>
  );
}

export default App;
