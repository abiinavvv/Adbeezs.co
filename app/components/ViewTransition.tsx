'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ViewTransition() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if browser supports View Transitions API
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // Enable smooth transitions between pages
      const handleRouteChange = () => {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            // The transition is handled automatically by the browser
          });
        }
      };

      // Trigger transition on pathname change
      handleRouteChange();
    }
  }, [pathname]);

  return null;
}

