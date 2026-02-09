import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { GenresApi } from "../api/genres.api";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import GenreCard from "../components/cards/GenreCard";

export default function GenresList() {
  const { showToast } = useContext(ToastContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await GenresApi.getAll();
        setItems(res.data || []);
      } catch {
        showToast("Errore nel caricamento generi", "danger");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <PageHeader title="Generi" subtitle="Esplora i generi disponibili." />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="Nessun genere trovato" />
        ) : (
          <Row className="g-4">
            {items.map((g) => (
              <Col key={g.genreId} xs={12} sm={6} lg={4} xl={3}>
                <GenreCard genre={g} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
