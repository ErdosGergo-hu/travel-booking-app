export default function AuthInputWithLabel({
  label,
  type,
  inputValue,
  onInputChange,
}: {
  label: string;
  type: string;
  inputValue: string;
  onInputChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={
          type === "email"
            ? "email"
            : type === "password"
              ? "password"
              : "username"
        }
        className="block text-sm/6 font-medium text-secondary-font"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          required
          autoComplete={type === "email" ? "email" : undefined}
          className="block w-full rounded-md text-secondary-font bg-container-background border border-[#262626] px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </div>
  );
}
