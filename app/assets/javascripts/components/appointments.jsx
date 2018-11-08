var Appointments = createReactClass({
  render: function() {
    return (
      <div>
        <AppointmentForm />
        <AppointmentsList appointments={this.props.appointments} />
      </div>
    )
  }
});