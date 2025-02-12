export default function HowToBook() {
  return (
    <>
      <div className="row wow fadeInUp" data-wow-delay="300ms">
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-cv" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Pick a tutor</h4>
              <p className="text">
                We have highly qualified tutors in all subjects {" "}
                <br className="d-none d-xxl-block" /> 
              </p>
            </div>
          </div>
        </div>
      
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-secure" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Add balance</h4>
              <p className="text">
              Make sure you have enough balance for the tutor you choose{" "}
                <br className="d-none d-xxl-block" /> 
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-web-design" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Book the schedule</h4>
              <p className="text"> Just click the available slot at your convenient time.

                {" "}
                <br className="d-none d-xxl-block" /> 
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="iconbox-style1 border-less p-0">
            <div className="icon before-none">
              <span className="flaticon-customer-service" />
            </div>
            <div className="details">
              <h4 className="title mt10 mb-3">Still need help?</h4>
              <p className="text">
                Chat with Tutor Admin  {" "}
                <br className="d-none d-xxl-block" /> or Line Official @prepmee
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
