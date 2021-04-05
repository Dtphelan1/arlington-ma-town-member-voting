import React from 'react';
import PrecinctSelect from './PrecinctSelect';

function Splash({ homeCopy, precinctOptions, setPrecinct }) {
  return (
    <section id="homepage-splash">
      <div id="splash-content" className="d-flex app-lr-padding pt-lg-4 pt-3 pb-lg-5 pb-3">
        <div className="pt-md-5 pt-sm-3 pt-0 w-100">
          <h1 className="mb-2 mb-md-3">{homeCopy.title}</h1>
          <p className="mb-0 mb-sm-2 mb-md-5">{homeCopy.subtitle}</p>
        </div>
        <div className="pb-lg-5 pb-md-4 pt-sm-3 pb-0">
          <PrecinctSelect
            precinctOptions={precinctOptions}
            placeholder={homeCopy.inputPlaceholder}
            setPrecinct={setPrecinct}
          />
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
