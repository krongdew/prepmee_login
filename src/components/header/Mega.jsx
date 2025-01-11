import Link from "next/link";

export default function Mega({ staticMenuClass }) {
  return (
    <>
      <div id="mega-menu">
        <a
          className={`btn-mega fw500 ${
            staticMenuClass ? staticMenuClass : ""
          } `}
        >
          <span
            className={`pl30 pl10-xl pr5 fz15 vam flaticon-menu ${
              staticMenuClass ? staticMenuClass : ""
            } `}
          />
          Subjects
        </a>
        <ul className="menu ps-0">
        <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-rocket-1" />
              <span className="menu-title"> Science, Biology &amp; Chemistry</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px" }}>
            <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">Science</Link>
                  </li>
                  <li>
                    <Link href="/">Biology</Link>
                  </li>
                  <li>
                    <Link href="/">Chemistry</Link>
                  </li>
                  <li>
                    <Link href="/">Others</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-translator" />
              <span className="menu-title">Languages</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px" }}>
            <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">Thai</Link>
                  </li>
                  <li>
                    <Link href="/">English</Link>
                  </li>
                  <li>
                    <Link href="/">Chinese</Link>
                  </li>
                  <li>
                    <Link href="/">Japanese</Link>
                  </li>
                  <li>
                    <Link href="/">Korean</Link>
                  </li>
                  <li>
                    <Link href="/">French</Link>
                  </li>
                  <li>
                    <Link href="/">German</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-ruler" />
              <span className="menu-title">Math &amp; Physics</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px" }}>
            <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">Math: Primary</Link>
                  </li>
                  <li>
                    <Link href="/">Math: Secondary</Link>
                  </li>
                  <li>
                    <Link href="/">Calculus</Link>
                  </li>
                  <li>
                    <Link href="/">Physics</Link>
                  </li>
                </ul>
              </div>              
            </div>
          </li>
          <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-developer" />
              <span className="menu-title">IT &amp; Coding</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px" }}>
              <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">Website Development</Link>
                  </li>
                  <li>
                    <Link href="/">App Development</Link>
                  </li>
                  <li>
                    <Link href="/">Python</Link>
                  </li>
                  <li>
                    <Link href="/">Video and Animation</Link>
                  </li>
                  <li>
                    <Link href="/">Coding for kids</Link>
                  </li>
                  <li>
                    <Link href="/">Other programmes</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-web-design-1" />
              <span className="menu-title">Art &amp; Craft</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px" }}>
            <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">Drawing and Sketching</Link>
                  </li>
                  <li>
                    <Link href="/">Painting</Link>
                  </li>
                  <li>
                    <Link href="/">Art therapy</Link>
                  </li>
                  <li>
                    <Link href="/">Other Crafts</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          
          <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-microphone" />
              <span className="menu-title">Music</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px" }}>
            <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">Singing</Link>
                  </li>
                  <li>
                    <Link href="/">Guitar</Link>
                  </li>
                  <li>
                    <Link href="/">Piano </Link>
                  </li>
                  <li>
                    <Link href="/">Drum</Link>
                  </li>
                  <li>
                    <Link href="/">Others</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          
          
          <li>
            <a className="dropdown">
              <span className="menu-icn flaticon-goal" />
              <span className="menu-title">Test Prep</span>
            </a>
            <div className="drop-menu d-flex justify-content-between" style={{ maxWidth: "250px"}}>
            <div className="one-third" style={{ width: "100%", padding: "10px" }}>
                <ul className="ps-0 mb40">
                  <li>
                    <Link href="/">A-level</Link>
                  </li>
                  <li>
                    <Link href="/">IELTS</Link>
                  </li>
                  <li>
                    <Link href="/">TOEIC</Link>
                  </li>
                  <li>
                    <Link href="/">TOEFL</Link>
                  </li>
                  <li>
                    <Link href="/">SAT</Link>
                  </li>
                  <li>
                    <Link href="/">GMAT</Link>
                  </li>
                  <li>
                    <Link href="/">GAT-PAT</Link>
                  </li>
                  <li>
                    <Link href="/">IGCSE</Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}