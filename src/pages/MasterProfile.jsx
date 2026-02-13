import { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Badge,
  ListGroup,
} from "react-bootstrap";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { ToastContext } from "../context/ToastContext";
import { MastersApi } from "../api/masters.api";
import SessionStateControl from "../components/SessionStateControl";
import { stateBadgeVariant, stateLabel } from "../utils/sessionState";


export default function MasterProfile() {
  const { showToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // 1) master "me" (serve masterId)
        const meRes = await MastersApi.getMe();
        const meData = meRes.data;
        setMe(meData);

        if (!meData?.masterId) {
          setSessions([]);
          return;
        }

        // 2) sessioni collegate al master
        const sRes = await MastersApi.getSessions(meData.masterId);
        setSessions(sRes.data || []);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Errore caricamento profilo master/sessioni";
        showToast(msg, "danger");
        setMe(null);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader
        title="Profilo Master"
        subtitle="I tuoi dettagli e le sessioni che hai creato/gestisci."
      />

      <Container fluid="md" className="px-3 px-md-0 pb-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : !me ? (
          <EmptyState
            title="Profilo master non disponibile"
            hint="Assicurati di aver effettuato l’accesso come Master."
            icon="🧙"
          />
        ) : (
          <Row className="g-4">
            {/* PROFILO */}
            <Col xs={12} lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                      style={{ width: 68, height: 68, overflow: "hidden" }}
                    >
                      {me.avatarImgUrl ? (
                        <img
                          src={me.avatarImgUrl}
                          alt="avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span className="fs-3">🧙</span>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-semibold fs-5">
                        {me.nickName || "Master"}
                      </div>
                      <div className="mt-2">
                        <Badge bg="warning" text="dark">
                          Master
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {me.bioMaster && (
                    <div className="text-muted mt-3 small">{me.bioMaster}</div>
                  )}

                  {/* Extra descrittivi "leggeri" */}
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {me.platformsCount != null && (
                      <Badge bg="light" text="dark" className="border">
                        🧩 Platforms: {me.platformsCount}
                      </Badge>
                    )}
                    {me.gamesCount != null && (
                      <Badge bg="light" text="dark" className="border">
                        🎮 Games: {me.gamesCount}
                      </Badge>
                    )}
                  </div>

                  <hr className="my-3" />

                  <div className="small text-muted">
                    <div className="d-flex justify-content-between">
                      <span>Sessioni totali</span>
                      <span className="fw-semibold">{sessions.length}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Prossima sessione</span>
                      <span className="fw-semibold">
                        {sessions
                          .filter((s) => s.scheduledAt)
                          .map((s) => new Date(s.scheduledAt))
                          .sort((a, b) => a - b)[0]
                          ? new Date(
                              sessions
                                .filter((s) => s.scheduledAt)
                                .map((s) => new Date(s.scheduledAt))
                                .sort((a, b) => a - b)[0]
                            ).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* SESSIONI */}
            <Col xs={12} lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Le tue sessioni</h5>
                    <span className="text-muted small">
                      Totale: {sessions.length}
                    </span>
                  </div>

                  {sessions.length === 0 ? (
                    <div className="small">
                      Non hai ancora sessioni collegate al tuo profilo.
                    </div>
                  ) : (
                    <ListGroup variant="flush rol-item ">
                      {sessions
                        .slice()
                        .sort((a, b) => {
                          const da = a.scheduledAt
                            ? new Date(a.scheduledAt).getTime()
                            : 0;
                          const db = b.scheduledAt
                            ? new Date(b.scheduledAt).getTime()
                            : 0;
                          return da - db;
                        })
                        .map((s) => (
                          <ListGroup.Item key={s.sessionId} className="px-0 rol-item ">
                            <div className="d-flex justify-content-between align-items-start gap-2">
                              <div>
                                <div className="fw-semibold">
                                  {s.sessionTitle}
                                </div>

                                <div className="text-muted small">
                                  {s.scheduledAt
                                    ? new Date(s.scheduledAt).toLocaleString()
                                    : "—"}{" "}
                                  • {s.duration}
                                </div>

                                <div className="text-muted small">
                                  {s.game?.title ? `🎮 ${s.game.title} · ` : ""}
                                  {s.genre?.name ? `🏷️ ${s.genre.name}` : ""}
                                </div>

                                {s.sessionDescription && (
                                  <div className="text-muted small mt-1">
                                    {String(s.sessionDescription).slice(0, 110)}
                                    {String(s.sessionDescription).length > 110
                                      ? "…"
                                      : ""}
                                  </div>
                                )}
                              </div>

                              <div className="text-end">
                                <Badge bg="secondary">
                                  👥{" "}
                                  {s.players?.length ??
                                    s.joinedCount ??
                                    0}
                                  /{s.numbOfPlayer ?? "∞"}
                                </Badge>

                                {s.currentState != null && (
                                  <div className="mt-2">
                                    <Badge bg={stateBadgeVariant(s.currentState)}>
                                      {stateLabel(s.currentState)}
                                    </Badge>
                                  </div>
                                  
                                )}
                                <div className="mt-3">
                                  <SessionStateControl
                                    session={s}
                                    onUpdated={async () => {
                                      // ricarico lista sessioni dopo update stato
                                      const sRes = await MastersApi.getSessions(me.masterId);
                                      setSessions(sRes.data || []);
                                    }}
                                  />
                                </div>
                              </div>
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
