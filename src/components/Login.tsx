import { useState } from "react";
import ConnectLogo from "./ConnectLogo";
import { supabase } from "../lib/supabase";

type StudentProfile = {
    id: number;
    name: string | null;
    schoolEmail: string | null;
    username: string | null;
    studentId: number | null;
};

type LoginProps = {
    onLoginSuccess: (student: StudentProfile) => void;
};

function Login({ onLoginSuccess }: LoginProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatusMessage("");
        setIsSubmitting(true);

        const { data, error } = await supabase
            .from("Student")
            .select("id, name, schoolEmail, username, studentId")
            .eq("schoolEmail", formData.email)
            .eq("password", formData.password)
            .limit(1);

        if (error) {
            setStatusMessage(`Login failed: ${error.message}`);
            setIsSubmitting(false);
            return;
        }

        if (!data || data.length === 0) {
            setStatusMessage("Invalid email or password.");
            setIsSubmitting(false);
            return;
        }

        const student = data[0] as StudentProfile;
        setStatusMessage("Login successful.");
        onLoginSuccess(student);
        setIsSubmitting(false);
        window.location.hash = "#home";
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-4 shadow auth-card">
                        <ConnectLogo className="mb-4" />

                        <h3 className="text-center mb-4">Student Login</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="loginEmail"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div className="text-end mt-1">
                                    <a href="#forgot-password">Forgot password?</a>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                Log In
                            </button>
                            {statusMessage ? (
                                <p className="text-center mt-3 mb-1">{statusMessage}</p>
                            ) : null}

                            <p className="text-end mt-3 mb-1">
                                New here? <a href="#signup">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
