import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { stateBadgeVariant, stateLabel } from "../../utils/sessionState";

export default function SessionCard({ session }) {
  const playersCount = session.players?.length ?? 0;
  const maxPlayers = session.numbOfPlayer ?? 0;
  const isFull = maxPlayers > 0 && playersCount >= maxPlayers;

  const scheduled = session.scheduledAt
    ? new Date(session.scheduledAt).toLocaleString()
    : "—";

  return (
    <Card className="h-100 shadow-sm border-0">
      {session.coverImgUrl && (
        <Card.Img
          variant="top"
          src={session.coverImgUrl}
          style={{ height: 160, objectFit: "cover" }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <Card.Title className="fs-5 mb-1">{session.sessionTitle}</Card.Title>
          <Badge bg={isFull ? "danger" : "success"}>
            {isFull ? "Full" : "Open"}
          </Badge>
          <Badge bg={stateBadgeVariant(session.currentState)} className="ms-auto">
            {stateLabel(session.currentState)}
          </Badge>
        </div>

        <Card.Text className="text-muted small mb-2">
          {scheduled} • durata: {session.duration}
        </Card.Text>

        <Card.Text className="mb-3" style={{ overflow: "hidden" }}>
          {(session.sessionDescription || "").slice(0, 90)}
          {(session.sessionDescription || "").length > 90 ? "…" : ""}
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="small text-muted">
            👥 {playersCount}/{maxPlayers || "∞"}
          </span>

          <Button
            as={Link}
            to={`/sessions/${session.sessionId}`}
            variant="primary"
            size="sm"
          >
            Partecipa
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
