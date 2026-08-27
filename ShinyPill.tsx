// Shiny Pill — Originkit
// Originkit — defaults rewritten to match preview.
"use client";

import * as React from "react";
import type { CSSProperties } from "react";

export interface ShinyPillProps {
    text?: string;
    link?: string;
    textColor?: string;
    shineColor?: string;
    speed?: number;
    font?: CSSProperties;
    style?: CSSProperties;
    className?: string;
}

const KEYFRAMES_ID = "shiny-pill-keyframes";

/**
 * Animated Shiny Text / Shiny Pill
 *
 * A line of text or pill badge with a sheen that sweeps left-to-right on a loop.
 */
export default function ShinyPill(props: ShinyPillProps) {
    const {
        text = "AVAILABLE FOR WORK",
        link,
        textColor = "var(--text-primary, #FFFFFF)",
        shineColor = "var(--accent, #37FF8B)",
        speed = 3,
        font,
        style,
        className = "",
    } = props;

    const isFixedWidth = style?.width === "100%";

    const shellStyle: CSSProperties = {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        boxSizing: "border-box",
        ...(isFixedWidth ? {} : { minWidth: "max-content", width: "auto" }),
        whiteSpace: "nowrap",
        ...font,
        ...style,
    };

    const shineLayerStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        color: shineColor,
        pointerEvents: "none",
        WebkitMaskImage:
            "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
        maskImage:
            "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
        WebkitMaskSize: "150% auto",
        maskSize: "150% auto",
        animation: `shinyPillSweep ${speed}s ease-in-out infinite`,
    };

    const content = (
        <div style={shellStyle} className={`shiny-pill-container ${className}`}>
            <style
                id={KEYFRAMES_ID}
                dangerouslySetInnerHTML={{
                    __html: `@keyframes shinyPillSweep {
                        0% { -webkit-mask-position: 200%; mask-position: 200%; }
                        100% { -webkit-mask-position: -100%; mask-position: -100%; }
                    }`,
                }}
            />
            {/* Base layer — muted baseline color */}
            <span style={{ color: textColor }}>{text}</span>
            {/* Shine layer — bright copy masked by the sweeping gradient */}
            <span style={shineLayerStyle} aria-hidden="true">
                {text}
            </span>
        </div>
    );

    if (link) {
        return (
            <a
                href={link}
                style={{ textDecoration: "none", display: "inline-flex" }}
            >
                {content}
            </a>
        );
    }

    return content;
}
