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
import BgImage from '../public/SignIn/images/bg-02.jpg';

function Login() {
    return (
        <div className="limiter">
            <div className="container-login100">

                <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-59">
                            Sign In
                        </span>

                        

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" name="email" placeholder="Email addess..." />
                            <span className="focus-input100"></span>
                        </div>

                        

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="text" name="pass" placeholder="*************" />
                            <span className="focus-input100"></span>
                        </div>

                       

                        <div className="container-login100-form-btn">
                            <a href="/#" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                                <i className="fa fa-long-arrow-left m-l-5"></i> Sign Up
                            </a>

                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn signin-button">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="login100-more" style={{backgroundImage: `url(${BgImage})`}}></div>
                
            </div>
        </div>
    );
}

export default Login;