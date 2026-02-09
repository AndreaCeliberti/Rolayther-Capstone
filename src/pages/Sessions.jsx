import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { SessionsApi } from "../api/sessions.api";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import SessionCard from "../components/cards/SessionCard";

export default function SessionsList() {
  const { showToast } = useContext(ToastContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await SessionsApi.getAll();
        setItems(res.data || []);
      } catch {
        showToast("Errore nel caricamento sessioni", "danger");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Sessioni"
        subtitle="Sfoglia tutte le sessioni disponibili e apri i dettagli."
      />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="Nessuna sessione trovata"
            hint="Quando verranno pubblicate, compariranno qui."
          />
        ) : (
          <Row className="g-4">
            {items.map((s) => (
              <Col key={s.sessionId} xs={12} sm={6} lg={4} xl={3}>
                <SessionCard session={s} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
