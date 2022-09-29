import { useProjectsLikedAndCount } from "hooks";
import { useState } from "react";
import FundCard from "stories/Cards/FundCard";
import { useRouter } from "next/router";
import Pagination from "stories/Pagination";
import * as S from "./styled";

const LikedList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { likes, count } = useProjectsLikedAndCount(page);

  const handleClickCard = (projectId: number) => router.push(`/projects/${projectId}`);

  return (
    <S.LikedListContainer>
      {likes?.map(({ project }) => (
        <FundCard
          key={project.id}
          imgSrc={project.thumbnailUrl}
          project={project}
          onClick={() => handleClickCard(project.id)}
        />
      ))}
      <S.PaginationWrapper>
        <Pagination page={page} totalPages={count ?? 0} onClick={(newPage) => setPage(newPage)} />
      </S.PaginationWrapper>
    </S.LikedListContainer>
  );
};

export default LikedList;
