'use client';

import { useState } from 'react';

export default function LanguageTabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex border-b border-border-light mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              active === i
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[active].content}
    </div>
  );
}
