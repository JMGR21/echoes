import React from "react";
import "../styles/UIPanel.css";

interface UIPanelProps {
  progress: number;
  node1Active: boolean;
  node2Active: boolean;
  node3Active: boolean;
}

const UIPanel: React.FC<UIPanelProps> = ({
  progress,
  node1Active,
  node2Active,
  node3Active,
}) => {
  return (
    <div id="mainUI">
      <h2>Echoes — Atrium</h2>
      <p id="mainMessage">
        {progress === 100
          ? "✓ Todos los nodos activados. Portal revelado. ¡Entra!"
          : "Bienvenido. Activa los 3 nodos para revelar el portal."}
      </p>

      <div id="progressBar">
        <div id="progressFill" style={{ width: `${progress}%` }} />
      </div>

      <div id="statusContainer">
        <div className={`node-status ${node1Active ? "active" : "inactive"}`}>
          <div className="status-indicator" />
          <span>Nodo 1 (Azul)</span>
        </div>
        <div className={`node-status ${node2Active ? "active" : "inactive"}`}>
          <div className="status-indicator" />
          <span>Nodo 2 (Rosa) — Click 3x</span>
        </div>
        <div className={`node-status ${node3Active ? "active" : "inactive"}`}>
          <div className="status-indicator" />
          <span>Nodo 3 (Verde)</span>
        </div>
      </div>
    </div>
  );
};

export default UIPanel;
