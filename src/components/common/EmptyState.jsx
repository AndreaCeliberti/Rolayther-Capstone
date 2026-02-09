import { Card } from "react-bootstrap";

export default function EmptyState({
  title = "Nessun contenuto",
  hint = "Al momento non ci sono dati da mostrare.",
  icon = "📭",
  action,
}) {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="border-0 shadow-sm text-center" style={{ maxWidth: 420 }}>
        <Card.Body className="p-4">
          <div className="fs-1 mb-3">{icon}</div>
          <h5 className="mb-2">{title}</h5>
          <div className="text-muted small mb-3">{hint}</div>

          {action && <div>{action}</div>}
        </Card.Body>
      </Card>
    </div>
  );
}
