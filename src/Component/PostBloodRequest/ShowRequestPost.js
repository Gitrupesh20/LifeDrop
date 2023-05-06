import "./PostReq.css";

export const ShowRequestPost = () => {
  return (
    <>
      <div className="curPost">
        <section className="Donate">
          <span style={{ marginRight: "5px" }}>Quote:</span>{" "}
          <marquee behavior="scroll" direction="left" scrollamount="3">
            {" "}
            "Be a hero, donate blood and save lives. You don't need a cape to be
            a superhero, just a willing heart and a helping hand."
          </marquee>
        </section>
        <hr />
        <section className="postList">
          <p style={{ textAlign: "center" }}>
            BLOOD REQUESTS <hr />
          </p>
          <div className="p_list">
            <div className="singlePost">
              <section id="b_type">AB+</section>
              <section id="b_details">
                Pitampura, Delhi
                <br /> <span>Due: 27/02/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">A+ </section>
              <section id="b_details">
                west delhi, Delhi <br /> <span>Due: 27/01/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">O+</section>
              <section id="b_details">
                North Delhi,Delhi <br /> <span>Due: 11/02/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">B+</section>
              <section id="b_details">
                Pune, Maharashtra <br /> <span>Due: 20/02/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">A-</section>
              <section id="b_details">
                Noida Sec:12, Delhi NCR <br /> <span>Due: 13/01/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">O-</section>
              <section id="b_details">
                Rohini, Delhi <br /> <span>Due: 07/02/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">AB-</section>
              <section id="b_details">
                South Delhi, Delhi <br /> <span>Due: 27/04/2023</span>
              </section>
            </div>
            <div className="singlePost">
              <section id="b_type">AB+</section>
              <section id="b_details">
                Mumbai, Maharashtra <br /> <span>Due: 27/02/2022</span>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
