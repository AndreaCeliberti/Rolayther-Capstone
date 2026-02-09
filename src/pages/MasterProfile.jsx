import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, ListGroup, Badge } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { MastersApi } from "../api/masters.api";

export default function MasterProfile() {
  const { showToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [master, setMaster] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await MastersApi.getMe();
        setMaster(res.data || null);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Errore nel caricamento profilo master";
        showToast(msg, "danger");
        setMaster(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Profilo Master"
        subtitle="Gestisci i tuoi dati e le sessioni che organizzi."
      />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : !master ? (
          <EmptyState
            title="Profilo master non trovato"
            hint="Assicurati di aver completato l’iscrizione come Master."
          />
        ) : (
          <Row className="g-4">
            {/* profilo */}
            <Col xs={12} lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                      style={{ width: 64, height: 64, overflow: "hidden" }}
                    >
                      {master.avatarImgUrl ? (
                        <img
                          src={master.avatarImgUrl}
                          alt="avatar"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span className="fs-3">🧙</span>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-semibold fs-5">
                        {master.nickName || `${master.name ?? ""} ${master.surname ?? ""}`.trim() || "Master"}
                      </div>
                      <div className="text-muted small">{master.email}</div>
                      <div className="mt-2">
                        <Badge bg="info" text="dark">
                          Master
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {master.bioMaster && (
                    <div className="text-muted mt-3 small">
                      {master.bioMaster}
                    </div>
                  )}

                  <hr className="my-3" />

                  <div className="small text-muted">
                    <div><span className="fw-semibold">ID:</span> {master.masterId || "—"}</div>
                    <div><span className="fw-semibold">Creato:</span> {master.createdAt ? new Date(master.createdAt).toLocaleString() : "—"}</div>
                    <div><span className="fw-semibold">Data nascita:</span> {master.dateOfBirth || "—"}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* sessioni master */}
            <Col xs={12} lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Le tue sessioni</h5>
                    <span className="text-muted small">
                      Totale: {master.sessions?.length ?? 0}
                    </span>
                  </div>

                  {!master.sessions || master.sessions.length === 0 ? (
                    <div className="text-muted small">
                      Non hai ancora creato sessioni.
                    </div>
                  ) : (
                    <ListGroup variant="flush">
                      {master.sessions.map((s) => (
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

              <Row className="g-4 mt-1">
                <Col xs={12} md={6}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body>
                      <h6 className="mb-2">Giochi</h6>
                      <div className="text-muted small">
                        Totale: {master.games?.length ?? 0}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body>
                      <h6 className="mb-2">Piattaforme</h6>
                      <div className="text-muted small">
                        Totale: {master.platform?.length ?? 0}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
