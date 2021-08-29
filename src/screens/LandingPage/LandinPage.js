import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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
                <Link to="/login">
                  <Button size="lg" className="landing-button">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="landing-button"
                    variant="outline-primary"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandinPage;
