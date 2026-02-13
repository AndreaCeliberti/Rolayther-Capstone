import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Badge, ListGroup } from "react-bootstrap";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { ToastContext } from "../context/ToastContext";
import { PlayersApi } from "../api/players.api";

export default function PlayerProfile() {
  const { showToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // 1) prendo il profilo (serve il playerId)
        const meRes = await PlayersApi.getMe();
        const meData = meRes.data;
        setMe(meData);

        if (!meData?.playerId) {
          setSessions([]);
          return;
        }

        // 2) prendo le sessioni da endpoint che già funziona su Swagger
        const sRes = await PlayersApi.getSessions(meData.playerId);
        setSessions(sRes.data || []);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Errore caricamento profilo/sessioni";
        showToast(msg, "danger");
        setMe(null);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <PageHeader title="Profilo Player" subtitle="Le tue sessioni e il tuo profilo." />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : !me ? (
          <EmptyState title="Profilo non disponibile" hint="Fai login come Player." icon="👤" />
        ) : (
          <Row className="g-4">
            <Col xs={12} lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                      style={{ width: 64, height: 64, overflow: "hidden" }}
                    >
                      {me.avatarImgUrl ? (
                        <img
                          src={me.avatarImgUrl}
                          alt="avatar"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span className="fs-3">👤</span>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-semibold fs-5">{me.nickName || "Player"}</div>
                      <Badge bg="success">Player</Badge>
                    </div>
                  </div>

                  {me.bioPlayer && <div className="text-muted mt-3 small">{me.bioPlayer}</div>}
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Sessioni a cui partecipi</h5>
                    <span className=" small">Totale: {sessions.length}</span>
                  </div>

                  {sessions.length === 0 ? (
                    <div className="rol-item text-muted small">Non hai ancora partecipato a nessuna sessione.</div>
                  ) : (
                    <ListGroup variant="flush">
                      {sessions.map((s) => (
                        <ListGroup.Item key={s.sessionId} className="rol-item px-0">
                          <div className="rol-item d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <div className="fw-semibold">{s.sessionTitle}</div>
                              <div className=" small">
                                {s.scheduledAt ? new Date(s.scheduledAt).toLocaleString() : "—"} • {s.duration}
                              </div>
                              <div className=" small">
                                {s.game?.title ? `🎮 ${s.game.title} · ` : ""}
                                {s.genre?.name ? `🏷️ ${s.genre.name}` : ""}
                              </div>
                            </div>
                            <Badge bg="secondary">
                              👥 {(s.players?.length ?? s.joinedCount ?? 0)}/{s.numbOfPlayer ?? "∞"}
                            </Badge>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
