import { useState, useEffect } from "react";
import ClockIcon from "../../icons/ClockIcon";
import GavelIcon from "../../icons/GavelIcon";

interface AuctionInfoProps {
  endDate: Date;
  currentBid: number;
  currency?: string;
  bidCount?: number;
}

function useCountdown(endDate: Date) {
  const calc = () => {
    const diff = endDate.getTime() - Date.now();
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      ended: false,
    };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  return time;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function isUrgent(endDate: Date) {
  return endDate.getTime() - Date.now() < 3600000; // < 1 hour
}

export function AuctionInfoBar({
  endDate,
  currentBid,
  currency = "Ft",
  bidCount,
}: AuctionInfoProps) {
  const { days, hours, minutes, seconds, ended } = useCountdown(endDate);
  const urgent = isUrgent(endDate) && !ended;

  const timeStr = ended
    ? "Lejárt"
    : days > 0
      ? `${days}n ${pad(hours)}ó ${pad(minutes)}p`
      : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return (
    <div className="flex items-center justify-between gap-4 bg-[#202020] shadow-2xl rounded-lg px-4 py-3 w-full">
      <div className="flex items-center gap-2 text-secondary-font">
        <GavelIcon />
        <div>
          <p className="text-[11px] uppercase tracking-wider leading-none mb-0.5">
            Licit
          </p>
          <p className="text-base font-bold tabular-nums leading-none">
            {currentBid.toLocaleString()}{" "}
            <span className="text-sm font-medium">{currency}</span>
          </p>
        </div>
        {bidCount !== undefined && (
          <span className="text-xs border-l border-gray-100 pl-3 ml-1">
            {bidCount}×
          </span>
        )}
      </div>

      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2A2A2A] `}
      >
        <ClockIcon
          size={13}
          className={
            ended ? "text-gray-300" : urgent ? "text-red-400" : "text-amber-500"
          }
        />
        <span
          className={`text-sm font-semibold tabular-nums ${ended ? "text-secondary-font" : urgent ? "text-red-400" : "text-amber-500"}`}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}
