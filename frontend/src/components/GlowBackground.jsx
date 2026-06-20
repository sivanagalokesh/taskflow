import React from 'react';
import './GlowBackground.css';

export default function GlowBackground() {
  return (
    <div className="glow-bg" aria-hidden="true">
      <div className="glow-bg__vignette" />
      <div className="glow-bg__warmth" />
      <div className="glow-bg__grain" />
    </div>
  );
}
