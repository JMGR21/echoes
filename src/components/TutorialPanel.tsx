import React from "react";
import "../styles/TutorialPanel.css";

interface TutorialPanelProps {
  currentStep: number;
  node1Active: boolean;
  node2Active: boolean;
  node3Active: boolean;
  node2Clicks: number;
}

const TutorialPanel: React.FC<TutorialPanelProps> = ({
  currentStep,
  node1Active,
  node2Active,
  node3Active,
  node2Clicks,
}) => {
  return (
    <div id="tutorialUI">
      <h3>Tutorial</h3>
      <div
        className={`tutorial-step ${currentStep === 1 ? "current" : ""} ${
          node1Active ? "completed" : ""
        }`}
      >
        <strong>1. Click Nodo Azul</strong>
        <br />
        Cilindro a la izquierda
        {node1Active && " ✓"}
      </div>
      <div
        className={`tutorial-step ${currentStep === 2 ? "current" : ""} ${
          node3Active ? "completed" : ""
        }`}
      >
        <strong>2. Click Nodo Verde 1x</strong>
        <br />
        Caja a la derecha
        {node3Active && " ✓"}
      </div>
      <div
        className={`tutorial-step ${currentStep === 3 ? "current" : ""} ${
          node2Active ? "completed" : ""
        }`}
      >
        <strong>3. Click Nodo Rosa 3x ({node2Clicks}/3)</strong>
        <br />
        Toro en el centro (gira)
        {node2Active && " ✓"}
      </div>
      <div className={`tutorial-step ${currentStep === 4 ? "current" : ""}`}>
        <strong>4. Click Portal</strong>
        <br />
        ¡Entra a través!
      </div>
    </div>
  );
};

export default TutorialPanel;
