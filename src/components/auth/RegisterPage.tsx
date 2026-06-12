import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserForm, { type UserFormValues } from "./UserForm";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegistry = async (values: UserFormValues) => {
    const { username, email, avatarUrl, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      throw new Error(t("user.error.passowrdMismatch"));
    }
    await register(username, email, password!, avatarUrl)
      .then(() => {
        navigate("/auctions");
      })
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  };

  return (
    <UserForm
      mode="register"
      initialValues={{
        username: "",
        email: "",
        avatarUrl: "",
      }}
      pageTitle={{
        title: t("user.signup"),
        message: t("user.signupMessage"),
      }}
      onSubmit={handleRegistry}
    />
  );
}
