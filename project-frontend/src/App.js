// Core Modules
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// Dependancy Modules
import MoonLoader from 'react-spinners/MoonLoader';
// Pages
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import CreateClassroom from './pages/CreateClassroom';
import Classroom from './pages/Classroom';
import UploadLecture from './pages/UploadLecture';
import UploadMaterial from './pages/UploadMaterial';
import UploadAssignment from './pages/UploadAssignment';
import Lecture from './pages/Lecture';
import PageNotFound from './pages/404';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    let cachedData = sessionStorage.getItem("auth_data");
		if (!!cachedData && cachedData !== "null") {
      setIsLoading(false);
      setIsLoggedIn(true);
		} else {
      setIsLoading(false);
		}
  }, []);

	const AuthChange = (data) => {
    setIsLoggedIn(true);
    sessionStorage.setItem("auth_data", JSON.stringify(data));
    window.location.pathname = "/";
	};

  let routes;
  if (isLoggedIn) {
    routes =  (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect path="/login" exact to="/" />
        <Redirect path="/signin" exact to="/" />
        <Redirect path="/signup" exact to="/" />
        <Redirect path="/register" exact to="/" />
        <Route path="/class/:id" exact component={Classroom} />
        <Route path="/class/:id/upload-lecture" exact component={UploadLecture} />
        <Route path="/class/:id/upload-material" exact component={UploadMaterial} />
        <Route path="/class/:id/upload-assignment" exact component={UploadAssignment} />
        <Route path="/class/:id/lecture/:lid" exact component={Lecture} />
        <Route path="/create-classroom" exact component={CreateClassroom} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    );
  } else {
    routes =  (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signin" exact component={SignIn} />
        <Redirect path="/login" exact to ="/signin" />
        <Route path="/signup" exact render={(props) => (
            <SignUp {...props} logHandler={AuthChange} />
          )} />
        <Redirect path="/register" exact to ="/signup" />
        <Route path="*" component={PageNotFound} />
      </Switch>
    );
  }
  return (    
    <>
    {isLoading ? 
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
 
export default React.memo(App);
