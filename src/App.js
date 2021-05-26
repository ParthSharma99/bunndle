import {React, useEffect, useState, useLayoutEffect} from "react";
import logo from './images/logo.svg'
import './App.css'
import './mobile.css'
import HomePage from './pages/homePage'
import LandingPage from './pages/landingPage'
import ReferralPage from './pages/referralPage'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import WaitListForm from "./pages/waitListForm";
import firebase from "firebase/firebase";
import firebaseConfig from './firebaseConfig'


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

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  })

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
        <Route path="/referral/:id" component={(props) => <ReferralPage {...props} firebase={firebase}/>} />
      
      </Router>
      
      
    </div>
  );
}

export default App;
