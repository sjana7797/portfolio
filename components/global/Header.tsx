import Nav from "../header/Nav";

type Props = {};

function Header({}: Props) {
  return (
    <header className="mx-auto flex w-full max-w-7xl justify-end border-b-2 border-accent/30 py-5">
      <Nav />
    </header>
  );
}

export default Header;
