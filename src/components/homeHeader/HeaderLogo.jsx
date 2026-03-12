'use client';

import { spacing } from '@policyengine/design-system/tokens';

const basePath = process.env.NODE_ENV === 'production' ? '/us/python-package' : '';
const PolicyEngineLogo = `${basePath}/assets/logos/policyengine/white.svg`;

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const logoImageStyles = {
  height: '24px',
  width: 'auto',
  marginRight: 12,
};

export default function HeaderLogo() {
  const logoImage = <img src={PolicyEngineLogo} alt="PolicyEngine" style={logoImageStyles} />;

  return (
    <a href="https://policyengine.org/us" style={{ ...logoContainerStyles, marginRight: spacing.md }}>
      {logoImage}
    </a>
  );
}
