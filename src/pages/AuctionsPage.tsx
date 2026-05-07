import { useEffect, useState } from "react";
import {
  categories,
  itemStatuses,
  type Auction,
  getPageableAuctions,
} from "../api/auctionApi";
import FilterSelect from "../components/FilterSelect";
import Pagination from "../components/Pagination";
import AuctionList from "../components/auction/AuctionList";
import SearchIcon from "../icons/SearchIcon";

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [itemStatus, setItemStatus] = useState(itemStatuses[0]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const pageAble = {
      page,
      size: 8,
      enum: {
        name: "category",
        value: category,
      },
      query,
      sort: "id,asc",
    };
    getPageableAuctions(pageAble)
      .then((response) => {
        setTotalPages(response.totalPages);
        setAuctions(response.content);
      })
      .catch(console.error);
  }, [page, category, query]);

  function onSetPage(number: number) {
    setPage(number);
  }

  return (
    <>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-45">
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
          <FilterSelect
            value={category}
            onChange={setCategory}
            options={categories}
            className="min-w-37.5"
          />
          <FilterSelect
            value={itemStatus}
            onChange={setItemStatus}
            options={itemStatuses}
            className="min-w-35"
          />
        </div>
      </div>

      <AuctionList auctions={auctions} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(number) => onSetPage(number)}
      />
    </>
  );
}
