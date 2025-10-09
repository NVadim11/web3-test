import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from './Button';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error,
            errorInfo,
        });
        // You can also log the error to an error reporting service
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div>
                        <div
                            style={{
                                padding: '20px',
                                color: '#ffffff',
                                backgroundColor: '#2d1b69',
                                width: '100%',
                                height: '100vh',
                                textAlign: 'center',
                            }}
                        >
                            <h2>Something went wrong.</h2>
                            <details style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.error && this.state.error.toString()}
                                <br />
                                <p
                                    style={{
                                        textAlign: 'left',
                                        paddingInline: '25%',
                                    }}
                                >
                                    {this.state.errorInfo?.componentStack}
                                </p>
                            </details>
                            <Button
                                onClick={() => window.location.reload()}
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    backgroundColor: '#2d1b69',
                                    color: '#000000',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Reload Page
                            </Button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
