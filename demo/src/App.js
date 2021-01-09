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
} from "./KSite";

import { mdiHeart } from "@mdi/js";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <KSite dark>
      <KPage name="Home" route="/">
        <KHeader minHeight={50}>
          <Container>
            <Row>
              <Col className="p-2" md={6}>
                <KCard>
                  <KTable stripes className="text-wrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </KTable>
                  <KCardFooter align="end">by Dominik Repkovsky</KCardFooter>
                </KCard>
              </Col>
              <Col className="p-2" md={6}>
                <KCard>
                  <KCardHeader align="start">
                    <KCardTitle>This is a card with table</KCardTitle>
                  </KCardHeader>
                  <KTable stripes className="text-wrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </KTable>
                </KCard>
              </Col>
            </Row>
          </Container>
        </KHeader>
      </KPage>
      <KPage name="Gallery/Interior" route="/gallery" navbar>
        This is a gallery.
      </KPage>
    </KSite>
  );
}

export default App;
