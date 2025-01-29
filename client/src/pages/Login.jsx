import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const { inputs, handleInputs, handleSubmit, isLoading } = useLogin();
  return (
    <div className="max-w-md mx-auto p-8 rounded-md shadow-2xl">
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Log in to your account</h1>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
            required
            className="input"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold bg-violet-400 hover:bg-violet-500 duration-300 py-3 rounded-md text-white mt-2 cursor-pointer"
        >
          Log in
        </button>
      </form>

      <p className="pt-8 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-violet-400 hover:text-violet-500 hover:border-b"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
