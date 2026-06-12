import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import UserForm, { type UserFormValues } from "./UserForm";
import { useNavigate } from "react-router-dom";

export function ProfileUpdatePage() {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleUpdate = async (values: UserFormValues) => {
    await updateProfile({
      username: values.username,
      email: values.email,
      avatarUrl: values.avatarUrl,
    });
    navigate("/profile");
  };

  return (
    <UserForm
      mode="update"
      initialValues={{
        username: user!.username,
        email: user!.email,
        avatarUrl: user!.avatarUrl,
      }}
      pageTitle={{
        title: t("user.update"),
        message: t("user.updateMessage"),
      }}
      onSubmit={handleUpdate}
    />
  );
}
