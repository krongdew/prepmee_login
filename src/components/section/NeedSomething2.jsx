import HowToBook from "../element/HowToBook";

export default function NeedSomething2() {
  return (
    <>
  
      <section className="py-12 bg-blue-50 pb90 pb30-md pt10">
        <div className="container wow fadeInUp">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-title">
                <h2>How to book a tutor?</h2>
                <p className="text">
                 Just easy in 3 steps
                </p>
              </div>
            </div>
          </div>
          <HowToBook />
        </div>
      </section>
    </>
  );
}
