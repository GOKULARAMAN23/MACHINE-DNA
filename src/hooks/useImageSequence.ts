import { useEffect, useRef, useState, useCallback } from 'react';

interface UseImageSequenceOptions {
  frameCount: number;
  framePrefix?: string;
  frameExtension?: string;
  padLength?: number;
  lerpFactor?: number;
}

export function useImageSequence({
  frameCount = 162,
  framePrefix = '/frames/ezgif-frame-',
  frameExtension = '.jpg',
  padLength = 3,
  lerpFactor = 0.18,
}: UseImageSequenceOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const smoothedFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Helper to format frame path
  const getFramePath = useCallback((index: number) => {
    const frameNumber = (index + 1).toString().padStart(padLength, '0');
    return `${framePrefix}${frameNumber}${frameExtension}`;
  }, [framePrefix, frameExtension, padLength]);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    // Load first 15 critical frames first
    const criticalCount = Math.min(15, frameCount);
    
    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          images[index] = img;
          loaded++;
          setLoadPercentage(Math.round((loaded / frameCount) * 100));
          if (loaded >= criticalCount) {
            setIsLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index + 1}`);
          loaded++;
          setLoadPercentage(Math.round((loaded / frameCount) * 100));
          resolve();
        };
      });
    };

    // First load critical frames
    const loadAll = async () => {
      // Start loading critical frames concurrently
      const criticalPromises = [];
      for (let i = 0; i < criticalCount; i++) {
        criticalPromises.push(loadFrame(i));
      }
      await Promise.all(criticalPromises);

      // Progressive loading of remaining frames in background chunks
      for (let i = criticalCount; i < frameCount; i++) {
        loadFrame(i);
      }
    };

    loadAll();

    return () => {
      imagesRef.current = [];
    };
  }, [frameCount, getFramePath]);

  // Draw current frame on canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const boundedIdx = Math.max(0, Math.min(frameCount - 1, Math.round(frameIdx)));
    const img = imagesRef.current[boundedIdx];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback to nearest available loaded frame
      let fallbackImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < frameCount; offset++) {
        if (boundedIdx - offset >= 0 && imagesRef.current[boundedIdx - offset]?.complete) {
          fallbackImg = imagesRef.current[boundedIdx - offset];
          break;
        }
        if (boundedIdx + offset < frameCount && imagesRef.current[boundedIdx + offset]?.complete) {
          fallbackImg = imagesRef.current[boundedIdx + offset];
          break;
        }
      }
      if (!fallbackImg) return;
      renderImageToCanvas(ctx, canvas, fallbackImg);
      return;
    }

    renderImageToCanvas(ctx, canvas, img);
  }, [frameCount]);

  // High-DPI canvas fitting
  const renderImageToCanvas = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect ratio containment
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than image: fit to height
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      drawX = (displayWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      // Canvas is taller than image: fit to width
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;
    }

    // High quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Animation render loop (smooth frame interpolation)
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const diff = targetFrameRef.current - smoothedFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        smoothedFrameRef.current += diff * lerpFactor;
        drawFrame(smoothedFrameRef.current);
        setCurrentFrameIndex(Math.round(smoothedFrameRef.current));
      } else if (Math.abs(diff) > 0) {
        smoothedFrameRef.current = targetFrameRef.current;
        drawFrame(smoothedFrameRef.current);
        setCurrentFrameIndex(Math.round(smoothedFrameRef.current));
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, lerpFactor]);

  // Scroll listener to update target frame
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableDistance = container.offsetHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      // Calculate progress from 0 (top of container hits viewport top) to 1 (bottom hits viewport bottom)
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));

      setScrollProgress(rawProgress);
      targetFrameRef.current = rawProgress * (frameCount - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [frameCount]);

  // Initial draw when loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  return {
    canvasRef,
    containerRef,
    currentFrameIndex,
    scrollProgress,
    isLoaded,
    loadPercentage,
    totalFrames: frameCount,
    setTargetFrame: (frame: number) => {
      targetFrameRef.current = Math.max(0, Math.min(frameCount - 1, frame));
    }
  };
}
