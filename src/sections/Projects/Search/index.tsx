import React, { useState } from "react";
import { FindProjectResponseDto } from "@/dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import FundCard from "stories/Cards/FundCard";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { css } from "@emotion/react";
import * as S from "./styled";

interface ProjectsSearchSectionProps {
  projects: FindProjectResponseDto[];
  searchKey: string;
}

const ProjectsSearchSection = ({
  projects,
  searchKey: initialSearchKey,
}: ProjectsSearchSectionProps) => {
  const router = useRouter();
  const isMobile = useBreakpoint(down("md"));
  const [searchKey, setSearchKey] = useState<string>(initialSearchKey ?? "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchKey(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/projects/search?search=${searchKey}`);
  };
  const handleClickSearch = () => {
    router.push(`/projects/search?search=${searchKey}`);
  };

  const handleClickCard = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <S.SearchWrapper>
      <S.SearchForm onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} fontSize={18} width={50} onClick={handleClickSearch} />
        <input value={searchKey} onChange={handleInputChange} />
      </S.SearchForm>
      <p
        css={css`
          padding-bottom: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid black;

          font-size: 16pt;
          font-weight: bold;
        `}
      >
        Results
      </p>
      <S.SearchResultContainer>
        {projects &&
          projects.map((project) => (
            <React.Fragment key={project.id}>
              <FundCard
                imgSrc={`/${project.thumbnailUrl}`}
                project={project}
                large={!isMobile}
                onClick={() => handleClickCard(project.id)}
              />
              {isMobile && <S.Divider />}
            </React.Fragment>
          ))}
      </S.SearchResultContainer>
    </S.SearchWrapper>
  );
};

export default ProjectsSearchSection;
