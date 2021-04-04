function LoadingDisplay() {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '85vh' }}>
        <div className="col-sm-12 d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingDisplay;
