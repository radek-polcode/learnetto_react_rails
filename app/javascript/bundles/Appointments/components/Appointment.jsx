import React from 'react';
import { formatDate } from '../utils/format';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Appointment extends React.Component {
  constructor (props, railsContext) {
    super(props);
    this.state = {
      appointment: props.appointment
    }
  }

  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
    appointment: {}
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({appointment: data})
      })
    }
  }

  render () {
    return (
      <div className='appointment'>
        <Link to={`/appointments/${this.state.appointment.id}`}>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.state.appointment.appt_time)}</p>
      </div>
    )
  }
}