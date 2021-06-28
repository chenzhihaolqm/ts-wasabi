import { FC } from 'react'
import Tabs, {TabsProps} from './tabs'
import TabItem, { TabItemProps } from './tabItem'

export type TabsComponent = FC<TabsProps> & {
  TabItem: FC<TabItemProps>
}

const TransTabs = Tabs as TabsComponent;
TransTabs.TabItem = TabItem;

export default TransTabs;