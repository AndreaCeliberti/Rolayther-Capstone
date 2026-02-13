import { Card } from "react-bootstrap";

export default function EmptyState({
  title = "Nessun contenuto",
  hint = "Al momento non ci sono dati da mostrare.",
  icon = "📭",
  action,
}) {
  return (
    <div className="d-flex justify-content-center mt-5 px-3">
      <Card
        className="border-0 text-center hover-glow"
        style={{
          maxWidth: 460,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-soft)",
          borderRadius: "var(--radius)",
          color: "var(--text)",
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: 68,
              height: 68,
              borderRadius: "999px",
              background: "rgba(139,92,246,.10)",
              border: "1px solid rgba(167,120,255,.18)",
              boxShadow: "0 0 26px rgba(139,92,246,.18)",
              fontSize: 28,
            }}
          >
            {icon}
          </div>

          <h5 className="mb-2" style={{ color: "var(--text)" }}>
            {title}
          </h5>

          <div className="small mb-3" style={{ color: "var(--muted)" }}>
            {hint}
          </div>

          {action && <div className="mt-2">{action}</div>}
        </Card.Body>
      </Card>
    </div>
  );
}
