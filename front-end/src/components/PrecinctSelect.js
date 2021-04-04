import Select from 'react-select';
// import variables from '../styles/_variables.scss';

const primaryColor = '#d2b33a';
const customSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    margin: '10px 0 10px 0',
    maxWidth: 300
  }),
  menuList: (provided, state) => {
    return {
      ...provided,
      background: 'rgba(1, 1, 1, 0.8)'
    };
  },
  option: (provided, state) => {
    const highlight = state.isFocused || state.isSelected || state.isHovered;
    return {
      ...provided,
      background: `${highlight ? 'rgba(0,0,0,0.2)' : ''}`,
      borderRadius: 0,
      '&:hover': {
        background: `rgba(0,0,0,0.2)`
      }
    };
  },
  placeholder: provided => ({
    ...provided,
    fontStyle: 'italic'
  }),
  singleValue: () => ({
    color: 'white'
  }),
  control: (provided, state) => {
    const highlight = state.isFocused || state.isSelected || state.isHovered;

    return {
      ...provided,
      background: 'rgba(0,0,0,0.2)',
      borderColor: `${highlight ? primaryColor : 'grey'}`,
      borderRadius: 0,
      '&:hover': {
        borderColor: `${primaryColor}`
      },
      color: 'white',
      ...(highlight && { boxShadow: `0px 0px 1px 1px ${primaryColor}` }),
      maxWidth: 300
    };
  }
};

function onSelectChange(setStateFn) {
  return (option, { action }) => {
    switch (action) {
      case 'select-option':
        setStateFn(option);
        break;
      case 'deselect-option':
        setStateFn(null);
        break;
      case 'remove-value':
        setStateFn(null);
        break;
      case 'pop-value':
        setStateFn(null);
        break;
      case 'set-value':
        setStateFn(option);
        break;
      case 'clear':
        setStateFn(null);
        break;
      case 'create-option':
        console.error('`create-option` action type not supported');
        break;
      default:
        console.error('unexpected selectChange action: ', action);
        break;
    }
  };
}

function PrecinctSelect({ precinctOptions, setPrecinct, placeholder }) {
  return (
    <Select
      styles={customSelectStyles}
      options={precinctOptions}
      placeholder={placeholder}
      onChange={onSelectChange(setPrecinct)}
    />
  );
}

export default PrecinctSelect;
