import React, {useState, useEffect} from "react";

export default function Signup() {

    const [users, setUsers] = useState([]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleEmailChange = (ev)=> {
      setEmail(ev.target.value)
    }

     const handlePasswordChange = (ev) => {
       setPassword(ev.target.value);
     };

      const handlePasswordConfirmChange = (ev) => {
        setPasswordConfirm(ev.target.value);
      };

  return (
    <>
      <div>
        <h2>Sign up</h2>
        <form action="POST" className="group">
          <div className="form-item email-group-login">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={handleEmailChange}
            />
          </div>
          <div className="group">
            <label htmlFor="passwprd">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={handlePasswordChange}
            />
          </div>
          <div className="group">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              type="password"
              id="password-confirm"
              name="passwordConfirm"
              value={passwordConfirm}
              required
              onChange={handlePasswordConfirmChange}
            />
          </div>
          <button type="sumbit" onClick="handleSubmit"></button>
        </form>
      </div>
      <div>Already have an account? Login</div>
    </>
  );
}
