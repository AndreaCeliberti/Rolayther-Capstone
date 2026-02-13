import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MasterCard({ master }) {
  return (
    <Card as={Link}
      to={`/masters/${master.masterId}`}
      className="h-100 shadow-sm border-0 text-decoration-none text-dark master-card"
      style={{ cursor: "pointer" }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
            style={{ width: 52, height: 52, overflow: "hidden" }}
          >
            {master.avatarImgUrl ? (
              <img
                src={master.avatarImgUrl}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span className="fw-bold">🧙</span>
            )}
          </div>

          <div className="flex-grow-1">
            <div className="fw-semibold">
              {master.nickName || `${master.name} ${master.surname}`}
            </div>
            <div className="text-muted small">{master.email}</div>
          </div>
        </div>

        {master.bioMaster && (
          <div className="text-muted small mt-3">
            {master.bioMaster.slice(0, 120)}
            {master.bioMaster.length > 120 ? "…" : ""}
          </div>
        )}

        <div className="mt-auto pt-3 small text-muted">
          Sessioni: {master.sessions?.length ?? 0} 
        </div>
        
      </Card.Body>
    </Card>
  );
}
