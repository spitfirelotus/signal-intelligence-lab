import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bolt,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircuitBoard,
  Factory,
  Filter,
  Gauge,
  Layers3,
  LineChart,
  Network,
  RadioTower,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap
} from 'lucide-react';
import './styles.css';

const signals = [
  {
    id: 'power-demand',
    category: 'Power Availability',
    audience: 'Executive Strategy',
    signal: 'AI data-center electricity demand',
    evidence:
      'Public utility plans, load-growth updates, data center announcements, and EIA electricity demand data showed a widening gap between AI compute growth and available power capacity.',
    expectedPattern:
      'More companies would prioritize power-secured campuses, co-location near generation, and earlier utility engagement.',
    validationWindow: 'Q3 2025 - Q2 2026',
    outcome:
      'Confirmed through continued power-constrained site selection, utility load forecast revisions, and increased executive attention to energy procurement.',
    status: 'Confirmed',
    accuracy: 'Directional signal validated',
    impact: 'Power availability became a board-level constraint for AI infrastructure timing and location strategy.',
    action:
      'Rank expansion sites by power certainty, interconnection status, and utility readiness before land or facility decisions.',
    confidence: 'High',
    sourceType: 'EIA data, utility filings, data center announcements',
    quarter: 'Q3 2025',
    icon: Bolt
  },
  {
    id: 'interconnection',
    category: 'Grid Constraints',
    audience: 'Operations',
    signal: 'Grid interconnection constraints',
    evidence:
      'Grid operator queues, interconnection studies, and utility commission proceedings indicated growing congestion and longer approval timelines.',
    expectedPattern:
      'Projects with weak interconnection positions would face sequencing delays, higher mitigation costs, or shifting site strategies.',
    validationWindow: 'Q3 2025 - Q1 2026',
    outcome:
      'Confirmed as queue delays and grid upgrade requirements remained prominent in regional planning and project execution.',
    status: 'Confirmed',
    accuracy: 'Directional signal validated',
    impact: 'Interconnection became a gating factor for construction schedules and operational launch plans.',
    action:
      'Maintain an interconnection risk register and pair each site plan with a fallback power pathway.',
    confidence: 'High',
    sourceType: 'Grid operator reports, interconnection queues',
    quarter: 'Q4 2025',
    icon: Network
  },
  {
    id: 'natural-gas',
    category: 'Generation Mix',
    audience: 'Energy Procurement',
    signal: 'Natural gas demand for power generation',
    evidence:
      'Power-sector gas burn data, capacity planning notes, and utility resource plans suggested dispatchable generation would remain important for new load growth.',
    expectedPattern:
      'AI infrastructure growth would increase scrutiny of gas-fired generation, power purchase strategy, and emissions tradeoffs.',
    validationWindow: 'Q4 2025 - Q2 2026',
    outcome:
      'Partially confirmed as dispatchable generation remained central to planning, though regional policy and fuel economics created uneven exposure.',
    status: 'Partially Confirmed',
    accuracy: 'Directional signal partially validated',
    impact: 'Energy strategy required more nuance across cost, reliability, permitting, and sustainability constraints.',
    action:
      'Model procurement scenarios across grid power, direct generation, storage, and contractual clean-energy claims.',
    confidence: 'Medium',
    sourceType: 'EIA data, utility plans, earnings calls',
    quarter: 'Q4 2025',
    icon: Factory
  },
  {
    id: 'transmission',
    category: 'Transmission',
    audience: 'Capital Planning',
    signal: 'Transmission investment',
    evidence:
      'Transmission planning dockets, regional cost-allocation debates, and utility capital plans pointed to rising grid investment requirements.',
    expectedPattern:
      'Transmission availability would influence market entry timing and raise the importance of regional grid intelligence.',
    validationWindow: 'Q1 2026 - Q2 2026',
    outcome:
      'Confirmed through continued transmission planning activity and investor focus on grid modernization.',
    status: 'Confirmed',
    accuracy: 'Directional signal validated',
    impact: 'Infrastructure planning became more dependent on long-cycle grid buildout assumptions.',
    action:
      'Treat transmission project status as a core input in capacity planning, not a background market condition.',
    confidence: 'High',
    sourceType: 'Transmission projects, regulatory updates',
    quarter: 'Q1 2026',
    icon: RadioTower
  },
  {
    id: 'equipment',
    category: 'Equipment Bottlenecks',
    audience: 'Supply Chain',
    signal: 'Transformer and electrical equipment constraints',
    evidence:
      'Equipment lead-time commentary, job postings, procurement updates, and manufacturing capacity signals showed persistent electrical infrastructure bottlenecks.',
    expectedPattern:
      'Critical equipment lead times would shape construction schedules and force earlier procurement decisions.',
    validationWindow: 'Q1 2026 - Q2 2026',
    outcome:
      'Confirmed as long-lead electrical equipment stayed visible in utility, construction, and data center planning.',
    status: 'Confirmed',
    accuracy: 'Directional signal validated',
    impact: 'Procurement timing became a strategic schedule risk rather than a back-office detail.',
    action:
      'Secure long-lead equipment assumptions before approving aggressive launch timelines.',
    confidence: 'High',
    sourceType: 'Equipment lead times, earnings calls, job postings',
    quarter: 'Q1 2026',
    icon: CircuitBoard
  },
  {
    id: 'water-cooling',
    category: 'Permitting and Water',
    audience: 'Site Selection',
    signal: 'Water and cooling constraints',
    evidence:
      'Permits, local reporting, water-resource discussions, and cooling technology announcements indicated rising scrutiny of water-intensive data center operations.',
    expectedPattern:
      'Water availability and cooling strategy would become more visible in approvals, community acceptance, and facility design.',
    validationWindow: 'Q2 2026',
    outcome:
      'Partially confirmed as water concerns gained prominence in selected markets, while impact remained highly local.',
    status: 'Partially Confirmed',
    accuracy: 'Directional signal partially validated',
    impact: 'Site selection needed closer integration with local resource constraints and community risk.',
    action:
      'Compare cooling designs against water availability, permitting risk, and community sensitivity by market.',
    confidence: 'Medium',
    sourceType: 'Permits, water constraints, data center announcements',
    quarter: 'Q2 2026',
    icon: Waves
  }
];

