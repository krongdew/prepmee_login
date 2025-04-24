// Simple loading spinner component
export default function LoadingSpinner({ message = "Loading..." }) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading</span>
          </div>
          <p>{message}</p>
        </div>
      </div>
    );
  }