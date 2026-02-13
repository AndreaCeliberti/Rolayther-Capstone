import { Card } from "react-bootstrap";

export default function GenreCard({ genre }) {
  return (
    <Card style={{ color: "var(--muted)" }} className="h-100 shadow-sm border-1">
      {genre.imageUrl && (
        <Card.Img
          variant="top"
          src={genre.imageUrl}
          style={{ height: 160, objectFit: "cover" }}
        />
      )}

      <Card.Body>
        <Card.Title className="fs-5 mb-1">{genre.name}</Card.Title>
        <Card.Text className=" mb-0">
          {(genre.description || "").slice(0, 140)}
          {(genre.description || "").length > 140 ? "…" : ""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
