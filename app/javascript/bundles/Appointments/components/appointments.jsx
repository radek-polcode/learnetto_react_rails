import React from 'react';
import ReactDOM from 'react-dom';
import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';
import update from 'immutability-helper';
import { FormErrors } from './FormErrors';

export default class Appointments extends React.Component {
  constructor (props, railsContext) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: 'Team standup meeting',
      appt_time: '25 January 2016 9am',
      formErrors: {}
    }
  }

  handleUserInput (obj) {
    this.setState(obj);
  }

  handleFormSubmit () {
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};
    $.post('/appointments',
            {appointment: appointment})
          .done((data) => {
            this.addNewAppointment(data);
            this.resetFormErrors();
          })
          .fail((response) => {
            this.setState({ formErrors: response.responseJSON });
          });
  }

  resetFormErrors() {
    this.setState({formErrors: {}});
  }

  addNewAppointment (appointment) {
    const appointments = update(this.state.appointments, { $push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  }

  render () {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm input_title={this.state.title}
          input_appt_time={this.state.appt_time}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}