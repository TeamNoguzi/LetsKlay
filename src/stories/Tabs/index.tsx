import { ReactNode } from "react";
import { Tabs } from "react-bootstrap";
import * as S from "./styled";

interface CustomTabsProps {
  id: string;
  activeKey: any;
  onSelect: (key: any) => void;
  children: ReactNode;
}

const CustomTabs = ({ id, activeKey, onSelect, children }: CustomTabsProps) => {
  return (
    <S.TabsWrapper>
      <Tabs id={id} activeKey={activeKey} onSelect={onSelect} mountOnEnter unmountOnExit>
        {children}
      </Tabs>
    </S.TabsWrapper>
  );
};

export default CustomTabs;
