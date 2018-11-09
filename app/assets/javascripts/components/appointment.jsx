var Appointment = createReactClass({
  render: function() {
    return (
      <div key={this.props.appointment.id}>
        <h3>{this.props.appointment.title}</h3>
        <p>{formatDate(this.props.appointment.appt_time)}</p>
      </div>
    )
  }
});