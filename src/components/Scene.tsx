// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from "react";
import "../styles/Scene.css";

interface SceneProps {
  onNodeClick: (nodeId: string) => void;
  onNode2Click: () => void;
  onPortalClick: () => void;
  portalActive: boolean;
  node1Active: boolean;
  node2Active: boolean;
  node3Active: boolean;
  node2Clicks: number;
}

const Scene: React.FC<SceneProps> = ({
  onNodeClick,
  onNode2Click,
  onPortalClick,
  portalActive,
  node1Active,
  node2Active,
  node3Active,
  node2Clicks,
}) => {
  const sceneRef = useRef<HTMLElement>(null);

  // Register all click handlers once when component mounts
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    console.log("Scene mounted, setting up click handlers");

    const handleNode1Click = () => {
      console.log("Node 1 clicked");
      onNodeClick("node1");
    };

    const handleNode2Click = () => {
      console.log("Node 2 clicked");
      onNode2Click();
    };

    const handleNode3Click = () => {
      console.log("Node 3 clicked");
      onNodeClick("node3");
    };

    const handlePortalClick = () => {
      console.log("Portal clicked, portalActive:", portalActive);
      if (portalActive) {
        onPortalClick();
      }
    };

    // Find and attach listeners with retries
    const attachListeners = () => {
      const node1 = scene.querySelector("#node1");
      const node2 = scene.querySelector("#node2");
      const node3 = scene.querySelector("#node3");
      const portal = scene.querySelector("#portal");

      console.log(
        "Attaching listeners - Node1:",
        !!node1,
        "Node2:",
        !!node2,
        "Node3:",
        !!node3,
        "Portal:",
        !!portal
      );

      if (node1) node1.addEventListener("click", handleNode1Click);
      if (node2) node2.addEventListener("click", handleNode2Click);
      if (node3) node3.addEventListener("click", handleNode3Click);
      if (portal) portal.addEventListener("click", handlePortalClick);

      return () => {
        if (node1) node1.removeEventListener("click", handleNode1Click);
        if (node2) node2.removeEventListener("click", handleNode2Click);
        if (node3) node3.removeEventListener("click", handleNode3Click);
        if (portal) portal.removeEventListener("click", handlePortalClick);
      };
    };

    // Try attaching immediately, then retry after a delay if scene not ready
    let cleanup = attachListeners();
    const timeout = setTimeout(() => {
      cleanup();
      cleanup = attachListeners();
    }, 500);

    return () => {
      clearTimeout(timeout);
      cleanup();
    };
  }, [onNodeClick, onNode2Click, onPortalClick, portalActive]);

  // Update node 1 material when activated
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const node1 = scene.querySelector("#node1");
    if (node1 && node1Active) {
      node1.setAttribute("material", "color: #39f; emissive: #39f");
      node1.setAttribute(
        "animation__activate",
        "property: scale; from: 1 1 1; to: 1.15 1.15 1.15; dur: 300; easing: easeOutQuad; dir: alternate"
      );
    }
  }, [node1Active]);

  // Update node 2 material when activated
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const node2 = scene.querySelector("#node2");
    if (node2 && node2Active) {
      node2.setAttribute("material", "color: #39f; emissive: #39f");
      node2.setAttribute(
        "animation__activate",
        "property: scale; from: 1 1 1; to: 1.15 1.15 1.15; dur: 300; easing: easeOutQuad; dir: alternate"
      );
    }
  }, [node2Active]);

  // Rotate node 2 on each click
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const node2 = scene.querySelector("#node2");
    if (node2) {
      const currentRotation = node2.getAttribute("rotation");
      const yRotation = currentRotation ? currentRotation.y : 0;
      const newYRotation = yRotation + 45;

      node2.setAttribute("rotation", `0 ${newYRotation} 0`);
      node2.setAttribute(
        "animation__rotate",
        `property: rotation; from: 0 ${yRotation} 0; to: 0 ${newYRotation} 0; dur: 300; easing: easeOutQuad`
      );
    }
  }, [node2Clicks]);

  // Update node 3 material when activated
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const node3 = scene.querySelector("#node3");
    if (node3 && node3Active) {
      node3.setAttribute("material", "color: #39f; emissive: #39f");
      node3.setAttribute(
        "animation__activate",
        "property: scale; from: 1 1 1; to: 1.15 1.15 1.15; dur: 300; easing: easeOutQuad; dir: alternate"
      );
    }
  }, [node3Active]);

  // Portal animation and visibility
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const portal = scene.querySelector("#portal");
    const portalRing = scene.querySelector("#portal-ring");
    const portalRingSecondary = scene.querySelector("#portal-ring-secondary");
    const portalAura = scene.querySelector("#portal-aura");
    const portalLabel = scene.querySelector("#portal-label");
    const portalCore = scene.querySelector("#portal-core");
    const portalLight = scene.querySelector("#portal-light");

    if (portal) {
      portal.setAttribute("visible", portalActive ? "true" : "false");
      if (portalRing)
        portalRing.setAttribute("visible", portalActive ? "true" : "false");
      if (portalRingSecondary)
        portalRingSecondary.setAttribute(
          "visible",
          portalActive ? "true" : "false"
        );
      if (portalAura)
        portalAura.setAttribute("visible", portalActive ? "true" : "false");
      if (portalLabel)
        portalLabel.setAttribute("visible", portalActive ? "true" : "false");
      if (portalCore)
        portalCore.setAttribute("visible", portalActive ? "true" : "false");
      if (portalLight)
        portalLight.setAttribute("visible", portalActive ? "true" : "false");

      if (portalActive) {
        // Entrance animation for cylinder (invisible but clickable)
        portal.setAttribute(
          "animation__entrance",
          "property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic"
        );

        // Entrance and animations for all visual rings
        if (portalRing) {
          portalRing.setAttribute(
            "animation__entrance",
            "property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic"
          );
        }

        if (portalRingSecondary) {
          portalRingSecondary.setAttribute(
            "animation__entrance",
            "property: scale; from: 0 0 0; to: 1 1 1; dur: 1200; easing: easeOutElastic"
          );
        }

        if (portalAura) {
          portalAura.setAttribute(
            "animation__entrance",
            "property: scale; from: 0 0 0; to: 1 1 1; dur: 1400; easing: easeOutElastic"
          );
        }

        if (portalCore) {
          portalCore.setAttribute(
            "animation__entrance",
            "property: scale; from: 0 0 0; to: 1 1 1; dur: 800; easing: easeOutElastic"
          );
        }
      }
    }
  }, [portalActive]);

  return (
    // @ts-expect-error - A-Frame components are not recognized by TypeScript
    <a-scene
      ref={sceneRef}
      background="color: #0a0015"
      vr-mode-ui="enabled: false"
      fog="type: exponential; color: #0a0015; density: 0.04"
    >
      <a-entity id="cameraRig">
        <a-camera id="camera" position="0 1.6 4" look-controls wasd-controls>
          <a-cursor
            fuse="false"
            rayOrigin="mouse"
            raycaster="far: 100; objects: .clickable"
            geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
            material="color: #00ffff; shader: flat; emissive: #00ffff; emissiveIntensity: 0.5"
          />
        </a-camera>
      </a-entity>

      {/* Professional floor with gradient */}
      <a-entity
        geometry="primitive: cylinder; radius:12; height:0.08"
        material="color:#0d001a; shader: flat"
        position="0 -0.04 0"
      />

      {/* Primary grid rings */}
      <a-entity position="0 0.01 0">
        <a-ring
          radius-inner="0.5"
          radius-outer="12"
          rotation="-90 0 0"
          material="color:#1a0d3d; shader: flat; opacity:0.4; side: double"
        />
      </a-entity>

      {/* Secondary grid lines for depth */}
      <a-entity position="0 0.02 0">
        <a-ring
          radius-inner="1"
          radius-outer="12"
          rotation="-90 0 0"
          material="color:#2d1a5e; shader: flat; opacity:0.3; side: double"
        />
      </a-entity>

      {/* Advanced lighting system */}
      {/* Fill light - ambient blue */}
      <a-entity light="type: ambient; intensity:0.5; color:#4a9eff" />

      {/* Key light - directional cyan */}
      <a-entity
        light="type: directional; intensity:0.8; color:#00ffff; castShadow: true"
        position="3 5 2"
      />

      {/* Rim light - magenta from back */}
      <a-entity
        light="type: directional; intensity:0.4; color:#ff00ff"
        position="-2 3 -4"
      />

      {/* Point light near portal area - creates depth */}
      <a-entity
        light="type: point; intensity:0.6; color:#00ffff; distance: 15; decay: 1.5"
        position="0 2 -6"
      />

      {/* Nodes with professional styling */}
      <a-entity id="nodes">
        {/* Node 1: Blue Cylinder - Left side with shadow */}
        <a-entity position="-4 0.6 0">
          {/* Shadow effect */}
          <a-cylinder
            radius="0.3"
            height="0.05"
            position="0 -0.4 0"
            material="color: #000000; opacity: 0.3; shader: flat"
          />
          {/* Main node with better materials */}
          <a-cylinder
            class="clickable node"
            id="node1"
            radius="0.25"
            height="0.6"
            material="color: #00d4ff; emissive: #0088ff; emissiveIntensity:1; metalness: 0.7; roughness: 0.3; wireframe: false"
            shadow="cast: true; receive: false"
          />
          {/* Glow ring around node */}
          <a-ring
            radius-inner="0.28"
            radius-outer="0.38"
            position="0 0 0.26"
            rotation="0 0 0"
            material="color: #00d4ff; emissive: #0088ff; emissiveIntensity: 0.8; opacity: 0.6; shader: flat"
          />
          <a-text
            value="NODO 1"
            position="0 -0.65 0"
            align="center"
            color="#00d4ff"
            font-size="0.25"
            font="https://cdn.aframe.io/fonts/Roboto-msdf.json"
          />
        </a-entity>

        {/* Node 2: Pink Torus - Right side */}
        <a-entity position="4 0.6 1">
          {/* Shadow effect */}
          <a-cylinder
            radius="0.6"
            height="0.05"
            position="0 -0.4 0"
            material="color: #000000; opacity: 0.3; shader: flat"
          />
          <a-torus
            class="clickable node"
            id="node2"
            radius="0.5"
            radius-tubular="0.1"
            material="color:#ff1493; emissive:#ff69b4; emissiveIntensity:1; metalness: 0.8; roughness: 0.2"
            rotation="0 0 0"
            shadow="cast: true; receive: false"
          />
          {/* Outer glow ring */}
          <a-ring
            radius-inner="0.55"
            radius-outer="0.72"
            position="0 0 0"
            material="color: #ff1493; emissive: #ff69b4; emissiveIntensity: 0.7; opacity: 0.5; shader: flat"
          />
          <a-text
            value={`NODO 2`}
            position="0 -0.8 0"
            align="center"
            color="#ff1493"
            font-size="0.25"
            font="https://cdn.aframe.io/fonts/Roboto-msdf.json"
          />
          <a-text
            value={`${node2Clicks}/3`}
            position="0 -1.05 0"
            align="center"
            color="#ff69b4"
            font-size="0.2"
            font="https://cdn.aframe.io/fonts/Roboto-msdf.json"
          />
        </a-entity>

        {/* Node 3: Green Box - Center back */}
        <a-entity position="0 0.9 -4">
          {/* Shadow effect */}
          <a-box
            depth="1"
            height="0.05"
            width="1"
            position="0 -0.4 0"
            material="color: #000000; opacity: 0.3; shader: flat"
          />
          <a-box
            class="clickable node"
            id="node3"
            depth="0.15"
            height="0.6"
            width="0.9"
            material="color:#00ff7f; emissive:#00dd66; emissiveIntensity:1; metalness: 0.6; roughness: 0.4"
            shadow="cast: true; receive: false"
          />
          {/* Edge glow */}
          <a-box
            depth="0.16"
            height="0.61"
            width="0.91"
            material="color: #00ff7f; emissive: #00ff7f; emissiveIntensity: 0.5; opacity: 0.3; shader: flat; wireframe: true"
          />
          <a-text
            value="NODO 3"
            position="0 -0.65 0"
            align="center"
            color="#00ff7f"
            font-size="0.25"
            font="https://cdn.aframe.io/fonts/Roboto-msdf.json"
          />
        </a-entity>
      </a-entity>

      {/* Portal - Professional entrance */}
      <a-entity position="0 1 0">
        {/* Invisible clickable cylinder */}
        <a-cylinder
          className="clickable"
          id="portal"
          radius="1.5"
          height="0.5"
          visible="false"
        />

        {/* Inner core - rotating */}
        <a-cylinder
          id="portal-core"
          radius="0.6"
          height="0.3"
          position="0 0 0"
          visible="false"
          material="color:#00ffff; emissive:#00ffff; emissiveIntensity:1; opacity:0.8; shader: flat"
          animation="property: rotation; from: 0 0 0; to: 0 360 0; dur: 4000; loop: true; easing: linear"
        />

        {/* Primary ring - main portal indicator */}
        <a-ring
          id="portal-ring"
          radius-inner="1"
          radius-outer="1.5"
          visible="false"
          material="color:#00ffff; emissive:#0088ff; emissiveIntensity:1; opacity:0.9; shader: flat; side: double"
        />

        {/* Secondary rotating ring */}
        <a-ring
          id="portal-ring-secondary"
          radius-inner="0.8"
          radius-outer="1.2"
          position="0 0 0.1"
          rotation="90 0 0"
          visible="false"
          material="color:#ff00ff; emissive:#ff00ff; emissiveIntensity:0.7; opacity:0.6; shader: flat; side: double"
          animation="property: rotation; from: 90 0 0; to: 90 360 0; dur: 6000; loop: true; easing: linear"
        />

        {/* Outer aura ring */}
        <a-ring
          id="portal-aura"
          radius-inner="1.4"
          radius-outer="1.9"
          position="0 0 0"
          visible="false"
          material="color:#00ffff; emissive:#00ffff; emissiveIntensity:0.4; opacity:0.3; shader: flat; side: double"
          animation="property: scale; from: 1 1 1; to: 1.15 1.15 1.15; dur: 2000; dir: alternate; loop: true; easing: easeInOutSine"
        />

        {/* Portal label */}
        <a-text
          id="portal-label"
          value="PORTAL REVELADO"
          position="0 1.5 0"
          align="center"
          color="#00ffff"
          font-size="0.35"
          visible="false"
          font="https://cdn.aframe.io/fonts/Roboto-msdf.json"
          animation="property: position; from: 0 1.5 0; to: 0 1.7 0; dur: 1500; dir: alternate; loop: true; easing: easeInOutSine"
        />

        {/* Light point at portal center */}
        <a-entity
          id="portal-light"
          position="0 0 0"
          visible="false"
          light="type: point; intensity:1.5; color:#00ffff; distance: 8; decay: 1; castShadow: true"
        />
      </a-entity>

      {/* Advanced sky with gradient effect */}
      <a-sky color="#0a0015" />

      {/* Background atmosphere entity */}
      <a-sphere
        radius="100"
        position="0 0 0"
        material="color: #15003d; emissive: #150030; emissiveIntensity: 0.3; opacity: 0.8; shader: flat; side: back"
      />
    </a-scene>
  );
};

export default Scene;
