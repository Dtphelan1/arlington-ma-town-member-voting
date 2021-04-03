import React from 'react';
import PrecinctSelect from './PrecinctSelect';

function Splash({ homeCopy, options, setPrecinct }) {
  return (
    <section id="homepage-splash">
      <div id="splash-content" className="d-flex flex-column justify-content-between flex-wrap p-5">
        <div className="pt-5 pb-5">
          <h1>{homeCopy.title}</h1>
          <p>{homeCopy.subtitle}</p>
        </div>
        <div className="pt-5 pb-5">
          <PrecinctSelect options={options} placeholder={homeCopy.inputPlaceholder} setPrecinct={setPrecinct} />
          <a
            href="https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            {homeCopy.inputHelperText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Splash;
