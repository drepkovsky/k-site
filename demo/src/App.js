import "react-day-picker/lib/style.css";
import {
  KAnimation,
  KCol,
  KContainer,
  KRow,
  KSection,
  KSite,
  Display1,
  Overlay,
  Div,
  KPage,
  KHero,
  KHeroBody,
  Display4,
  KNavbar,
  KNavbarCollapse,
  KNavItem,
} from "./k-site";
import { Fragment } from "react";
import { KRouter } from "./k-site/KSite";

function App() {
  return (
    <Fragment>
      <KSite accentColor="#131722" optionalColors={{ primary: "#4595ff" }}>
        <KNavbar
          position="fixed"
          brand="K-site"
          brandLink="/"
          color="grey-10"
          bg="background"
          expand="sm"
          scrolledProps={{
            bg: "background",
            py: "0.7",
            elevate: 5,
          }}
        >
          <KContainer>
            <KNavItem>K-Site</KNavItem>
            <KNavbarCollapse></KNavbarCollapse>
          </KContainer>
        </KNavbar>

        <KRouter>
          <KPage route="/">
            {/* Main Hero */}
            <KSection p="0" lineHeight="2">
              <KHero
                text="center"
                color="grey-10"
                size="fullheight"
                zIndex="10"
              >
                <KHeroBody>
                  <Overlay />
                  <KContainer>
                    <KRow>
                      <KCol>K-Site</KCol>
                      <KCol> Hello</KCol>
                    </KRow>
                  </KContainer>
                </KHeroBody>
              </KHero>
            </KSection>
            {/* About Section */}
          </KPage>

          <KPage route="/about">
            <KHero size="fullheight" text="start">
              <KHeroBody>
                <Overlay />
                <KContainer>
                  <Div p="2">
                    <KAnimation anim={["fadeIn 2s ease", "up 0.5s ease"]}>
                      <Display4>This is an about page</Display4>
                    </KAnimation>
                    <KRow>
                      <KCol lg={{ size: 4, offset: 4 }}></KCol>
                    </KRow>
                  </Div>
                </KContainer>
              </KHeroBody>
            </KHero>
          </KPage>
        </KRouter>
      </KSite>
    </Fragment>
  );
}

export default App;
