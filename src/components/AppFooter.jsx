import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-top bg-white">
      <Container className="py-4">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          {/* Brand + copyright */}
          <div className="text-center text-md-start">
            <div className="fw-semibold">Rolayther</div>
            <div className="text-muted small">© {year} • Tutti i diritti riservati</div>
          </div>

          {/* Links interni */}
          <div className="d-flex flex-wrap justify-content-center gap-3 small">
            <Link className="text-decoration-none text-muted" to="/sessions">
              Sessioni
            </Link>
            <Link className="text-decoration-none text-muted" to="/masters">
              Masters
            </Link>
            <Link className="text-decoration-none text-muted" to="/games">
              Games
            </Link>
            <Link className="text-decoration-none text-muted" to="/genres">
              Genres
            </Link>
            <Link className="text-decoration-none text-muted" to="/platforms">
              Platforms
            </Link>
          </div>

          {/* Social */}
          <div className="d-flex align-items-center justify-content-center gap-3">
            <SocialIcon href="https://instagram.com" label="Instagram">
              <FaInstagram />
            </SocialIcon>

            <SocialIcon href="https://github.com" label="GitHub">
              <FaGithub />
            </SocialIcon>

            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <FaLinkedin />
            </SocialIcon>

            <SocialIcon href="https://facebook.com" label="Facebook">
              <FaFacebook />
            </SocialIcon>

            <SocialIcon href="https://youtube.com" label="YouTube">
              <FaYoutube />
            </SocialIcon>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="footer-social d-inline-flex align-items-center justify-content-center text-muted"
      style={{
        width: 38,
        height: 38,
        borderRadius: "999px",
        border: "1px solid rgba(0,0,0,.08)",
        background: "rgba(0,0,0,.02)",
        textDecoration: "none",
      }}
    >
      <span style={{ fontSize: 18, lineHeight: 0 }}>{children}</span>
    </a>
  );
}
