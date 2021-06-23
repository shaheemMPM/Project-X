// Components
import Nav from "../core/components/UploadItem/nav";
// import style
import "../public/UploadItem/main.css";

const UploadMaterial = () => {
  return (
    <>
      <Nav />
      <div className="upload-lecture">
        <h1 className="upload-header">Upload Material</h1>

        <form className="login100-form ">
          <div className="wrap-input100">
            <span className="label-input100">Title</span>
            <input
              className="input100"
              type="text"
              name="name"
              placeholder="Title..."
            />
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-input100">
            <span className="label-input100">Chapter</span>
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="Chapter Name..."
            />
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-input100">
            <span className="label-input100">Description</span>
            <textarea
              className="input100 desc-textarea"
              placeholder="Description..."
            ></textarea>
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-input100 select-file">
            <span className="label-input100 select-file-label">
              Select File
            </span>
            <input className="input100" type="file" name="repeat-pass" />
            <small className="footnote">
              Only select <span>.pdf/.pptx</span> files
            </small>
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
};

export default UploadMaterial;
