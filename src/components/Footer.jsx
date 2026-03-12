'use client';

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconMail,
} from '@tabler/icons-react';
import { colors, spacing, typography } from '@policyengine/design-system/tokens';

const basePath = process.env.NODE_ENV === 'production' ? '/us/python-package' : '';
const PolicyEngineLogo = `${basePath}/assets/logos/policyengine/white.svg`;

const CONTACT_LINKS = {
  about: 'https://policyengine.org/us/team',
  donate: 'https://policyengine.org/us/donate',
  privacy: 'https://policyengine.org/us/privacy',
  terms: 'https://policyengine.org/us/terms',
};

const SOCIAL_LINKS = [
  { icon: IconMail, href: 'mailto:hello@policyengine.org', label: 'Email' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/ThePolicyEngine', label: 'Twitter' },
  { icon: IconBrandFacebook, href: 'https://www.facebook.com/PolicyEngine', label: 'Facebook' },
  { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/company/thepolicyengine', label: 'LinkedIn' },
  { icon: IconBrandYoutube, href: 'https://www.youtube.com/@policyengine', label: 'YouTube' },
  { icon: IconBrandInstagram, href: 'https://www.instagram.com/PolicyEngine/', label: 'Instagram' },
  { icon: IconBrandGithub, href: 'https://github.com/PolicyEngine', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        padding: `${spacing['4xl']} ${spacing['5xl']}`,
        background: `linear-gradient(to right, ${colors.primary[800]}, ${colors.primary[600]})`,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <img
          src={PolicyEngineLogo}
          alt="PolicyEngine"
          style={{ height: '52px', width: 'auto' }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            marginTop: spacing['3xl'],
            gap: spacing['4xl'],
          }}
          className="md:!grid-cols-2"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing['2xl'] }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
              {[
                { href: CONTACT_LINKS.about, text: 'About us' },
                { href: CONTACT_LINKS.donate, text: 'Donate' },
                { href: CONTACT_LINKS.privacy, text: 'Privacy policy' },
                { href: CONTACT_LINKS.terms, text: 'Terms and conditions' },
              ].map(({ href, text }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    color: colors.text.inverse,
                    fontSize: typography.fontSize.base,
                    textDecoration: 'none',
                    fontFamily: typography.fontFamily.primary,
                  }}
                >
                  {text}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color: colors.text.inverse }}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
              <p
                style={{
                  fontSize: typography.fontSize.xs,
                  color: colors.text.inverse,
                  margin: 0,
                  fontFamily: typography.fontFamily.primary,
                }}
              >
                &copy; {new Date().getFullYear()} PolicyEngine. All rights reserved.
              </p>
            </div>
          </div>

          <div style={{ paddingLeft: spacing.lg }}>
            <p
              style={{
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.inverse,
                fontFamily: typography.fontFamily.primary,
                margin: 0,
                fontSize: typography.fontSize['2xl'],
              }}
            >
              Subscribe to PolicyEngine
            </p>
            <p
              style={{
                fontSize: typography.fontSize.lg,
                color: colors.text.inverse,
                fontFamily: typography.fontFamily.primary,
                margin: `${spacing.sm} 0 0`,
              }}
            >
              Get the latest posts delivered right to your inbox.
            </p>
            <div style={{ marginTop: spacing.xl, width: '80%' }}>
              <a
                href="https://policyengine.org/us/research"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: `${spacing.md} ${spacing.xl}`,
                  backgroundColor: colors.primary[500],
                  color: colors.text.inverse,
                  border: `2px solid ${colors.primary[500]}`,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  fontFamily: typography.fontFamily.primary,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary[400];
                  e.currentTarget.style.borderColor = colors.primary[400];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary[500];
                  e.currentTarget.style.borderColor = colors.primary[500];
                }}
              >
                VISIT OUR RESEARCH
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
