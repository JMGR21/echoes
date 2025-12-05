import React, { useEffect } from "react";
import { useGameState } from "./hooks/useGameState";
import Scene from "./components/Scene";
import UIPanel from "./components/UIPanel";
import TutorialPanel from "./components/TutorialPanel";
import CompletionScreen from "./components/CompletionScreen";
import "./App.css";

function App() {
  const {
    state,
    activateNode,
    increaseNode2Clicks,
    completeGame,
    reset,
    getProgress,
    getCurrentStep,
  } = useGameState();

  const progress = getProgress();
  const currentStep = getCurrentStep();

  // Handle portal click completion
  const handlePortalClick = () => {
    completeGame();
  };

  // Handle restart
  const handleRestart = () => {
    reset();
  };

  // Hide UI when completed
  useEffect(() => {
    if (state.completed) {
      const mainUI = document.getElementById("mainUI");
      const tutorialUI = document.getElementById("tutorialUI");
      if (mainUI) mainUI.style.display = "none";
      if (tutorialUI) tutorialUI.style.display = "none";
    } else {
      const mainUI = document.getElementById("mainUI");
      const tutorialUI = document.getElementById("tutorialUI");
      if (mainUI) mainUI.style.display = "block";
      if (tutorialUI) tutorialUI.style.display = "block";
    }
  }, [state.completed]);

  return (
    <div className="app">
      <Scene
        onNodeClick={(nodeId) => activateNode(nodeId as any)}
        onNode2Click={increaseNode2Clicks}
        onPortalClick={handlePortalClick}
        portalActive={state.portalActive}
        node1Active={state.node1}
        node2Active={state.node2}
        node3Active={state.node3}
        node2Clicks={state.node2Clicks}
      />

      <UIPanel
        progress={progress}
        node1Active={state.node1}
        node2Active={state.node2}
        node3Active={state.node3}
      />

      <TutorialPanel
        currentStep={currentStep}
        node1Active={state.node1}
        node2Active={state.node2}
        node3Active={state.node3}
        node2Clicks={state.node2Clicks}
      />

      <CompletionScreen
        show={state.completed}
        onClose={() => reset()}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;
