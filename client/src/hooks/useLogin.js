import { useState } from "react";
import toast from "react-hot-toast";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin();
  }

  async function handleLogin() {
    const { email, password } = inputs;

    if (!email || !password) {
      toast.error("Please fill in all he fields!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      setInputs({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleInputs, handleSubmit, inputs, isLoading };
}

export default useLogin;
