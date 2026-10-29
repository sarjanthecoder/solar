import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 299;

export default function Solar3DScrollSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnFrameRef = useRef(-1);
  const canvasDimsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFrameUrl = useCallback((index, mobile) => {
    const padded = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, '0');
    const folder = mobile ? 'mobile' : 'desktop';
    return `/3d-sequence/${folder}/ezgif-frame-${padded}.jpg`;
  }, []);

  // High performance canvas renderer (cover fit with high DPR, no distortion)
  const drawFrame = useCallback((frameIndex, force = false) => {
    if (!force && frameIndex === lastDrawnFrameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];

    // If frame is not yet fully loaded, find closest loaded frame among ALL available frames
    if (!img || !img.complete || img.naturalWidth === 0) {
      let bestDist = Infinity;
      let fallbackImg = null;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIndex);
          if (dist < bestDist) {
            bestDist = dist;
            fallbackImg = candidate;
          }
        }
      }
      img = fallbackImg;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height, dpr } = canvasDimsRef.current;
    if (width === 0 || height === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear canvas before drawing without white flash
    ctx.clearRect(0, 0, width, height);

    // Cover math
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);
    const shiftX = (width - img.naturalWidth * ratio) / 2;
    const shiftY = (height - img.naturalHeight * ratio) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      shiftX,
      shiftY,
      img.naturalWidth * ratio,
      img.naturalHeight * ratio
    );

    ctx.restore();
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // Update canvas sizing without triggering layout recalculations inside scroll loop
  useEffect(() => {
    const updateCanvasDimensions = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvasDimsRef.current = { width, height, dpr };

      if (lastDrawnFrameRef.current > 0) {
        drawFrame(lastDrawnFrameRef.current, true);
      }
    };

    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [drawFrame]);

  // Preload frames aggressively for instant scrubbing
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES + 1);
    lastDrawnFrameRef.current = -1;
    let isCancelled = false;

    // 1. Load initial frame and final frame immediately so start and end are always ready
    const firstImg = new Image();
    firstImg.decoding = 'async';
    firstImg.src = getFrameUrl(1, isMobile);
    firstImg.onload = () => {
      if (!isCancelled) {
        imagesRef.current[1] = firstImg;
        if (lastDrawnFrameRef.current <= 1) {
          drawFrame(1, true);
        }
      }
    };

    const lastImg = new Image();
    lastImg.decoding = 'async';
    lastImg.src = getFrameUrl(TOTAL_FRAMES, isMobile);
    lastImg.onload = () => {
      if (!isCancelled) {
        imagesRef.current[TOTAL_FRAMES] = lastImg;
      }
    };

    // 2. Preload remaining frames in fast concurrent batches
    const preloadAll = async () => {
      const batchSize = 16;
      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        if (isCancelled) return;
        const batchPromises = [];
        for (let j = i; j < i + batchSize && j <= TOTAL_FRAMES; j++) {
          if (!imagesRef.current[j]) {
            batchPromises.push(
              new Promise((resolve) => {
                const img = new Image();
                img.decoding = 'async';
                img.src = getFrameUrl(j, isMobile);
                img.onload = () => {
                  if (!isCancelled) imagesRef.current[j] = img;
                  resolve();
                };
                img.onerror = resolve;
              })
            );
          }
        }
        await Promise.all(batchPromises);
      }
    };

    const timer = setTimeout(preloadAll, 30);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [isMobile, getFrameUrl, drawFrame]);

  // Handle sticky scroll scrubbing at up to 200Hz with 0 layout thrashing
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

          if (totalScrollable > 0) {
            // Scrolled distance within this sticky section
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

            const targetFrame = Math.min(
              TOTAL_FRAMES,
              Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
            );

            // Direct 200Hz Canvas draw
            drawFrame(targetFrame);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      id="3d-solar-experience"
      className="relative w-full select-none bg-white"
      style={{ position: 'relative', height: '400vh', width: '100%' }}
      aria-label="Interactive 3D Solar Experience"
    >
      {/* 
        Sticky Viewport:
        STAYS CONSTANTLY PINNED at top: 0 while scrolling through the 400vh container.
        ONLY when the animation reaches 100% (frame 299) and the container ends,
        does the page continue scrolling down into ServicesSection!
        PURE 3D ANIMATION: Zero text boxes, zero frame counters, completely unobstructed view.
      */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-white z-20"
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}
      >
        {/* Fullscreen High-Definition 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </section>
  );
}
