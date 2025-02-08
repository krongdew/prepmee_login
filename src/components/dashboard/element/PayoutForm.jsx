import Link from "next/link";

export default function PayoutForm() {
  return (
    <>
      <form className="form-style1">
        <div className="row">
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Account Name in English
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="English Name"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
              Account Name in Thai
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อไทย"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank Branch
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="สาขา"
              />
            </div>
          </div>
         
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Account Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="12345678"
              />
            </div>
          </div>
       
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-start">
              <Link className="ud-btn btn-thm" href="/contact">
                Save Detail
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
