import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './Login';
import Main from './Main';
import SignUp from './SignUp';
import { getToken } from './utils/token';

function App() {
  const [ user, updateUser ] = useState(undefined);
  async function getUser() {
    const token = getToken();
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json(); 
      if (!response.ok) {
        throw new Error(data.message);
      }

      updateUser(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" render={(props) => {
            if (user) {
              return <Redirect to="/" />
            }
            return <Login {...props} getUser={getUser} /> 
          }} />
          <Route exact path="/signup" render={(props) => {
            if (user) {
              return <Redirect to="/" />;
            }
              return <SignUp {...props} />;
          }} />
          <Route path="/" render={(props) => {
              if (!user) {
                return <Redirect to="/login" />;
              }
              return <Main {...props} />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
