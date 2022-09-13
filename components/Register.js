import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // focus email on mount
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // validate email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // validate passwords
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));

    const match = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  // clear errMsg on user interaction
  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form state
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = password === matchPassword;
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Inputs");
      return;
    }

    console.log(email);
    setSuccess(true);
  };

  return (
    <section className="form-container">
      {/* success message */}
      {success && (
        <div className="form-container-success">
          Account successfully created!
        </div>
      )}

      {/* -- Error Message */}
      {errMsg && (
        <p className="form-container-error" ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
      )}

      {/* -- Form Title */}
      <div className="form-container-heading">
        <h1>Register</h1>
      </div>

      {/* -- Form */}
      <form onSubmit={handleSubmit}>
        {/* email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="eidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="eidnote"
            className={emailFocus && email && !validEmail ? "block" : "hidden"}
          >
            Must be a valid email address.
          </p>
        </div>

        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              passwordFocus && password && !validPassword ? "block" : "hidden"
            }
          >
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
        </div>

        {/* match password */}
        <div>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            onChange={(e) => setMatchPassword(e.target.value)}
            value={matchPassword}
            required
            aria-invalid={validMatchPassword ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchPasswordFocus(true)}
            onBlur={() => setMatchPasswordFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              matchPasswordFocus && matchPassword && !validMatchPassword
                ? "block"
                : "hidden"
            }
          >
            Must match the first password input field.
          </p>
        </div>

        {/* space */}
        <div />

        {/* submit */}
        <button>Create Account</button>

        <span>
          Already have an account?
          <Link href="/login">
            <a>Log In</a>
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Register;
