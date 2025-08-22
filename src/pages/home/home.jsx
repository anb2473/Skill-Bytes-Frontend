import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Home.css";

function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;

    // === Scene / Camera / Renderer ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      500
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000);
    mountEl.appendChild(renderer.domElement);

    // === Points / Flock parameters ===
    const NUM_POINTS = 60;
    const SPACE = 200; // cubic space half-width
    const MIN_DIST = 40; // minimum distance to avoid overlap
    const MAX_DIST = 70; // max distance to connect lines
    const SPEED = 0.2;

    // Initialize points
    const points = [];
    const velocities = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * SPACE * 2,
        (Math.random() - 0.5) * SPACE * 2,
        (Math.random() - 0.5) * SPACE * 2
      ));
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED
      ));
    }

    // Create line geometry (initially empty)
    const linePositions = new Float32Array(NUM_POINTS * NUM_POINTS * 6); // max
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // === Flocking update function ===
    const CENTER_FORCE = 0.00002;  // gentle pull toward center
    const REPULSION = 0.08;      // stronger repulsion
    const ATTRACTION = 0.0002;   // much weaker attraction
    const DAMPING = 0.92;        // stronger velocity damp

    const updatePoints = () => {
      for (let i = 0; i < NUM_POINTS; i++) {
        const p = points[i];
        const v = velocities[i];

        let move = new THREE.Vector3();

        for (let j = 0; j < NUM_POINTS; j++) {
          if (i === j) continue;
          const other = points[j];
          const dir = new THREE.Vector3().subVectors(other, p);
          const dist = dir.length();

          if (dist < MIN_DIST) {
            // repulsion: stronger if too close
            dir.normalize().multiplyScalar(-REPULSION / dist);
            move.add(dir);
          } else if (dist < MAX_DIST) {
            // attraction: gentle
            dir.normalize().multiplyScalar(ATTRACTION);
            move.add(dir);
          }
        }

        // gentle centering force to keep swarm in view
        move.add(p.clone().multiplyScalar(-CENTER_FORCE));

        // --- ADD RANDOM WANDER ---
        const wander = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        );
        move.add(wander);

        // update velocity
        v.add(move);
        v.multiplyScalar(DAMPING);

        // update position
        p.add(v);
      }
    };

    // === Update lines ===
    const updateLines = () => {
      let ptr = 0;
      for (let i = 0; i < NUM_POINTS; i++) {
        for (let j = i + 1; j < NUM_POINTS; j++) {
          const dist = points[i].distanceTo(points[j]);
          if (dist < MAX_DIST) {
            linePositions[ptr++] = points[i].x;
            linePositions[ptr++] = points[i].y;
            linePositions[ptr++] = points[i].z;

            linePositions[ptr++] = points[j].x;
            linePositions[ptr++] = points[j].y;
            linePositions[ptr++] = points[j].z;
          }
        }
      }
      linesGeometry.setDrawRange(0, ptr / 3);
      linesGeometry.attributes.position.needsUpdate = true;
    };

    // === Animation loop ===
    const animate = () => {
      updatePoints();
      updateLines();

      // Rotate camera slowly for 3D feel
      camera.position.x = Math.sin(Date.now() * 0.0002) * 120;
      camera.position.z = Math.cos(Date.now() * 0.0002) * 120;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // === Handle resize ===
    const onResize = () => {
      camera.aspect = mountEl.clientWidth / mountEl.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mountEl.removeChild(renderer.domElement);
      lines.geometry.dispose();
      lines.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="home-root">
      <div ref={mountRef} className="canvas-container"></div>
      <div className="home-content-left">
        <h1>Welcome</h1>
        <h2>to Skill Bytes</h2>
        <button>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
