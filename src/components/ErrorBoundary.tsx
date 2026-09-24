import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import ErrorFallback from "@/components/ErrorFallback";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Replaces the Next.js `error.tsx` / built-in error overlay behaviour so a
 * runtime render error never results in a blank screen.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  private reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) return <ErrorFallback onReset={this.reset} />;
    return this.props.children;
  }
}
