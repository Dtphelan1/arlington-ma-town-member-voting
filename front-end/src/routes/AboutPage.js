import React from 'react';
import '../styles/about.scss';

function AboutPage() {
  return (
    <section id="about-page" className="container ">
      <div id="intro" className="mb-sm-5">
        <h1 className="d-flex justify-content-center" id="all-about-vote-smart-arlington">
          Vote Smart Arlington
        </h1>
        <p>
          Vote Smart Arlington is an effort to present Arlington, MA town member voting records in a novel and
          accessible way. Our site gives Arlington town residents the ability to select their precinct and view their
          town meeting members' voting history for all of 2020, which we hope will serve as an informational resource as
          we approach the municipal election on April 10, 2021.
        </p>
        <p>
          This project is not affiliated with the town government of Arlington in any way. While some of our data was
          sourced from publicly available data on the town government website (see below), this project and our approach
          to its presentation are purely our own.
        </p>
      </div>

      <div id="meet-the-team-section" className="mb-sm-5">
        <h2 id="meet-the-team">Meet The Team</h2>
        <div className="d-flex justify-content-center row">
          <div id="dylan-bio" className="col-md-4">
            <h3 id="dylan-phelan">Dylan Phelan</h3>
            <p>
              Dylan Phelan is a full-time software engineer at The MITRE Corporation and a part-time Master’s student at
              Tufts University. His work ranges from web development and ETL projects in Healthcare IT, to researching
              the operationalization of Ethics in Software Engineering and the impact of different electoral systems on
              minority representation. Dylan has been an Arlington resident for 5 years and lives in Precinct 9.
            </p>
          </div>
          <div id="graham-bio" className="pl-sm-3 pr-sm-3 col-md-4">
            <h3 id="graham-goudeau">Graham Goudeau</h3>
            <p>
              Graham Goudeau is currently a full-time software engineer at chewy.com. He is primarily interested in
              backend development in distributed microservice topologies, with a special focus on cloud-native
              technologies like service meshes. He has also worked on performance-critical auction logic and site
              reliability for high-traffic web applications. Graham is an Arlington resident and lives in Precinct 11.
            </p>
          </div>
          <div id="matt-bio" className="col-md-4">
            <h3 id="matt-gramigna">Matt Gramigna</h3>
            <p>
              Matt Gramigna is a full-time software engineer at The MITRE Corporation, specializing in open-source
              healthcare software. He enjoys contributing to meaningful web-based projects in his free time, from Vote
              Smart Arlington to web apps for emotion-based movie recommendations. Matt has been a resident of
              Somerville, MA for 2 years.
            </p>
          </div>
        </div>
      </div>

      <div id="faq-section" className="mb-5">
        <h2 id="faq">FAQ</h2>

        <div className="faq-entry">
          <h3 id="how-can-i-contact-the-team">How Can I Contact The Team?</h3>
          <p>All questions, comments, and feedback can be directed to <a href="mailto:contact@votesmartarlington.com">contact@votesmartarlington.com</a>.</p>
        </div>

        <div className="faq-entry">
          <h3 id="where-does-this-data-come-from-">Where Does This Data Come From?</h3>
          <p>This data is combined in a novel way from two sources:</p>
          <ol>
            <li>
              Public voting records on the Arlington town government website:{' '}
              <a href="https://www.arlingtonma.gov/town-governance/town-meeting/2020-town-meeting">
                https://www.arlingtonma.gov/town-governance/town-meeting/2020-town-meeting
              </a>
            </li>
            <li>
              Data (licensed under Creative Commons) available here:{' '}
              <a href="https://menotomymatters.com/">https://menotomymatters.com/</a>
            </li>
          </ol>
          <p>
            Menotomy Matters&#39;s data was accessed directly from the raw sources on GitHub:{' '}
            <a href="https://github.com/ShaneCurcuru/menotomymatters">
              https://github.com/ShaneCurcuru/menotomymatters
            </a>
          </p>
          <p>
            Manual processing was done using small scripts available in our code. See another FAQ for where to find our
            code.
          </p>
        </div>

        <div className="faq-entry">
          <h3 id="where-can-i-see-the-code-running-this-website-">Where Can I See The Code Running This Website?</h3>
          <p>
            Our code and data is available under a copyleft license on GitHub:{' '}
            <a href="https://github.com/Dtphelan1/arlington-ma-town-member-voting">
              https://github.com/Dtphelan1/arlington-ma-town-member-voting
            </a>
          </p>
        </div>

        <div className="faq-entry">
          <h3 id="how-is-this-data-licensed-">How Is This Data Licensed?</h3>
          <p>
            Our data is available under a copyleft license. See our GitHub repository for more detailed information.
          </p>
        </div>

        <div className="faq-entry">
          <h3 id="where-can-i-find-more-information-about-the-april-10-election-">
            Where Can I Find More Information About The April 10 Election?
          </h3>
          <p>
            Find information about Arlington town governance, including elections, here:{' '}
            <a href="https://www.arlingtonma.gov/town-governance/elections-voting">
              https://www.arlingtonma.gov/town-governance/elections-voting
            </a>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
