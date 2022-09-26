import { useMemo } from "react";
import { Pagination } from "react-bootstrap";
import * as S from "./styled";

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onClick: (page: number) => void;
}

const CustomPagination = ({ page, totalPages, onClick }: CustomPaginationProps) => {
  const pageItems = useMemo(() => {
    return (() => {
      if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
      if (page <= 4) return Array.from({ length: 7 }, (_, i) => i + 1);
      if (page >= totalPages - 3) return Array.from({ length: 7 }, (_, i) => totalPages - 6 + i);

      return Array.from({ length: 7 }, (_, i) => page - 3 + i);
    })().map((itemPage) => (
      <Pagination.Item onClick={() => onClick(itemPage)} active={itemPage === page}>
        {itemPage}
      </Pagination.Item>
    ));
  }, [page, totalPages, onClick]);

  return (
    <S.PaginationWrapper>
      <Pagination.First onClick={() => onClick(1)} />
      {pageItems}
      <Pagination.Last onClick={() => onClick(totalPages)} />
    </S.PaginationWrapper>
  );
};

export default CustomPagination;
