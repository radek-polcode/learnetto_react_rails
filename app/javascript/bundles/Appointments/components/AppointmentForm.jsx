import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { validations } from '../utils/validations'
import PropTypes from 'prop-types';
import { FormErrors } from './FormErrors';
import update from 'immutability-helper';

export default class AppointmentForm extends React.Component {
  static propTypes = {
    handleNewAppointment: PropTypes.func
  }

  static formValidations = {
    title: [
      (s) => { return(validations.checkMinLength(s, 3)) }
    ],
    appt_time: [
      (t) => { return(validations.timeShouldBeInTheFuture(t))}
    ]
  }

  constructor (props, railsContext) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: { value: '', valid: false },
      appt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false
    }
  }

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName],
                                 {value: {$set: fieldValue}});
    this.setState(
      {[fieldName]: newFieldState}, 
      () => { this.validateField(fieldName, fieldValue, validations) }
    );
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if(e !== '') {
        errors.push(e)
      }
      return(errors);
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName],
                                {valid: {$set: fieldValid}});

    const newFormErrors = update(this.state.formErrors,
                                 {$merge: {[fieldName]: fieldErrors}})
    this.setState(
      {[fieldName]: newFieldState,
      formErrors: newFormErrors}, 
      this.validateForm
    );
  }

  validateForm() {
    this.setState(
      { formValid: this.state.title.valid &&
                   this.state.appt_time.valid }
    );
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      title: this.state.title.value, 
      appt_time: this.state.appt_time.value
    };

    $.post('/appointments',
            {appointment: appointment})
          .done((data) => {
            this.props.handleNewAppointment(data);
            this.resetFormErrors();
          })
          .fail((response) => {
            this.setState({ formErrors: response.responseJSON });
          });
  }

  resetFormErrors() {
    this.setState({formErrors: {}});
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.handleUserInput(
          fieldName, 
          fieldValue, 
          AppointmentForm.formValidations[fieldName]
        );
  }

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.handleUserInput(
                fieldName, 
                fieldValue,
                AppointmentForm.formValidations[fieldName]
              );
  }

  render() {
    const inputProps = {
      name: 'appt_time'
    };

    return(
      <div>
        <h2>Make a new appointment</h2>
        <FormErrors formErrors={this.state.formErrors} />
        <form onSubmit={this.handleFormSubmit}>
          <input name='title' 
                placeholder='Appointment Title'
                value={this.state.title.value}
                onChange={this.handleChange} />
          <Datetime input={false} 
                    open={true} 
                    inputProps={inputProps}
                    value={moment(this.state.appt_time.value)}
                    onChange={this.setApptTime} />
          <input type='submit' 
                 value='Make Appointment'
                 className='submit-button'
                 disabled={!this.state.formValid} />
        </form>
      </div>
    )
  }
}