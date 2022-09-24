import styled from "@emotion/styled";

const TabsWrapper = styled.div`
  width: 100%;
  .nav-tabs {
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;

    margin-bottom: 10px;
    border: none;

    .nav-link.nav-link {
      min-width: 80px;
      margin-right: 20px;
      border: none;

      font-weight: bold;
      color: ${(props) => props.theme.colors.black};
    }

    .nav-link.active {
      border: none;
      border-bottom: 3px solid ${(props) => props.theme.colors.black};
    }

    &::-webkit-scrollbar {
      height: 0px;
    }
  }
`;

export { TabsWrapper };
