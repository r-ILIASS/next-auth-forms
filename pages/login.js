import { useRef, useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../utils/axios";
// hooks
import { useAuth } from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useAuth();
    const router = useRouter();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("email@email.com"); // TODO:
    const [password, setPassword] = useState("G4moto@ma"); // TODO:

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // focus email on mount
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // clear errMsg on user interaction
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // submit to backend
        try {
            const res = await axios.post(
                LOGIN_URL,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            const accessToken = res?.data?.accessToken;
            const roles = res?.data?.roles;

            // save response to AuthContext's state
            setAuth({ email, roles, accessToken }); // TODO: check if you still to send the password to context

            setEmail(""); // TODO: remove
            setPassword(""); // TODO: remove
            setSuccess(true); // TODO: remove
            router.replace("/employees");
        } catch (error) {
            if (error.message === "Network Error") {
                setErrMsg("Something went wrong, please try again later!");
            } else if (error.response.status === 400) {
                setErrMsg("Missing email or password");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed!");
            }
            setTimeout(() => {
                errRef.current.focus();
            }, 1000); // FIXME: find a better solution to this
        }
    };

    return (
        <div>
            <Head>
                <title>Login</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen grid place-items-center">
                <section className="form-container">
                    {/* success message */}
                    {success && (
                        <div className="form-container-success">
                            You are logged in!
                        </div>
                    )}

                    {/* -- Error Message */}
                    {errMsg && (
                        <p
                            className="form-container-error"
                            ref={errRef}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                    )}

                    {/* -- Form Title */}
                    <div className="form-container-heading">
                        <h1>Login</h1>
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
                                value={email}
                                required
                            />
                        </div>

                        {/* password */}
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>

                        {/* space */}
                        <div />

                        {/* submit */}
                        <button>Login</button>

                        <span>
                            Don't have an account?
                            <Link href="/">
                                <a>Register</a>
                            </Link>
                        </span>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;
