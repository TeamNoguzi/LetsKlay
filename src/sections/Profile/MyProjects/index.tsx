import { ProjectStatus } from "@/enums";
import { useMyProjectsWithStates } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import FundCard from "stories/Cards/FundCard";
import CustomDropdown from "stories/Dropdown";
import { Dropdown } from "react-bootstrap";
import Button from "stories/Buttons/Button";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "stories/Buttons/IconButton";
import * as S from "./styled";

const DropdownText = {
  [ProjectStatus.preparing]: "Preparing",
  [ProjectStatus.funding]: "Funding",
  [ProjectStatus.ended]: "Ended",
  [ProjectStatus.cancelled]: "Cancelled",
};

const MyProjects = () => {
  const router = useRouter();
  const [currentProjectStatus, setCurrentProjectStatus] = useState<ProjectStatus>(
    ProjectStatus.preparing
  );
  const { projects } = useMyProjectsWithStates(currentProjectStatus);
  const isMobile = useBreakpoint(down("md"));

  const handleClickCard = (id: number) => router.push(`/projects/${id}`);
  const handleClickDropdown = (key: ProjectStatus) => setCurrentProjectStatus(key);
  const handleClickModify = (id: number) => router.push(`/projects/${id}/modify`);

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
              imgSrc={project.thumbnailUrl}
              project={project}
              onClick={() => handleClickCard(project.id)}
            />
            {isMobile && <IconButton icon={faEllipsisVertical} />}
            {!isMobile && (
              <S.ButtonGroup>
                {+currentProjectStatus === ProjectStatus.preparing && (
                  <Button variant="primary" onClick={() => handleClickModify(project.id)}>
                    Modify
                  </Button>
                )}
                {(+currentProjectStatus === ProjectStatus.preparing ||
                  +currentProjectStatus === ProjectStatus.funding) && (
                  <Button variant="outline">Cancel</Button>
                )}
              </S.ButtonGroup>
            )}
          </S.CardWrapper>
        ))}
      </S.MyProjectsContainer>
    </>
  );
};

export default MyProjects;
