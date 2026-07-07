import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#2563eb",
      }}
    >
      <h2 style={{ color: "white" }}>CodeLearn LMS</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          Home
        </Link>

        <Link style={{ color: "white", textDecoration: "none" }} to="/login">
          Login
        </Link>

        <Link style={{ color: "white", textDecoration: "none" }} to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;