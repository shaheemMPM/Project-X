// Components
import Nav from '../core/components/UploadItem/nav';
// import style
import '../public/UploadItem/main.css';

const CreateClassroom = () => {
  return (
    <>
      <Nav />
      <div className="upload-lecture">
        <h1 className="upload-header">Create Classroom</h1>

        <form className="login100-form ">

          <div className="wrap-input100">
            <span className="label-input100">Title</span>
            <input className="input100" type="text" name="name" placeholder="Title..." />
            <span className="focus-input100"></span>
          </div>

          <div className="ip-bouded">
            <div className="ip-outer chapter-outer">
              <div className="wrap-input100">
                <span className="label-input100">Sub Title</span>
                <input className="input100" type="text" name="subtitle" placeholder="Sub Title..." />
                <span className="focus-input100"></span>
              </div>
            </div>
            <div className="ip-outer mark-outer">
              <div className="wrap-input100">
                <span className="label-input100">Credit</span>
                <input className="input100" type="text" name="credit" placeholder="Classroom Credit..." />
                <span className="focus-input100"></span>
              </div>
            </div>
          </div>

          <div className="wrap-input100">
            <span className="label-input100">Description</span>
            <textarea className="input100 desc-textarea" name="description" placeholder="Description..."></textarea>
            <span className="focus-input100"></span>
          </div>

          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn upload-button">
                    Create Classroom
                </button>
            </div>
          </div>

        </form>
        
      </div>
    </>
  );
}

export default CreateClassroom;