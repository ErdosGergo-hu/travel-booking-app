import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronIcon } from "../icons/ChevronIcon";
import TickIcon from "../icons/TickIcon";

const LANGUAGES = [
  { code: "en", label: "English", flag: "uk" },
  { code: "hu", label: "Magyar", flag: "hu" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const select = (code: LangCode) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-10 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 text-sm font-medium text-gray-700 active:scale-95"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img
          src={`/images/${current.flag}.png`}
          alt={current.label}
          className="max-h-full w-5 object-cover"
        />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-in"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === i18n.language;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive}
                onClick={() => select(lang.code)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-100
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <img
                  src={`/images/${lang.flag}.png`}
                  alt={lang.label}
                  className="max-h-full w-5 object-cover"
                />
                <span>{lang.label}</span>
                {isActive && <TickIcon />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
