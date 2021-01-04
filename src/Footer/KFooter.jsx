////// IMPORTS //////

//// EXTERNAL ////
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

// React
import React, { Component } from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

const iconFromType = (type) => {
    switch (type) {
        case "fb":
            return <FacebookIcon />;
        case "ig":
            return <InstagramIcon />;
        case "phone":
            return <PhoneIcon />;
        case "mail":
            return <MailIcon />;
        default:
            return "";
    }
};

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
                                                target="_blank"
                                            >
                                                {iconFromType(contact.type)}
                                            </a>
                                            <span className="d-block">
                                                {contact.text}
                                            </span>
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
