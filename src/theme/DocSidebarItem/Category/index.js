import React from 'react';
import DocSidebarItemCategory from '@theme-original/DocSidebarItem/Category';
import { Rocket, Video, Lightbulb, Settings, BookMarked } from 'lucide-react';

const iconMap = { Rocket, Video, Lightbulb, Settings, BookMarked };

export default function DocSidebarItemCategoryWrapper(props) {
  const { item } = props;
  const iconName = item.customProps?.icon;
  const IconComponent = iconName ? iconMap[iconName] : null;

  if (!IconComponent) {
    return <DocSidebarItemCategory {...props} />;
  }

  const patchedItem = {
    ...item,
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="sidebar-category-icon" style={{ display: 'flex', alignItems: 'center' }}>
          <IconComponent size={15} />
        </span>
        {item.label}
      </span>
    ),
  };

  return <DocSidebarItemCategory {...props} item={patchedItem} />;
}
