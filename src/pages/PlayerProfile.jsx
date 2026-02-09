import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, ListGroup, Badge } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { PlayersApi } from "../api/players.api";

export default function PlayerProfile() {
  const { showToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await PlayersApi.getMe();
        setPlayer(res.data || null);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Errore nel caricamento profilo player";
        showToast(msg, "danger");
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Profilo Player"
        subtitle="Gestisci i tuoi dati e guarda le sessioni a cui partecipi."
      />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : !player ? (
          <EmptyState
            title="Profilo player non trovato"
            hint="Assicurati di aver completato l’iscrizione come Player."
          />
        ) : (
          <Row className="g-4">
            {/* COL SINISTRA: profilo */}
            <Col xs={12} lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                      style={{ width: 64, height: 64, overflow: "hidden" }}
                    >
                      {player.avatarImgUrl ? (
                        <img
                          src={player.avatarImgUrl}
                          alt="avatar"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span className="fs-3">👤</span>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-semibold fs-5">
                        {player.nickName || `${player.name ?? ""} ${player.surname ?? ""}`.trim() || "Player"}
                      </div>
                      <div className="text-muted small">{player.email}</div>
                      <div className="mt-2">
                        <Badge bg="success">Player</Badge>
                      </div>
                    </div>
                  </div>

                  {player.bioPlayer && (
                    <div className="text-muted mt-3 small">
                      {player.bioPlayer}
                    </div>
                  )}

                  <hr className="my-3" />

                  <div className="small text-muted">
                    <div><span className="fw-semibold">ID:</span> {player.playerId || "—"}</div>
                    <div><span className="fw-semibold">Creato:</span> {player.createdAt ? new Date(player.createdAt).toLocaleString() : "—"}</div>
                    <div><span className="fw-semibold">Data nascita:</span> {player.dateOfBirth || "—"}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* COL DESTRA: sessioni */}
            <Col xs={12} lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Le tue sessioni</h5>
                    <span className="text-muted small">
                      Totale: {player.sessions?.length ?? 0}
                    </span>
                  </div>

                  {!player.sessions || player.sessions.length === 0 ? (
                    <div className="text-muted small">
                      Non partecipi ancora a nessuna sessione.
                    </div>
                  ) : (
                    <ListGroup variant="flush">
                      {player.sessions.map((s) => (
                        <ListGroup.Item key={s.sessionId} className="px-0">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <div className="fw-semibold">{s.sessionTitle}</div>
                              <div className="text-muted small">
                                {s.scheduledAt ? new Date(s.scheduledAt).toLocaleString() : "—"} • {s.duration}
                              </div>
                            </div>
                            <Badge bg="secondary">
                              👥 {s.players?.length ?? 0}/{s.numbOfPlayer ?? "∞"}
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
