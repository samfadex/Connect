import { useState } from "react";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Reset requested for:", email);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-4 shadow">
                        <h3 className="text-center mb-4">Forgot Password</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="resetEmail" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="resetEmail"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Send Reset Link
                            </button>
                        </form>

                        <p className="text-center mt-3 mb-0">
                            Back to <a href="#login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
