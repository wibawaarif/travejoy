import React, { useState } from "react";

import Fade from "react-reveal/Fade";

import Button from "elements/Button/index";
import BrandIcon from "parts/IconText";
export default function Header(props) {
  const [isActive, setActive] = useState(false)
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };

  if (props.isCentered)
    return (
      <Fade>
        <header className="spacing-sm">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Button
                className="btn brand-text-icon py-0 mx-auto"
                href=""
                type="link"
              >
                Trave<span className="text-primary">joy</span>
              </Button>
            </nav>
          </div>
        </header>
      </Fade>
    );

  const stylingUI = isActive ? {position: "absolute", left: -16, right: -16, paddingLeft: '2px'} : {}

  return (
    <Fade>
      <header className="spacing-sm" style={{zIndex: 10}}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <BrandIcon />
            <button class="navbar-toggler" type="button" onClick={() => setActive(prev => !prev)}>
      <span class="navbar-toggler-icon"></span>
    </button>

            <div className={['collapse navbar-collapse', isActive ? "show" : ""].join(" ")}>
              <ul className="navbar-nav ms-auto bg-light" style={stylingUI}>
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="/">
                    Home
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/browse-by")}`}>
                  <Button className="nav-link" type="link" href="/browse-by">
                    Browser By
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/stories")}`}>
                  <Button className="nav-link" type="link" href="/stories">
                    Stories
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/agents")}`}>
                  <Button className="nav-link" type="link" href="/agents">
                    Agents
                  </Button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  );
}
