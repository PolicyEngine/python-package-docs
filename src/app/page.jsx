import {
  IconPackage,
  IconHome,
  IconUsers,
  IconScale,
  IconSearch,
  IconBrandPython,
  IconApi,
  IconBrandGithub,
} from '@tabler/icons-react';
import CodeBlock from '@/components/CodeBlock';
import LanguageTabs from '@/components/LanguageTabs';
import Footer from '@/components/Footer';

function Section({ id, title, icon: Icon, children }) {
  return (
    <section id={id} className="py-16 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          {Icon && <Icon size={28} className="text-primary-700" stroke={1.5} />}
          <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
          {number}
        </span>
        <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      </div>
      <div className="ml-10">{children}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, href }) {
  const content = (
    <div className="border border-border-light rounded-lg p-6 hover:border-primary-300 transition-colors">
      <Icon size={24} className="text-primary-700 mb-3" stroke={1.5} />
      <h3 className="font-medium mb-2 text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}

const INSTALL_CODE = `pip install policyengine-us`;

const HOUSEHOLD_CODE = `from policyengine_us import Simulation

sim = Simulation(
    situation={
        "people": {
            "parent": {
                "age": {"2025": 35},
                "employment_income": {"2025": 40_000},
            },
            "child1": {"age": {"2025": 8}},
            "child2": {"age": {"2025": 3}},
        },
        "tax_units": {
            "tax_unit": {
                "members": ["parent", "child1", "child2"],
                "filing_status": {"2025": "HEAD_OF_HOUSEHOLD"},
            }
        },
        "families": {"family": {"members": ["parent", "child1", "child2"]}},
        "spm_units": {"spm_unit": {"members": ["parent", "child1", "child2"]}},
        "marital_units": {"marital_unit": {"members": ["parent"]}},
        "households": {
            "household": {
                "members": ["parent", "child1", "child2"],
                "state_code": {"2025": "CA"},
            }
        },
    }
)

# Calculate any variable
eitc = sim.calculate("eitc", "2025")[0]
snap = sim.calculate("snap", "2025")[0]
ctc = sim.calculate("ctc", "2025")[0]
net = sim.calculate("household_net_income", "2025")[0]

print(f"EITC:       \${eitc:,.0f}")
print(f"SNAP:       \${snap:,.0f}")
print(f"CTC:        \${ctc:,.0f}")
print(f"Net income: \${net:,.0f}")`;

const ENTITY_TABLE = [
  ['people', 'Person', 'Individual person with demographics and income'],
  ['tax_units', 'TaxUnit', 'Federal tax filing unit (filers + dependents)'],
  ['families', 'Family', 'Family grouping (broader than tax unit)'],
  ['spm_units', 'SPMUnit', 'Supplemental Poverty Measure unit'],
  ['marital_units', 'MaritalUnit', 'Married couple or single adult (no children)'],
  ['households', 'Household', 'Physical household with state_code'],
];

const MICROSIM_CODE = `from policyengine_us import Microsimulation

sim = Microsimulation()  # Enhanced CPS 2024

# All statistics are automatically population-weighted
snap_spending = sim.calc("snap", period=2025).sum()
print(f"Total SNAP spending: \${snap_spending / 1e9:,.1f}B")

eitc_recipients = (sim.calc("eitc", period=2025) > 0).sum()
print(f"EITC recipients: {eitc_recipients / 1e6:,.1f}M")

median_income = sim.calc("household_net_income", period=2025).median()
print(f"Median household net income: \${median_income:,.0f}")`;

const STATE_MICROSIM_CODE = `# State-level datasets
sim = Microsimulation(
    dataset="hf://policyengine/policyengine-us-data/states/NY.h5"
)

# Congressional district datasets
sim = Microsimulation(
    dataset="hf://policyengine/policyengine-us-data/districts/NY-17.h5"
)`;

const REFORM_CODE = `from policyengine_us import Microsimulation
from policyengine_core.reforms import Reform

# Double the Child Tax Credit
reform = Reform.from_dict({
    "gov.irs.credits.ctc.amount.base[0].amount": {
        "2025-01-01.2100-12-31": 4000
    }
}, "policyengine_us")

baseline = Microsimulation()
reformed = Microsimulation(reform=reform)

# Budgetary cost
baseline_hni = baseline.calc("household_net_income", period=2025).sum()
reformed_hni = reformed.calc("household_net_income", period=2025).sum()
cost = (reformed_hni - baseline_hni) / 1e9
print(f"Total cost: \${cost:,.1f}B")

# Winners and losers
change = (
    reformed.calc("household_net_income", period=2025, map_to="person")
    - baseline.calc("household_net_income", period=2025, map_to="person")
)
winners = (change > 0).mean()
losers = (change < 0).mean()
print(f"Share gaining: {winners:.1%}")
print(f"Share losing:  {losers:.1%}")

# Poverty impact
baseline_pov = baseline.calc("person_in_poverty", period=2025, map_to="person")
reform_pov = reformed.calc("person_in_poverty", period=2025, map_to="person")
print(f"Baseline poverty rate: {baseline_pov.mean():.1%}")
print(f"Reform poverty rate:   {reform_pov.mean():.1%}")`;

const PARAM_CODE = `from policyengine_us import CountryTaxBenefitSystem

p = CountryTaxBenefitSystem().parameters

# Browse the parameter tree
print(p.gov.irs.credits.ctc.amount.base("2025-01-01"))
print(p.gov.irs.deductions.standard.amount.JOINT("2025-01-01"))
print(p.gov.usda.snap.income.deductions.earned_income("2025-01-01"))

# State parameters
print(p.gov.states.ca.tax.income.rates.single("2025-01-01"))
print(p.gov.states.ny.otda.tanf.need_standard.amount("2025-01-01"))`;

const PARAM_REFORM_CODE = `# Parameter paths map directly to Reform.from_dict() keys:
#   gov/irs/credits/ctc/amount/base.yaml
#   becomes: "gov.irs.credits.ctc.amount.base[0].amount"

# Filing-status parameters use the status as a suffix:
#   "gov.irs.deductions.standard.amount.JOINT"
#   "gov.irs.deductions.standard.amount.SINGLE"

# Date ranges use ISO format:
#   "2025-01-01.2100-12-31"  (Jan 1, 2025 through Dec 31, 2100)`;

const R_CODE = `library(reticulate)

# Point to a Python environment with policyengine-us installed
use_virtualenv("policyengine")

pe <- import("policyengine_us")

sim <- pe$Simulation(situation = list(
  people = list(
    parent = list(
      age = list("2025" = 35L),
      employment_income = list("2025" = 40000)
    )
  ),
  tax_units = list(
    tax_unit = list(
      members = list("parent"),
      filing_status = list("2025" = "SINGLE")
    )
  ),
  families = list(family = list(members = list("parent"))),
  spm_units = list(spm_unit = list(members = list("parent"))),
  marital_units = list(marital_unit = list(members = list("parent"))),
  households = list(
    household = list(
      members = list("parent"),
      state_code = list("2025" = "TX")
    )
  )
))

eitc <- sim$calculate("eitc", "2025")
cat("EITC:", eitc[1], "\\n")`;

const API_CODE = `import requests

response = requests.post(
    "https://household.api.policyengine.org/us/calculate",
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    json={
        "household": {
            "people": {
                "parent": {
                    "age": {"2025": 35},
                    "employment_income": {"2025": 40000}
                }
            },
            "tax_units": {
                "tax_unit": {
                    "members": ["parent"],
                    "filing_status": {"2025": "SINGLE"}
                }
            },
            "families": {"family": {"members": ["parent"]}},
            "spm_units": {"spm_unit": {"members": ["parent"]}},
            "marital_units": {"marital_unit": {"members": ["parent"]}},
            "households": {
                "household": {
                    "members": ["parent"],
                    "state_code": {"2025": "TX"}
                }
            }
        }
    }
)

result = response.json()["result"]
print(result["tax_units"]["tax_unit"]["eitc"]["2025"])`;

const PROGRAMS = [
  { category: 'Federal Tax', items: 'Income tax, AMT, capital gains tax, SALT, standard/itemized deductions' },
  { category: 'Federal Credits', items: 'EITC, CTC, CDCC, ACTC, PTC (ACA), education credits, saver\'s credit' },
  { category: 'Food Assistance', items: 'SNAP, WIC, school meals (NSLP, SBP)' },
  { category: 'Cash Assistance', items: 'TANF (all 50 states + DC), SSI, Social Security' },
  { category: 'Health', items: 'Medicaid, CHIP, ACA marketplace subsidies, Medicare Part B' },
  { category: 'Housing', items: 'Section 8 vouchers, public housing' },
  { category: 'Energy & Telecom', items: 'LIHEAP, Lifeline, ACP' },
  { category: 'State Taxes', items: 'Income tax for all 50 states + DC, property tax credits' },
  { category: 'State Benefits', items: 'State EITC, state CTC, TANF, child care subsidies, general assistance' },
];

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary-100 rounded-xl">
              <IconBrandPython size={40} className="text-primary-700" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            PolicyEngine Python package
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Simulate US federal and state tax and benefit policy for individual
            households or the entire population. Open source, free to use.
          </p>
          <div className="flex justify-center gap-4 mb-10">
            <a
              href="#installation"
              className="px-6 py-3 bg-primary-600 text-text-inverse rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Get started
            </a>
            <a
              href="https://github.com/PolicyEngine/policyengine-us"
              className="px-6 py-3 border border-border-medium rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 text-text-primary"
            >
              <IconBrandGithub size={20} />
              GitHub
            </a>
          </div>
          <div className="inline-block bg-gray-900 text-text-inverse rounded-lg px-6 py-3 font-mono text-sm">
            pip install policyengine-us
          </div>
        </div>
      </section>

      {/* Installation */}
      <Section id="installation" title="Installation" icon={IconPackage}>
        <p className="text-text-secondary mb-4">
          Requires Python 3.11 or later. Install from PyPI:
        </p>
        <CodeBlock code={INSTALL_CODE} language="bash" />
        <p className="text-sm text-text-tertiary mt-3">
          This installs <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">policyengine-us</code> and
          its dependencies including <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">policyengine-core</code>.
        </p>
      </Section>

      {/* Household Simulation */}
      <Section id="household" title="Household simulation" icon={IconHome}>
        <p className="text-text-secondary mb-6">
          Use the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">Simulation</code> class
          to calculate taxes and benefits for a specific household. Define people
          with their demographics and income, assign them to entity groups, and
          calculate any of 3,000+ variables.
        </p>

        <Step number={1} title="Define the household">
          <p className="text-text-secondary mb-4">
            A household requires six entity groups. Each person must appear in
            every group:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left py-2 pr-4 font-medium text-text-primary">Group</th>
                  <th className="text-left py-2 pr-4 font-medium text-text-primary">Entity</th>
                  <th className="text-left py-2 font-medium text-text-primary">Description</th>
                </tr>
              </thead>
              <tbody>
                {ENTITY_TABLE.map(([group, entity, desc]) => (
                  <tr key={group} className="border-b border-border-light">
                    <td className="py-2 pr-4 font-mono text-sm text-primary-700">{group}</td>
                    <td className="py-2 pr-4 text-text-primary">{entity}</td>
                    <td className="py-2 text-text-secondary">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Step>

        <Step number={2} title="Calculate variables">
          <p className="text-text-secondary mb-4">
            Call <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">sim.calculate(variable, year)</code> to
            compute any tax or benefit variable. The result is a NumPy array
            (one value per entity of that variable&apos;s type).
          </p>
          <CodeBlock code={HOUSEHOLD_CODE} />
        </Step>
      </Section>

      {/* Microsimulation */}
      <Section id="microsimulation" title="Population-level microsimulation" icon={IconUsers}>
        <p className="text-text-secondary mb-6">
          Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">Microsimulation</code> to
          estimate policy impacts across the entire US population. It uses a
          weighted survey dataset (Enhanced CPS 2024) where all statistics are
          automatically population-weighted.
        </p>

        <CodeBlock code={MICROSIM_CODE} />

        <h3 className="text-lg font-medium mt-8 mb-3 text-text-primary">
          State and district datasets
        </h3>
        <p className="text-text-secondary mb-4">
          Run microsimulations for a specific state or congressional district:
        </p>
        <CodeBlock code={STATE_MICROSIM_CODE} />
      </Section>

      {/* Reforms */}
      <Section id="reforms" title="Policy reforms" icon={IconScale}>
        <p className="text-text-secondary mb-6">
          Model the impact of policy changes by creating a reform that modifies
          parameter values. Compare baseline and reformed simulations to measure
          budgetary cost, distributional effects, and poverty impacts.
        </p>

        <CodeBlock code={REFORM_CODE} />
      </Section>

      {/* Parameter Discovery */}
      <Section id="parameters" title="Discovering parameters" icon={IconSearch}>
        <p className="text-text-secondary mb-6">
          The parameter tree mirrors the folder structure under{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">
            policyengine_us/parameters/
          </code>
          . Convert file paths to dot-notation to find any parameter.
        </p>

        <CodeBlock code={PARAM_CODE} />

        <h3 className="text-lg font-medium mt-8 mb-3 text-text-primary">
          Parameter paths in reforms
        </h3>
        <p className="text-text-secondary mb-4">
          The same dot-notation paths are used as keys in{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">
            Reform.from_dict()
          </code>
          :
        </p>
        <CodeBlock code={PARAM_REFORM_CODE} />

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-800">
            Browse all parameters and variables interactively at{' '}
            <a
              href="https://policyengine.org/us/model#/rules/parameters"
              className="underline font-medium"
            >
              policyengine.org/us/model
            </a>
            .
          </p>
        </div>
      </Section>

      {/* R and API Integration */}
      <Section id="integration" title="R and API integration" icon={IconApi}>
        <p className="text-text-secondary mb-6">
          Access PolicyEngine from R via the{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">reticulate</code>{' '}
          package, or use the REST API from any language.
        </p>

        <LanguageTabs
          tabs={[
            {
              label: 'R (reticulate)',
              content: (
                <div>
                  <p className="text-text-secondary mb-4">
                    Call the Python package directly from R. Install{' '}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-text-primary">
                      policyengine-us
                    </code>{' '}
                    in the Python environment that reticulate points to.
                  </p>
                  <CodeBlock code={R_CODE} language="r" />
                </div>
              ),
            },
            {
              label: 'REST API',
              content: (
                <div>
                  <p className="text-text-secondary mb-4">
                    Send household JSON to the API from any language. See the{' '}
                    <a
                      href="https://policyengine.org/us/api"
                      className="text-primary-600 underline"
                    >
                      API documentation
                    </a>{' '}
                    for authentication details.
                  </p>
                  <CodeBlock code={API_CODE} />
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* Coverage */}
      <Section id="coverage" title="Program coverage" icon={IconBrandPython}>
        <p className="text-text-secondary mb-6">
          PolicyEngine US models 3,000+ variables across federal and state tax
          and benefit programs:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-2 pr-4 font-medium w-1/3 text-text-primary">
                  Category
                </th>
                <th className="text-left py-2 font-medium text-text-primary">Programs</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMS.map(({ category, items }) => (
                <tr key={category} className="border-b border-border-light">
                  <td className="py-3 pr-4 font-medium text-text-primary">{category}</td>
                  <td className="py-3 text-text-secondary">{items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-800">
            See full program coverage at{' '}
            <a
              href="https://policyengine.org/us/model-coverage"
              className="underline font-medium"
            >
              policyengine.org/us/model-coverage
            </a>
            .
          </p>
        </div>
      </Section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-text-primary">Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard
              icon={IconBrandGithub}
              title="Source code"
              description="Open source on GitHub. File issues, contribute, or fork."
              href="https://github.com/PolicyEngine/policyengine-us"
            />
            <FeatureCard
              icon={IconApi}
              title="REST API"
              description="Simulate households via HTTP from any language."
              href="https://policyengine.org/us/api"
            />
            <FeatureCard
              icon={IconSearch}
              title="Model explorer"
              description="Browse all parameters and variables interactively."
              href="https://policyengine.org/us/model#/rules/parameters"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <a href="https://github.com/PolicyEngine/policyengine-us" className="text-primary-600 hover:underline">
              GitHub repository
            </a>
            <span className="text-text-tertiary">|</span>
            <a href="https://policyengine.org/us/api" className="text-primary-600 hover:underline">
              API documentation
            </a>
            <span className="text-text-tertiary">|</span>
            <a href="https://policyengine.org/us/model#/rules/parameters" className="text-primary-600 hover:underline">
              Model explorer
            </a>
            <span className="text-text-tertiary">|</span>
            <a href="https://pypi.org/project/policyengine-us/" className="text-primary-600 hover:underline">
              PyPI
            </a>
            <span className="text-text-tertiary">|</span>
            <a href="https://policyengine.github.io/policyengine-us/" className="text-primary-600 hover:underline">
              Technical docs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
