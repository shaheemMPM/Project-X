// Core Modules
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// Dependancy Modules
import MoonLoader from 'react-spinners/MoonLoader';
// Pages
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import PageNotFound from './pages/404';

class App extends Component {
  
  state = { 
    isLoggedIn: true,
    isLoading: false
  }
  
  render() { 
    let routes;
    if (this.state.isLoggedIn) {
      routes =  (
        <Switch>
          <Route path="/" exact component={Home} />
          <Redirect path="/login" exact to="/" />
          <Redirect path="/signin" exact to="/" />
          <Redirect path="/signup" exact to="/" />
          <Redirect path="/register" exact to="/" />
          <Route path="/" exact component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      );
    } else {
      routes =  (
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signin" exact component={SignIn} />
          <Redirect path="/login" exact to ="/signin" />
          <Route path="/signup" exact component={SignUp} />
          <Redirect path="/register" exact to ="/signup" />
          <Route path="*" component={PageNotFound} />
        </Switch>
      );
    }
    return (    
      <>
      {this.state.isLoading ? 
				<MoonLoader
					css={{ display: "block", margin: "25vh auto", borderColor: "red" }}
					size={150}
					color={"#FF0000"}
					loading={true}
				/>
			: 
				routes
			}
      </>
    );
  }
}
 
export default App;
