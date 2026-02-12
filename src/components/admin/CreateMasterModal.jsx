import { useContext, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { ToastContext } from "../../context/ToastContext";
import { AuthContext } from "../../context/AuthContext";
import { MastersApi } from "../../api/masters.api";

const initial = {
  name: "",
  surname: "",
  nickName: "",
  dateOfBirth: "", // yyyy-mm-dd (DateOnly)
  avatarImgUrl: "",
  email: "",
  bioMaster: "",
  password: "",
  confirmPassword: "",
};

export default function CreateMasterModal({ show, handleClose, onCreated }) {
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

  const passwordsMatch = useMemo(() => {
    return form.password === form.confirmPassword;
  }, [form.password, form.confirmPassword]);

  const passwordOk = useMemo(() => {
    return (form.password?.trim() || "").length >= 6;
  }, [form.password]);

  const canSubmit = useMemo(() => {
    return (
      isAdmin &&
      form.name.trim() &&
      form.surname.trim() &&
      form.nickName.trim() &&
      form.dateOfBirth &&
      form.email.trim() &&
      passwordOk &&
      passwordsMatch
    );
  }, [form, isAdmin, passwordOk, passwordsMatch]);

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

    if (!passwordOk) {
      showToast("La password deve contenere almeno 6 caratteri", "danger");
      return;
    }

    if (!passwordsMatch) {
      showToast("Le password non coincidono", "danger");
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
        bioMaster: form.bioMaster?.trim() ? form.bioMaster.trim() : null,
        password: form.password, // <-- aggiunta
      };

      await MastersApi.create(payload);

      showToast("Master creato ✅", "success");
      closeAndReset();
      onCreated?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Creazione master fallita.";
      showToast(msg, "danger");
    } finally {
      setSaving(false);
    }
  };

  if (!isAdmin) {
    return (
      <Modal show={show} onHide={closeAndReset} centered animation>
        <Modal.Header closeButton>
          <Modal.Title>Accesso negato</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-muted">Solo gli Admin possono creare master.</Modal.Body>
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
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-semibold">+ Crea Master</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2">
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

            {/* PASSWORD */}
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                  minLength={6}
                  isInvalid={validated && !passwordOk}
                />
                <Form.Control.Feedback type="invalid">
                  Minimo 6 caratteri.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Conferma password *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={onChange}
                  required
                  isInvalid={validated && !passwordsMatch}
                />
                <Form.Control.Feedback type="invalid">
                  Le password non coincidono.
                </Form.Control.Feedback>
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
                  name="bioMaster"
                  value={form.bioMaster}
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
                "Crea Master"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
