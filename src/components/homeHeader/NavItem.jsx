'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { colors, typography } from '@policyengine/design-system/tokens';

const navItemStyle = {
  color: colors.text.inverse,
  fontWeight: typography.fontWeight.medium,
  fontSize: '15px',
  fontFamily: typography.fontFamily.primary,
  textDecoration: 'none',
  padding: '6px 14px',
  borderRadius: '6px',
  transition: 'background-color 0.15s ease',
  letterSpacing: '0.01em',
};

const hoverHandlers = {
  onMouseEnter: (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  },
};

function AppleDropdown({ items, open, onClose }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setContentHeight(0), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSelect = useCallback(
    (item) => {
      onClose();
      if (item.href) {
        window.location.href = item.href;
      } else if (item.onClick) {
        item.onClick();
      }
    },
    [onClose]
  );

  if (!open && contentHeight === 0) {
    return null;
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          cursor: 'default',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: visible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-8px)',
          marginTop: '10px',
          minWidth: '220px',
          overflow: 'hidden',
          maxHeight: visible ? `${contentHeight}px` : '0px',
          opacity: visible ? 1 : 0,
          transition:
            'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(240,249,255,0.95))',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          boxShadow:
            '0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
          zIndex: 1001,
        }}
      >
        <div ref={contentRef} style={{ padding: '8px' }}>
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelect(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                textAlign: 'left',
                padding: '11px 16px',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeight.semibold,
                color: colors.primary[800],
                transition: 'background-color 0.12s ease, color 0.12s ease, opacity 0.3s ease',
                transitionDelay: visible ? `${i * 50}ms` : '0ms',
                opacity: visible ? 1 : 0,
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary[500];
                e.currentTarget.style.color = colors.text.inverse;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.primary[800];
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default function NavItem({ setup }) {
  const { label, onClick, href, hasDropdown, dropdownItems } = setup;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') setDropdownOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [dropdownOpen]);

  if (hasDropdown && dropdownItems) {
    return (
      <div ref={containerRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => {
            onClick?.();
            setDropdownOpen((prev) => !prev);
          }}
          style={{
            ...navItemStyle,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          {...hoverHandlers}
        >
          <span>{label}</span>
          <IconChevronDown
            size={15}
            color={colors.text.inverse}
            style={{
              opacity: 0.7,
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
        <AppleDropdown
          items={dropdownItems}
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />
      </div>
    );
  }

  return (
    <a href={href} onClick={href ? undefined : onClick} style={navItemStyle} {...hoverHandlers}>
      {label}
    </a>
  );
}
