export default function CloseModal({ closeModal } : { closeModal: () => void }) {
  return (
    <span
    className="close"
    onClick={closeModal}
  >
    &times;
  </span>
  )
}
