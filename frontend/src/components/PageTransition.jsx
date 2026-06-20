import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Wraps routed pages so each navigation gets a brief fade/slide-in instead
 * of an abrupt swap. Keyed by pathname so React remounts (and re-animates)
 * the wrapper on every route change.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}
