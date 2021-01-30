import "react-day-picker/lib/style.css";
import {
  KAnimation,
  KCol,
  KContainer,
  KNavbarUncontrolled,
  KRow,
  KSection,
  KSite,
  Display1,
  Overlay,
  Div,
  KPage,
  KHero,
  KHeroBody,
} from "./k-site";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <KSite accentColor="#131722" optionalColors={{ primary: "#4595ff" }}>
        <KPage name="Domov" route="/" className="section-snapper">
          <KNavbarUncontrolled
            bg="transparent"
            position="fixed"
            brand="Check"
            brandLink="/"
            color="grey-10"
            expand="sm"
            scrolledProps={{
              bg: "background",
              py: "0.7",
              elevate: 5,
            }}
          />

          {/* Main Hero */}
          <KSection p="0" lineHeight="2">
            <KHero
              bgImg="images/mainHero.jpg"
              bgPosition="50% 50%"
              bgSize="cover"
              text="center"
              color="grey-10"
              size="fullheight"
              zIndex="10">
              <KHeroBody>
                <Overlay />
                <KContainer>
                  <Div p="2" overflow="visible">
                    <KAnimation
                      anim={["fadeIn 2s ease", "up 0.5s ease"]}
                      overflow="visible">
                      <Display1>Welcome</Display1>
                    </KAnimation>
                    <KRow>
                      <KCol lg={{ size: 4, offset: 4 }}></KCol>
                    </KRow>
                  </Div>
                </KContainer>
              </KHeroBody>
            </KHero>
          </KSection>
          {/* About Section */}
        </KPage>
      </KSite>
    </Fragment>
  );
}

export default App;
