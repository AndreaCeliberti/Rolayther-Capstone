import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { PlatformsApi } from "../api/platforms.api";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import PlatformCard from "../components/cards/PlatformCard";

export default function PlatformsList() {
  const { showToast } = useContext(ToastContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await PlatformsApi.getAll();
        setItems(res.data || []);
      } catch {
        showToast("Errore nel caricamento piattaforme", "danger");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <PageHeader title="Piattaforme" subtitle="Piattaforme disponibili." />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="Nessuna piattaforma trovata" />
        ) : (
          <Row className="g-4">
            {items.map((p) => (
              <Col key={p.platformId} xs={12} sm={6} lg={4} xl={3}>
                <PlatformCard platform={p} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
