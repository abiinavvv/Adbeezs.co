'use client';

import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <motion.div
            className="min-h-screen flex items-center justify-center bg-white px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-md w-full text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-6"
              >
                <svg
                  className="w-24 h-24 mx-auto text-black/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-black mb-4">
                Something went wrong
              </h1>
              <p className="text-black/70 mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              <motion.button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Refresh Page
              </motion.button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-black/60 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs bg-black/5 p-4 rounded overflow-auto text-black/80">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </motion.div>
        )
      );
    }

    return this.props.children;
  }
}

