class Appointments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: 'Team standup meeting',
      appt_time: '25 January 2016 9am'
    }
  }

  handleUserInput(obj) {
    this.setState(obj);
  }

  handleFormSubmit() {
    var appointment = {
                        title: this.state.title,
                        appt_time: this.state.appt_time
                      };
    $.post(
            '/appointments',
            { appointment: appointment }
          ).done(function(data) {
            this.addNewAppointment(data);
          }.bind(this));
  }
  addNewAppointment() {
    var appointments = React.addons.update(
                                      this.state.appointments,
                                      { $push: [appointments] }
                                    )
    this.setState({
      appointments: appointments.sort(function(a,b) {
        return new Date(a.appt_time) - new Date(b.appt_time)
      })
    })
  }

  render() {
    return(
      <div>
        <AppointmentForm input_title={this.state.title}
                         input_appt_time={this.state.appt_time}
                         onUserInput={this.handleUserInput.bind(this)}
                         onFormSubmit={this.handleFormSubmit} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}