import { useMemo } from 'react';
import _ from 'lodash';
import Select from 'react-select';
import { precinctOptions } from '../helpers/precinctOptions';
const primaryColor = '#d2b33a';
const customSelectStyles = {
  option: (provided, state) => {
    const highlight = state.isFocused || state.isSelected || state.isHovered;
    return {
      ...provided,
      borderRadius: 0,
      ...(highlight && {
        background: `${primaryColor}`
      })
    };
  },
  placeholder: provided => ({
    ...provided,
    fontStyle: 'italic'
  }),
  control: (provided, state) => {
    const highlight = state.isFocused || state.isSelected || state.isHovered;

    return {
      ...provided,
      borderRadius: 0,
      '&:hover': {
        borderColor: `${primaryColor}`
      },
      color: 'white',
      ...(highlight && { boxShadow: `0px 0px 1px 1px ${primaryColor}` })
    };
  }
};

function TableInfoFilters({
  copy,
  copyShareLink,
  precinct,
  onPrecinctChange,
  tmm,
  onTMMChange,
  articleOptions,
  articleFilters,
  onArticleFiltersChange,
  reelectionToggle,
  onReelectionToggleChange
}) {
  return (
    <section id="table-info" className="col-sm-4 col-md-3 pr-3">
      <div id="table-heading" className="mb-3 mt-3 d-flex align-items-center flex-sm-column flex-lg-row flex-row">
        <h1 className="">{precinct ? `${copy.heading} Precinct ${precinct}` : `${copy.heading} All Precincts`}</h1>
        <button className="m-3 btn btn-primary" onClick={copyShareLink}>
          {copy.shareText}
        </button>
      </div>
      <br />
      <h2>{copy.filterTitle}</h2>
      {/* Reelection Toggle */}
      <div className="filter">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            checked={reelectionToggle}
            onChange={onReelectionToggleChange}
            id="reelectionToggle"
          />
          <label className="custom-control-label" htmlFor="reelectionToggle">
            {copy.reelectionToggleLabel}
          </label>
        </div>
      </div>
      {/* Precinct Select */}
      <div className="filter">
        <label>
          {copy.precinctFilterLabel}
          <a
            className="filter-helper-link"
            href={copy.precinctFilterHelperTextLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.precinctFilterHelperText}
          </a>
        </label>
        {useMemo(
          () => (
            <Select
              placeholder="Select Precinct..."
              options={precinctOptions}
              value={precinctOptions.find(precinctOption => precinctOption.value === precinct)}
              onChange={onPrecinctChange}
              styles={{
                ...customSelectStyles,
                menu: provided => ({
                  ...provided,
                  zIndex: 4
                })
              }}
            />
          ),
          [precinct]
        )}
      </div>
      {/* Representative Search */}
      <div className="filter">
        <label htmlFor="tmmSearch">{copy.tmmSearchLabel}</label>
        <input
          type="text"
          className="form-control rounded-0"
          style={{ background: 'white' }}
          value={tmm}
          onChange={onTMMChange}
          id="tmmSearch"
          placeholder={copy.tmmPlaceholder}
        />
      </div>
      {/* Article Select */}
      <div className="filter">
        <label>{copy.articleFilterLabel}</label>
        {useMemo(
          () => (
            <Select
              placeholder="Select Articles..."
              isMulti={true}
              options={articleOptions}
              closeMenuOnSelect={false}
              value={articleFilters.map(cf => articleOptions.find(o => o.value === cf))}
              onChange={onArticleFiltersChange}
              styles={{
                ...customSelectStyles,
                menu: provided => ({
                  ...provided,
                  zIndex: 4
                })
              }}
            />
          ),
          [articleFilters]
        )}
      </div>
    </section>
  );
}

export default TableInfoFilters;
