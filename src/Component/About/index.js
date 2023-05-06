import React from "react";
import { Contact } from "../HomePage";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import "./About.css";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export default function About() {
  return (
    <>
      <div className="aboutImg">
        <div
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/assets/about.png"
            })`,
          }}
        ></div>
      </div>
      <div className="about">
        <div>
          <span className="aboutTag">Who Are We?</span>
          <section id="subTag">
            We are a group of software developers who are passionate about using
            technology to make a positive impact on society. Our latest project
            is a website for blood donation, which aims to increase awareness
            about the importance of donating blood and make it easier for people
            to donate. Our website uses the latest web technologies, including
            HTML, CSS, JavaScript, and AI, to provide a user-friendly and secure
            platform for blood donors and recipients. We believe that our
            website has the potential to save lives and make a real difference
            in the world. We are committed to continuously improving our website
            and using technology to help solve some of the world's most pressing
            problems.
          </section>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Card
              sx={{ width: 275, backgroundColor: "#c6414c", marginTop: "50px" }}
            >
              <CardContent>
                <img
                  className="WAWimg"
                  src={process.env.PUBLIC_URL + "/assets/mission.png"}
                  alt="mission"
                />
                <h2>MISSION</h2>
                <p>
                  Our mission as a group of software developers is to use our
                  skills and expertise to make a positive impact on society. We
                  believe that everyone should have access to safe and
                  sufficient blood, and that technology can play a key role in
                  achieving this goal. Our website for blood donation is
                  designed to make it easier for people to donate blood and save
                  lives.
                </p>
              </CardContent>
            </Card>
            <Card
              sx={{ width: 275, backgroundColor: "#c6414c", marginTop: "50px" }}
            >
              <CardContent>
                <img
                  className="WAWimg"
                  src={process.env.PUBLIC_URL + "/assets/vision.png"}
                  alt="mission"
                />
                <h2>VISION</h2>
                <p>
                  Our vision as a group of software developers is to create a
                  world where everyone has access to safe and sufficient blood.
                  We believe that technology can play a key role in achieving
                  this vision, and our website for blood donation is just the
                  beginning. Our vision uses the latest web technologies to
                  create a platform that connects blood donors and recipients in
                  real-time.
                </p>
              </CardContent>
            </Card>
          </Grid>
        </div>

        <hr />

        <div>
          <span className="aboutTag">Why We?</span>
          <div className="cardholder">
            <div className="card">
              <img
                id="search"
                src={process.env.PUBLIC_URL + "/assets/WYW4.png"}
                alt="Geo-Location"
              />
              <section>
                <h4>Geo-Location Search</h4>
                geo-location search to a blood donation app can provide benefits
                such as efficient matching, increased availability, improved
                accuracy, real-time tracking, and improved user experience.
              </section>
            </div>

            <div className="card">
              <img
                id="search"
                src={process.env.PUBLIC_URL + "/assets/WYW2.png"}
                alt="Geo-Location"
              />
              <section>
                <h4>Real Time Connect</h4>
                Real-time connect functionality for a blood donation app can
                provide benefits such as faster response times, improved
                communication between donors and recipients, increased
                efficiency, and the ability to respond quickly to emergencies.
              </section>
            </div>

            <div className="card">
              <img
                id="search"
                src={process.env.PUBLIC_URL + "/assets/WYW1.png"}
                alt="Geo-Location"
              />
              <section>
                <h4>Notification</h4>
                notification functionality to a blood donation app can provide
                benefits such as reminding donors to donate blood, notifying
                donors of urgent blood needs, increasing donor engagement and
                retention, and improving communication between donors and
                recipients.
              </section>
            </div>
            <div className="card">
              <img
                id="search"
                src={process.env.PUBLIC_URL + "/assets/WYW3.png"}
                alt="Geo-Location"
              />
              <section>
                <h4>User Friendly</h4>a user-friendly blood donation app can
                provide benefits such as improving user engagement, increasing
                the number of donors and recipients, improving overall
                satisfaction with the app, and making it easier for users to
                find and connect with each other
              </section>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* <hr /> */}
        <br />
        <br />
        <br />
        <div>
          <span className="aboutTag" style={{ letterSpacing: "2px" }}>
            OUR TEAM
          </span>
          <div className="cardholder">
            <div className="member">
              <div
                className="image"
                style={{
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.041), rgba(23, 85, 177, 0.233), rgba(241, 85, 228, 0.342)), url(${
                    process.env.PUBLIC_URL + "/assets/team/abhinav.jpg"
                  })`,
                }}
              >
                {/* <h3>Developer</h3> */}
              </div>
              <section className="member-details">
                <span>Abhinav Singh</span>
                <p>Student</p>
                <section id="link">
                  <a
                    href="https://www.linkedin.com/in/singhsaab62220"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="https://github.com/singhsaab62220"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </section>
              </section>
            </div>

            <div className="member">
              <div
                className="image"
                style={{
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.041), rgba(23, 85, 177, 0.233), rgba(241, 85, 228, 0.342)), url(${
                    process.env.PUBLIC_URL + "/assets/team/rupesh.jpg"
                  })`,
                }}
              >
                {/* <h3>Developer</h3> */}
              </div>
              <section className="member-details">
                <span>Rupesh Kr Sharma</span>
                <p>Student</p>
                <section id="link">
                  <a
                    href="https://www.linkedin.com/in/rupesh-sharma-a22905211"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="https://github.com/Gitrupesh20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </section>
              </section>
            </div>

            <div className="member">
              <div
                className="image"
                style={{
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.041), rgba(23, 85, 177, 0.233), rgba(241, 85, 228, 0.342)), url(${
                    process.env.PUBLIC_URL + "/assets/team/kishan1.jpg"
                  })`,
                }}
              >
                {/* <h3>Developer</h3> */}
              </div>
              <section className="member-details">
                <span>Kishan Kr Tiwari</span>
                <p>Student</p>
                <section id="link">
                  <a
                    href="https://www.linkedin.com/in/kishan-kumar-tiwari-02ba25229"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="https://github.com/kishankumartiwar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </section>
              </section>
            </div>

            <div className="member">
              <div
                className="image"
                style={{
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.041), rgba(23, 85, 177, 0.233), rgba(241, 85, 228, 0.342)), url(${
                    process.env.PUBLIC_URL + "/assets/team/roshan.jpg"
                  })`,
                }}
              >
                {/* <h3>Developer</h3> */}
              </div>
              <section className="member-details">
                <span>Roshan Singh Rajput</span>
                <p>Student</p>
                <section id="link">
                  <a
                    href="https://www.linkedin.com/in/roshan-singh-873a53237"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="https://github.com/voidnull69"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}