const methodology = [
  'Public Signals',
  'Pattern Identification',
  'Testable Expectation',
  'Validation',
  'Business Action'
];

const timeline = [
  {
    quarter: 'Q3 2025',
    title: 'Demand Pressure Surfaces',
    copy: 'Load growth, data center announcements, and utility plans make power availability a strategic constraint.'
  },
  {
    quarter: 'Q4 2025',
    title: 'Grid Friction Becomes Operational',
    copy: 'Interconnection queues and dispatchable generation needs start shaping project sequencing.'
  },
  {
    quarter: 'Q1 2026',
    title: 'Infrastructure Bottlenecks Clarify',
    copy: 'Transmission plans and electrical equipment constraints move into capital planning conversations.'
  },
  {
    quarter: 'Q2 2026',
    title: 'Local Constraints Matter More',
    copy: 'Water, permitting, workforce, and community signals become part of expansion readiness.'
  }
];

const sourceFramework = [
  'EIA data',
  'Grid operator reports',
  'Utility commission filings',
  'Interconnection queues',
  'Transmission projects',
  'Data center announcements',
  'Permits',
  'Earnings calls',
  'Job postings',
  'Equipment lead times',
  'Water constraints',
  'Regulatory updates'
];

const outlook = [
  'Power availability',
  'Interconnection delays',
  'Natural gas generation demand',
  'Transmission buildout',
  'Equipment bottlenecks',
  'Permitting',
  'Workforce signals'
];

const categoryOptions = ['All Categories', ...new Set(signals.map((item) => item.category))];
const audienceOptions = ['All Audiences', ...new Set(signals.map((item) => item.audience))];

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function calculateScorecard(items) {
  const confirmed = items.filter((item) => item.status === 'Confirmed').length;
  const partial = items.filter((item) => item.status === 'Partially Confirmed').length;
  const notConfirmed = items.filter((item) => item.status === 'Not Confirmed').length;
  const score = items.length ? Math.round(((confirmed + partial * 0.5) / items.length) * 100) : 0;

  return {
    total: items.length,
    confirmed,
    partial,
    notConfirmed,
    score
  };
}

