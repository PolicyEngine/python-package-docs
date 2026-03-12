'use client';

import NavItem from './NavItem';

export default function DesktopNavigation({ navItems }) {
  return (
    <div className="hidden lg:flex items-center gap-6">
      {navItems.map((item) => (
        <NavItem key={item.label} setup={item} />
      ))}
    </div>
  );
}
