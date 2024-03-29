import Container from "@mui/material/Container";

import "./Header.scss";
import HeaderMenu from "./HeaderMenu";

export interface PugleHeaderProps {
  logo: Partial<LogoProps>;
  menuLinks?: MenuLinksObject[];
  onClick?: () => void;
}

interface MenuLinksObject {
  menu: string;
  url: string;
}

interface LogoProps {
  alt: string;
  src: string;
  width?: string | number;
  height?: string | number;
}

const Header = (props: PugleHeaderProps): JSX.Element => {
  const { logo } = props;

  const ImageComponent = (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
    />
  );

  return (
    <header className="header-wrapper-shadow">
      <Container>
        <div className="container-header-wrapper">
          <figure className="logo-image-specs">
            <a href="/">{ImageComponent}</a>
          </figure>
          <aside className="aside-menu-styles">
            <HeaderMenu
              HeaderMenuLinks={props.menuLinks}
              handleClick={props.onClick}
            />
          </aside>
        </div>
      </Container>
    </header>
  );
};

export default Header;
