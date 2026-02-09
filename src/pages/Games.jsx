import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { GamesApi } from "../api/games.api";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import GameCard from "../components/cards/GameCard";

export default function GamesList() {
  const { showToast } = useContext(ToastContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await GamesApi.getAll();
        setItems(res.data || []);
      } catch {
        showToast("Errore nel caricamento giochi", "danger");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <PageHeader title="Giochi" subtitle="Lista giochi disponibili." />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="Nessun gioco trovato" />
        ) : (
          <Row className="g-4">
            {items.map((g) => (
              <Col key={g.gameId} xs={12} sm={6} lg={4} xl={3}>
                <GameCard game={g} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
