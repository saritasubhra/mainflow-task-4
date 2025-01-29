import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex justify-around p-4">
      <ul className="flex gap-10">
        <NavLink to="/login">
          <li>Login</li>
        </NavLink>
        <NavLink to="/signup">
          <li>Signup</li>
        </NavLink>
      </ul>
    </header>
  );
}

export default Navbar;
