import React from "react";
import "../styles/CompletionScreen.css";

interface CompletionScreenProps {
  show: boolean;
  onClose: () => void;
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  show,
  onClose,
  onRestart,
}) => {
  if (!show) return null;

  return (
    <div className={`completionScreen ${show ? "show" : ""}`}>
      <div className="particles">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>
      <div className="success-star">✨</div>
      <h1 className="completionTitle">¡COMPLETADO!</h1>
      <div className="subtitle">NIVEL FINALIZADO</div>
      <div className="message">
        <p>Has dominado los tres nodos y te has adentrado en el Portal.</p>
        <p>¡Bienvenido a Echoes of the Atrium!</p>
      </div>
      <div className="button-group">
        <button className="completion-button" onClick={onRestart}>
          REINICIAR DEMO
        </button>
        <button className="completion-button secondary" onClick={onClose}>
          CERRAR
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;
