import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Display from "./components/Display";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto base-100">
        <Navbar />
        <div className="bg-gray-800">
          <Display />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
