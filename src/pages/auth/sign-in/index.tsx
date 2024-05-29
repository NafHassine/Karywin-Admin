import React, { useEffect, useState } from "react";


const SignIn: React.FC<{}> = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const list_bus = [1, 2, 3, 4, 5, 6];
    const login = () => {
        console.log("login: ", email, " ", password);
    }
    // useEffect(() => {
    //     console.log("Email: ", email);
    // }, [email])
    return (
        <div id="app">

            <section className="section main-section">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-lock"></i></span>
                            Login
                        </p>
                    </header>
                    <div className="card-content">
                        <form method="get">

                            <div className="field spaced">
                                <label className="label">Login</label>
                                <div className="control icons-left">
                                    <input className="input" type="text" name="login" placeholder="user@example.com" onChange={(event) => { setEmail(event.target.value) }} />
                                    <span className="icon is-small left"><i className="mdi mdi-account"></i></span>
                                </div>
                                <p className="help">
                                    Please enter your login
                                </p>
                            </div>

                            <div className="field spaced">
                                <label className="label">Password</label>
                                <p className="control icons-left">
                                    <input className="input" type="password" name="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                                    <span className="icon is-small left"><i className="mdi mdi-asterisk"></i></span>
                                </p>
                                <p className="help">
                                    Please enter your password
                                </p>
                            </div>

                            <div className="field spaced">
                                <div className="control">
                                    <label className="checkbox"><input type="checkbox" name="remember" value="1" />
                                        <span className="check"></span>
                                        <span className="control-label">Remember</span>
                                    </label>
                                </div>
                            </div>

                            <hr />

                            <div className="field grouped">
                                <div className="control">
                                    <button type="button" className="button blue" onClick={login}>
                                        Login
                                    </button>
                                </div>
                                <div className="control">
                                    <a href="index.html" className="button">
                                        Back
                                    </a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default SignIn;