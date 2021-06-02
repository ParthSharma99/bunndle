import {React, useEffect, useState, useLayoutEffect, lazy, Suspense} from "react";
import logo from './images/logo.svg'
import './App.css'
import loadable from '@loadable/component'
// import LandingPage from './pages/landingPage'
// import ReferralPage from './pages/referralPage'
import { BrowserRouter as Router, Route} from "react-router-dom";
// import WaitListForm from "./pages/waitListForm";
import firebaseConfig from './firebaseConfig'


const LandingPage = loadable(() => import('./pages/landingPage'));
const ReferralPage = loadable(() => import('./pages/referralPage'));
const WaitListForm = loadable(() => import('./pages/waitListForm'));

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
  const [thresholdSize] = useState(1000);
  return (
    <div className="App">
      <Router>
        <Route path={"/"} exact
          render={() => (
            <>
              <div className="background-navbar">
                <span className="logo-wrapper"><img alt="" className="logo" src={logo}/></span>
              </div>
              <Suspense fallback={<>Loading</>}>
                <LandingPage mobile={(width<thresholdSize)?true:false}/>
              </Suspense>
              {(width<thresholdSize) ?
                <div className="button-wrapper-fixed">
                  <button className="join-waitlist-button" onClick={() => window.location.href='waitlist'}>Join Waitlist</button>
                </div>
              :''
              }      
            </>
          )} />
        <Route path="/waitlist" render={(props) =><><div className="background-navbar"><span className="logo-wrapper"><img alt="" className="logo" src={logo}/></span></div> <Suspense fallback={<></>}><WaitListForm mobile={(width<thresholdSize)?true:false}/></Suspense> </>} />
        <Route path="/referral/:id" component={(props) => <Suspense fallback={<></>}><ReferralPage {...props} /></Suspense>} />
      
      </Router>
      
      
    </div>
  );
}

export default App;
