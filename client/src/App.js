import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'

//
import setAuthToken from './utils/setAuthToken'

// Load actions
import {setCurrentUser, logoutUser} from './actions/authAction'
import { clearCurrentProfile } from './actions/profileAction';
// CSS
import './App.css';

// Protect Route
import PrivateRoute from './components/common/PrivateRoute'

// Load components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dasboard from './components/dasboard/Dasboard'
import CreateProfile from './components/profile/CreateProfile'
import EditProfile from './components/profile/EditProfile'
import AddExperience from './components/experience/AddExperience'
import AddEducation from './components/education/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile-public/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import CurrentPost from './components/comments/CurrentPost';

// Check token
if(localStorage.jwtToken){
  // set auth token header
  setAuthToken(localStorage.jwtToken)
  // decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and is authenticated
  axios.get('/users/current')
  .then(res => {
    store.dispatch(setCurrentUser(res.data)
  )
  }).catch(err => console.log(err))

  // Check thời hạn token
  const currentTime = Date().now / 1000
  if(decoded.exp < currentTime) {
  // Logout user
  store.dispatch(logoutUser())
  // TODO : Clear current profile
  store.dispatch(clearCurrentProfile())
  // Redirect 
  window.location.href = '/login'
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <div className="container">
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:handle" component={Profile}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dasboard}/>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                <PrivateRoute exact path="/add-education" component={AddEducation}/>
                <PrivateRoute exact path="/feed" component={Posts}/>
                <PrivateRoute exact path="/post/:id" component={CurrentPost}/>
              </Switch>
              <Route exact path="/not-found" component={NotFound}/>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
