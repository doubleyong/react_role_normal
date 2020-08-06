import React from 'react';
import './App.css';
import Login from './pages/Login'
import Index from './pages/Index'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    HashRouter
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRouter'
function App() {
    return (
        <Router>
          <div className="App">
            <HashRouter>
              <Switch>
                <Route path="/" exact render={()=><Redirect to="/login"/>} />
                <Route path="/login" component={Login}/>
                <Route path="/index" render={()=>
                    <Index>
                      <PrivateRoute/>
                    </Index>
                }/>
              </Switch>
            </HashRouter>
          </div>
        </Router>
    );
}

export default App;

