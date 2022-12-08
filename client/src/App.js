import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Homepage from './components/Homepage/Homepage.jsx';
import Principal from './components/Principal/Principal.jsx';
import { getRecipesBackend } from './redux/actions.js';
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3001/"


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipesBackend())
  }, [dispatch])

  return (
    <div className="App">

      <Route exact path="/">
        <Homepage />
      </Route>

      <Route path="/recipes"
        render={({ history, location }) => <Principal history={history} location={location} />} />

    </div>
  );
}

export default App;
