import { Container, Row, Col } from "react-bootstrap";
import SessionCard from "../components/SessionCard";

export default function Home() {
  return (
    <Container fluid="md" className="mt-4 px-3 px-md-0">
      <h1 className="mb-2 text-center text-md-start">Benvenuto su Rolayther</h1>
      <p className="text-muted text-center text-md-start">
        Partecipa alle sessioni di gioco o creane una nuova!
      </p>

      <Row className="g-4 mt-2">
        {[1, 2, 3, 4].map((s) => (
          <Col key={s} xs={12} sm={6} lg={4} xl={3}>
            <SessionCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
