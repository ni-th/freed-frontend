import React from 'react';

export const Home = () => {
  return (
    <div className="container-fluid">

      {/* left column sub row 1 */}
      <div
        className="mt-2 d-flex justify-content-center"
        data-aos="zoom-in"
      >
        <div className="home_card">
          <h2 className="text-center mt-4 mb-3 rubik">Clear Documents</h2>
          <div className="card-body">
            <p className="card-text rubik">
              All documents are enhanced and{" "}
              <span className="text-primary">freed.lk</span> should be the best
              one you can find on the internet.
            </p>
          </div>
          <img
            src="img/home/big_img.png"
            className="img-fluid ps-4 pe-2"
            alt="Document Preview"
          />
        </div>
      </div>

      {/* left column sub row 2 */}
      <div
        className="col-xl-6 mt-2 d-flex justify-content-center"
        data-aos="zoom-in"
      >
        <div className="home_card">
          <h2 className="text-center mt-4 mb-3 rubik">Why Choose FreEd.lk?</h2>
          <div className="card-body">
            <p className="card-text rubik">
              Join thousands of students who are taking their education to the
              next level with Freed.lk. Start exploring today and unlock the
              power of free education!
            </p>

            <ul className="text-start">
              <li>
                <span className="text-success">Completely Free</span>: All our
                resources are available at no cost. We are committed to making
                education accessible for all.
              </li>
              <li>
                <span className="text-success">Quality Content</span>: Our
                materials are curated by experienced educators and continuously
                updated to ensure they meet the highest standards.
              </li>
              <li>
                <span className="text-success">User-Friendly</span>: Our
                website is designed to be easy to navigate, so you can find the
                resources you need quickly and efficiently.
              </li>
            </ul>
          </div>
          <img
            src="img/home/hatoff.png"
            className="img-fluid ps-4 pe-2"
            alt="Graduation Illustration"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div
        className="col-xl-6 mt-2 d-flex justify-content-center"
        data-aos="zoom-in"
      >
        <div className="home_card">
          <h2 className="text-center mt-4 mb-3 rubik">Contact Us</h2>
          <div className="card-body">
            <p className="card-text rubik">
              Have questions, feedback, or suggestions? We'd love to hear from
              you! Feel free to reach out to us using the contact information
              provided below:
            </p>

            <ul className="text-start">
              <li>
                <span className="text-success">Email</span>:{" "}
                <a
                  href="mailto:nimantha.bt@gmail.com?subject=Freed Contact&body=This mail is generated using Freed email link."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nimantha.bt@gmail.com
                </a>
              </li>
              <li>
                <span className="text-success">Phone</span>:{" "}
                <a
                  href="https://wa.me/94762642607?text=I'm%20interested%20in%20freed.lk."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +94 76 264 2607
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};