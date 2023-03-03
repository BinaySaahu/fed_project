import {Route,Routes} from 'react-router-dom';
import "./App.css";
import Form from "./Form";
import View from './View';
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element ={<Form/>}/>
        <Route path="/view" element ={<View/>}/>
      </Routes>
    </div>
  );
}

export default App;
