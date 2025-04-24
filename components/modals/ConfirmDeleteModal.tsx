import React from "react";
import { motion } from "framer-motion";
import { useBookItemContext } from '@/context/BookItemContext';

interface ConfirmDeleteModalProps {
  title: string
}

export default function ConfirmDeleteModal({ title }: ConfirmDeleteModalProps) {
  
    const {
      setShowDeleteModal,
      onConfirm,
      isDeleting
    } = useBookItemContext();
  
  return (
    <motion.div
      className="confirm-delete-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="confirm-delete-modal-content"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3>¿Estás seguro?</h3>
        <p>¿Realmente deseas eliminar <span>{title}</span>?</p>
        <p>Esta acción no se puede deshacer.</p>
        <div className="confirm-delete-modal-send">
          <button className="button danger" onClick={onConfirm}>
            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
          </button>
          <button className="button secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
