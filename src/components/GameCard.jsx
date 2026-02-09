import { Card, Badge } from "react-bootstrap";

export default function GameCard({ game }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      {game.coverImageUrl && (
        <Card.Img
          variant="top"
          src={game.coverImageUrl}
          style={{ height: 160, objectFit: "cover" }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5 mb-1">{game.title}</Card.Title>

        <Card.Text className="text-muted small mb-2">
          Generi: <Badge bg="secondary">{game.genres?.length ?? 0}</Badge>
        </Card.Text>

        <Card.Text className="mb-0">
          {(game.description || "").slice(0, 140)}
          {(game.description || "").length > 140 ? "…" : ""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
