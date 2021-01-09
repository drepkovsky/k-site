////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component } from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

class KFooter extends Component {
  //// LIFECYCLE ////
  constructor(props) {
    super(props);
  }
  //// RENDERING ////
  render() {
    const { contacts } = this.props;

    if (contacts)
      return (
        <Container className="pt-0">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Row>
                {contacts.map((contact) => {
                  return (
                    <Col className="pt-2" md>
                      <a
                        className="pb-1 text-5 light text-col"
                        href={contact.href}
                        target="_blank"></a>
                      <span className="d-block">{contact.text}</span>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      );

    return "";
  }

  //// MISC ////
}

////// EXPORTS //////
export default KFooter;
