function App() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/api/v1/auth/google";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      <h1>Test Google OAuth</h1>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}

export default App;