function App() {
  const [category, setCategory] = useState('All Categories');
  const [audience, setAudience] = useState('All Audiences');
  const [selectedId, setSelectedId] = useState(signals[0].id);

  const filteredSignals = useMemo(() => {
    return signals.filter((item) => {
      const categoryMatch = category === 'All Categories' || item.category === category;
      const audienceMatch = audience === 'All Audiences' || item.audience === audience;
      return categoryMatch && audienceMatch;
    });
  }, [category, audience]);

  const scorecard = useMemo(() => calculateScorecard(filteredSignals), [filteredSignals]);
  const selectedSignal = filteredSignals.find((item) => item.id === selectedId) || filteredSignals[0] || null;

  function resetFilters() {
    setCategory('All Categories');
    setAudience('All Audiences');
    setSelectedId(signals[0].id);
  }

  return (
    <main>
      <section className="hero">
        <div className="heroContent">
          <nav className="topbar" aria-label="Product">
            <div className="brandMark">
              <Activity size={22} aria-hidden="true" />
              <span>Signal Intelligence Lab</span>
            </div>
            <div className="topbarPills">
              <span>Local Data</span>
              <span>Vercel Ready</span>
            </div>
          </nav>

          <div className="heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">Signal - Insight - Action</p>
              <h1>Power Signal Radar</h1>
              <p className="heroSubtitle">
                Backtested intelligence for AI infrastructure and energy-constrained operations.
              </p>
              <div className="heroActions" aria-label="Primary metrics">
                <div>
                  <strong>{signals.length}</strong>
                  <span>Curated signals</span>
                </div>
                <div>
                  <strong>{calculateScorecard(signals).score}%</strong>
                  <span>Directional validation</span>
                </div>
                <div>
                  <strong>0</strong>
                  <span>Paid APIs</span>
                </div>
              </div>
            </div>

            <div className="radarPanel" aria-label="Signal radar visualization">
              <div className="radar">
                <span className="radarSweep" />
                <span className="radarDot dotOne" />
                <span className="radarDot dotTwo" />
                <span className="radarDot dotThree" />
                <span className="radarDot dotFour" />
                <div className="radarCenter">
                  <Zap size={26} aria-hidden="true" />
                  <span>Power</span>
                </div>
              </div>
              <div className="radarReadout">
                <span>Latest validated pattern</span>
                <strong>Grid constraints are shaping AI infrastructure timelines.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section methodologySection" aria-labelledby="methodology-title">
        <div className="sectionHeader">
          <p className="eyebrow">Methodology over prediction</p>
          <h2 id="methodology-title">From public signal to business action</h2>
          <p>
            This prototype identifies signals, formulates testable expectations, validates outcomes, and turns the result into decision-ready guidance.
          </p>
        </div>
        <div className="methodologyFlow">
          {methodology.map((item, index) => (
            <React.Fragment key={item}>
              <div className="methodStep">
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </div>
              {index < methodology.length - 1 && <ArrowRight className="flowArrow" size={22} aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="section timelineSection" aria-labelledby="timeline-title">
        <div className="sectionHeader compactHeader">
          <p className="eyebrow">One-year signal timeline</p>
          <h2 id="timeline-title">How the operating picture developed</h2>
        </div>
        <div className="timelineGrid">
          {timeline.map((item) => (
            <article className="timelineItem" key={item.quarter}>
              <span>{item.quarter}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section intelligenceWorkspace" aria-labelledby="signals-title">
        <div className="workspaceHeader">
          <div>
            <p className="eyebrow">Backtested signal cards</p>
            <h2 id="signals-title">Decision-ready signal intelligence</h2>
          </div>
          <div className="filterBar" aria-label="Signal filters">
            <label>
              <Filter size={16} aria-hidden="true" />
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <BriefcaseBusiness size={16} aria-hidden="true" />
              <select value={audience} onChange={(event) => setAudience(event.target.value)}>
                {audienceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <button type="button" onClick={resetFilters} aria-label="Reset filters">
              <RefreshCcw size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="scorecardGrid">
          <Metric icon={Layers3} label="Total signals" value={scorecard.total} />
          <Metric icon={CheckCircle2} label="Confirmed" value={scorecard.confirmed} />
          <Metric icon={ShieldCheck} label="Partially confirmed" value={scorecard.partial} />
          <Metric icon={Gauge} label="Directional validation" value={`${scorecard.score}%`} />
        </div>

        <div className="signalGrid">
          {filteredSignals.map((item) => {
            const Icon = item.icon;
            return (
              <article
                className={`signalCard ${selectedSignal.id === item.id ? 'selected' : ''}`}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedId(item.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedSignal.id === item.id}
              >
                <div className="cardTopline">
                  <span className={`statusBadge ${getStatusClass(item.status)}`}>{item.status}</span>
                  <span>{item.confidence} confidence</span>
                </div>
                <div className="signalIcon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3>{item.signal}</h3>
                <p>{item.expectedPattern}</p>
                <dl>
                  <div>
                    <dt>Audience</dt>
                    <dd>{item.audience}</dd>
                  </div>
                  <div>
                    <dt>Window</dt>
                    <dd>{item.validationWindow}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
          {!filteredSignals.length && (
            <div className="emptyState">
              <Search size={24} aria-hidden="true" />
              <h3>No matching signals</h3>
              <p>Adjust the category or audience filter to generate a brief from the local signal set.</p>
            </div>
          )}
        </div>

        {selectedSignal && <ExecutiveBrief signal={selectedSignal} scorecard={scorecard} />}
      </section>

      <section className="section frameworkSection" aria-labelledby="source-title">
        <div className="sectionHeader compactHeader">
          <p className="eyebrow">Source framework</p>
          <h2 id="source-title">Signals worth monitoring</h2>
        </div>
        <div className="sourceGrid">
          {sourceFramework.map((source) => (
            <div className="sourceItem" key={source}>
              <Search size={16} aria-hidden="true" />
              <span>{source}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section outlookSection" aria-labelledby="outlook-title">
        <div className="outlookPanel">
          <div>
            <p className="eyebrow">Current outlook</p>
            <h2 id="outlook-title">What companies should monitor next</h2>
          </div>
          <div className="outlookGrid">
            {outlook.map((item) => (
              <div className="outlookItem" key={item}>
                <BadgeCheck size={18} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <span>Built as a human-centered AI systems prototype by Suzy Thompson.</span>
        <span>Static local data only. No paid APIs. No forecasting guarantees.</span>
      </footer>
    </main>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <article className="metricCard">
      <Icon size={20} aria-hidden="true" />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function ExecutiveBrief({ signal, scorecard }) {
  return (
    <article className="briefPanel" aria-labelledby="brief-title">
      <div className="briefHeader">
        <div>
          <p className="eyebrow">Executive brief generator</p>
          <h2 id="brief-title">{signal.signal}</h2>
        </div>
        <span className={`statusBadge ${getStatusClass(signal.status)}`}>{signal.accuracy}</span>
      </div>

      <div className="briefGrid">
        <BriefBlock title="Signal" copy={signal.signal} icon={LineChart} />
        <BriefBlock title="Evidence" copy={signal.evidence} icon={Building2} />
        <BriefBlock title="Expected pattern" copy={signal.expectedPattern} icon={Sparkles} />
        <BriefBlock title="Outcome" copy={signal.outcome} icon={CheckCircle2} />
        <BriefBlock title="Business impact" copy={signal.impact} icon={BriefcaseBusiness} />
        <BriefBlock title="Recommended action" copy={signal.action} icon={ArrowRight} />
      </div>

      <div className="briefFooter">
        <span>Validation window: {signal.validationWindow}</span>
        <span>Audience: {signal.audience}</span>
        <span>Source type: {signal.sourceType}</span>
        <span>Filtered directional validation score: {scorecard.score}%</span>
      </div>
    </article>
  );
}

function BriefBlock({ title, copy, icon: Icon }) {
  return (
    <div className="briefBlock">
      <div>
        <Icon size={17} aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <p>{copy}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
