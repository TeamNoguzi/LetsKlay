import { useState } from "react";
import { useAuthGuard, useFunds, useFundsPageCount, useTransaction } from "hooks";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "stories/Buttons/IconButton";
import moment from "moment";
import numeral from "numeral";
import { Col, Dropdown } from "react-bootstrap";
import Button from "stories/Buttons/Button";
import Pagination from "stories/Pagination";
import { verifySession } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { cancelFund } from "transactions";
import { FundStatus } from "@/enums";
import * as S from "./styled";

const FUND_STATUS = {
  [FundStatus.valid]: "Valid",
  [FundStatus.cancelled]: "Cancelled",
  [FundStatus.refunded]: "Refunded",
};

const FundList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { count } = useFundsPageCount();
  const { funds } = useFunds(page);
  const queryClient = useQueryClient();
  const verifySessionGuarded = useAuthGuard(verifySession);
  const cancelFundTransaction = useTransaction(cancelFund);
  const [showDropdown, setShowDropdown] = useState<number | boolean>(false);

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

  const toggleDropdown = (id: number) => setShowDropdown((prev) => (id === prev ? false : id));

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
              <h5>{FUND_STATUS[fund.status]}</h5>
              <p>{fund.reward.project.title}</p>
              <span>
                {fund.reward.title} | {numeral(fund.amount).format("0,0")} item(s)
              </span>
              <span>{moment(fund.createdAt).format("YYYY-MM-DD")}</span>
            </S.FundItemDescription>
          </Col>
          <Col xs={3} xl={2} className="d-none d-md-block ">
            {fund.status === FundStatus.valid && (
              <Button
                variant="outline"
                className="mb-2 w-100"
                onClick={() => handleClickRefund(fund.reward.project.id, fund.hashId)}
              >
                Refund
              </Button>
            )}
          </Col>
          <Col xs={1} className="d-block d-md-none p-0">
            <IconButton icon={faEllipsisVertical} onClick={() => toggleDropdown(fund.id)} />
            <Dropdown
              align="end"
              show={showDropdown === fund.id}
              onToggle={() => toggleDropdown(fund.id)}
            >
              <Dropdown.Menu
                css={css`
                  right: 0;
                `}
              >
                <Dropdown.Item
                  onClick={() => handleClickRefund(fund.reward.project.id, fund.hashId)}
                >
                  Refund
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
