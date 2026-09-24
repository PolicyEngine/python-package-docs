'use client';

import { useCallback, useState } from 'react';
import HeaderContent from '@/components/homeHeader/HeaderContent';
import { colors, spacing, typography } from '@policyengine/design-system/tokens';

function useDisclosure(initialState = false) {
  const [opened, setOpened] = useState(initialState);
  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);
  const toggle = useCallback(() => setOpened((prev) => !prev), []);
  return [opened, { open, close, toggle }];
}

const navItems = [
  {
    label: 'Research',
    href: 'https://policyengine.org/us/research',
    hasDropdown: false,
  },
  {
    label: 'Model',
    href: 'https://policyengine.org/us/model',
    hasDropdown: false,
  },
  {
    label: 'API',
    href: 'https://policyengine.org/us/api',
    hasDropdown: false,
  },
  {
    label: 'About',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Team', href: 'https://policyengine.org/us/team' },
      { label: 'Supporters', href: 'https://policyengine.org/us/supporters' },
    ],
  },
  {
    label: 'Donate',
    href: 'https://policyengine.org/us/donate',
    hasDropdown: false,
  },
];

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        padding: `${spacing.sm} ${spacing['2xl']}`,
        height: spacing.layout.header,
        background: `linear-gradient(to right, ${colors.primary[800]}, ${colors.primary[600]})`,
        borderBottom: `0.5px solid ${colors.primary[700]}`,
        boxShadow: `0px 2px 4px -1px ${colors.shadow.light}, 0px 4px 6px -1px ${colors.shadow.medium}`,
        zIndex: 1000,
        fontFamily: typography.fontFamily.primary,
        opacity: opened ? 0 : 1,
        transition: 'opacity 0.1s ease',
        width: '100%',
      }}
    >
      <HeaderContent
        opened={opened}
        onOpen={open}
        onClose={close}
        navItems={navItems}
      />
    </div>
  );
}
