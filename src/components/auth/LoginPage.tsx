import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../InputWithLabel";
import AuthFormTitle from "./AuthFormTitle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  //TODO: Rosszz loginnál is succesfullt ír
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful");
      navigate("/auctions");
    } catch (error) {
      alert("Login failed: " + error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <AuthFormTitle title="Sign in to your account" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <InputWithLabel
              label="Email address"
              type="email"
              inputValue={email}
              onInputChange={setEmail}
            />
            <InputWithLabel
              label="Password"
              type="password"
              inputValue={password}
              onInputChange={setPassword}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gold hover:bg-gold-hover px-3 py-1.5 text-md font-semibold text-background focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in
              </button>
              <div className="text-sm mt-2">
                <a
                  href="#"
                  className="font-semibold text-secondary-font hover:text-gray-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
