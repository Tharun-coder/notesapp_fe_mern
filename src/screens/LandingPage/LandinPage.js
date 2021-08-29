import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

function LandinPage({ history }) {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) history.push("/mynotes");
  }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Notes Holder</h1>
              <p className="subtitle">One safe place for all your notes</p>
              <div className="button-container">
                <a href="/login">
                  <Button size="lg" className="landing-button">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button
                    size="lg"
                    className="landing-button"
                    variant="outline-primary"
                  >
                    Signup
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandinPage;
