import Link from "next/link";
export default () => (
  <div>
    Hello World.
    <h1>This is Ernie NEXT website to Github</h1>
    <Link href="/about" as={process.env.BACKEND_URL + "/about"}>
      <a>About</a>
    </Link>
  </div>
);
