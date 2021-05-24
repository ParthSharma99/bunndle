import {React, useEffect, useState, useLayoutEffect} from "react";
import logo from './images/logo.svg'
import './App.css'
import './mobile.css'
import './css/supreme.css'
import HomePage from './pages/homePage'
import LandingPage from './pages/landingPage'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import WaitListForm from "./pages/waitListForm";


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function App() {
  const [width, height] = useWindowSize();
  const [thresholdSize] = useState(920);
  return (
    <div className="App">
      <Router>
        <Route path={"/"} exact
          render={() => (
            <>
              <div className="background-navbar">
                <span className="logo-wrapper"><img className={(width<thresholdSize)?"mobile-logo" :"logo"} src={logo}/></span>
              </div>
              
              <LandingPage mobile={(width<thresholdSize)?true:false}/>
              {(width<thresholdSize) ?
              <div className="button-wrapper-mobile">
                <button className="join-waitlist-button" onClick={() => window.location.href='waitlist'}>Join Waitlist</button>
              </div>
              :''
              }      
            </>
          )} />
        <Route path="/waitlist" render={(props) =><><span className="logo-wrapper"><img className={(width<thresholdSize)?"mobile-logo" :"logo"} src={logo}/></span> <WaitListForm mobile={(width<thresholdSize)?true:false}/> </>} />
      </Router>
      
      
    </div>
  );
}

export default App;
