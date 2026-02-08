import React, { useRef, useEffect, useState, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%; /* Fill parent */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  perspective: 1000px;
  background-color: transparent; /* Ensure it's not blocking but has presence */
  z-index: 10;
`;

const ItemWrapper = styled.div.attrs<{ $x: number; $y: number; $rotate: number }>(props => ({
    style: {
        transform: `rotate(${props.$rotate}deg)`, /* Only Rotate, Origin handles placement */
    },
})) <{ $x: number; $y: number; $rotate: number }>`
  position: absolute;
  bottom: -2100px; /* Radius is ~2500, so this pushes center far down. */
  /* If Pivot is 2500px down, we want the item to be at the top of that circle. */
  /* Actually, let's simplify. */
  /* Center of circle is at (50%, 2500px below bottom?). */
  
  /* Let's try explicit geometry: */
  left: 50%;
  margin-left: -106px; /* Half width */
  top: 100px; /* Top of the arc area */
  width: 212px;
  height: 249px;
  
  transform-origin: 50% 2000px; /* Pivot point 2000px below the element */
  transition: transform 0.1s ease-out;
  will-change: transform;
  
  /* Ensure clicks work */
  pointer-events: auto;
  cursor: pointer;
  
  z-index: 20;
`;

interface CurveLayoutProps {
    children: ReactNode[];
}

const CurveLayout = ({ children }: CurveLayoutProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const startRotation = useRef(0);

    const SEPARATION_ANGLE = 8;

    // Limits
    // Actually simpler logic from before:
    // startAngle = -((total)/2) + (step/2)
    // First Item Angle = startAngle
    // We want Rotation such that First Item + Rotation <= Max Angle (e.g. 0 or small positive)
    // To bring First Item to Center (0): Rotation = -startAngle

    // To bring Last item to Center (0):
    // Last Item Angle = startAngle + (N-1)*Step
    // Rotation = -LastItemAngle

    const totalArc = children.length * SEPARATION_ANGLE;
    const startAngle = -(totalArc / 2) + (SEPARATION_ANGLE / 2);

    // Rotation Limits to keep items centered
    const maxRot = -startAngle; // Brings first item to center
    const minRot = -(startAngle + (children.length - 1) * SEPARATION_ANGLE); // Brings last item to center

    const clampRotation = (r: number) => Math.max(minRot, Math.min(maxRot, r));

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startX.current = e.clientX;
        startRotation.current = rotation;
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - startX.current;
        // Sensitivity
        setRotation(clampRotation(startRotation.current + (dx * 0.15)));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleLeaves = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            setRotation(current => clampRotation(current - (e.deltaX + e.deltaY) * 0.1));
            e.preventDefault();
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        // Entrance Animation
        // Animate from "Most Left" to Center.
        // Start Angle: Large Negative (shifts items left) -> 0.
        let animationFrameId: number;
        const startR = -180; // Start heavily rotated to the left

        const startTime = performance.now();
        const duration = 1000; // 1s

        // Easing function: easeOutCubic
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);

            // val = start - (start - end) * progress
            // End is 0 (approx existing rotation, assuming we start at 0)
            // But if user has interacted, we shouldn't animate? 
            // This runs ONCE on mount so user hasn't interacted yet.
            const currentVal = startR - (startR * easedProgress);

            setRotation(currentVal);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            cancelAnimationFrame(animationFrameId);
        };
    }, [children.length, minRot, maxRot]);

    return (
        <Container
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleLeaves}
        >
            {React.Children.map(children, (child, index) => {
                const startAngle = -((children.length * SEPARATION_ANGLE) / 2) + (SEPARATION_ANGLE / 2);
                const itemBaseAngle = startAngle + (index * SEPARATION_ANGLE);
                const finalAngle = itemBaseAngle + rotation;

                if (Math.abs(finalAngle) > 90) return null;

                return (
                    <ItemWrapper
                        $x={0}
                        $y={0}
                        $rotate={finalAngle}
                        key={index}
                    >
                        {child}
                    </ItemWrapper>
                );
            })}
        </Container>
    );
};

export default CurveLayout;
