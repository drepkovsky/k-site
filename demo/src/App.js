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
  KButton,
  KForm,
  KInputDate,
  KPage,
  KHero,
  KHeroBody,
  KFormFeedback,
  KFormFeedbackMessage,
} from "./k-site";
import { Fragment } from "react";
import { checkIfDateIsValid } from "./actions";

const handleForm = async (res, callback) => {
  if (res) {
    if (res[0] && res[1]) {
      return await checkIfDateIsValid(res[0], res[1]).then((response) => {
        callback({
          formState:
            response.occupied || response.nightserr ? "error" : "success",
          formMessage: response.occupied
            ? "Chata je obsadená"
            : response.nightserr
            ? `Minimálny počet ${response.minimalnights} nocí v danom termíne`
            : "Chata je voľná",
        });
        return;
      });
    } else {
      callback({
        formState: "warning",
        formMessage: "Prosim vyberte začiatok a koniec vášho pobytu.",
      });
      return;
    }
  }
  callback({
    formState: "error",
    formMessage: "Niekde sa vyskytol problém.",
  });
};

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
                        <KForm
                          // onSubmit={handleForm}
                          loadingMessage="Kontrolujem...">
                          <KInputDate
                            label="From - To"
                            isRangeSelect
                            required
                            name="dateRange"
                            defaultValue="29.01.2021 - 3.02.2021"
                            format="dd.MM.yyyy"
                            onDateChange={handleForm}
                          />
                          <Div mt="1" radius="5px" overflow="hidden">
                            <KFormFeedback
                              p="0.2"
                              bg="error"
                              col="contrast"
                              type="error">
                              <KFormFeedbackMessage />
                            </KFormFeedback>
                            <KFormFeedback
                              p="0.2"
                              bg="primary"
                              col="contrast"
                              type="loading">
                              <KFormFeedbackMessage />
                            </KFormFeedback>
                            <KFormFeedback
                              p="0.2"
                              bg="success"
                              col="contrast"
                              type="success">
                              <KFormFeedbackMessage />
                            </KFormFeedback>
                          </Div>
                          <Div display="flex" mt="1" justifyContent="center">
                            <KButton
                              fontSize="1.2"
                              lineHeight="1.5"
                              weight="semi-light"
                              radius="5px"
                              bg="primary">
                              Check
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
