import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Typically this would be logged into TrackJS or NewRelic (Or similar)
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        // this.props.errorComponent; - This would be used if you wanted the error message to be reusable
        <h2>
          An error has occurred when completing this listing.{" "}
          <Link to="/">Click to return to the home page.</Link>
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
