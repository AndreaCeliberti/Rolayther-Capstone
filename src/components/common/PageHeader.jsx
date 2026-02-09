import { Container } from "react-bootstrap";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="bg-light border-bottom mb-4">
      <Container className="py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h1 className="h3 mb-1">{title}</h1>
            {subtitle && (
              <div className="text-muted small">{subtitle}</div>
            )}
          </div>

          {actions && (
            <div className="d-flex gap-2 flex-wrap">
              {actions}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
