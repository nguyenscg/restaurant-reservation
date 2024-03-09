// edit and create component should share the form component
import React from "react";

function ReservationForm({ formData, handleChange, handleSubmit }) {
    // return a form with text input for: first name, last name, mobile number, reservation date, reservation time, and people
    return (
        <form name="reservation-create" onSubmit={handleSubmit}>
            <h3>Create Reservation</h3>
            <div className="form-group">
                <label htmlFor="name">First Name:</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={formData.first_name}
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="name">Last Name:</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={formData.last_name}
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number:</label>
                    <input
                        id="mobile_number"
                        name="mobile_number"
                        type="text"
                        value={formData.mobile_number}
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date">Reservation Date:</label>
                    <input
                        id="reservation_date"
                        name="reservation_date"
                        type="date"
                        value={formData.reservation_time}
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_time">Reservation Time:</label>
                    <input
                        id="reservation_time"
                        name="reservation_time"
                        type="time"
                        value={formData.reservation_time}
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="people">Number of People:</label>
                    <input
                        id="people"
                        name="people"
                        type="number"
                        value={formData.people}
                        required
                        onChange={handleChange}
                        className="form-control"
                    />
            </div>
        </form>
    );
}

export default ReservationForm;