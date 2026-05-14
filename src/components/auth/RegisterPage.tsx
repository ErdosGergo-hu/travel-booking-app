import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthInputWithLabel from "./AuthInputWithLabel";
import AuthFormTitle from "./AuthFormTitle";
import DialogModal from "../DialogModal";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  async function handleRegistry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await register(userName, email, password);
      alert("Registration successful");
      navigate("/auctions");
    } catch (error) {
      alert("Registration failed: " + error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <AuthFormTitle title="Create your Account" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegistry} className="space-y-6">
            <AuthInputWithLabel
              label="Username"
              type="text"
              inputValue={userName}
              onInputChange={setUserName}
            />
            <AuthInputWithLabel
              label="Email address"
              type="email"
              inputValue={email}
              onInputChange={setEmail}
            />
            <AuthInputWithLabel
              label="Password"
              type="password"
              inputValue={password}
              onInputChange={setPassword}
            />
            <AuthInputWithLabel
              label="Confirm Password"
              type="password"
              inputValue={confirmPassword}
              onInputChange={setConfirmPassword}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gold hover:bg-gold-hover px-3 py-1.5 text-md font-semibold text-background focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
      <DialogModal
        open={error}
        message={errorMessage}
        onClose={() => {
          setError(false);
          setErrorMessage("");
        }}
      />
      ;
    </>
  );
}
