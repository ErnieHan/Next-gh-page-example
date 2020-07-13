import Head from "next/head";
import Link from "next/link";
import LoadProducts from "../src/components/LoadProducts";
import Main from "../src/components/Main";
export default () => (
  <div>
    <Head>
      <title>DOREBON | 搜尋</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div>About us</div>
    <h1 style={{ color: "#53536d" }}>This is Ernie Next.js About Page</h1>
    <div>
      Back to 朵兒芃
      <a href="/">home</a>
      <Link href="/" as={process.env.BACKEND_URL + "/"}>
        <a>Home</a>
      </Link>
    </div>
    <div>
      <Main />
    </div>
    <div>
      <LoadProducts />
    </div>
    <footer>footer.js</footer>
  </div>
);
