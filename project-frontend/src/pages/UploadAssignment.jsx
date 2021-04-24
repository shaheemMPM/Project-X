// Components
import Nav from '../core/components/UploadItem/nav';
// import style
import '../public/UploadItem/main.css';

function getNow () {
  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, -1);
}

const UploadAssignment = () => {
  return (
    <>
      <Nav />
      <div className="upload-lecture">
        <h1 className="upload-header">Post Assignment</h1>

        <form className="login100-form ">

          <div className="wrap-input100">
            <span className="label-input100">Title</span>
            <input className="input100" type="text" name="name" placeholder="Title..." />
            <span className="focus-input100"></span>
          </div>

          <div className="ip-bouded">
            <div className="ip-outer chapter-outer">
              <div className="wrap-input100">
                <span className="label-input100">Chapter</span>
                <input className="input100" type="text" name="username" placeholder="Chapter Name..." />
                <span className="focus-input100"></span>
              </div>
            </div>
            <div className="ip-outer mark-outer">
              <div className="wrap-input100">
                <span className="label-input100">Mark</span>
                <input className="input100" type="text" name="username" placeholder="Total Mark..." />
                <span className="focus-input100"></span>
              </div>
            </div>
          </div>

          <div className="wrap-input100">
            <span className="label-input100">Description</span>
            <textarea className="input100 desc-textarea" placeholder="Description..."></textarea>
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-input100">
            <span className="label-input100">Due Date</span>
            <input className="input100" type="datetime-local" name="duedate" value={getNow()} />
            <span className="focus-input100"></span>
          </div>

          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn upload-button">
                    Upload
                </button>
            </div>
          </div>

        </form>
        
      </div>
    </>
  );
}

export default UploadAssignment;