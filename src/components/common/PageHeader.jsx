import { Container } from "react-bootstrap";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header mb-4">
      <Container className="py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h1 className="h3 mb-1" style={{ color: "rgba(255,255,255,.92)" }}>
              {title}
            </h1>
            {subtitle && (
              <div className="small" style={{ color: "rgba(255,255,255,.68)" }}>
                {subtitle}
              </div>
            )}
          </div>

          {actions && <div className="d-flex gap-2 flex-wrap">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}
