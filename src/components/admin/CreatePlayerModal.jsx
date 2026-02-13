import { useContext, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../../context/ToastContext";
import { AuthContext } from "../../context/AuthContext";
import { PlayersApi } from "../../api/players.api";

const initial = {
  name: "",
  surname: "",
  nickName: "",
  dateOfBirth: "", // yyyy-mm-dd (DateOnly)
  avatarImgUrl: "",
  email: "",
  bioPlayer: "",
};

export default function CreatePlayerModal({ show, handleClose, onCreated }) {
  const { showToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "Admin";

  const [form, setForm] = useState(initial);
  const [validated, setValidated] = useState(false);
  const [saving, setSaving] = useState(false);

  const closeAndReset = () => {
    setForm(initial);
    setValidated(false);
    setSaving(false);
    handleClose();
  };

  const canSubmit = useMemo(() => {
    return (
      isAdmin &&
      form.name.trim() &&
      form.surname.trim() &&
      form.nickName.trim() &&
      form.dateOfBirth &&
      form.email.trim()
    );
  }, [form, isAdmin]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    if (!isAdmin) {
      showToast("Accesso negato: solo Admin", "danger");
      return;
    }

    if (!canSubmit) {
      showToast("Compila tutti i campi obbligatori", "danger");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        surname: form.surname.trim(),
        nickName: form.nickName.trim(),
        dateOfBirth: form.dateOfBirth, // DateOnly -> "YYYY-MM-DD"
        avatarImgUrl: form.avatarImgUrl?.trim() ? form.avatarImgUrl.trim() : null,
        email: form.email.trim(),
        bioPlayer: form.bioPlayer?.trim() ? form.bioPlayer.trim() : null,
      };

      await PlayersApi.create(payload);

      showToast("Player creato ✅", "success");
      closeAndReset();
      onCreated?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Creazione player fallita.";
      showToast(msg, "danger");
    } finally {
      setSaving(false);
    }
  };

  if (!isAdmin) {
    return (
      <Modal show={show} onHide={closeAndReset} centered animation>
        <Modal.Header closeButton>
          <Modal.Title className="text-white">Accesso negato</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-white">Solo gli Admin possono creare player.</Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal
      show={show}
      onHide={closeAndReset}
      centered
      animation
      backdrop="static"
      size="lg"
      contentClassName="border-0 shadow"
    >
      <Modal.Header closeButton className="border-0 pb-0 text-white">
        <Modal.Title className="fw-semibold"> Crea Player</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2 text-white">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Nome *</Form.Label>
                <Form.Control name="name" value={form.name} onChange={onChange} required />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Cognome *</Form.Label>
                <Form.Control name="surname" value={form.surname} onChange={onChange} required />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>NickName *</Form.Label>
                <Form.Control name="nickName" value={form.nickName} onChange={onChange} required />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Data di nascita *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Avatar URL</Form.Label>
                <Form.Control
                  name="avatarImgUrl"
                  value={form.avatarImgUrl}
                  onChange={onChange}
                  placeholder="https://..."
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="bioPlayer"
                  value={form.bioPlayer}
                  onChange={onChange}
                  placeholder="Descrizione breve..."
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end mt-4">
            <Button variant="outline-secondary" onClick={closeAndReset}>
              Annulla
            </Button>
            <Button type="submit" disabled={!canSubmit || saving}>
              {saving ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Creazione…
                </>
              ) : (
                "Crea Player"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
