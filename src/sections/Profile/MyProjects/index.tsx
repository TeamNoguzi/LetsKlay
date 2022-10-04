import { ProjectStatus } from "@/enums";
import { useAuthGuard, useMyProjectsWithStatesPaged, useTransaction } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import FundCard from "stories/Cards/FundCard";
import CustomDropdown from "stories/Dropdown";
import { Dropdown } from "react-bootstrap";
import Button from "stories/Buttons/Button";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import { faEllipsisVertical, faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "stories/Buttons/IconButton";
import { verifySession } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { cancelProject } from "transactions";
import Pagination from "stories/Pagination";
import { css } from "@emotion/react";
import * as S from "./styled";

const DropdownText = {
  [ProjectStatus.preparing]: "Preparing",
  [ProjectStatus.funding]: "Funding",
  [ProjectStatus.ended]: "Ended",
  [ProjectStatus.cancelled]: "Cancelled",
};

const MyProjects = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentProjectStatus, setCurrentProjectStatus] = useState<ProjectStatus>(
    ProjectStatus.preparing
  );
  const [page, setPage] = useState<number>(1);
  const { projects, count } = useMyProjectsWithStatesPaged(currentProjectStatus, page);
  const isMobile = useBreakpoint(down("md"));
  const verifySessionGuarded = useAuthGuard(verifySession);
  const cancelProjectTransaction = useTransaction(cancelProject);
  const [showDropdown, setShowDropdown] = useState<number | boolean>(false);

  const handleClickCard = (id: number) => router.push(`/projects/${id}`);
  const handleClickDropdown = (key: ProjectStatus) => setCurrentProjectStatus(key);
  const handleClickModify = (projectId: number) => router.push(`/projects/${projectId}/modify`);
  const handleClickCancel = async (projectId: number) => {
    await verifySessionGuarded(undefined);
    await cancelProjectTransaction(projectId, {
      title: "Project Cancelled",
      body: "The project is cancelled. Raised funds are refunded to investors.",
      icon: faCheck,
    });
    queryClient.invalidateQueries(["projects", "users"]);
  };
  const toggleDropdown = (id: number) => setShowDropdown((prev) => (id === prev ? false : id));

  return (
    <>
      <S.DropdownWrapper>
        <CustomDropdown text={DropdownText[currentProjectStatus]} onSelect={handleClickDropdown}>
          <Dropdown.Item eventKey={ProjectStatus.preparing}>Preparing</Dropdown.Item>
          <Dropdown.Item eventKey={ProjectStatus.funding}>Funding</Dropdown.Item>
          <Dropdown.Item eventKey={ProjectStatus.ended}>Ended</Dropdown.Item>
          <Dropdown.Item eventKey={ProjectStatus.cancelled}>Cancelled</Dropdown.Item>
        </CustomDropdown>
      </S.DropdownWrapper>
      <S.MyProjectsContainer>
        {projects?.map((project) => (
          <S.CardWrapper key={project.id}>
            <FundCard
              large={!isMobile}
              imgSrc={`/${project.thumbnailUrl}`}
              project={project}
              onClick={() => handleClickCard(project.id)}
            />

            {isMobile && (
              <>
                <IconButton icon={faEllipsisVertical} onClick={() => toggleDropdown(project.id)} />
                <Dropdown
                  align="end"
                  show={showDropdown === project.id}
                  onToggle={() => toggleDropdown(project.id)}
                >
                  <Dropdown.Menu
                    css={css`
                      right: 0;
                      top: 32px;
                    `}
                  >
                    {+currentProjectStatus === ProjectStatus.preparing && (
                      <Dropdown.Item onClick={() => handleClickModify(project.id)}>
                        Modify
                      </Dropdown.Item>
                    )}
                    {(+currentProjectStatus === ProjectStatus.preparing ||
                      +currentProjectStatus === ProjectStatus.funding) && (
                      <Dropdown.Item onClick={() => handleClickCancel(project.id)}>
                        Cancel
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}

            {!isMobile && (
              <S.ButtonGroup>
                {+currentProjectStatus === ProjectStatus.preparing && (
                  <Button variant="primary" onClick={() => handleClickModify(project.id)}>
                    Modify
                  </Button>
                )}
                {(+currentProjectStatus === ProjectStatus.preparing ||
                  +currentProjectStatus === ProjectStatus.funding) && (
                  <Button variant="outline" onClick={() => handleClickCancel(project.id)}>
                    Cancel
                  </Button>
                )}
              </S.ButtonGroup>
            )}
          </S.CardWrapper>
        ))}
      </S.MyProjectsContainer>
      <S.PaginationWrapper>
        <Pagination page={page} totalPages={count ?? 0} onClick={(nextPage) => setPage(nextPage)} />
      </S.PaginationWrapper>
    </>
  );
};

export default MyProjects;
