import React from "react"
import PropTypes from "prop-types"
class Label extends React.Component {
  render () {
    return (
      <React.Fragment>
        Label: {this.props.label}
      </React.Fragment>
    );
  }
}

Label.propTypes = {
  label: PropTypes.string
};
export default Label
