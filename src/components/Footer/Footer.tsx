import Container from "@mui/material/Container";

import "./Footer.scss";
// eslint-disable-next-line no-restricted-imports
import footerLinks from "../../data/footerLinks.json";

export interface PugleFooterProps {
  copyright: string;
}

const Footer = (props: PugleFooterProps): JSX.Element => {
  const { copyright } = props;
  const { widget1, widget2, widget3, address, titles, contact } = footerLinks;
  return (
    <footer>
      <section className="main-footer-wrapper">
        <Container className="container-footer-wrap">
          <div className="footer-widget-area">
            <h4>{titles.title1}</h4>
            <ul>
              {widget1.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.url}>{link.menu}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-widget-area">
            <h4>{titles.title2}</h4>
            <ul>
              {widget2.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.url}>{link.menu}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-widget-area">
            <h4>{titles.title3}</h4>
            <ul>
              {widget3.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.url}>{link.menu}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-widget-area">
            <h4>{address.title}</h4>
            <address>{address.address}</address>
            <h4>{contact.title}</h4>
            <p className="p-tag-space">
              <strong>{contact.subTitle}:</strong> {contact.celular}
            </p>
            <p className="p-tag-space">
              <strong>{contact.subTitle2}</strong>
              {contact.email}
            </p>
          </div>
        </Container>
      </section>
      <article className="wrapper-sub-footer">
        <Container>
          <div className="sub-footer-area">{copyright}</div>
        </Container>
      </article>
    </footer>
  );
};

export default Footer;
