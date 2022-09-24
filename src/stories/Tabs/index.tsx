import { ReactNode } from "react";
import { Tabs } from "react-bootstrap";
import * as S from "./styled";

interface CustomTabsProps {
  defaultActiveKey: string;
  children: ReactNode;
}

const CustomTabs = ({ defaultActiveKey, children }: CustomTabsProps) => {
  return (
    <S.TabsWrapper>
      <Tabs defaultActiveKey={defaultActiveKey}>{children}</Tabs>
    </S.TabsWrapper>
  );
};

export default CustomTabs;
