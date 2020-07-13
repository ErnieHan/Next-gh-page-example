import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import QRCode from "qrcode";
import Clipboard from "react-clipboard.js";

export class App extends Component {
  state = {
    qrcode: this.props.qrcode,
    name: false,
    website: "18K白色黃金戒指",
  };

  componentDidMount() {}

  createQRCode = async () => {
    var options = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      quality: 1,
      margin: 2,
      color: {
        dark: "#DEBB8C",
        light: "#ffffff",
      },
    };
    try {
      const response = await QRCode.toDataURL(
        "https://twtest-pks.chowsangsang.com/personalised-jewellery/DIYPromessa/pairRing?designListId=DSLBC0003866TE",
        options
      );
      this.setState({
        qrcode: response,
      });
    } catch (error) {
      console.error(error);
    }
  };
  onSuccess = (e) => {
    console.info(e.text);
  };
  render() {
    return (
      <div>
        <div>
          <button onClick={this.createQRCode}>產生qr-code</button>
          <img src={this.state.qrcode} alt="qrcode" />
        </div>
        <Head>
          <title>dorebon.jsx</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {/* facebook  SEO */}
          {/* <meta property="og:image" content="https://taiwancanhelp.us/taiwancanhelp-og.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Taiwan Can Help" />
          <meta property="og:url" content="https://erniehan.github.io/dorebon/" />
          <meta property="og:title" content="Taiwan Can Help" />
          <meta property="og:locale" content="zh-TW" /> */}
        </Head>
        <h1>以「角落」為設計單位</h1>
        <h2>
          免費<span style={{ fontSize: "36px", color: "tan" }}>7</span>
          天無理由退貨
        </h2>
        <div className="ernie">testing</div>
        <div className="menu-link">
          <Link
            href={process.env.BACKEND_URL + "/about"}
            as={process.env.BACKEND_URL + "/about"}
          >
            <a>click me go to About Page</a>
          </Link>
        </div>
        <div className="menu-link">
          <Link
            href={process.env.BACKEND_URL + "/manon"}
            as={process.env.BACKEND_URL + "/manon"}
          >
            <a>click me go to Manon Page</a>
          </Link>
        </div>
        <input
          type="text"
          value={this.state.website}
          onChange={(e) => {
            this.setState({
              website: e.target.value,
            });
          }}
        />
        <Clipboard
          data-clipboard-text={this.state.website}
          onSuccess={this.onSuccess}
        >
          复制链结
        </Clipboard>
      </div>
    );
  }
}

App.getInitialProps = async () => {
  var options = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    margin: 2,
    color: {
      dark: "#DEBB8C",
      light: "#ffffff",
    },
  };
  try {
    const response = await QRCode.toDataURL(
      "https://twtest-pks.chowsangsang.com/personalised-jewellery/DIYPromessa/pairRing?designListId=DSLBC0003866TE",
      options
    );
    return { qrcode: response };
  } catch (error) {
    console.error(error);
  }
};

export default App;
