"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { gsap } from "gsap";

import styles from "@/components/marketing/masonry.module.css";

type MasonryItem = {
  id: string;
  img: string;
  url: string;
  height: number;
  imagePosition?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  meta?: string;
};

type MasonryProps = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  showItemOverlay?: boolean;
};

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function useMedia(queries: string[], values: number[], defaultValue: number) {
  const getValue = () => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    const matchedIndex = queries.findIndex((query) =>
      window.matchMedia(query).matches,
    );

    return values[matchedIndex] ?? defaultValue;
  };

  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const mediaQueries = queries.map((query) => window.matchMedia(query));

    mediaQueries.forEach((query) =>
      query.addEventListener("change", onStoreChange),
    );

    return () =>
      mediaQueries.forEach((query) =>
        query.removeEventListener("change", onStoreChange),
      );
  };

  return useSyncExternalStore(subscribe, getValue, () => defaultValue);
}

function useMeasure() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return [ref, size] as const;
}

async function preloadImages(urls: string[]) {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          image.src = src;
          image.onload = () => resolve();
          image.onerror = () => resolve();
        }),
    ),
  );
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  showItemOverlay = true,
}: MasonryProps) {
  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1100px)",
      "(min-width: 700px)",
      "(min-width: 420px)",
    ],
    [4, 3, 2, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    let isActive = true;

    preloadImages(items.map((item) => item.img)).then(() => {
      if (isActive) {
        setImagesReady(true);
      }
    });

    return () => {
      isActive = false;
    };
  }, [items]);

  useEffect(() => {
    if (!containerRef.current || hasEnteredView || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, hasEnteredView]);

  const grid = useMemo(() => {
    if (!width) {
      return [];
    }

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = item.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...item, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const gridHeight = useMemo(() => {
    if (grid.length === 0) {
      return 0;
    }

    return Math.max(...grid.map((item) => item.y + item.h)) + 12;
  }, [grid]);

  function getInitialPosition(item: (typeof grid)[number]) {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect || typeof window === "undefined") {
      return { x: item.x, y: item.y };
    }

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"] as const;
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (!imagesReady || (!hasMounted.current && !hasEnteredView)) {
      return;
    }

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus ? { filter: "blur(10px)" } : {}),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus ? { filter: "blur(0px)" } : {}),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });

        return;
      }

      gsap.to(selector, {
        ...animationProps,
        duration,
        ease,
        overwrite: "auto",
      });
    });

    hasMounted.current = true;
  }, [
    animateFrom,
    blurToFocus,
    duration,
    ease,
    grid,
    hasEnteredView,
    imagesReady,
    stagger,
  ]);

  function animateHover(
    element: HTMLAnchorElement,
    item: MasonryItem,
    isActive: boolean,
  ) {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: isActive ? hoverScale : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector<HTMLElement>("[data-overlay]");

      if (overlay) {
        gsap.to(overlay, {
          opacity: isActive ? 1 : 0,
          duration: 0.3,
        });
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={styles.list}
      style={{ height: gridHeight || undefined }}
    >
      {grid.map((item) => {
        const isInternalLink = item.url.startsWith("/");

        return (
          <a
            key={item.id}
            data-key={item.id}
            className={styles.itemWrapper}
            href={item.url}
            style={!hasEnteredView ? { opacity: 0 } : undefined}
            target={isInternalLink ? undefined : "_blank"}
            rel={isInternalLink ? undefined : "noreferrer noopener"}
            aria-label={item.title ?? item.id}
            onMouseEnter={(event) => animateHover(event.currentTarget, item, true)}
            onMouseLeave={(event) =>
              animateHover(event.currentTarget, item, false)
            }
            onFocus={(event) => animateHover(event.currentTarget, item, true)}
            onBlur={(event) => animateHover(event.currentTarget, item, false)}
          >
            <div
              className={styles.itemImg}
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundPosition: item.imagePosition ?? "center center",
              }}
            >
              {showItemOverlay ? (
                <div className={styles.copy}>
                  {item.eyebrow ? (
                    <span className={styles.eyebrow}>{item.eyebrow}</span>
                  ) : null}

                  <div className={styles.body}>
                    {item.title ? <h3 className={styles.title}>{item.title}</h3> : null}
                    {item.description ? (
                      <p className={styles.description}>{item.description}</p>
                    ) : null}

                    {(item.meta || item.url) ? (
                      <div className={styles.metaRow}>
                        {item.meta ? (
                          <span className={styles.meta}>{item.meta}</span>
                        ) : (
                          <span />
                        )}
                        <span aria-hidden="true" className={styles.arrow}>
                          ↗
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {colorShiftOnHover ? (
                <div data-overlay className={styles.colorOverlay} />
              ) : null}
            </div>
          </a>
        );
      })}
    </div>
  );
}
