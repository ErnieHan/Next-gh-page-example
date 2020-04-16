import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";

export class App extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>首頁 ｜ DOREBON</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        Hello World.
        <h1>This is Ernie NEXT website to Github</h1>
        <Link href="/about" as={process.env.BACKEND_URL + "/about"}>
          <a>About</a>
        </Link>
      </div>
    );
  }
}

export default App;
