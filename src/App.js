import './App.css';
import Search from './Search';
import logo from './logApptemp.png';
function App() {
  return (
    <div className="App">
      <img src={logo} className="appLogo" alt="logo"/>
      <Search placeholder="Informe a cidade"/>
    </div>
  );
}

export default App;
