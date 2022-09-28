import { ProjectStatus } from "@/enums";
import { useMyProjectsWithStates } from "hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FundCard from "stories/Cards/FundCard";
import CustomDropdown from "stories/Dropdown";
import { Dropdown } from "react-bootstrap";
import Button from "stories/Buttons/Button";
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

  const handleClickCard = (id: number) => router.push(`/projects/${id}`);
  const handleClickDropdown = (key: ProjectStatus) => setCurrentProjectStatus(key);

  return (
    <>
      <CustomDropdown text={DropdownText[currentProjectStatus]} onSelect={handleClickDropdown}>
        <Dropdown.Item eventKey={ProjectStatus.preparing}>Preparing</Dropdown.Item>
        <Dropdown.Item eventKey={ProjectStatus.funding}>Funding</Dropdown.Item>
        <Dropdown.Item eventKey={ProjectStatus.ended}>Ended</Dropdown.Item>
        <Dropdown.Item eventKey={ProjectStatus.cancelled}>Cancelled</Dropdown.Item>
      </CustomDropdown>
      <S.MyProjectsContainer>
        {projects?.map((project) => (
          <S.CardWrapper key={project.id}>
            <FundCard
              large
              imgSrc={project.thumbnailUrl}
              project={project}
              onClick={() => handleClickCard(project.id)}
            />
            {currentProjectStatus === ProjectStatus.preparing ? (
              <S.ButtonGroup>
                <Button variant="primary">Modify</Button>
                <Button variant="outline">Remove</Button>
              </S.ButtonGroup>
            ) : (
              <>hi</>
            )}
          </S.CardWrapper>
        ))}
      </S.MyProjectsContainer>
    </>
  );
};

export default MyProjects;
