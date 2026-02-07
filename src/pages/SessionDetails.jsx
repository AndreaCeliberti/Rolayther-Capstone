import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function SessionDetails() {
  return (
    <Container fluid="md" className="mt-4 px-3">
      <Row className="g-4">
        <Col xs={12} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h2>La Cripta Oscura</h2>
              <p className="text-muted">Master: Luca</p>
              <p>
                Descrizione completa della sessione con dettagli, storia,
                ambientazione e obiettivi dei giocatori.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h5>Posti disponibili</h5>
              <p className="fs-4">3 / 5</p>
              <Button variant="success" className="w-100 mb-2">
                Join
              </Button>
              <Button variant="outline-danger" className="w-100">
                Leave
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
