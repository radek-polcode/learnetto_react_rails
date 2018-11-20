import React from 'react';
import { formatDate } from '../utils/format';
import PropTypes from 'prop-types';

export const Appointment = ({appointment}) =>
  <div className='appointment'>
    <h3>{appointment.title}</h3>
    <p>{formatDate(appointment.appt_time)}</p>
  </div>

Appointment.propTypes = {
  appointment: PropTypes.object.isRequired
}