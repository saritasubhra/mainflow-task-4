import { useState } from "react";
import toast from "react-hot-toast";

function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignUp();
  }

  async function handleSignUp() {
    const { fullname, email, password, passwordConfirm } = inputs;

    if (!fullname || !email || !password || !passwordConfirm) {
      toast.error("Please fill in all he fields!");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be atleast of 8 characters!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
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
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { handleInputs, handleSubmit, inputs, isLoading };
}

export default useSignUp;
