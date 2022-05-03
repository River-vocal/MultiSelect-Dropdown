import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

const MySelect = props => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={(selected, event) => {
          if (selected !== null && selected.length > 0) {
            let allSubOptions = [props.allOption];
                for (let i = 0; i < props.options.length; i++) {
                    allSubOptions = allSubOptions.concat([...props.options[i].options]);
                }
            if (selected[selected.length - 1].value === props.allOption.value) {                
                return props.onChange(allSubOptions);
            }
            let result = [];
            const containsSelAll = (element) => element.label === "Select all";
            if (selected.length >= props.totOptions) {
              if (selected.some(containsSelAll)) {
                result = selected.filter(
                  option => option.value !== props.allOption.value
                );
              } else if (event.action === "select-option") {
                result = allSubOptions;
              }
              return props.onChange(result);
            }
          }
          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

MySelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  totOptions: PropTypes.number
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};

export default MySelect;
