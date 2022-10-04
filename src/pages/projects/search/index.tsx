import { FindProjectResponseDto } from "@/dto";
import { searchProjects } from "api";
import { useProjectsSearch } from "hooks";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import ProjectsSearchSection from "sections/Projects/Search";
import Header from "stories/Layout/Header";
import Footer from "stories/Layout/Footer";
import { Container } from "react-bootstrap";
import CustomPagination from "stories/Pagination";
import * as S from "./styled";

interface ProjectsSearchProps {
  initialData: [FindProjectResponseDto[], number];
  search: string;
}

const ProjectsSearch = ({ initialData, search }: ProjectsSearchProps) => {
  const [page, setPage] = useState<number>(1);
  const { projects, count } = useProjectsSearch({ initialData, page, search });

  return (
    <>
      <Header />
      <Container as="main" className="mt-4">
        <ProjectsSearchSection projects={projects ?? []} searchKey={search} />
        <S.PaginationWrapper>
          <CustomPagination
            page={page}
            onClick={(newPage) => setPage(newPage)}
            totalPages={count ?? 0}
          />
        </S.PaginationWrapper>
      </Container>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const initialData = await searchProjects(1, "test");
  const search = (context.query.search as unknown as string) ?? "";

  return { props: { initialData, search } };
}

export default ProjectsSearch;
