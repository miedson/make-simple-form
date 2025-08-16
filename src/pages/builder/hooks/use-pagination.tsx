import { useMemo, useState } from 'react';

export type Pagination<T> = {
    page: number;
    totalPages: number;
    paginatedData: T[];
    nextPage: () => false | void;
    prevPage: () => false | void;
    setPage: (newPage: number) => false | void;
    hasNext: boolean;
    hasPrev: boolean;
    lastPage: boolean;
};

export function usePagination<T>({ data, itemsPerPage = 0 }: { data: T[]; itemsPerPage: number }) {
    const [page, setPage] = useState(0);
    const total = data.length;
    const totalPages = Math.ceil(total / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [page, data, itemsPerPage]);

    const nextPage = () => page + 1 < totalPages && setPage((prev) => prev + 1);
    const prevPage = () => page > 0 && setPage((prev) => prev - 1);

    const setPageSafe = (newPage: number) => newPage >= 0 && newPage < totalPages && setPage(newPage);

    const isPaginated = itemsPerPage > 0;

    const pagination = isPaginated ? {
        page: page + 1,
        totalPages,
        nextPage,
        prevPage,
        setPage: setPageSafe,
        hasNext: page + 1 < totalPages,
        hasPrev: page > 0,
        lastPage: page === totalPages - 1,
    } : undefined;

    return { paginatedData: isPaginated ? paginatedData : data, pagination };
}
