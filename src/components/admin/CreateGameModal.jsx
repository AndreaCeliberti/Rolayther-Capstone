import { useContext, useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ToastContext } from "../../context/ToastContext";
import { AuthContext } from "../../context/AuthContext";
import { GamesApi } from "../../api/games.api";

const initial = {
  title: "",
  description: "",
  coverImageUrl: "",
};

export default function CreateGameModal({ show, handleClose, onCreated }) {
  const { showToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "Admin";

  const [form, setForm] = useState(initial);
  const [validated, setValidated] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!show) {
      setForm(initial);
      setValidated(false);
      setSaving(false);
    }
  }, [show]);

  const canSubmit = useMemo(() => {
    return (
      isAdmin &&
      form.title.trim() &&
      form.description.trim() &&
      form.coverImageUrl.trim()
    );
  }, [isAdmin, form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const closeAndReset = () => {
    setForm(initial);
    setValidated(false);
    setSaving(false);
    handleClose();
  };

  const onSubmit = async (e) => {
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
      await GamesApi.create({
        title: form.title.trim(),
        description: form.description.trim(),
        coverImageUrl: form.coverImageUrl.trim(),
      });

      showToast("Gioco creato", "success");
      closeAndReset();
      onCreated?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Creazione gioco fallita";
      showToast(msg, "danger");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={closeAndReset} centered animation backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>+ Crea Gioco</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!isAdmin ? (
          <div className="text-muted">
            <div className="fw-semibold mb-1">Accesso negato</div>
            Solo gli Admin possono creare giochi.
          </div>
        ) : (
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Titolo *</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={onChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un titolo.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={onChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci una descrizione.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL *</Form.Label>
              <Form.Control
                name="coverImageUrl"
                value={form.coverImageUrl}
                onChange={onChange}
                required
                placeholder="https://..."
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un URL.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={closeAndReset}>
                Annulla
              </Button>
              <Button type="submit" disabled={!canSubmit || saving}>
                {saving ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Salvataggio…
                  </>
                ) : (
                  "Crea"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
