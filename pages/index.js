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
        <h1>This is Ernie NEXT website to Github</h1>
        <div className="menu-link">
          <Link href="/about" as={process.env.BACKEND_URL + "/about"}>
            <a>click me go to About Page</a>
          </Link>
        </div>
        <div className="menu-link">
          <Link href="/manon" as={process.env.BACKEND_URL + "/manon"}>
            <a>click me go to About Page</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
