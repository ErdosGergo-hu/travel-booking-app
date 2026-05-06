import { useState } from "react";

const CATEGORIES = [
  "Minden kategória",
  "Elektronika",
  "Ékszer & Óra",
  "Műtárgy",
  "Autó & Motor",
  "Ruházat",
  "Gyűjtemény",
];

const CONDITIONS = ["Minden állapot", "Új", "Kiváló", "Jó állapot", "Használt"];

const SORT_OPTIONS = [
  "Ár: alacsony → magas",
  "Ár: magas → alacsony",
  "Legtöbb licit",
  "Hamarosan lejár",
  "Legújabb",
];

const LOCATIONS = [
  "Egész ország",
  "Budapest",
  "Pest megye",
  "Nyugat-Magyarország",
  "Kelet-Magyarország",
];

const ENDS_IN = ["Bármikor", "1 órán belül", "Ma", "Ezen a héten"];

const INITIAL_CHIPS = [
  {
    id: "elec",
    label: "Elektronika",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "free",
    label: "Ingyenes szállítás",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "price",
    label: "10 000 – 80 000 Ft",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-3 h-3"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M2 2l6 6M8 2l-6 6" />
    </svg>
  );
}

function Select({ value, onChange, options, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-colors cursor-pointer ${className}`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function AuctionFilterBar() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [endsIn, setEndsIn] = useState(ENDS_IN[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [freeShipping, setFreeShipping] = useState(false);
  const [buyNow, setBuyNow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [noReserve, setNoReserve] = useState(false);
  const [chips, setChips] = useState(INITIAL_CHIPS);

  const removeChip = (id) =>
    setChips((prev) => prev.filter((c) => c.id !== id));

  const clearAll = () => {
    setQuery("");
    setCategory(CATEGORIES[0]);
    setCondition(CONDITIONS[0]);
    setMinPrice("");
    setMaxPrice("");
    setEndsIn(ENDS_IN[0]);
    setLocation(LOCATIONS[0]);
    setSortBy(SORT_OPTIONS[0]);
    setFreeShipping(false);
    setBuyNow(false);
    setVerified(false);
    setNoReserve(false);
    setChips(INITIAL_CHIPS);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 font-sans">
      {/* Main filter card */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        {/* Primary row */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search input */}
          <div className="relative flex-1 min-w-[180px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Keresés termékek közt..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-300 transition-colors placeholder-gray-400"
            />
          </div>

          <Select
            value={category}
            onChange={setCategory}
            options={CATEGORIES}
            className="min-w-[150px]"
          />
          <Select
            value={condition}
            onChange={setCondition}
            options={CONDITIONS}
            className="min-w-[140px]"
          />

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            Szűrők
            <ChevronIcon open={showAdvanced} />
          </button>
        </div>

        {/* Advanced panel */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Price range */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Ár tartomány (Ft)</p>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full text-center text-sm bg-white border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <span className="text-gray-400 text-xs">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full text-center text-sm bg-white border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Ends in */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Aukció vége</p>
                <Select
                  value={endsIn}
                  onChange={setEndsIn}
                  options={ENDS_IN}
                  className="w-full"
                />
              </div>

              {/* Location */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Helyszín</p>
                <Select
                  value={location}
                  onChange={setLocation}
                  options={LOCATIONS}
                  className="w-full"
                />
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Rendezés</p>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_OPTIONS}
                  className="w-full"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 mr-1">Csak:</span>
              {[
                {
                  label: "Ingyenes szállítás",
                  value: freeShipping,
                  setter: setFreeShipping,
                },
                { label: "Azonnal vehető", value: buyNow, setter: setBuyNow },
                {
                  label: "Hitelesített eladó",
                  value: verified,
                  setter: setVerified,
                },
                {
                  label: "Nincs foglalás",
                  value: noReserve,
                  setter: setNoReserve,
                },
              ].map(({ label, value, setter }) => (
                <label
                  key={label}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors select-none ${
                    value
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setter(e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-500"
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={clearAll}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Visszaállítás
              </button>
              <button
                onClick={() => setShowAdvanced(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
              >
                Alkalmazás
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((chip) => (
            <span
              key={chip.id}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${chip.color} transition-opacity`}
            >
              {chip.label}
              <button
                onClick={() => removeChip(chip.id)}
                className="hover:opacity-60 transition-opacity"
              >
                <CloseIcon />
              </button>
            </span>
          ))}
          {chips.length > 1 && (
            <button
              onClick={() => setChips([])}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-1"
            >
              Összes törlése
            </button>
          )}
        </div>
      )}

      {/* Result count */}
      <p className="mt-2 text-xs text-gray-400">1 247 találat</p>
    </div>
  );
}
