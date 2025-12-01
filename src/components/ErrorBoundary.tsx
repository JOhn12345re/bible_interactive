import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary pour capturer les erreurs React
 * Empêche le crash complet de l'application
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log l'erreur pour monitoring
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Envoyer à un service de monitoring (Sentry, LogRocket, etc.)
    // this.logErrorToService(error, errorInfo);
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Exemple d'intégration future avec Sentry
    /*
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
    */
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI personnalisé si fourni
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI d'erreur par défaut
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">⚠️</span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Oups ! Une erreur est survenue
              </h1>
              <p className="text-gray-600">
                Quelque chose s'est mal passé. Ne vous inquiétez pas, vos données sont sauves.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-red-900 mb-2">Détails de l'erreur :</h2>
                <pre className="text-sm text-red-800 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
              >
                🔄 Réessayer
              </button>
              
              <a
                href="/"
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg text-center"
              >
                🏠 Retour à l'accueil
              </a>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Si le problème persiste, veuillez{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 hover:underline"
                >
                  nous contacter
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
