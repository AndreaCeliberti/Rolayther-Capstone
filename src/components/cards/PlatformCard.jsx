import { Card } from "react-bootstrap";

export default function PlatformCard({ platform }) {
  return (
    <Card style={{ color: "var(--muted)" }} className="h-100 shadow-sm border-1">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center"
            style={{ width: 52, height: 52, overflow: "hidden" }}
          >
            {platform.logoUrl ? (
              <img
                src={platform.logoUrl}
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span className="fw-bold">🕹️</span>
            )}
          </div>

          <div>
            <div className="fw-semibold">{platform.name}</div>
            <div className=" small">
              {(platform.description || "—").slice(0, 70)}
              {(platform.description || "").length > 70 ? "…" : ""}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3 small text-muted">
          {platform.masterId ? `MasterId: ${platform.masterId}` : ""}
        </div>
      </Card.Body>
    </Card>
  );
}
