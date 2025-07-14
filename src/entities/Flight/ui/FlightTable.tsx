import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table";
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
import { flightsData } from "shared/mocks/FlightsData";
import type { SortingState } from "@tanstack/react-table";
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
    cell: (info) => Array.isArray(info.getValue()) ? info.getValue().join(", ") : info.getValue(),
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
  const [tableData] = useState<Flight[]>(() => [...flightsData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable<Flight>({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getRowModel());

  return (
    <div className={styles.flightTableWrapper}>
      <div className={styles.searchBlock}>
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

      <div className={styles.tableOuter}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.tr}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                  >
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
                        header.getContext()
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
                  <td
                    key={cell.id}
                    className={styles.td}
                  >
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
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.flexSpace}>
          <button
            className={styles.pageButton}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className={styles.pageButton}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          <span className={styles.flexRow}>
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className={styles.pageInput}
            />
            <span className={styles.ml1}>of {table.getPageCount()}</span>
          </span>

          <button
            className={styles.pageButton}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className={styles.pageButton}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}