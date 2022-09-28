import { useState } from "react";
import { useFunds, useFundsPageCount } from "hooks";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "stories/Buttons/IconButton";
import moment from "moment";
import numeral from "numeral";
import { Col } from "react-bootstrap";
import Button from "stories/Buttons/Button";
import Pagination from "stories/Pagination";
import * as S from "./styled";

const FundList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { count } = useFundsPageCount();
  const { funds } = useFunds(page);

  const handleRoute = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <S.FundListContainer className="p-0">
      {funds?.map((fund) => (
        <S.FundItem key={fund.id} className="py-4">
          <Col xs={4} md={3} onClick={() => handleRoute(fund.reward.project.id)}>
            <img
              src={fund.reward.project.thumbnailUrl}
              alt="project thumbnail"
              css={css`
                object-fit: cover;
                width: 100%;
              `}
            />
          </Col>
          <Col xs={7} md={6} xl={7}>
            <S.FundItemDescription>
              <h5>{fund.valid ? "Valid" : "Canceled"}</h5>
              <p>{fund.reward.project.title}</p>
              <span>
                {fund.reward.title} | {numeral(fund.amount).format("0,0")} item(s)
              </span>
              <span>{moment(fund.createdAt).format("YYYY-MM-DD")}</span>
            </S.FundItemDescription>
          </Col>
          <Col xs={3} xl={2} className="d-none d-md-block ">
            <Button variant="outline" className="mb-2 w-100">
              Refund
            </Button>
            <Button variant="primary" className="w-100">
              Delievery
            </Button>
          </Col>
          <Col xs={1} className="d-block d-md-none p-0">
            <IconButton icon={faEllipsisVertical} />
          </Col>
        </S.FundItem>
      ))}
      <S.FundPaginationWrapper>
        <Pagination onClick={(newPage) => setPage(newPage)} page={page} totalPages={count ?? 0} />
      </S.FundPaginationWrapper>
    </S.FundListContainer>
  );
};

export default FundList;
