import React, { useMemo, useState } from 'react';
import qs from 'qs';
import _ from 'lodash';
import Select from 'react-select';
import { useHistory, useLocation } from 'react-router';
import { precinctOptions } from '../helpers/precinctOptions';
import VotingHistoryTable from './VotingHistoryTable';
import '../styles/dataDisplay.scss';

const dataDisplayCopy = {
  heading: '2020 Votes for Town Meeting Members in Precinct ',
  selectPrecinctPrompt: 'Select a precinct to get started',
  headingSansPrecinct: 'Select a Precinct to See 2020 Voting Data',
  filterTitle: 'Filter Voting Data',
  articleFilterLabel: 'Filter Articles',
  articlePlaceholder: 'Articles',
  precinctFilterLabel: 'Precinct Selected',
  precinctFilterHelperText: "Don't know your precinct?",
  precinctFilterHelperTextLink: 'https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx',
  reelectionToggleLabel: 'Highlight Candidates Running for Reelection',
  shareText: 'Share'
  // memberFilterLabel: ''
};

function DataDisplay({ data }) {
  // Props management and methods for articleFilters
  // Parse article options from the list of all votingHistories
  const articleOptions = useMemo(
    () =>
      _(data)
        .flatMap(d => d.votes)
        .map(v => ({ value: v.article.id, label: v.article.title }))
        .uniqBy('value')
        .value(),
    [data]
  );
  const getArticleFiltersProp = () => {
    return articleFilters.map(aid => articleOptions.find(o => o.value === aid));
  };

  // Query Param data and methods
  const history = useHistory();
  const location = useLocation();
  const searchParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const pathname = location.pathname;
  // Generic function for pushing new queryParameters to the browser history
  function pushNewQueryParams(newParams) {
    history.push({
      pathname,
      search: qs.stringify({
        ...searchParams,
        ...newParams
      })
    });
  }
  // Precinct information
  const precinct = searchParams.precinct ? searchParams.precinct : '';
  const pushPrecinctToHistory = precinct => {
    const articleParams = {
      precinct: precinct.value
    };
    pushNewQueryParams(articleParams);
  };
  // Article Filters
  const articleFilters = searchParams.articles ? searchParams.articles.split(',') : [];
  const pushArticleFiltersToHistory = articleFilters => {
    const articleParams = {
      articles: articleFilters.map(c => c.value).join(',')
    };
    pushNewQueryParams(articleParams);
  };

  // Toggle to show re-election candidates only
  const reelectionToggle = searchParams.onlyReelection ? searchParams.onlyReelection === 'true' : false;
  const pushReelectionToggleToHistory = () => {
    const reelectionParams = {
      onlyReelection: !reelectionToggle
    };

    pushNewQueryParams(reelectionParams);
  };

  // State and methods for managing share-link alerts
  const [showAlert, setShowAlert] = useState(false);
  const copyShareLink = async () => {
    // 'localhost' doesn't work in bitly
    const longUrl = `${
      window.location.hostname === 'localhost' ? `http://127.0.0.1:3000/${window.location.hash}` : window.location.href
    }`;

    const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

    const response = await fetch(`${apiURL}/share`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl
      })
    });

    const { link } = await response.json();
    navigator.clipboard.writeText(link);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  let tableContent = (
    <VotingHistoryTable
      data={data}
      articleFilters={getArticleFiltersProp()}
      reelectionToggle={reelectionToggle}
      articles={articleOptions}
    />
  );
  if (data.length === 0) {
    tableContent = (
      <div className="d-flex flex-wrap align-content-center justify-content-center" id="select-precinct-prompt">
        <div style={{ minHeight: '100%' }}>
          <h3 style={{}}>{dataDisplayCopy.selectPrecinctPrompt}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid app-lr-padding pr-0" id="data-display-container">
      {showAlert && (
        <div className="row no-gutters">
          <div className="col-sm-12 ">
            <div className="alert alert-primary" role="alert">
              Link copied to clipboard
            </div>
          </div>
        </div>
      )}
      <div className="row no-gutters">
        <section id="table-info" className="col-sm-4 col-md-3 pr-3">
          <div id="table-heading" className="mb-3 mt-3">
            <h1>{precinct ? dataDisplayCopy.heading + precinct : dataDisplayCopy.headingSansPrecinct}</h1>
            <button className="btn btn-primary" onClick={copyShareLink}>
              {dataDisplayCopy.shareText}
            </button>
          </div>
          <br />
          <h2>{dataDisplayCopy.filterTitle}</h2>
          {/* Reelection Toggle */}
          <div className="filter">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                checked={reelectionToggle}
                onChange={pushReelectionToggleToHistory}
                id="customSwitch1"
              />
              <label className="custom-control-label" htmlFor="customSwitch1">
                {dataDisplayCopy.reelectionToggleLabel}
              </label>
            </div>
          </div>
          {/* Precinct Select */}
          <div className="filter">
            <label>
              {dataDisplayCopy.precinctFilterLabel}
              <a
                className="filter-helper-link"
                href={dataDisplayCopy.precinctFilterHelperTextLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dataDisplayCopy.precinctFilterHelperText}
              </a>
            </label>
            <Select
              placeholder="Select Precinct..."
              options={precinctOptions}
              value={precinctOptions.find(precinctOption => precinctOption.value === precinct)}
              onChange={pushPrecinctToHistory}
              styles={{
                menu: provided => ({
                  ...provided,
                  zIndex: 4
                })
              }}
            />
          </div>
          {/* Article Select */}
          <div className="filter">
            <label>{dataDisplayCopy.articleFilterLabel}</label>
            <Select
              placeholder="Select Articles..."
              isMulti={true}
              options={articleOptions}
              closeMenuOnSelect={false}
              value={articleFilters.map(cf => articleOptions.find(o => o.value === cf))}
              onChange={pushArticleFiltersToHistory}
              styles={{
                menu: provided => ({
                  ...provided,
                  zIndex: 4
                })
              }}
            />
          </div>
        </section>
        <div className="col-sm-8 col-md-9 table-wrapper">{tableContent}</div>
      </div>
    </div>
  );
}

export default DataDisplay;
