import React from 'react';
import '../styles/about.scss';

const aboutPageCopy = {
  introHeading: 'Vote Smart Arlington',
  introContent: [
    `Vote Smart Arlington is an effort to present Arlington, MA town member voting records in a novel and
    accessible way. Our site gives Arlington town residents the ability to select their precinct and view their
    town meeting members' voting history for all of 2020, which we hope will serve as an informational resource as
    we approach the municipal election on April 10, 2021.`,
    `This project is not affiliated with the town government of Arlington in any way. While some of our data was
    sourced from publicly available data on the town government website (see below), this project and our approach
    to its presentation are purely our own.`
  ],
  teamHeading: 'Meet The Team',
  team: [
    {
      name: 'Dylan Phelan',
      bio: `Dylan Phelan is a full-time software engineer at The MITRE Corporation and a part-time Master’s student at
      Tufts University. His work ranges from web development and ETL projects in Healthcare IT, to researching
      the operationalization of Ethics in Software Engineering and the impact of different electoral systems on
      minority representation. Dylan has been an Arlington resident for 5 years and lives in Precinct 9.
`
    },
    {
      name: 'Graham Goudeau',
      bio: `Graham Goudeau is currently a full-time software engineer at chewy.com. He is primarily interested in
      backend development in distributed microservice topologies, with a special focus on cloud-native
      technologies like service meshes. He has also worked on performance-critical auction logic and site
      reliability for high-traffic web applications. Graham is an Arlington resident and lives in Precinct 11.
`
    },
    {
      name: 'Matt Gramigna',
      bio: `Matt Gramigna is a full-time software engineer at The MITRE Corporation, specializing in open-source
      healthcare software. He enjoys contributing to meaningful web-based projects in his free time, from Vote
      Smart Arlington to web apps for emotion-based movie recommendations. Matt has been a resident of
      Somerville, MA for 2 years.
`
    }
  ]
};

function AboutPage() {
  return (
    <section id="about-page" className="container app-lr-padding">
      <div id="intro" className="mb-sm-5">
        <h1 className="d-flex justify-content-center" id="all-about-vote-smart-arlington">
          {aboutPageCopy.introHeading}
        </h1>
        {aboutPageCopy.introContent.map(para => (
          <p>{para}</p>
        ))}
      </div>

      <div id="meet-the-team-section" className="mb-sm-5">
        <h2 id="meet-the-team">{aboutPageCopy.teamHeading}</h2>
        <div className="d-flex justify-content-center row">
          {aboutPageCopy.team.map(member => (
            <div className="col-md-4">
              <h3>{member.name}</h3>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="faq-section" className="mb-5">
        <h2 id="faq">FAQ</h2>

        <div className="faq-entry">
          <h3 id="how-can-i-contact-the-team">How Can I Contact The Team?</h3>
          <p>
            All questions, comments, and feedback can be directed to{' '}
            <a href="mailto:contact@votesmartarlington.com">contact@votesmartarlington.com</a>.
          </p>
        </div>

        <div className="faq-entry">
          <h3 id="where-does-this-data-come-from-">Where Does This Data Come From?</h3>
          <p>This website presents data from three main sources:</p>
          <ol>
            <li>
              Public voting records on the Arlington town government website:{' '}
              <a href="https://www.arlingtonma.gov/town-governance/town-meeting/2020-town-meeting">
                https://www.arlingtonma.gov/town-governance/town-meeting/2020-town-meeting
              </a>
            </li>
            <li>
              Candidates who are up for Arlington Town Meeting Member election in 2021:{' '}
              <a href="https://www.arlingtonma.gov/home/showpublisheddocument?id=55221">
                https://www.arlingtonma.gov/home/showpublisheddocument?id=55221
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
          <h3 id="where-can-i-see-the-code-running-this-website-">
            What About The Other Elected Positions (e.g The Select Board)?
          </h3>
          <p>
            Currently, this site only provides insight into the voting history of Arlington Town Meeting Members. The
            team is hopeful that, for future elections, we will be able to present information about a variety of
            elected seats. In the meantime, we encourage you to survey the Arlington town government website for more
            information:{' '}
            <a href="https://www.arlingtonma.gov/town-governance/">https://www.arlingtonma.gov/town-governance/</a>
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

        <div className="faq-entry">
          <h3 id="where-can-i-see-the-code-running-this-website-">Where Can I See The Code Running This Website?</h3>
          <p>
            Our code and data are available licensed under the GNU General Public License v3.0 on GitHub:{' '}
            <a href="https://github.com/Dtphelan1/arlington-ma-town-member-voting">
              https://github.com/Dtphelan1/arlington-ma-town-member-voting
            </a>
          </p>
        </div>

        <div className="faq-entry">
          <h3 id="is-vote-smart-arlington-collecting-information-about-me">
            Is Vote Smart Arlington collecting information about me?
          </h3>
          <p>
            We do not use any third-party trackers (Google, Facebook, etc.), advertising technology, or cookies. We
            collect some basic usage stats about which pages are accessed and how often, but this is not
            personally-identifying information. Our open-source code on GitHub will be the source of truth for exactly
            which anonymized metrics are recorded, but we will never track user behavior beyond that.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
