// edit and create component should share the form component
import React from "react";

function ReservationForm({ formData, handleChange, handleSubmit }) {
    <form name="reservation-create" onSubmit={handleSubmit}>
        <h3>Create Reservation</h3>
        <div className="form-group">
            <label htmlFor="name">First name</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="name">Last name</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="name">Mobile number</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="name">Reservation Date</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="name">Reservation Time</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="name">People</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
        </div>
    </form>
}