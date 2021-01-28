import "react-day-picker/lib/style.css";
import {
  KAnimation,
  KCol,
  KContainer,
  KImage,
  KNavbarUncontrolled,
  KRow,
  KSection,
  KSite,
  Display1,
  H1,
  Link,
  Overlay,
  Paragraph,
  Display4,
  Div,
  KButton,
  KForm,
  KInputDate,
  KComponent,
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
                      <KCol lg={{ size: 4, offset: 4 }}>
                        <KForm>
                          <KInputDate
                            label="From - To"
                            isRangeSelect
                            required
                            name="dateRange"
                            defaultValue="28.01.2021 - 3.02.2021"
                            format="dd.MM.yyyy"
                          />
                          <Div display="flex" p="1" justifyContent="center">
                            <KButton
                              fontSize="1.2"
                              lineHeight="1.5"
                              weight="semi-light"
                              radius="1"
                              bg="primary">
                              Coninue
                            </KButton>
                          </Div>
                        </KForm>
                      </KCol>
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
