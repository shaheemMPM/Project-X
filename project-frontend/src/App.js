// Core Modules
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// Dependancy Modules
import MoonLoader from 'react-spinners/MoonLoader';
// Pages
import Landing from './pages/Landing';

class App extends Component {
  
  state = { 
    isLoggedIn: false,
    isLoading: false
  }
  
  render() { 
    let routes;
    if (this.state.isLoggedIn) {
      routes =  (
        <Switch>
          <Route path="/" exact component={Landing} />
        </Switch>
      );
    } else {
      routes =  (
        <Switch>
          <Route path="/" exact component={Landing} />
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
