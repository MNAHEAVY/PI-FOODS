import './App.css';
import {Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import CreateRp from './components/CreateRp'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/recipe/:id' element={<Details/>}/>
      <Route path='/recipecreate' element={<CreateRp/>}/>
    </Routes>
  );
}

export default App;
