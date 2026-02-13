export const SESSION_STATES = {
  Draft: 0,
  Published: 1,
  Full: 2,
  InProgress: 3,
  Completed: 4,
  Cancelled: 5,
};

export const STATE_LABELS = {
  0: "Bozza",
  1: "Pubblicata",
  2: "Piena",
  3: "In corso",
  4: "Completata",
  5: "Annullata",
};

export function stateLabel(state) {
  if (state == null) return "—";
  return STATE_LABELS[state] ?? String(state);
}

export function stateBadgeVariant(state) {
  // varianti bootstrap: primary, secondary, success, danger, warning, info, light, dark
  switch (Number(state)) {
    case 0: return "secondary"; // Draft
    case 1: return "primary";   // Published
    case 2: return "warning";   // Full
    case 3: return "info";      // InProgress
    case 4: return "success";   // Completed
    case 5: return "danger";    // Cancelled
    default: return "secondary";
  }
}
