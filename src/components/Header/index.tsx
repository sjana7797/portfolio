import { ReactNavbar } from "overlay-navbar";
import Logo from "../../assets/images/Sanjay.webp";
import { FaUserAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="">
      <ReactNavbar
        navColor1="#ecf0f1"
        navColor2="#0f172a"
        burgerColor="#34d399"
        burgerColorHover="#34d399"
        nav2justifyContent="space-around"
        nav3justifyContent="space-around"
        link1Text="Home"
        link2Text="About"
        link3Text="Projects"
        link4Text="Contact"
        link1Url="/"
        link2Url="/about"
        link3Url="/projects"
        link4Url="/contact"
        link1ColorHover="#ecf0f1"
        link1Color="#34d399"
        link1Size="1rem"
        link1Family="Poppins"
        logo={Logo}
        profileIcon={true}
        ProfileIconElement={FaUserAlt}
        profileIconColor="#34d399"
        profileIconColorHover="#ecf0f1"
        b
      />
    </header>
  );
}

export default Header;
