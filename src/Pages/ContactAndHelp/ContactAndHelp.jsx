import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import "./faqAccordion.css"; // custom styles

const ContactAndHelp = () => {
    return (
        <>
            <GlobalPageWrapper>
                <div className="mt-5 pt-2">
                    <h5 className="fw-semibold text-white mb-3">Contact & Help</h5>

                    <Accordion defaultActiveKey="0" alwaysOpen>
                        {/* HELP DESK FAQ */}
                        <Accordion.Item eventKey="0" className="custom-accordion-item">
                            <Accordion.Header>HELPDESK FAQ</Accordion.Header>
                            <Accordion.Body>
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0" className="custom-accordion-item">
                                        <Accordion.Header>
                                            I have a question regarding my payment
                                        </Accordion.Header>
                                        <Accordion.Body className="custom-accordion-body">
                                            When you set your account to Inactive, your profile will be hidden on 2+1.
                                            You will be invisible until you decide to log in again, at which time your
                                            profile will become Active and visible to others. <br /> <br />
                                            Time remaining on your current membership will run its course while your
                                            profile is set to inactive. If you have paid for your membership directly
                                            on the 2+1 website, then your recurring billing will be switched off.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* Duplicate questions */}
                                    <Accordion.Item eventKey="1" className="custom-accordion-item">
                                        <Accordion.Header>
                                            I have a question regarding my payment
                                        </Accordion.Header>
                                        <Accordion.Body className="custom-accordion-body">
                                            Same answer content...
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2" className="custom-accordion-item">
                                        <Accordion.Header>
                                            I have a question regarding my payment
                                        </Accordion.Header>
                                        <Accordion.Body className="custom-accordion-body">
                                            Same answer content...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* ACCOUNTING FAQ */}
                        <Accordion.Item eventKey="1" className="custom-accordion-item">
                            <Accordion.Header>ACCOUNTING FAQ</Accordion.Header>
                            <Accordion.Body className="custom-accordion-body">
                                Accounting FAQ details go here.
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* PARTY FAQ */}
                        <Accordion.Item eventKey="2" className="custom-accordion-item">
                            <Accordion.Header>PARTY FAQ</Accordion.Header>
                            <Accordion.Body className="custom-accordion-body">
                                Party FAQ details go here.
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* AFFILIATE & ADVERTISING */}
                        <Accordion.Item eventKey="3" className="custom-accordion-item">
                            <Accordion.Header>AFFILIATE & ADVERTISING</Accordion.Header>
                            <Accordion.Body className="custom-accordion-body">
                                Affiliate & Advertising FAQ details go here.
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* BUSINESS FAQ */}
                        <Accordion.Item eventKey="4" className="custom-accordion-item">
                            <Accordion.Header>BUSINESS FAQ</Accordion.Header>
                            <Accordion.Body className="custom-accordion-body">
                                Business FAQ details go here.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </GlobalPageWrapper>
        </>
    );
};

export default ContactAndHelp;
