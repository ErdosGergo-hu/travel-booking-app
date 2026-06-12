import { useState } from "react";
import InputWithLabel from "../InputWithLabel";
import DialogModal from "../DialogModal";
import { useTranslation } from "react-i18next";
import PageTitle from "../PageTitle";

export type UserFormValues = {
  username: string;
  email: string;
  avatarUrl: string;
  password?: string;
  confirmPassword?: string;
};

type UserFormProps = {
  mode: "register" | "update";
  initialValues: UserFormValues;
  pageTitle: {
    title: string;
    message: string;
  };
  onSubmit: (values: UserFormValues) => void;
};

export default function UserForm({
  mode,
  initialValues,
  pageTitle,
  onSubmit,
}: UserFormProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(form);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t("error.unexpected"));
      }
      setError(true);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <PageTitle title={pageTitle.title} message={pageTitle.message} />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputWithLabel
              label="Username"
              type="text"
              inputValue={form.username}
              onInputChange={(value) => setForm({ ...form, username: value })}
            />

            <InputWithLabel
              label="Email address"
              type="email"
              inputValue={form.email}
              onInputChange={(value) => setForm({ ...form, email: value })}
            />

            {mode === "register" && (
              <>
                <InputWithLabel
                  label="Password"
                  type="password"
                  inputValue={form.password || ""}
                  onInputChange={(value) =>
                    setForm({ ...form, password: value })
                  }
                />

                <InputWithLabel
                  label="Confirm Password"
                  type="password"
                  inputValue={form.confirmPassword || ""}
                  onInputChange={(value) =>
                    setForm({ ...form, confirmPassword: value })
                  }
                />
              </>
            )}

            <InputWithLabel
              label="Image URL"
              type="text"
              inputValue={form.avatarUrl}
              onInputChange={(value) => setForm({ ...form, avatarUrl: value })}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gold hover:bg-gold-hover px-3 py-1.5 text-md font-semibold text-background focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t("user.update")}
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
