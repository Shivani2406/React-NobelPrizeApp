import './App.css';
import WinnersData from './components/fetchData.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      {/* <h1>Nobel Prize Winners</h1> */}
      <WinnersData />
    </div>
  );
}

export default App;
