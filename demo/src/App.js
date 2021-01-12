import {
  KPage,
  KSite,
  KNavbar,
  KHeader,
  KFlexContainer,
  KCardBody,
  KCard,
  KCardHeader,
  KCardFloater,
  KCardTitle,
  KCardFooter,
  KIcon,
  KTable,
  KTableHead,
  KTableRow,
  KTableBody,
  KTableItem,
  KSection,
  KNavbarOld,
} from "./KSite";

import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <KSite currentTheme="default-dark">
      <KNavbarOld brandTitle="ahoj" dark />
      <KPage name="Home" route="/">
        <KHeader minHeight={50}>
          <Container>
            <Row>
              <Col className="p-2" md={6}>
                <KCard>
                  <KTable stripes className="text-wrap">
                    <KTableHead>
                      <KTableRow>
                        <KTableItem as="th">#</KTableItem>
                        <KTableItem as="th">First Name</KTableItem>
                        <KTableItem as="th">Last Name</KTableItem>
                        <KTableItem as="th">Username</KTableItem>
                      </KTableRow>
                    </KTableHead>
                    <KTableBody>
                      <KTableRow>
                        <KTableItem scope="row">1</KTableItem>
                        <KTableItem>Mark</KTableItem>
                        <KTableItem>Otto</KTableItem>
                        <KTableItem>@mdo</KTableItem>
                      </KTableRow>
                      <KTableRow>
                        <KTableItem scope="row">2</KTableItem>
                        <KTableItem>Jacob</KTableItem>
                        <KTableItem>Thornton</KTableItem>
                        <KTableItem>@fat</KTableItem>
                      </KTableRow>
                      <KTableRow>
                        <KTableItem scope="row">3</KTableItem>
                        <KTableItem>Larry</KTableItem>
                        <KTableItem>the Bird</KTableItem>
                        <KTableItem>@twitter</KTableItem>
                      </KTableRow>
                    </KTableBody>
                  </KTable>
                  <KCardFooter align="end">
                    <KIcon
                      size={1.2}
                      regular
                      prefix="fa"
                      className="p-1"
                      name="user"
                    />
                    by Dominik Repkovsky
                  </KCardFooter>
                </KCard>
              </Col>
              <Col className="p-2" md={6}>
                <KCard>
                  <KCardHeader>
                    <KCardTitle>This is a card with table</KCardTitle>
                  </KCardHeader>
                  <KCardBody>Hello my name is dominik</KCardBody>
                  <KCardFloater ver="end" hor="start">
                    <KIcon
                      size={1.2}
                      regular
                      prefix="fa"
                      className="p-1"
                      name="user"
                    />
                  </KCardFloater>
                </KCard>
              </Col>
            </Row>
          </Container>
        </KHeader>
        <KSection>
          <KFlexContainer className="px-5" direction="row">
            <KCard className="m-2">
              <KCardHeader>
                <KCardTitle>This is a card with table</KCardTitle>
              </KCardHeader>
              <KCardBody>Hello my name is dominik</KCardBody>
              <KCardFloater ver="end" hor="start">
                <KIcon
                  size={1.2}
                  regular
                  prefix="fa"
                  className="p-1"
                  name="user"
                />
              </KCardFloater>
            </KCard>
            <KCard>
              <KCardHeader>
                <KCardTitle>This is a card with table</KCardTitle>
              </KCardHeader>
              <KCardBody>Hello my name is dominik</KCardBody>
              <KCardFloater ver="end" hor="start">
                <KIcon
                  size={1.2}
                  regular
                  prefix="fa"
                  className="p-1"
                  name="user"
                />
              </KCardFloater>
            </KCard>
          </KFlexContainer>
        </KSection>
      </KPage>
      <KPage name="Gallery/Interior" route="/gallery" navbar>
        This is a gallery.
      </KPage>
    </KSite>
  );
}

export default App;
