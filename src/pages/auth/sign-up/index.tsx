import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "../../../configs/firebase";
import { doc, addDoc, collection } from "firebase/firestore"; 
import firebase from 'firebase/app';


const  SignUp: React.FC<{}> = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const addUser = async () => {
    try {
      console.log(db);
      // db.app.automaticDataCollectionEnabled
      const adminRef = collection(db, 'admin');
      await addDoc(adminRef,  { email: "dali@gmail.com" ,  password: "dali" });
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="app">

<section className="section main-section">
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon"><i className="mdi mdi-lock"></i></span>
          Sign up
        </p>
      </header>
      <div className="card-content">
        <form method="get">

          <div className="field spaced">
            <label className="label">Email</label>
            <div className="control icons-left">
              <input className="input" type="email" name="login" placeholder="user@example.com" />
              <span className="icon is-small left"><i className="mdi mdi-account"></i></span>
            </div>
            <p className="help">
              Please enter your email
            </p>
          </div>

          <div className="field spaced">
            <label className="label">Full name</label>
            <div className="control icons-left">
              <input className="input" type="text" name="full name" placeholder="Jon Doe" />
              <span className="icon is-small left"><i className="mdi mdi-account"></i></span>
            </div>
            <p className="help">
              Please enter your full name
            </p>
          </div>

          <div className="field spaced">
            <label className="label">Password</label>
            <p className="control icons-left">
              <input className="input" type="password" name="password" placeholder="Password" />
              <span className="icon is-small left"><i className="mdi mdi-asterisk"></i></span>
            </p>
            <p className="help">
              Please enter your password
            </p>    
          </div>

          <div className="field spaced">
            <label className="label">Repeat password</label>
            <p className="control icons-left">
              <input className="input" type="password" name="repassword" placeholder="Re password" />
              <span className="icon is-small left"><i className="mdi mdi-asterisk"></i></span>
            </p>
            <p className="help">
              Please enter your password again
            </p>    
          </div>
          <hr />

          <div className="field grouped">
            <div className="control">
              <button type="button" className="button blue" onClick={addUser}>
                SignUp
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>

  </section>
  </div>
  );
};

export default SignUp;