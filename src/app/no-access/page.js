const NoAccess = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You do not have permission to access this page.</p>
          <a href="/" className="text-blue-500 underline">Go back to Home</a>
        </div>
      </div>
    );
  };
  
  export default NoAccess;
  