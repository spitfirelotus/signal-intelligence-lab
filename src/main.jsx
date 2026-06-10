import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bolt,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircuitBoard,
  Database,
  Download,
  Factory,
  FileText,
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
  Table2,
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

const evidenceRecords = [
  {
    id: 'ev-001',
    date: '2025-07-18',
    quarter: 'Q3 2025',
    signalId: 'power-demand',
    category: 'Power Availability',
    sourceType: 'EIA data',
    region: 'US national',
    observation:
      'Electricity demand narratives shifted from broad load growth to specific AI and data-center capacity pressure.',
    businessQuestion: 'Can planned AI infrastructure be powered on the preferred timeline?',
    indicator: 'Load growth and power availability',
    strength: 92,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Treat energy access as a site-selection requirement rather than a procurement item.'
  },
  {
    id: 'ev-002',
    date: '2025-08-06',
    quarter: 'Q3 2025',
    signalId: 'power-demand',
    category: 'Power Availability',
    sourceType: 'Utility filing',
    region: 'Southeast',
    observation:
      'Utility planning language increasingly connected new large-load requests with data-center and advanced-computing demand.',
    businessQuestion: 'Where will utility readiness constrain expansion?',
    indicator: 'Utility load forecast revision',
    strength: 88,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Compare candidate sites against utility planning posture and available substation capacity.'
  },
  {
    id: 'ev-003',
    date: '2025-09-11',
    quarter: 'Q3 2025',
    signalId: 'interconnection',
    category: 'Grid Constraints',
    sourceType: 'Interconnection queue',
    region: 'PJM / Mid-Atlantic',
    observation:
      'Queue congestion and study timelines pointed to schedule risk for large-load and generation-adjacent projects.',
    businessQuestion: 'Which projects are exposed to grid-connection delay?',
    indicator: 'Queue volume and study timing',
    strength: 86,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Maintain a separate interconnection risk view for each site or generation partner.'
  },
  {
    id: 'ev-004',
    date: '2025-10-02',
    quarter: 'Q4 2025',
    signalId: 'natural-gas',
    category: 'Generation Mix',
    sourceType: 'EIA data',
    region: 'US national',
    observation:
      'Power generation planning continued to rely on dispatchable supply as new load growth became more visible.',
    businessQuestion: 'How should companies balance reliability, cost, and sustainability claims?',
    indicator: 'Gas-fired generation demand',
    strength: 74,
    confidence: 'Medium',
    validationStatus: 'Partially Confirmed',
    reportNote:
      'Model procurement scenarios instead of assuming a single clean-energy pathway.'
  },
  {
    id: 'ev-005',
    date: '2025-10-24',
    quarter: 'Q4 2025',
    signalId: 'interconnection',
    category: 'Grid Constraints',
    sourceType: 'Grid operator report',
    region: 'ERCOT / Texas',
    observation:
      'Large-load planning discussions showed the need to evaluate power availability, queue position, and grid upgrade exposure together.',
    businessQuestion: 'How much schedule risk sits outside direct company control?',
    indicator: 'Grid planning and large-load readiness',
    strength: 90,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Pair preferred sites with fallback energy pathways before final location commitments.'
  },
  {
    id: 'ev-006',
    date: '2025-11-15',
    quarter: 'Q4 2025',
    signalId: 'power-demand',
    category: 'Power Availability',
    sourceType: 'Data center announcement',
    region: 'Midwest',
    observation:
      'Announcements emphasized power-secured campuses, direct utility engagement, and energy-intensive AI workloads.',
    businessQuestion: 'Are competitors locking up scarce powered sites?',
    indicator: 'Power-secured site language',
    strength: 82,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Track announcement language for clues about power procurement strategy.'
  },
  {
    id: 'ev-007',
    date: '2025-12-03',
    quarter: 'Q4 2025',
    signalId: 'natural-gas',
    category: 'Generation Mix',
    sourceType: 'Earnings call',
    region: 'US national',
    observation:
      'Management commentary linked AI infrastructure growth with reliability requirements and power-market complexity.',
    businessQuestion: 'Which financial assumptions depend on stable power economics?',
    indicator: 'Executive power-risk commentary',
    strength: 68,
    confidence: 'Medium',
    validationStatus: 'Partially Confirmed',
    reportNote:
      'Flag power-cost sensitivity in capital plans and customer pricing models.'
  },
  {
    id: 'ev-008',
    date: '2026-01-09',
    quarter: 'Q1 2026',
    signalId: 'transmission',
    category: 'Transmission',
    sourceType: 'Transmission project',
    region: 'Western US',
    observation:
      'Transmission project updates showed long-cycle grid investment becoming more relevant to market-entry timing.',
    businessQuestion: 'Which markets need transmission progress before scale-up?',
    indicator: 'Transmission buildout schedule',
    strength: 84,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Include transmission milestones in regional expansion readiness reviews.'
  },
  {
    id: 'ev-009',
    date: '2026-01-26',
    quarter: 'Q1 2026',
    signalId: 'equipment',
    category: 'Equipment Bottlenecks',
    sourceType: 'Equipment lead time',
    region: 'US national',
    observation:
      'Transformer and switchgear lead-time references remained visible across utility and construction planning.',
    businessQuestion: 'Will electrical equipment availability delay launch?',
    indicator: 'Long-lead equipment pressure',
    strength: 91,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Validate long-lead equipment assumptions before approving aggressive delivery dates.'
  },
  {
    id: 'ev-010',
    date: '2026-02-13',
    quarter: 'Q1 2026',
    signalId: 'equipment',
    category: 'Equipment Bottlenecks',
    sourceType: 'Job postings',
    region: 'Southeast',
    observation:
      'Hiring demand for electrical, substation, and power-systems roles suggested operational strain around grid and facility delivery.',
    businessQuestion: 'Where could workforce shortages become schedule risk?',
    indicator: 'Power-systems hiring demand',
    strength: 77,
    confidence: 'Medium',
    validationStatus: 'Confirmed',
    reportNote:
      'Monitor specialized hiring patterns as an early capacity signal.'
  },
  {
    id: 'ev-011',
    date: '2026-02-27',
    quarter: 'Q1 2026',
    signalId: 'transmission',
    category: 'Transmission',
    sourceType: 'Regulatory update',
    region: 'Mid-Atlantic',
    observation:
      'Regulatory activity kept transmission cost allocation and grid modernization in the foreground.',
    businessQuestion: 'How will grid investment affect total expansion cost?',
    indicator: 'Regulatory transmission activity',
    strength: 80,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Treat transmission policy as a cost and timing input for regional strategy.'
  },
  {
    id: 'ev-012',
    date: '2026-03-19',
    quarter: 'Q1 2026',
    signalId: 'equipment',
    category: 'Equipment Bottlenecks',
    sourceType: 'Earnings call',
    region: 'US national',
    observation:
      'Supplier and infrastructure commentary reinforced that electrical equipment availability remained a limiting factor.',
    businessQuestion: 'Which procurement decisions need to move earlier?',
    indicator: 'Supplier capacity commentary',
    strength: 87,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Move critical electrical procurement into the earliest planning stage.'
  },
  {
    id: 'ev-013',
    date: '2026-04-04',
    quarter: 'Q2 2026',
    signalId: 'water-cooling',
    category: 'Permitting and Water',
    sourceType: 'Permit',
    region: 'Southwest',
    observation:
      'Local permit and resource discussions connected data-center growth with water availability and cooling design scrutiny.',
    businessQuestion: 'Could local resource constraints affect approval or community acceptance?',
    indicator: 'Water and cooling permit sensitivity',
    strength: 72,
    confidence: 'Medium',
    validationStatus: 'Partially Confirmed',
    reportNote:
      'Evaluate water profile and cooling design before public project announcements.'
  },
  {
    id: 'ev-014',
    date: '2026-04-22',
    quarter: 'Q2 2026',
    signalId: 'water-cooling',
    category: 'Permitting and Water',
    sourceType: 'Water constraint',
    region: 'Western US',
    observation:
      'Regional water stress made cooling strategy a more visible operating and reputational variable.',
    businessQuestion: 'Which site plans need lower-water cooling options?',
    indicator: 'Water-resource constraint',
    strength: 70,
    confidence: 'Medium',
    validationStatus: 'Partially Confirmed',
    reportNote:
      'Compare cooling technology, local water availability, and community risk by market.'
  },
  {
    id: 'ev-015',
    date: '2026-05-07',
    quarter: 'Q2 2026',
    signalId: 'interconnection',
    category: 'Grid Constraints',
    sourceType: 'Utility commission filing',
    region: 'Midwest',
    observation:
      'Proceedings continued to surface questions about who pays for grid upgrades tied to large new loads.',
    businessQuestion: 'Could grid-upgrade costs shift project economics?',
    indicator: 'Large-load cost allocation',
    strength: 83,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Include cost-allocation exposure in site and customer contract review.'
  },
  {
    id: 'ev-016',
    date: '2026-05-28',
    quarter: 'Q2 2026',
    signalId: 'transmission',
    category: 'Transmission',
    sourceType: 'Grid operator report',
    region: 'US regional markets',
    observation:
      'Regional planning continued to show transmission buildout as a long-cycle dependency for new electric load.',
    businessQuestion: 'Which markets can support near-term load without major upgrades?',
    indicator: 'Regional transmission readiness',
    strength: 85,
    confidence: 'High',
    validationStatus: 'Confirmed',
    reportNote:
      'Use regional grid readiness as a timing filter for capital deployment.'
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
const evidenceCategoryOptions = ['All Categories', ...new Set(evidenceRecords.map((item) => item.category))];
const evidenceQuarterOptions = ['All Quarters', ...new Set(evidenceRecords.map((item) => item.quarter))];
const evidenceSourceOptions = ['All Sources', ...new Set(evidenceRecords.map((item) => item.sourceType))];

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

function summarizeRecords(records) {
  const confirmed = records.filter((item) => item.validationStatus === 'Confirmed').length;
  const partial = records.filter((item) => item.validationStatus === 'Partially Confirmed').length;
  const averageStrength = records.length
    ? Math.round(records.reduce((sum, item) => sum + item.strength, 0) / records.length)
    : 0;
  const highConfidence = records.filter((item) => item.confidence === 'High').length;

  return {
    total: records.length,
    confirmed,
    partial,
    averageStrength,
    highConfidence
  };
}

function groupCount(records, key) {
  return records.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function toCsv(records) {
  const columns = [
    'id',
    'date',
    'quarter',
    'category',
    'sourceType',
    'region',
    'indicator',
    'strength',
    'confidence',
    'validationStatus',
    'businessQuestion',
    'observation',
    'reportNote'
  ];
  const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
  return [columns.join(','), ...records.map((record) => columns.map((column) => escape(record[column])).join(','))].join('\n');
}

function downloadCsv(records) {
  const blob = new Blob([toCsv(records)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'signal-intelligence-lab-evidence.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function App() {
  const [activePage, setActivePage] = useState('radar');
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
            <div className="navCluster">
              <button
                className={activePage === 'radar' ? 'active' : ''}
                type="button"
                onClick={() => setActivePage('radar')}
              >
                <Activity size={16} aria-hidden="true" />
                Radar
              </button>
              <button
                className={activePage === 'data' ? 'active' : ''}
                type="button"
                onClick={() => setActivePage('data')}
              >
                <Database size={16} aria-hidden="true" />
                Data Lab
              </button>
            </div>
            <div className="topbarPills">
              <button type="button" onClick={() => setActivePage('data')}>
                <Database size={15} aria-hidden="true" />
                Open Data Lab
              </button>
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

      {activePage === 'radar' ? (
        <>
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
        </>
      ) : (
        <DataLab />
      )}

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

function DataLab() {
  const [category, setCategory] = useState('All Categories');
  const [quarter, setQuarter] = useState('All Quarters');
  const [sourceType, setSourceType] = useState('All Sources');
  const [query, setQuery] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState(evidenceRecords[0].id);

  const signalNameById = useMemo(() => {
    return signals.reduce((acc, signal) => {
      acc[signal.id] = signal.signal;
      return acc;
    }, {});
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return evidenceRecords.filter((record) => {
      const categoryMatch = category === 'All Categories' || record.category === category;
      const quarterMatch = quarter === 'All Quarters' || record.quarter === quarter;
      const sourceMatch = sourceType === 'All Sources' || record.sourceType === sourceType;
      const searchText = [
        record.observation,
        record.businessQuestion,
        record.indicator,
        record.region,
        record.reportNote,
        signalNameById[record.signalId]
      ]
        .join(' ')
        .toLowerCase();
      return categoryMatch && quarterMatch && sourceMatch && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [category, quarter, query, signalNameById, sourceType]);

  const summary = useMemo(() => summarizeRecords(filteredRecords), [filteredRecords]);
  const byCategory = useMemo(() => groupCount(filteredRecords, 'category'), [filteredRecords]);
  const bySource = useMemo(() => groupCount(filteredRecords, 'sourceType'), [filteredRecords]);
  const selectedRecord =
    filteredRecords.find((record) => record.id === selectedRecordId) || filteredRecords[0] || evidenceRecords[0];

  function resetDataFilters() {
    setCategory('All Categories');
    setQuarter('All Quarters');
    setSourceType('All Sources');
    setQuery('');
    setSelectedRecordId(evidenceRecords[0].id);
  }

  return (
    <section className="section dataLab" aria-labelledby="data-title">
      <div className="workspaceHeader">
        <div>
          <p className="eyebrow">Proof-of-concept evidence database</p>
          <h2 id="data-title">Signal data and reporting lab</h2>
          <p className="dataLead">
            A local demonstration ledger showing how public observations can be structured, filtered, scored, and reported without relying on paid APIs or live credentials.
          </p>
        </div>
        <div className="dataActions">
          <button type="button" onClick={() => downloadCsv(filteredRecords)}>
            <Download size={17} aria-hidden="true" />
            Export CSV
          </button>
          <button type="button" onClick={resetDataFilters}>
            <RefreshCcw size={17} aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      <div className="noticePanel">
        <FileText size={20} aria-hidden="true" />
        <p>
          This dataset is a transparent prototype built from the project methodology. It is also available at /data/evidence-records.json for readers who want to inspect or reuse the records outside the interface.
        </p>
      </div>

      <div className="dataFilterGrid" aria-label="Evidence database filters">
        <label>
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search observations, regions, questions..."
          />
        </label>
        <label>
          <Filter size={16} aria-hidden="true" />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {evidenceCategoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <CalendarDays size={16} aria-hidden="true" />
          <select value={quarter} onChange={(event) => setQuarter(event.target.value)}>
            {evidenceQuarterOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <Database size={16} aria-hidden="true" />
          <select value={sourceType} onChange={(event) => setSourceType(event.target.value)}>
            {evidenceSourceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="scorecardGrid dataScorecard">
        <Metric icon={Table2} label="Filtered records" value={summary.total} />
        <Metric icon={CheckCircle2} label="Confirmed records" value={summary.confirmed} />
        <Metric icon={ShieldCheck} label="High confidence" value={summary.highConfidence} />
        <Metric icon={BarChart3} label="Avg signal strength" value={`${summary.averageStrength}/100`} />
      </div>

      <div className="reportGrid">
        <ReportPanel title="Records by Category" data={byCategory} />
        <ReportPanel title="Records by Source Type" data={bySource} />
        <article className="reportPanel">
          <div className="reportTitle">
            <BarChart3 size={18} aria-hidden="true" />
            <h3>Generated Brief</h3>
          </div>
          <p>
            The filtered evidence set contains {summary.total} records, with {summary.confirmed} confirmed and {summary.partial} partially confirmed observations. Average signal strength is {summary.averageStrength}/100.
          </p>
          <p>
            Current emphasis: {Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No category selected'}.
          </p>
        </article>
      </div>

      <div className="databaseLayout">
        <div className="tableShell" aria-label="Evidence records">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Signal</th>
                <th>Source</th>
                <th>Region</th>
                <th>Strength</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  className={selectedRecord.id === record.id ? 'selectedRow' : ''}
                  key={record.id}
                  onClick={() => setSelectedRecordId(record.id)}
                >
                  <td>{record.date}</td>
                  <td>{signalNameById[record.signalId]}</td>
                  <td>{record.sourceType}</td>
                  <td>{record.region}</td>
                  <td>{record.strength}</td>
                  <td>
                    <span className={`statusBadge ${getStatusClass(record.validationStatus)}`}>
                      {record.validationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredRecords.length && (
            <div className="emptyState">
              <Search size={24} aria-hidden="true" />
              <h3>No matching records</h3>
              <p>Change the search or filters to inspect a different evidence set.</p>
            </div>
          )}
        </div>

        <article className="recordDetail">
          <div className="reportTitle">
            <FileText size={18} aria-hidden="true" />
            <h3>Record Detail</h3>
          </div>
          <dl>
            <div>
              <dt>Linked signal</dt>
              <dd>{signalNameById[selectedRecord.signalId]}</dd>
            </div>
            <div>
              <dt>Observation</dt>
              <dd>{selectedRecord.observation}</dd>
            </div>
            <div>
              <dt>Business question</dt>
              <dd>{selectedRecord.businessQuestion}</dd>
            </div>
            <div>
              <dt>Report note</dt>
              <dd>{selectedRecord.reportNote}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function ReportPanel({ title, data }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, value]) => value), 1);

  return (
    <article className="reportPanel">
      <div className="reportTitle">
        <BarChart3 size={18} aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <div className="barList">
        {entries.map(([label, value]) => (
          <div className="barRow" key={label}>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
            <progress max={max} value={value} aria-label={`${label}: ${value}`} />
          </div>
        ))}
        {!entries.length && <p>No records match the current filters.</p>}
      </div>
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
