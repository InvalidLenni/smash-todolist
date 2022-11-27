import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Display from './components/Display';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Display />
      <Footer />
    </div>
  );
}

export default App;
