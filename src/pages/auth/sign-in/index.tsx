import React, { useState } from "react";
import { auth, db } from "../../../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, doc, getDoc } from "firebase/firestore";


const SignIn: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.Role === "Admin") {
          console.log("Login successful: ", user);
          window.location.href = '/';
        } else {
          console.error("Access denied. User is not an Admin.");
          // Handle access denial, e.g., show a message or redirect
        }
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

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
