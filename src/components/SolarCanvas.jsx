import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SolarCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Texture Generation (Soft glowing radial disc)
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(255, 235, 150, 0.9)');
      gradient.addColorStop(0.55, 'rgba(112, 217, 67, 0.5)');
      gradient.addColorStop(0.85, 'rgba(8, 102, 198, 0.15)');
      gradient.addColorStop(1, 'rgba(8, 102, 198, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleCount = prefersReducedMotion ? 30 : 90;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color('#FFB703'), // Warm solar gold
      new THREE.Color('#70D943'), // Vivid Solar Arise green
      new THREE.Color('#239B35'), // Deep Solar green
      new THREE.Color('#60A5FA'), // Morning sky blue
      new THREE.Color('#FFFFFF')  // Pure bright photon
    ];

    for (let i = 0; i < particleCount; i++) {
      // Concentrate slightly more on the sunny left and middle foreground
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 1.2 + Math.random() * 2.8;
      speeds[i] = 0.08 + Math.random() * 0.16;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4.5,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = normalizedX * 4;
      targetMouseY = normalizedY * 4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle camera mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      camera.position.x = currentMouseX;
      camera.position.y = currentMouseY;
      camera.lookAt(0, 0, 0);

      // Particle float motion
      if (!prefersReducedMotion) {
        const positionAttr = geometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          let y = positionAttr.getY(i);
          let x = positionAttr.getX(i);

          y += speeds[i] * 0.45;
          x += Math.sin(elapsedTime * 0.5 + i) * 0.04;

          // Wrap around top boundary
          if (y > 45) {
            y = -45;
            x = (Math.random() - 0.5) * 110;
          }

          positionAttr.setY(i, y);
          positionAttr.setX(i, x);
        }
        positionAttr.needsUpdate = true;

        particles.rotation.y = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-90"
      aria-hidden="true"
    />
  );
}
