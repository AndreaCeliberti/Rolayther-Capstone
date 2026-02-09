import { useContext, useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ToastContext } from "../../context/ToastContext";
import { AuthContext } from "../../context/AuthContext";
import { GenresApi } from "../../api/genres.api";

const initial = {
  name: "",
  description: "",
  imageUrl: "",
};

export default function CreateGenreModal({ show, handleClose, onCreated }) {
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
    return isAdmin && form.name.trim() && form.description.trim() && form.imageUrl.trim();
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
      await GenresApi.create({
        name: form.name.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
      });

      showToast("Genere creato", "success");
      closeAndReset();
      onCreated?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Creazione genere fallita";
      showToast(msg, "danger");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={closeAndReset} centered animation backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>+ Crea Genere</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!isAdmin ? (
          <div className="text-muted">
            <div className="fw-semibold mb-1">Accesso negato</div>
            Solo gli Admin possono creare generi.
          </div>
        ) : (
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un nome.
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
              <Form.Label>Image URL *</Form.Label>
              <Form.Control
                name="imageUrl"
                value={form.imageUrl}
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
