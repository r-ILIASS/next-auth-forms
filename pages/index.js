import Head from "next/head";
// components
import Register from "../components/Register";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen grid place-items-center">
        <Register />
      </main>
    </div>
  );
}
