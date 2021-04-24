// Core Componets
import { useState } from 'react';
// Styles
import '../public/SignIn/vendor/bootstrap/css/bootstrap.min.css';
import '../public/SignIn/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../public/SignIn/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import '../public/SignIn/fonts/iconic/css/material-design-iconic-font.min.css';
import '../public/SignIn/vendor/animate/animate.css';
import '../public/SignIn/vendor/css-hamburgers/hamburgers.min.css';
import '../public/SignIn/vendor/animsition/css/animsition.min.css';
import '../public/SignIn/vendor/select2/select2.min.css';
import '../public/SignIn/vendor/daterangepicker/daterangepicker.css';
import '../public/SignIn/css/util.css';
import '../public/SignIn/css/main.css';
// Images
import BgImage from '../public/SignIn/images/bg-01.jpg';
// Dependancy Modules
import MoonLoader from "react-spinners/MoonLoader";
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SingUp = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isTermsRead, setIsTermsRead] = useState(false);

    const SignupHandler = () => {
        if (!name || !userName || !email || !password || !repeatPassword) {
            swal("", "Fill all the field", "info");
            return;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email) ) {
            swal("", "Enter Valid Email Id", "warning");
            return;
        }
        if (password !== repeatPassword) {
            swal("", "passwords should be same", "warning");
            return;
        }
        if (password.length < 6) {
            swal("", "Password should be minimum 6 character long", "warning");
            return;
        }
        if (!isTermsRead) {
            swal("", "Agree to the terms of user", "error");
            return;
        }

        setIsLoading(true);
        const POST_URL = 'http://localhost:8000/api/v1/user/signup';
        axios.post(POST_URL, {
            "name": name,
            "username": userName,
            "email": email,
            "password": password
        }).then((response) => {
            props.logHandler(response.data.token);    
        }).catch((error) => {
            swal("Error", error.response.data.message, "error").then(() => {
                setIsLoading(false);
            });
        });
    }

    let content;
    if (isLoading) {
        content = (
            <MoonLoader
                css={{display: 'block', margin: '25vh auto',borderColor: 'red'}}
                size={150}
                color={"#FF0000"}
                loading={true} />
        );
    } else {
        content = (
            <div className="limiter">
                <div className="container-login100">

                    <div className="login100-more" style={{backgroundImage: `url(${BgImage})`}}></div>

                    <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-59">
                                Sign Up
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Name is required">
                                <span className="label-input100">Full Name</span>
                                <input className="input100" type="text" name="name" placeholder="Name..." onChange={(e) => {setName(e.target.value)}} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <span className="label-input100">Email</span>
                                <input className="input100" type="text" name="email" placeholder="Email addess..." onChange={(e) => {setEmail(e.target.value)}} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Username is required">
                                <span className="label-input100">Username</span>
                                <input className="input100" type="text" name="username" placeholder="Username..." onChange={(e) => {setUserName(e.target.value)}} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="password" name="pass" placeholder="*************" onChange={(e) => {setPassword(e.target.value)}} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Repeat Password is required">
                                <span className="label-input100">Repeat Password</span>
                                <input className="input100" type="password" name="repeat-pass" placeholder="*************" onChange={(e) => {setRepeatPassword(e.target.value)}} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="flex-m w-full p-b-33">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="terms" onChange={(e) => {setIsTermsRead(e.target.checked)}} />
                                    <label className="label-checkbox100" htmlFor="ckb1">
                                        <span className="txt1">
                                            I agree to the
                                            <a href="/#" className="txt2 hov1">
                                                Terms of User
                                            </a>
                                        </span>
                                    </label>
                                </div> 
                            </div>

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn signin-button" onClick={SignupHandler}>
                                        Sign Up
                                    </button>
                                </div>

                                <Link to="/signin" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                                    Sign in
                                    <i className="fa fa-long-arrow-right m-l-5"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

    return content;
}

export default SingUp;