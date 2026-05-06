import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function getTimeLeft(endDate: Date) {
  const now = new Date().getTime();
  const distance = endDate.getTime() - now;
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function useCountdown(endDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
}

export default function Countdown({ date }: { date: string | undefined }) {
  const { t } = useTranslation();
  const pad = (value: number) => String(value).padStart(2, "0");
  const endDate = date ? new Date(date) : new Date();
  const { days, hours, minutes, seconds } = useCountdown(endDate);

  return (
    <div className="flex-1 px-3 py-1.5">
      <p className="mb-2 text-xs text-gray-500">{t("auction.countdown")}</p>

      <div className="flex items-start gap-2">
        <TimeBlock value={pad(days)} label="DAYS" />
        <Separator />
        <TimeBlock value={pad(hours)} label="HRS" />
        <Separator />
        <TimeBlock value={pad(minutes)} label="MINS" />
        <Separator />
        <TimeBlock value={pad(seconds)} label="SECS" />
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold tracking-wide text-slate-900">
        {value}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase text-gray-500">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return <div className="text-xl font-bold text-slate-900">:</div>;
}
