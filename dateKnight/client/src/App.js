import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import HomePage from './components/HomePage'
import ResultPage from './components/ResultPage'
import "./App.css"

const App = () => (
  <BrowserRouter>
    <div>
      <nav>
        <Link className='home' onClick={() => this.resetHome()} to={`/`} >Home</Link>
      </nav>
        <Route exact path='/' component={HomePage} />
          <Route exact path='/results' component={ResultPage} />
    </div>
  </BrowserRouter>
);

export default App;