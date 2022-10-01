import { useState } from "react";
import { useAuthGuard, useFunds, useFundsPageCount, useTransaction } from "hooks";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "stories/Buttons/IconButton";
import moment from "moment";
import numeral from "numeral";
import { Col } from "react-bootstrap";
import Button from "stories/Buttons/Button";
import Pagination from "stories/Pagination";
import { verifySession } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { cancelFund } from "transactions";
import * as S from "./styled";

const FundList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { count } = useFundsPageCount();
  const { funds } = useFunds(page);
  const queryClient = useQueryClient();
  const verifySessionGuarded = useAuthGuard(verifySession);
  const cancelFundTransaction = useTransaction(cancelFund);

  const handleRoute = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };
  const handleClickRefund = async (projectId: number, fundHashId: string) => {
    await verifySessionGuarded(undefined);
    await cancelFundTransaction(
      { projectId, fundHashId },
      { title: "Fund Cancelled", body: "The fund has successfully cancelled.", icon: faCheck }
    );
    queryClient.invalidateQueries(["projects", "users"]);
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
            {fund.valid && (
              <>
                <Button
                  variant="outline"
                  className="mb-2 w-100"
                  onClick={() => handleClickRefund(fund.reward.project.id, fund.hashId)}
                >
                  Refund
                </Button>
                <Button variant="primary" className="w-100">
                  Delievery
                </Button>
              </>
            )}
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
