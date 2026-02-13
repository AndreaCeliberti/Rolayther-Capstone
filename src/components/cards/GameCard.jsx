import { Card, Badge } from "react-bootstrap";

export default function GameCard({ game }) {
  return (
    <Card style={{ color: "var(--muted)" }} className="h-100 shadow-sm border-1">
      {game.coverImageUrl && (
        <Card.Img
          variant="top"
          src={game.coverImageUrl}
          style={{ height: 160, objectFit: "cover" }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5 mb-1">{game.title}</Card.Title>

        

        <Card.Text className="mb-0">
          {(game.description || "").slice(0, 140)}
          {(game.description || "").length > 140 ? "…" : ""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
