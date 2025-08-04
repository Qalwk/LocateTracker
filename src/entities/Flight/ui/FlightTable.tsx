import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Phone,
  Search,
  User,
} from "lucide-react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchFlights, type FlightsResponse } from "shared/api/axiosInstance";
import type { Flight } from "shared/mocks/FlightsData";

import styles from "./FlightTable.module.scss";

const columnHelper = createColumnHelper<Flight>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> ID
      </span>
    ),
  }),
  columnHelper.accessor("airline", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Airline
      </span>
    ),
  }),
  columnHelper.accessor("codes", {
    cell: (info) =>
      Array.isArray(info.getValue())
        ? info.getValue().join(", ")
        : info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Mail className="mr-2" size={16} /> Codes
      </span>
    ),
  }),
  columnHelper.accessor("speed", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Phone className="mr-2" size={16} /> Speed
      </span>
    ),
  }),
];

export function FlightTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: flightsResponse,
    isLoading,
    error,
  } = useQuery<FlightsResponse>({
    queryKey: ["flights", currentPage, pageSize],
    queryFn: () =>
      fetchFlights({ offset: currentPage * pageSize, limit: pageSize }),
  });

  const flights = flightsResponse?.flights || [];
  const totalCount = flightsResponse?.totalCount || 0;
  const totalPages = flightsResponse?.totalPages || 1;

  const table = useReactTable<Flight>({
    data: flights,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    // Отключаем клиентскую пагинацию, так как используем серверную
    // getPaginationRowModel: getPaginationRowModel(),
  });

  // console.log(table.getRowModel());

  if (isLoading) {
    return (
      <div className={styles.flightTableWrapper}>
        <div className={styles.loading}>Загрузка рейсов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.flightTableWrapper}>
        <div className={styles.error}>
          Ошибка загрузки рейсов: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.flightTableWrapper}>
      <div className={styles.searchBlock}>
        <div className={styles.searchAndInfo}>
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className={styles.searchInput}
          />
          <div className={styles.searchIcon}>
            <Search className={styles.searchIcon} size={20} />
          </div>
        </div>
        <div className={styles.totalInfo}>Всего рейсов: {totalCount}</div>
      </div>

      <div className={styles.tableOuter}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.tr}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.th}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? styles.sortableHeader
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <ArrowUpDown className={styles.sortIcon} size={16} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tbody}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.trHover}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.flexRow}>
          <span className={styles.mr2}>Items per page</span>
          <select
            className={styles.itemsPerPage}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            {[5, 10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.flexSpace}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={20} />
          </button>

          <span className={styles.flexRow}>
            <input
              min={1}
              type="number"
              value={currentPage + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setCurrentPage(page);
              }}
              className={styles.pageInput}
            />
            <span className={styles.ml1}>of {totalPages}</span>
          </span>

          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
