import { useTranslation } from "react-i18next";

export default function FilterSelect({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-container-background shadow-md shadow-[#262626] border border-[#262626] text-secondary-font text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-colors cursor-pointer ${className}`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {t("auction.category." + opt)}
        </option>
      ))}
    </select>
  );
}
