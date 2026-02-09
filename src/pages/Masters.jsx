import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { MastersApi } from "../api/masters.api";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import MasterCard from "../components/cards/MasterCard";

export default function MastersList() {
  const { showToast } = useContext(ToastContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await MastersApi.getAll();
        setItems(res.data || []);
      } catch {
        showToast("Errore nel caricamento master", "danger");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Master"
        subtitle="Scopri i master presenti sulla piattaforma."
      />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="Nessun master trovato" />
        ) : (
          <Row className="g-4">
            {items.map((m) => (
              <Col key={m.masterId} xs={12} sm={6} lg={4} xl={3}>
                <MasterCard master={m} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
