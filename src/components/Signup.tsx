import React, { useState } from "react";
import ConnectLogo from "./ConnectLogo";
import { supabase } from "../lib/supabase";

function Signup() {

  const [formData, setFormData] = useState({
    fullName: "",
    studentID: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setIsSubmitting(true);

    const payload = {
      name: formData.fullName,
      studentId: formData.studentID ? Number(formData.studentID) : null,
      schoolEmail: formData.email,
      username: formData.email ? formData.email.split("@")[0] : null,
      password: formData.password,
    };

    const { error } = await supabase.from("Student").insert(payload);

    if (error) {
      setStatusMessage(`Signup failed: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    setStatusMessage("Signup successful. You can login now.");
    setFormData({
      fullName: "",
      studentID: "",
      email: "",
      password: ""
    });
    setIsSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card p-4 shadow auth-card">
            <ConnectLogo className="mb-4" />
            <h3 className="text-center mb-4">Student Signup</h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="studentID" className="form-label">
                  Student ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentID"
                  name="studentID"
                  placeholder="Enter your student ID"
                  value={formData.studentID}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                Sign Up
              </button>
              {statusMessage ? (
                <p className="text-center mt-3 mb-1">{statusMessage}</p>
              ) : null}
              <p className="text-end mt-3 mb-1">
                Already have an account? <a href="#login">Login</a>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
