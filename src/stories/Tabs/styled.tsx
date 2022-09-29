import styled from "@emotion/styled";

const TabsWrapper = styled.div`
  width: 100%;
  .nav-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;

    margin-bottom: 10px;
    border: none;

    .nav-link.nav-link {
      min-width: 140px;
      margin-right: 10px;
      border: none;

      font-weight: bold;
      color: ${(props) => props.theme.colors.black};
    }

    .nav-link.active {
      border: none;
      border-bottom: 3px solid ${(props) => props.theme.colors.black};
    }
  }
`;

export { TabsWrapper };
