import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import SnakeGame from "../Arcade/SnakeGame";
import TetrisGame from "../Arcade/TetrisGame";
import {useTranslation} from "react-i18next";
import i18n from "../../Assets/lang/i18n";
function Home() {
  const {t} = useTranslation();
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={6} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {t('Hi There!')}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                {t('I am')}
                <strong className="main-name"> {t('Name')}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={6} style={{ paddingBottom: 20 }} className="home-game-col">
              <div className="home-games">
                <div className="home-game home-game--snake">
                  <SnakeGame cols={16} rows={16} cell={16} interval={80} fill className="home-game-canvas" />
                </div>
                <div className="home-game home-game--tetris">
                  <TetrisGame cell={16} interval={55} fill className="home-game-canvas" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
