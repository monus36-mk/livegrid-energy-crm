import React, { useState, useEffect } from 'react';
import {
  Zap,
  LayoutDashboard,
  Users,
  Cpu,
  Activity,
  Bot,
  Wrench,
  ClipboardList,
  Sun,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  ArrowUpRight,
  TrendingUp,
  Thermometer,
  ShieldAlert,
  BatteryCharging,
  Radio,
  FileText,
  HelpCircle,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Check,
  ChevronRight,
  X,
  Layers,
  ArrowRight,
  Info,
  Download,
  Wind,
  Leaf,
  DollarSign,
  PieChart,
  Calendar,
  Sparkles,
  Menu
} from 'lucide-react';

// Mock Data Definitions
const INITIAL_TICKETS = [
  {
    id: 'SR-1042',
    assetId: 'INV-204',
    customer: 'Thanjai Foods Pvt Ltd',
    issue: 'High operational temperature (78°C) & low output anomaly',
    priority: 'High',
    status: 'Assigned',
    tech: 'Rajesh Kumar',
    date: '2026-10-05 09:30'
  },
  {
    id: 'SR-1041',
    assetId: 'M-88',
    customer: 'Sunrise Apartments',
    issue: 'Meter telemetry latency delay > 120s',
    priority: 'Medium',
    status: 'In Progress',
    tech: 'Anitha P.',
    date: '2026-10-04 14:15'
  },
  {
    id: 'SR-1039',
    assetId: 'PV-17',
    customer: 'Arun Green Homes',
    issue: 'Quarterly routine PV string & panel thermal inspection',
    priority: 'Low',
    status: 'Resolved',
    tech: 'Karthik S.',
    date: '2026-10-02 11:00'
  }
];

const CUSTOMERS = [
  {
    id: 'CUST-801',
    name: 'Arun Green Homes',
    type: 'Residential',
    capacity: '8.2 kW',
    todayGen: '31.4 kWh',
    usage: '24.1 kWh',
    status: 'Healthy',
    contact: 'arun@greenhomes.io',
    asset: 'PV-17',
    ticketsCount: 1
  },
  {
    id: 'CUST-802',
    name: 'Thanjai Foods Pvt Ltd',
    type: 'Commercial',
    capacity: '120 kW',
    todayGen: '482 kWh',
    usage: '510 kWh',
    status: 'Attention',
    contact: 'ops@thanjaifoods.com',
    asset: 'INV-204',
    ticketsCount: 2
  },
  {
    id: 'CUST-803',
    name: 'Sunrise Apartments',
    type: 'Residential',
    capacity: '42 kW',
    todayGen: '168 kWh',
    usage: '192 kWh',
    status: 'Healthy',
    contact: 'admin@sunriseliving.in',
    asset: 'M-88',
    ticketsCount: 1
  },
  {
    id: 'CUST-804',
    name: 'GreenTech Industries',
    type: 'Industrial',
    capacity: '350 kW',
    todayGen: '1.42 MWh',
    usage: '1.38 MWh',
    status: 'Healthy',
    contact: 'facility@greentech.org',
    asset: 'TX-08',
    ticketsCount: 0
  }
];

const ASSETS = [
  {
    id: 'PV-17',
    name: 'Solar PV Array - Block A',
    type: 'Solar Array',
    capacity: '250 kW',
    health: 96,
    status: 'Healthy',
    metrics: { efficiency: '98.4%', temp: '42°C', stringStatus: '12/12 Active' },
    location: 'Arun Green Homes Estate'
  },
  {
    id: 'INV-204',
    name: 'Solar Inverter Unit 4',
    type: 'Inverter',
    capacity: '200 kW',
    health: 72,
    status: 'Attention',
    metrics: { output: '182 kW (Expected: 237 kW)', temp: '78°C (Max: 70°C)', efficiency: '81%' },
    location: 'Thanjai Foods Solar Roof'
  },
  {
    id: 'TX-08',
    name: 'Step-Up Transformer',
    type: 'Grid Substation',
    capacity: '500 kVA',
    health: 87,
    status: 'Monitor',
    metrics: { load: '74%', oilTemp: '61°C', voltage: '11 kV / 415 V' },
    location: 'GreenTech Industrial Hub'
  },
  {
    id: 'BESS-03',
    name: 'Battery Storage System',
    type: 'Energy Storage',
    capacity: '150 kWh',
    health: 94,
    status: 'Healthy',
    metrics: { soc: '82%', cycles: '486', temp: '28°C' },
    location: 'Central Microgrid Hub'
  },
  {
    id: 'M-88',
    name: 'Smart Bi-directional Meter',
    type: 'Metering',
    capacity: '100A',
    health: 99,
    status: 'Healthy',
    metrics: { voltage: '231 V', powerFactor: '0.98', latency: '42 ms' },
    location: 'Sunrise Apartments Block B'
  },
  {
    id: 'WT-04',
    name: 'Wind Turbine Alpha',
    type: 'Wind Energy',
    capacity: '100 kW',
    health: 91,
    status: 'Healthy',
    metrics: { output: '84 kW', windSpeed: '12.4 m/s', rotorRPM: '22 RPM' },
    location: 'Coastal Ridge Substation'
  }
];

const HOURLY_SOLAR_DATA = [
  { time: '06:00', kw: 42, expected: 45 },
  { time: '07:00', kw: 75, expected: 80 },
  { time: '08:00', kw: 110, expected: 115 },
  { time: '09:00', kw: 145, expected: 150 },
  { time: '10:00', kw: 180, expected: 190 },
  { time: '11:00', kw: 210, expected: 220 },
  { time: '12:00', kw: 230, expected: 245 },
  { time: '13:00', kw: 225, expected: 240 },
  { time: '14:00', kw: 205, expected: 225 },
  { time: '15:00', kw: 180, expected: 195 },
  { time: '16:00', kw: 140, expected: 150 },
  { time: '17:00', kw: 80, expected: 85 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedAssetDetail, setSelectedAssetDetail] = useState(null);
  const [showArchModal, setShowArchModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper Toast Alert Trigger
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  // Central Work Order Creator from AI Copilot
  const createAiTicket = (assetId = 'INV-204', issueText = 'AI-detected thermal stress & 23% output degradation') => {
    const ticketId = `SR-${Math.floor(1043 + Math.random() * 50)}`;
    const newTicket = {
      id: ticketId,
      assetId: assetId,
      customer: 'Thanjai Foods Pvt Ltd',
      issue: issueText,
      priority: 'High',
      status: 'New',
      tech: 'Auto-Dispatched (Dispatch Queue)',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setTickets([newTicket, ...tickets]);
    triggerToast(`Service Ticket ${ticketId} generated successfully and routed to Field Operations!`);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Mobile Off-Canvas Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-4/5 max-w-xs bg-slate-900 text-slate-300 flex flex-col h-full z-10 shadow-2xl border-r border-slate-800 animate-slide-up">
            {/* Drawer Logo */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h1 className="font-bold text-white tracking-wide text-sm leading-tight">LiveGrid</h1>
                  <p className="text-[9px] text-indigo-400 font-medium tracking-wider uppercase">Energy CRM & AI</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Sections */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5 text-xs touch-scroll">
              <div>
                <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</p>
                <nav className="space-y-1">
                  <NavItem
                    id="dashboard"
                    icon={<LayoutDashboard className="w-4 h-4" />}
                    label="Dashboard"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Customer Operations</p>
                <nav className="space-y-1">
                  <NavItem
                    id="customers"
                    icon={<Users className="w-4 h-4" />}
                    label="Customers"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                  <NavItem
                    id="assets"
                    icon={<Cpu className="w-4 h-4" />}
                    label="Energy Assets"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                  <NavItem
                    id="live-monitoring"
                    icon={<Activity className="w-4 h-4" />}
                    label="Live Monitoring"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Intelligence</p>
                <nav className="space-y-1">
                  <NavItem
                    id="ai-copilot"
                    icon={<Bot className="w-4 h-4" />}
                    label="AI Copilot"
                    badge="Anomalies"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                  <NavItem
                    id="predictive-maintenance"
                    icon={<Wrench className="w-4 h-4" />}
                    label="Predictive Maintenance"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Operations</p>
                <nav className="space-y-1">
                  <NavItem
                    id="field-service"
                    icon={<ClipboardList className="w-4 h-4" />}
                    label="Field Service & Tickets"
                    count={tickets.length}
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                </nav>
              </div>

              <div>
                <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Renewable Energy</p>
                <nav className="space-y-1">
                  <NavItem
                    id="clean-programs"
                    icon={<Sun className="w-4 h-4" />}
                    label="Clean Energy Programs"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                  <NavItem
                    id="energy-reports"
                    icon={<BarChart3 className="w-4 h-4" />}
                    label="Energy Reports"
                    activeTab={activeTab}
                    setActiveTab={handleNav}
                  />
                </nav>
              </div>
            </div>

            {/* System Architecture Button in Mobile Drawer */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/70 safe-area-bottom">
              <button
                onClick={() => {
                  setShowArchModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/30 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>System Architecture Info</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Dark Navy Sidebar (Hidden on Mobile < md) */}
      <aside className="hidden md:flex md:w-64 bg-slate-900 text-slate-300 flex-col z-20 shrink-0 border-r border-slate-800">
        {/* Logo Banner */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-wide text-base leading-tight">LiveGrid</h1>
              <p className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase">Energy CRM & AI</p>
            </div>
          </div>
          <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700/50 font-mono">
            v2.4
          </span>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 text-xs">
          {/* Section 1: Overview */}
          <div>
            <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Overview</p>
            <nav className="space-y-1">
              <NavItem
                id="dashboard"
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Dashboard"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </nav>
          </div>

          {/* Section 2: Customer Operations */}
          <div>
            <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Customer Operations</p>
            <nav className="space-y-1">
              <NavItem
                id="customers"
                icon={<Users className="w-4 h-4" />}
                label="Customers"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <NavItem
                id="assets"
                icon={<Cpu className="w-4 h-4" />}
                label="Energy Assets"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <NavItem
                id="live-monitoring"
                icon={<Activity className="w-4 h-4" />}
                label="Live Monitoring"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </nav>
          </div>

          {/* Section 3: Intelligence */}
          <div>
            <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Intelligence</p>
            <nav className="space-y-1">
              <NavItem
                id="ai-copilot"
                icon={<Bot className="w-4 h-4" />}
                label="AI Copilot"
                badge="Anomalies"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <NavItem
                id="predictive-maintenance"
                icon={<Wrench className="w-4 h-4" />}
                label="Predictive Maintenance"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </nav>
          </div>

          {/* Section 4: Operations */}
          <div>
            <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Operations</p>
            <nav className="space-y-1">
              <NavItem
                id="field-service"
                icon={<ClipboardList className="w-4 h-4" />}
                label="Field Service & Tickets"
                count={tickets.length}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </nav>
          </div>

          {/* Section 5: Renewable Energy */}
          <div>
            <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Renewable Energy</p>
            <nav className="space-y-1">
              <NavItem
                id="clean-programs"
                icon={<Sun className="w-4 h-4" />}
                label="Clean Energy Programs"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <NavItem
                id="energy-reports"
                icon={<BarChart3 className="w-4 h-4" />}
                label="Energy Reports"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </nav>
          </div>
        </div>

        {/* System Architecture Quick Action Modal Trigger */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={() => setShowArchModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/30 transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>System Architecture Info</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-3.5 sm:px-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Title */}
            <div className="flex md:hidden items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-slate-900 text-sm tracking-tight">LiveGrid</span>
            </div>

            {/* Desktop Brand Title */}
            <h2 className="hidden md:flex text-lg font-bold text-slate-900 tracking-tight items-center gap-2">
              <span>LiveGrid Energy CRM</span>
            </h2>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">LIVE TELEMETRY ACTIVE</span>
              <span className="sm:hidden">LIVE</span>
            </span>
          </div>

          {/* System Step-by-Step Flow Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
            <span className="font-semibold text-slate-500 px-2">Flow:</span>
            <button
              onClick={() => setActiveTab('live-monitoring')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'live-monitoring' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Telemetry
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setActiveTab('ai-copilot')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'ai-copilot' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. AI Copilot
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setActiveTab('field-service')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'field-service' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Service Ticket
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'customers' ? 'bg-white shadow text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Customer CRM
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Monus Kumar</p>
              <p className="text-[11px] text-indigo-600 font-medium">System Administrator</p>
            </div>
            <button
              onClick={() => setShowArchModal(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 border border-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-sm hover:ring-2 hover:ring-indigo-400 transition-all"
              title="System Architecture & Info"
            >
              MK
            </button>
          </div>
        </header>

        {/* Dynamic Canvas Area (With Mobile Bottom Navigation Clearance) */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 pb-24 md:pb-6 bg-slate-50/50 touch-scroll">
          {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'assets' && (
            <AssetsView
              onSelectAsset={(asset) => setSelectedAssetDetail(asset)}
              selectedAsset={selectedAssetDetail}
              onCloseDetail={() => setSelectedAssetDetail(null)}
            />
          )}
          {activeTab === 'live-monitoring' && <LiveMonitoringView setActiveTab={setActiveTab} />}
          {activeTab === 'ai-copilot' && (
            <AiCopilotView createAiTicket={createAiTicket} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'predictive-maintenance' && (
            <PredictiveMaintenanceView createAiTicket={createAiTicket} />
          )}
          {activeTab === 'field-service' && <FieldServiceView tickets={tickets} />}
          {activeTab === 'clean-programs' && <CleanProgramsView />}
          {activeTab === 'energy-reports' && <EnergyReportsView triggerToast={triggerToast} />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Smartphones & Tablets < md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 text-slate-400 safe-area-bottom shadow-2xl">
        <div className="grid grid-cols-5 h-14 sm:h-16 items-center px-1">
          <button
            onClick={() => handleNav('dashboard')}
            className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
              activeTab === 'dashboard' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-1 leading-none">Home</span>
          </button>

          <button
            onClick={() => handleNav('live-monitoring')}
            className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all relative ${
              activeTab === 'live-monitoring' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Activity className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-[10px] mt-1 leading-none">Live</span>
          </button>

          <button
            onClick={() => handleNav('ai-copilot')}
            className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all relative ${
              activeTab === 'ai-copilot' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <div className="relative p-1 rounded-full bg-indigo-600/20 border border-indigo-500/40">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </div>
            <span className="text-[10px] mt-0.5 leading-none">Copilot</span>
          </button>

          <button
            onClick={() => handleNav('field-service')}
            className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all relative ${
              activeTab === 'field-service' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <ClipboardList className="w-5 h-5" />
              {tickets.length > 0 && (
                <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-rose-500 text-white rounded-full text-[9px] font-bold font-mono">
                  {tickets.length}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 leading-none">Tickets</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-1 rounded-lg hover:text-slate-200 transition-all text-slate-400"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] mt-1 leading-none">Menu</span>
          </button>
        </div>
      </nav>

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-indigo-500/40 flex items-center gap-3 animate-slide-up max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-200 font-medium leading-tight">{toastMessage}</p>
        </div>
      )}

      {/* Architecture Explanation Modal */}
      {showArchModal && (
        <ArchitectureModal onClose={() => setShowArchModal(false)} />
      )}
    </div>
  );
}

// Navigation Item Subcomponent
function NavItem({ id, icon, label, badge, count, activeTab, setActiveTab }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        isActive
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          {badge}
        </span>
      )}
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// 1. DASHBOARD VIEW
function DashboardView({ setActiveTab }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* View Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Energy Operations Dashboard</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enterprise CRM + IoT Energy Management + AI Decision Support Layer
          </p>
        </div>
        <button
          onClick={() => setActiveTab('ai-copilot')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-indigo-600 transition-all w-full sm:w-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Energy Copilot</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          title="Active Customers"
          value="1,284"
          subText="+12 this month"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
        <KpiCard
          title="Energy Generated Today"
          value="18.6 MWh"
          subText="94.2% solar output target"
          icon={<Zap className="w-5 h-5 text-amber-500" />}
          bgColor="bg-amber-50"
        />
        <KpiCard
          title="Connected Assets"
          value="342"
          subText="IoT & SCADA meters"
          icon={<Cpu className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <KpiCard
          title="Open Service Requests"
          value="17"
          subText="3 high priority AI alerts"
          icon={<ClipboardList className="w-5 h-5 text-rose-600" />}
          bgColor="bg-rose-50"
          alert
        />
      </div>

      {/* Main Dashboard Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Solar Generation Today Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Solar Generation Profile Today (kW)</h3>
              <p className="text-[11px] text-slate-500">Real-time aggregate sensor feed vs target baseline</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Actual kW
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Expected baseline
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="h-52 sm:h-64 w-full relative select-none">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
              {/* Background Horizontal Grid Lines */}
              {[0, 50, 100, 150].map((y, i) => (
                <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="#F1F5F9" strokeWidth="1" />
              ))}

              {/* Baseline Target Polyline */}
              <polyline
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="4 4"
                points={HOURLY_SOLAR_DATA.map((d, i) => `${(i * 500) / 11},${180 - (d.expected / 250) * 160}`).join(' ')}
              />

              {/* Actual Solar Polyline */}
              <polyline
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                points={HOURLY_SOLAR_DATA.map((d, i) => `${(i * 500) / 11},${180 - (d.kw / 250) * 160}`).join(' ')}
              />

              {/* Data Points */}
              {HOURLY_SOLAR_DATA.map((d, i) => {
                const x = (i * 500) / 11;
                const y = 180 - (d.kw / 250) * 160;
                return (
                  <g key={i} className="group cursor-pointer">
                    <circle cx={x} cy={y} r="4" className="fill-indigo-600 hover:r-6 transition-all" />
                    <text x={x} y="198" fontSize="9" fill="#64748B" textAnchor="middle">
                      {d.time}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-slate-500">
            <span>Peak Solar Generation: <strong>230 kW @ 12:00 PM</strong></span>
            <span>AI Efficiency Rating: <strong className="text-emerald-600 font-semibold">92.4% Optimal</strong></span>
          </div>
        </div>

        {/* Asset Health Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Fleet Asset Health</h3>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">342 Units</span>
            </div>

            <div className="space-y-4">
              <AssetHealthBar label="Smart Meters" health={99} status="Healthy" count="120 Units" color="emerald" />
              <AssetHealthBar label="Solar Inverters" health={96} status="Attention Needed" count="84 Units" color="indigo" warningAlert />
              <AssetHealthBar label="Battery Storage (BESS)" health={94} status="Healthy" count="42 Units" color="emerald" />
              <AssetHealthBar label="Transformers" health={87} status="Monitor" count="96 Units" color="amber" />
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 bg-amber-50/70 rounded-lg p-3 border border-amber-200/60">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-900">1 Inverter flagged for Thermal Stress</p>
                <p className="text-[11px] text-amber-700 mt-0.5">Asset INV-204 running at 78°C (-23% output deviation)</p>
                <button
                  onClick={() => setActiveTab('ai-copilot')}
                  className="mt-2 text-xs text-indigo-700 font-bold underline hover:text-indigo-900 flex items-center gap-1"
                >
                  Analyze with AI Copilot <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// KPI Card Helper
function KpiCard({ title, value, subText, icon, bgColor, alert }) {
  return (
    <div className={`bg-white rounded-xl border ${alert ? 'border-rose-200' : 'border-slate-200'} p-4 sm:p-5 shadow-sm flex items-start justify-between`}>
      <div>
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">{value}</h3>
        <p className={`text-[11px] mt-1 font-medium ${alert ? 'text-rose-600' : 'text-slate-500'}`}>{subText}</p>
      </div>
      <div className={`p-2.5 rounded-lg ${bgColor} shrink-0`}>{icon}</div>
    </div>
  );
}

// Asset Health Progress Bar Helper
function AssetHealthBar({ label, health, status, count, color, warningAlert }) {
  const getBgClass = () => {
    if (health >= 95) return 'bg-emerald-500';
    if (health >= 90) return 'bg-indigo-600';
    return 'bg-amber-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-semibold text-slate-800 flex items-center gap-1">
          {label}
          {warningAlert && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
        </span>
        <span className="font-mono text-slate-600">{health}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${getBgClass()} transition-all duration-500`} style={{ width: `${health}%` }}></div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 font-mono">
        <span>{count}</span>
        <span>{status}</span>
      </div>
    </div>
  );
}

// 2. AI ENERGY COPILOT VIEW
function AiCopilotView({ createAiTicket, setActiveTab }) {
  const [activeCopilotTab, setActiveCopilotTab] = useState('analyze');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your LiveGrid AI Copilot. I continuously monitor IoT sensor telemetry from solar PVs, batteries, and smart meters. How can I assist you with operational insights today?"
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "I analyzed your query across simulated SCADA logs. Operational telemetry indicates healthy nominal parameters overall.";
      if (userMsg.toLowerCase().includes('lower') || userMsg.toLowerCase().includes('solar') || userMsg.toLowerCase().includes('generation')) {
        aiResponse = "Your solar generation was approximately 12% below expected baseline this week. The largest deviation occurred between 11:00 AM and 02:00 PM on Asset INV-204. Sensor logs report elevated inverter temperatures (78°C) and partial string shading.";
      } else if (userMsg.toLowerCase().includes('maintenance') || userMsg.toLowerCase().includes('repair')) {
        aiResponse = "Predictive maintenance algorithms recommend servicing Solar Inverter INV-204 within 24 hours to prevent thermal throttling shutdowns.";
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Bot className="w-6 h-6 text-indigo-600 shrink-0" />
          <span>AI Energy Copilot</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Turn continuous energy data into predictive decisions, automated service workflows, and instant intelligence.
        </p>
      </div>

      {/* CORE ANOMALY BANNER */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 text-white rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden border border-rose-800/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-rose-600/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-rose-500/30 text-rose-200 px-2 py-0.5 rounded border border-rose-400/30">
                  Critical Anomaly Flagged
                </span>
                <span className="text-xs text-slate-400 font-mono">Confidence: 91%</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">INV-204 Solar Inverter Thermal Overheating</h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
                Operating at <strong className="text-amber-300">78°C</strong> (Normal Range: 62–70°C). Output generated is{' '}
                <strong className="text-amber-300">182 kW</strong> vs <strong className="text-emerald-300">237 kW</strong> expected baseline (-23% deviation).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => createAiTicket('INV-204', 'AI-detected thermal stress (78°C) & 23% output deviation')}
              className="w-full sm:w-auto justify-center px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs shadow-md shadow-rose-900/50 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Service Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Copilot Mode Selection Buttons (Horizontal swipe on Mobile) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
        <CopilotTabBtn
          id="analyze"
          label="Analyze Asset"
          icon={<Search className="w-4 h-4" />}
          active={activeCopilotTab}
          setActive={setActiveCopilotTab}
        />
        <CopilotTabBtn
          id="predict"
          label="Predict Maintenance"
          icon={<Wrench className="w-4 h-4" />}
          active={activeCopilotTab}
          setActive={setActiveCopilotTab}
        />
        <CopilotTabBtn
          id="forecast"
          label="Forecast Generation"
          icon={<TrendingUp className="w-4 h-4" />}
          active={activeCopilotTab}
          setActive={setActiveCopilotTab}
        />
        <CopilotTabBtn
          id="chat"
          label="AI Customer Assistant"
          icon={<Bot className="w-4 h-4" />}
          active={activeCopilotTab}
          setActive={setActiveCopilotTab}
        />
      </div>

      {/* Dynamic Copilot Action Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        {activeCopilotTab === 'analyze' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Deep Inverter Anomaly Diagnostic</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">CURRENT TEMPERATURE</span>
                <span className="text-lg font-bold text-rose-600">78°C</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Threshold: 70°C</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">GENERATION DEVIATION</span>
                <span className="text-lg font-bold text-amber-600">-23% (182 kW)</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Expected: 237 kW</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">DIAGNOSTIC CONFIDENCE</span>
                <span className="text-lg font-bold text-indigo-600">91% Probability</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Based on 10k sensor cycles</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3.5 sm:p-4 text-xs space-y-2 border border-slate-200">
              <p className="font-semibold text-slate-800">AI Root Cause Analysis:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Primary cooling fan intake restriction or dust filter clogging.</li>
                <li>Ambient air thermal heat dissipation bottleneck leading to internal switching transistor throttling.</li>
                <li>Secondary PV string impedance imbalance detected at String Array #3.</li>
              </ul>
            </div>
          </div>
        )}

        {activeCopilotTab === 'predict' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span>Predictive Failure Risk Summary</span>
              </h3>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded text-xs border border-amber-300">
                Risk Level: High
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              “INV-204 has an elevated probability of requiring critical component maintenance within the next{' '}
              <strong>7–14 days</strong>.”
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <p className="font-bold text-rose-900">Likely Culprits:</p>
                <p className="text-rose-700 mt-1">• Cooling Fan Motor Degradation</p>
                <p className="text-rose-700">• Dust Accumulation on Heat Sinks</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="font-bold text-emerald-900">Recommended Next Step:</p>
                <p className="text-emerald-700 mt-1">Schedule dispatch of Field Engineer within 24 Hours.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => createAiTicket('INV-204', 'Predictive Maintenance: High failure probability in 7-14 days')}
                className="w-full sm:w-auto justify-center px-4 py-2.5 bg-indigo-600 text-white font-bold rounded-lg text-xs hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Dispatch Work Order Now</span>
              </button>
            </div>
          </div>
        )}

        {activeCopilotTab === 'forecast' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Tomorrow’s Energy Generation Forecast</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-mono">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <span className="text-indigo-600 block text-[10px]">PREDICTED GENERATION</span>
                <span className="text-xl font-bold text-indigo-900">21.3 MWh</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-emerald-600 block text-[10px]">EXPECTED CHANGE</span>
                <span className="text-xl font-bold text-emerald-900">+7.4% vs Today</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px]">FORECAST CONFIDENCE</span>
                <span className="text-xl font-bold text-slate-800">84% Model Fit</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic">
              “The forecast is generated using historical energy production metrics fused with simulated weather solar irradiance algorithms.”
            </p>
          </div>
        )}

        {activeCopilotTab === 'chat' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Interactive Customer Support AI Assistant</span>
            </h3>

            {/* Chat Box History */}
            <div className="h-60 sm:h-64 overflow-y-auto bg-slate-50 rounded-lg p-3.5 sm:p-4 border border-slate-200 space-y-3 touch-scroll">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-lg rounded-xl px-3.5 py-2.5 text-xs ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask e.g.: 'Why was solar generation lower this week?'"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
              <button
                type="submit"
                className="px-3.5 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Copilot Tab Button Helper
function CopilotTabBtn({ id, label, icon, active, setActive }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setActive(id)}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 whitespace-nowrap transition-all ${
        isActive
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// 3. CUSTOMERS CRM VIEW
function CustomersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredCustomers = CUSTOMERS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || c.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Customer Relationship Management</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Linking customer profiles directly with linked renewable energy assets & SCADA telemetry.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 sm:py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 border border-slate-300 rounded-lg text-xs py-2 sm:py-1.5 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Customer Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Customer Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto touch-scroll">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Solar Capacity</th>
                <th className="p-3.5">Today's Generation</th>
                <th className="p-3.5">Usage</th>
                <th className="p-3.5">Linked Asset</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{c.id} • {c.contact}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-semibold">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">{c.capacity}</td>
                  <td className="p-3.5 font-mono text-emerald-600 font-bold">{c.todayGen}</td>
                  <td className="p-3.5 font-mono text-slate-600">{c.usage}</td>
                  <td className="p-3.5">
                    <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {c.asset}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 4. ENERGY ASSETS VIEW
function AssetsView({ onSelectAsset, selectedAsset, onCloseDetail }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Fleet Asset Management</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Connected solar panels, inverters, microgrid batteries, and smart meters.
        </p>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {ASSETS.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {asset.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    asset.status === 'Healthy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : asset.status === 'Attention'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {asset.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{asset.name}</h3>
              <p className="text-[11px] text-slate-500">{asset.location}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacity:</span>
                  <span className="text-slate-800 font-semibold">{asset.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Asset Health Score:</span>
                  <span
                    className={`font-bold ${
                      asset.health >= 90 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {asset.health}%
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectAsset(asset)}
              className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>View Asset Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-4 sm:p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseDetail}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                {selectedAsset.id}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{selectedAsset.name}</h3>
              <p className="text-xs text-slate-500">{selectedAsset.location}</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-3.5 sm:p-4 text-xs font-mono space-y-2 border border-slate-200">
              <p className="font-bold text-slate-700 font-sans">Live Asset Operational Telemetry:</p>
              {Object.entries(selectedAsset.metrics).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1 border-b border-slate-200/60 last:border-none">
                  <span className="text-slate-500 uppercase text-[11px]">{key}:</span>
                  <span className="font-bold text-slate-800">{val}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onCloseDetail}
                className="w-full sm:w-auto px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. LIVE ENERGY MONITORING VIEW
function LiveMonitoringView({ setActiveTab }) {
  const [liveSec, setLiveSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSec((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600 animate-pulse shrink-0" />
            <span>Live Energy Monitoring</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time IoT/SCADA sensor stream updates every 2 seconds.</p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          STREAMING TICK: #{1420 + liveSec}
        </span>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 font-mono">
        <LiveMetricWidget label="Solar Output" value={`${182 + (liveSec % 3)} kW`} icon={<Sun className="w-4 h-4 text-amber-500" />} />
        <LiveMetricWidget label="Grid Import" value={`${46 - (liveSec % 2)} kW`} icon={<Zap className="w-4 h-4 text-indigo-600" />} />
        <LiveMetricWidget label="Battery SOC" value="82%" icon={<BatteryCharging className="w-4 h-4 text-emerald-600" />} />
        <LiveMetricWidget
          label="Inverter Temp"
          value={`${78 + (liveSec % 2 === 0 ? 0 : 1)}°C`}
          icon={<Thermometer className="w-4 h-4 text-rose-500" />}
          alert
        />
        <LiveMetricWidget label="Voltage" value="231 V" icon={<Radio className="w-4 h-4 text-slate-600" />} />
        <LiveMetricWidget label="Power Factor" value="0.98" icon={<Activity className="w-4 h-4 text-slate-600" />} />
      </div>

      {/* Anomaly Workflow Banner */}
      <div className="bg-indigo-900 text-white p-4 sm:p-5 rounded-xl border border-indigo-700 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 shadow-lg">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">Operational Anomaly Flagged</span>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">Flagged Asset: Solar Inverter INV-204 Thermal Anomaly</h3>
          <p className="text-xs text-indigo-200 mt-0.5 leading-relaxed">
            Notice Inverter Temperature is elevated at 78°C. Proceed to AI Copilot to analyze root causes.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('ai-copilot')}
          className="w-full md:w-auto justify-center px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-lg shadow transition-all shrink-0 flex items-center gap-2"
        >
          <span>Open AI Copilot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function LiveMetricWidget({ label, value, icon, alert }) {
  return (
    <div className={`p-3.5 sm:p-4 rounded-xl bg-white border ${alert ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} shadow-sm`}>
      <div className="flex items-center justify-between text-slate-500 mb-1.5 sm:mb-2">
        <span className="text-[10px] font-sans uppercase font-bold text-slate-400">{label}</span>
        {icon}
      </div>
      <p className={`text-base sm:text-lg font-extrabold ${alert ? 'text-rose-600' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

// 6. FIELD SERVICE VIEW
function FieldServiceView({ tickets }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Field Service & Work Orders</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Automated dispatch tickets generated via AI Energy Copilot anomaly predictions.
        </p>
      </div>

      {/* Service Tickets Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="font-bold text-slate-900 text-sm">Active Service Tickets ({tickets.length})</h3>
          <span className="text-xs text-slate-500">Auto-synced with CRM Field Operations</span>
        </div>

        <div className="overflow-x-auto touch-scroll">
          <table className="w-full text-left text-xs min-w-[660px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5">Ticket ID</th>
                <th className="p-3.5">Asset ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Issue Description</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Assigned Tech</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-600">{t.id}</td>
                  <td className="p-3.5 font-mono text-slate-700">{t.assetId}</td>
                  <td className="p-3.5 text-slate-800 font-semibold">{t.customer}</td>
                  <td className="p-3.5 text-slate-600 max-w-xs truncate">{t.issue}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : t.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700">{t.tech}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'New'
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                          : t.status === 'Assigned'
                          ? 'bg-amber-100 text-amber-800'
                          : t.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 7. CLEAN ENERGY PROGRAMS VIEW
function CleanProgramsView() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Clean Energy & Sustainability Programs</h2>
        <p className="text-xs text-slate-500 mt-0.5">Track customer enrollment, EV infrastructure, and carbon offset benchmarks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard title="Solar Adoption Rate" value="68%" subText="873 enrolled homes" icon={<Sun className="w-5 h-5 text-amber-500" />} bgColor="bg-amber-50" />
        <KpiCard title="EV Charging Hubs" value="42" subText="Connected to microgrid" icon={<Zap className="w-5 h-5 text-indigo-600" />} bgColor="bg-indigo-50" />
        <KpiCard title="CO₂ Avoided Today" value="9.4 Tonnes" subText="Equivalent to 420 trees" icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} bgColor="bg-emerald-50" />
        <KpiCard title="Efficiency Projects" value="126" subText="Active retrofits" icon={<BarChart3 className="w-5 h-5 text-blue-600" />} bgColor="bg-blue-50" />
      </div>
    </div>
  );
}

// 8. ENERGY REPORTS & ANALYTICS VIEW
const ANALYTICS_DATA_7D = [
  { label: 'Mon', fullDate: 'Sep 29', solar: 24.5, wind: 12.2, bess: 6.8, total: 43.5, consumption: 38.2, target: 41.0, pr: 93.4, co2: 18.2, revenue: 3480 },
  { label: 'Tue', fullDate: 'Sep 30', solar: 28.1, wind: 14.0, bess: 7.2, total: 49.3, consumption: 42.1, target: 43.0, pr: 94.8, co2: 20.7, revenue: 3940 },
  { label: 'Wed', fullDate: 'Oct 01', solar: 22.4, wind: 16.5, bess: 8.1, total: 47.0, consumption: 41.0, target: 42.5, pr: 91.2, co2: 19.7, revenue: 3760 },
  { label: 'Thu', fullDate: 'Oct 02', solar: 29.8, wind: 11.8, bess: 7.0, total: 48.6, consumption: 43.5, target: 44.0, pr: 95.6, co2: 20.4, revenue: 3890 },
  { label: 'Fri', fullDate: 'Oct 03', solar: 31.2, wind: 13.4, bess: 8.4, total: 53.0, consumption: 46.2, target: 45.0, pr: 96.1, co2: 22.3, revenue: 4240 },
  { label: 'Sat', fullDate: 'Oct 04', solar: 27.6, wind: 15.1, bess: 6.5, total: 49.2, consumption: 39.8, target: 43.0, pr: 94.0, co2: 20.6, revenue: 3935 },
  { label: 'Sun', fullDate: 'Oct 05', solar: 26.3, wind: 14.8, bess: 7.9, total: 49.0, consumption: 37.4, target: 42.5, pr: 93.8, co2: 20.5, revenue: 3920 }
];

const ANALYTICS_DATA_6M = [
  { label: 'May', fullDate: 'May 2026', solar: 680, wind: 310, bess: 150, total: 1140, consumption: 980, target: 1100, pr: 92.8, co2: 478, revenue: 91200 },
  { label: 'Jun', fullDate: 'Jun 2026', solar: 740, wind: 340, bess: 165, total: 1245, consumption: 1060, target: 1180, pr: 94.2, co2: 522, revenue: 99600 },
  { label: 'Jul', fullDate: 'Jul 2026', solar: 810, wind: 390, bess: 180, total: 1380, consumption: 1190, target: 1300, pr: 95.5, co2: 579, revenue: 110400 },
  { label: 'Aug', fullDate: 'Aug 2026', solar: 790, wind: 420, bess: 175, total: 1385, consumption: 1210, target: 1320, pr: 94.8, co2: 581, revenue: 110800 },
  { label: 'Sep', fullDate: 'Sep 2026', solar: 760, wind: 380, bess: 160, total: 1300, consumption: 1120, target: 1250, pr: 93.9, co2: 546, revenue: 104000 },
  { label: 'Oct', fullDate: 'Oct 2026 (Mtd)', solar: 830, wind: 410, bess: 190, total: 1430, consumption: 1240, target: 1350, pr: 96.2, co2: 601, revenue: 114400 }
];

const ENERGY_SOURCE_BREAKDOWN = [
  { name: 'Solar PV Arrays', share: 58, mwh: '724 MWh', colorClass: 'bg-indigo-600', textClass: 'text-indigo-600', icon: Sun },
  { name: 'Wind Turbines', share: 24, mwh: '300 MWh', colorClass: 'bg-cyan-500', textClass: 'text-cyan-600', icon: Wind },
  { name: 'BESS Battery Storage', share: 12, mwh: '150 MWh', colorClass: 'bg-emerald-500', textClass: 'text-emerald-600', icon: BatteryCharging },
  { name: 'Grid Export / Hydro', share: 6, mwh: '75 MWh', colorClass: 'bg-amber-500', textClass: 'text-amber-600', icon: Zap }
];

const CUSTOMER_SECTOR_CONSUMPTION = [
  { sector: 'Industrial Operations', share: 48, mwh: '598 MWh', accounts: '18 Large Facilities', icon: Cpu, badge: 'High Base Load' },
  { sector: 'Commercial Buildings', share: 32, mwh: '396 MWh', accounts: '64 Business Accounts', icon: Users, badge: 'Peak Day Demand' },
  { sector: 'Residential Microgrids', share: 20, mwh: '246 MWh', accounts: '1,202 Enrolled Homes', icon: Sun, badge: 'Evening Peak' }
];

function EnergyReportsView({ triggerToast }) {
  const [timeRange, setTimeRange] = useState('7d'); // '7d' or '6m'
  const [chartType, setChartType] = useState('generation'); // 'generation' | 'balance' | 'efficiency'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeDataset = timeRange === '7d' ? ANALYTICS_DATA_7D : ANALYTICS_DATA_6M;
  const currentHoverItem = hoveredIndex !== null ? activeDataset[hoveredIndex] : activeDataset[activeDataset.length - 1];

  const handleExport = (format) => {
    if (triggerToast) {
      triggerToast(`Energy Analytics Report (.${format.toLowerCase()}) successfully generated and downloaded!`);
    }
  };

  // Max value for scaling SVG charts
  const maxGenVal = Math.max(...activeDataset.map((d) => d.total)) * 1.15;
  const maxPrVal = 100;
  const chartWidth = 600;
  const chartHeight = 190;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Header & Export Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600 shrink-0" />
            <span>Energy Analytics & Operational Reports</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time renewable generation telemetry, consumption balance, efficiency ratios, and carbon offset aggregates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Timeframe Switcher */}
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex items-center shadow-sm text-xs font-semibold">
            <button
              onClick={() => {
                setTimeRange('7d');
                setHoveredIndex(null);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                timeRange === '7d' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past 7 Days
            </button>
            <button
              onClick={() => {
                setTimeRange('6m');
                setHoveredIndex(null);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                timeRange === '6m' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past 6 Months
            </button>
          </div>

          {/* Export Action Buttons */}
          <button
            onClick={() => handleExport('CSV')}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          title="Total Energy Generated"
          value={timeRange === '7d' ? '339.6 MWh' : '7.88 GWh'}
          subText="+14.8% vs last period"
          icon={<Zap className="w-5 h-5 text-amber-500" />}
          bgColor="bg-amber-50"
        />
        <KpiCard
          title="Average Fleet Performance (PR)"
          value="94.6%"
          subText="Benchmark: >90% optimal"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <KpiCard
          title="Net Carbon CO₂ Avoided"
          value={timeRange === '7d' ? '142.8 Tons' : '3,307 Tons'}
          subText="Equiv. to 6,380 trees"
          icon={<Leaf className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <KpiCard
          title="Renewable Revenue Generated"
          value={timeRange === '7d' ? '$27,165' : '$630,400'}
          subText="Grid feed-in + PPA rates"
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
      </div>

      {/* PRIMARY INTERACTIVE GRAPH CONTAINER */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
        {/* Chart Navigation Tabs & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {chartType === 'generation' && 'Renewable Energy Generation Profile (MWh)'}
                {chartType === 'balance' && 'Energy Generation vs Customer Consumption Balance'}
                {chartType === 'efficiency' && 'Fleet Performance Ratio (PR%) & Efficiency Curve'}
              </h3>
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                {timeRange === '7d' ? 'Daily Aggregates' : 'Monthly Historical Trends'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hover or tap on data points to inspect detailed telemetry breakdown and revenue metrics.
            </p>
          </div>

          {/* Chart View Toggle (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto no-scrollbar">
            <button
              onClick={() => setChartType('generation')}
              className={`px-3 py-1 rounded-md font-semibold transition-all whitespace-nowrap shrink-0 ${
                chartType === 'generation' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Source Mix
            </button>
            <button
              onClick={() => setChartType('balance')}
              className={`px-3 py-1 rounded-md font-semibold transition-all whitespace-nowrap shrink-0 ${
                chartType === 'balance' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gen vs Demand
            </button>
            <button
              onClick={() => setChartType('efficiency')}
              className={`px-3 py-1 rounded-md font-semibold transition-all whitespace-nowrap shrink-0 ${
                chartType === 'efficiency' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Performance Ratio
            </button>
          </div>
        </div>

        {/* Dynamic Interactive SVG Chart Area */}
        <div className="relative">
          {/* Chart Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-3 text-slate-600">
            {chartType === 'generation' && (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Solar PV (MWh)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Wind Turbines (MWh)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> BESS Storage (MWh)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-400">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400"></span> Target Forecast
                </span>
              </div>
            )}

            {chartType === 'balance' && (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-md bg-indigo-600"></span> Total Generated
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-md bg-slate-400"></span> Demand / Consumption
                </span>
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Green Surplus
                </span>
              </div>
            )}

            {chartType === 'efficiency' && (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Performance Ratio (PR%)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-rose-500">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-rose-400"></span> 90% SLA Target
                </span>
              </div>
            )}

            {/* Hover Tooltip Ribbon */}
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-md font-mono text-[11px] sm:text-xs flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-indigo-300 font-bold">{currentHoverItem.fullDate}:</span>
              <span>Total: <strong className="text-amber-400">{currentHoverItem.total} MWh</strong></span>
              <span>PR: <strong className="text-emerald-400">{currentHoverItem.pr}%</strong></span>
              <span>CO₂: <strong className="text-teal-300">{currentHoverItem.co2}t</strong></span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="h-52 sm:h-64 w-full relative select-none">
            <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
              <defs>
                <linearGradient id="solarAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="windAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => {
                const y = chartHeight - 25 - ratio * (chartHeight - 45);
                return (
                  <g key={i}>
                    <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#F1F5F9" strokeWidth="1" />
                    <text x="0" y={y - 4} fontSize="8" fill="#94A3B8" fontFamily="monospace">
                      {chartType === 'efficiency'
                        ? `${Math.round(80 + ratio * 20)}%`
                        : `${Math.round(maxGenVal * ratio)} MWh`}
                    </text>
                  </g>
                );
              })}

              {/* Baseline Y-axis zero */}
              <line x1="0" y1={chartHeight - 25} x2={chartWidth} y2={chartHeight - 25} stroke="#CBD5E1" strokeWidth="1.5" />

              {/* 1. MULTI-SOURCE GENERATION AREA CHART */}
              {chartType === 'generation' && (
                <>
                  {/* Target Polyline */}
                  <polyline
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    points={activeDataset
                      .map((d, i) => {
                        const x = (i * chartWidth) / (activeDataset.length - 1);
                        const y = chartHeight - 25 - (d.target / maxGenVal) * (chartHeight - 45);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Solar Area & Line */}
                  <polygon
                    fill="url(#solarAreaGrad)"
                    points={`0,${chartHeight - 25} ${activeDataset
                      .map((d, i) => {
                        const x = (i * chartWidth) / (activeDataset.length - 1);
                        const y = chartHeight - 25 - (d.solar / maxGenVal) * (chartHeight - 45);
                        return `${x},${y}`;
                      })
                      .join(' ')} ${chartWidth},${chartHeight - 25}`}
                  />
                  <polyline
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    points={activeDataset
                      .map((d, i) => {
                        const x = (i * chartWidth) / (activeDataset.length - 1);
                        const y = chartHeight - 25 - (d.solar / maxGenVal) * (chartHeight - 45);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Wind Polyline */}
                  <polyline
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2.5"
                    points={activeDataset
                      .map((d, i) => {
                        const x = (i * chartWidth) / (activeDataset.length - 1);
                        const y = chartHeight - 25 - (d.wind / maxGenVal) * (chartHeight - 45);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Total Generation Interactive Points */}
                  {activeDataset.map((d, i) => {
                    const x = (i * chartWidth) / (activeDataset.length - 1);
                    const y = chartHeight - 25 - (d.total / maxGenVal) * (chartHeight - 45);
                    const isHovered = hoveredIndex === i;

                    return (
                      <g
                        key={i}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onTouchStart={() => setHoveredIndex(i)}
                      >
                        {isHovered && (
                          <line x1={x} y1={0} x2={x} y2={chartHeight - 25} stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />
                        )}
                        <circle
                          cx={x}
                          cy={y}
                          r={isHovered ? 7 : 4.5}
                          className="fill-indigo-600 stroke-white stroke-2 transition-all shadow"
                        />
                        <text
                          x={x}
                          y={chartHeight - 8}
                          fontSize="9"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                          fill={isHovered ? '#4F46E5' : '#64748B'}
                          textAnchor="middle"
                        >
                          {d.label}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* 2. GENERATION VS DEMAND BAR CHART */}
              {chartType === 'balance' && (
                <>
                  {activeDataset.map((d, i) => {
                    const groupWidth = chartWidth / activeDataset.length;
                    const barWidth = groupWidth * 0.32;
                    const groupX = i * groupWidth + groupWidth * 0.18;

                    const genHeight = (d.total / maxGenVal) * (chartHeight - 45);
                    const conHeight = (d.consumption / maxGenVal) * (chartHeight - 45);
                    const genY = chartHeight - 25 - genHeight;
                    const conY = chartHeight - 25 - conHeight;
                    const isHovered = hoveredIndex === i;

                    return (
                      <g
                        key={i}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onTouchStart={() => setHoveredIndex(i)}
                      >
                        {/* Generation Bar (Indigo) */}
                        <rect
                          x={groupX}
                          y={genY}
                          width={barWidth}
                          height={genHeight}
                          rx="3"
                          fill={isHovered ? '#4338CA' : '#4F46E5'}
                          className="transition-all"
                        />
                        {/* Consumption Bar (Slate) */}
                        <rect
                          x={groupX + barWidth + 3}
                          y={conY}
                          width={barWidth}
                          height={conHeight}
                          rx="3"
                          fill={isHovered ? '#64748B' : '#94A3B8'}
                          className="transition-all"
                        />

                        {/* Surplus Delta Badge */}
                        <text
                          x={groupX + barWidth}
                          y={Math.min(genY, conY) - 5}
                          fontSize="8"
                          fontWeight="bold"
                          fill="#10B981"
                          textAnchor="middle"
                        >
                          +{Math.round(d.total - d.consumption)} MWh
                        </text>

                        <text
                          x={groupX + barWidth}
                          y={chartHeight - 8}
                          fontSize="9"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                          fill={isHovered ? '#4F46E5' : '#64748B'}
                          textAnchor="middle"
                        >
                          {d.label}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* 3. PERFORMANCE RATIO (PR%) EFFICIENCY CURVE */}
              {chartType === 'efficiency' && (
                <>
                  {/* 90% SLA Target Reference Line */}
                  <line
                    x1="0"
                    y1={chartHeight - 25 - (10 / 20) * (chartHeight - 45)}
                    x2={chartWidth}
                    y2={chartHeight - 25 - (10 / 20) * (chartHeight - 45)}
                    stroke="#F43F5E"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={chartWidth - 5}
                    y={chartHeight - 25 - (10 / 20) * (chartHeight - 45) - 4}
                    fontSize="8"
                    fontWeight="bold"
                    fill="#F43F5E"
                    textAnchor="end"
                  >
                    90% SLA Benchmark Target
                  </text>

                  {/* PR Polygon Area */}
                  <polygon
                    fill="url(#prGrad)"
                    points={`0,${chartHeight - 25} ${activeDataset
                      .map((d, i) => {
                        const x = (i * chartWidth) / (activeDataset.length - 1);
                        const normalizedPr = Math.max(0, d.pr - 80);
                        const y = chartHeight - 25 - (normalizedPr / 20) * (chartHeight - 45);
                        return `${x},${y}`;
                      })
                      .join(' ')} ${chartWidth},${chartHeight - 25}`}
                  />

                  {/* PR Line */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    points={activeDataset
                      .map((d, i) => {
                        const x = (i * chartWidth) / (activeDataset.length - 1);
                        const normalizedPr = Math.max(0, d.pr - 80);
                        const y = chartHeight - 25 - (normalizedPr / 20) * (chartHeight - 45);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Interactive PR Data Dots */}
                  {activeDataset.map((d, i) => {
                    const x = (i * chartWidth) / (activeDataset.length - 1);
                    const normalizedPr = Math.max(0, d.pr - 80);
                    const y = chartHeight - 25 - (normalizedPr / 20) * (chartHeight - 45);
                    const isHovered = hoveredIndex === i;

                    return (
                      <g
                        key={i}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onTouchStart={() => setHoveredIndex(i)}
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isHovered ? 7 : 4.5}
                          className="fill-emerald-500 stroke-white stroke-2 shadow"
                        />
                        <text
                          x={x}
                          y={y - 8}
                          fontSize="9"
                          fontWeight="bold"
                          fill="#059669"
                          textAnchor="middle"
                        >
                          {d.pr}%
                        </text>
                        <text
                          x={x}
                          y={chartHeight - 8}
                          fontSize="9"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                          fill={isHovered ? '#059669' : '#64748B'}
                          textAnchor="middle"
                        >
                          {d.label}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}
            </svg>
          </div>

          {/* Quick Active Metric Summary Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs text-slate-600 font-mono">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Selected Date:</span>
              <strong className="text-slate-900">{currentHoverItem.fullDate}</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Generation Output:</span>
              <strong className="text-indigo-600 font-bold">{currentHoverItem.total} MWh</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Customer Demand:</span>
              <strong className="text-slate-800">{currentHoverItem.consumption} MWh</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans uppercase block">Est. Revenue Yield:</span>
              <strong className="text-emerald-600 font-bold">${currentHoverItem.revenue.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN ANALYTICS GRID: Energy Mix Donut & Customer Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Card 1: Renewable Energy Source Mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Energy Generation Source Mix</h3>
              </div>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                1,249 MWh Active
              </span>
            </div>

            {/* Circular Donut & Legend Grid */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 my-3">
              {/* SVG Circular Donut Chart */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                  
                  {/* Segment 1: Solar (58%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    strokeDasharray="58 100"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Wind (24%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="4"
                    strokeDasharray="24 100"
                    strokeDashoffset="-58"
                  />
                  {/* Segment 3: BESS Storage (12%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeDasharray="12 100"
                    strokeDashoffset="-82"
                  />
                  {/* Segment 4: Hydro/Grid (6%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="4"
                    strokeDasharray="6 100"
                    strokeDashoffset="-94"
                  />
                </svg>
                {/* Donut Center Text */}
                <div className="absolute text-center">
                  <span className="text-xs font-bold text-slate-900 block leading-tight font-mono">100%</span>
                  <span className="text-[9px] text-slate-400 font-sans uppercase">Clean Mix</span>
                </div>
              </div>

              {/* Source Bars Breakdown */}
              <div className="flex-1 w-full space-y-2.5 text-xs">
                {ENERGY_SOURCE_BREAKDOWN.map((source, index) => {
                  const IconComp = source.icon;
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="flex items-center gap-1.5 text-slate-800">
                          <IconComp className={`w-3.5 h-3.5 ${source.textClass}`} />
                          <span>{source.name}</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          {source.share}% <span className="text-slate-400 font-normal">({source.mwh})</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${source.colorClass}`} style={{ width: `${source.share}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500">
            <span>Clean Energy Offset: <strong className="text-emerald-600 font-semibold">94% Zero-Carbon</strong></span>
            <span>Grid Curtailment: <strong className="text-slate-700 font-semibold">0.8% Minimal</strong></span>
          </div>
        </div>

        {/* Card 2: Customer Demand & Sector Load Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Customer Demand by Sector</h3>
              </div>
              <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                1,284 Total Accounts
              </span>
            </div>

            <div className="space-y-3 my-2">
              {CUSTOMER_SECTOR_CONSUMPTION.map((sec, idx) => {
                const IconComp = sec.icon;
                return (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-indigo-600">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{sec.sector}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{sec.accounts}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-900 text-sm">{sec.share}%</span>
                        <p className="text-[10px] text-indigo-600 font-medium">{sec.mwh}</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                        style={{ width: `${sec.share}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500">
            <span>Peak Demand Time: <strong className="text-slate-800">02:30 PM (Industrial)</strong></span>
            <span>Peak Shaving Saved: <strong className="text-emerald-600 font-semibold">$3,420 this month</strong></span>
          </div>
        </div>
      </div>

      {/* ESG IMPACT & FLEET RELIABILITY MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* ESG Impact Scorecard (1 Col) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">Sustainability & ESG Impact</h3>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              Verified
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-sans">CO₂ EMISSION AVOIDED</p>
                <p className="text-lg font-bold text-emerald-400">3,307 Tonnes</p>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-sans">EQUIVALENT TREES PLANTED</p>
                <p className="text-lg font-bold text-teal-300">148,200 Trees</p>
              </div>
              <Leaf className="w-5 h-5 text-teal-400" />
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-sans">COAL COMBUSTION DISPLACED</p>
                <p className="text-lg font-bold text-indigo-300">1,640 Metric Tons</p>
              </div>
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Fleet Reliability Matrix Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Asset Fleet Reliability & SLA Metrics</h3>
                <p className="text-[11px] text-slate-500">Service level agreements and mean time to recovery (MTTR)</p>
              </div>
              <span className="text-xs font-mono font-semibold bg-indigo-50 text-indigo-700 px-2 py-1 rounded self-start sm:self-auto">
                Overall SLA: 98.2%
              </span>
            </div>

            <div className="overflow-x-auto touch-scroll">
              <table className="w-full text-left text-xs min-w-[550px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Asset Fleet</th>
                    <th className="p-3">Connected Units</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">Uptime %</th>
                    <th className="p-3">MTTR</th>
                    <th className="p-3">SLA Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-500" /> Solar PV Arrays
                    </td>
                    <td className="p-3 font-mono text-slate-600">142 Arrays</td>
                    <td className="p-3 font-mono text-slate-700">1.2 MW</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold">99.1%</td>
                    <td className="p-3 font-mono text-slate-600">42 mins</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Exceeding
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-600" /> Solar Inverters
                    </td>
                    <td className="p-3 font-mono text-slate-600">84 Inverters</td>
                    <td className="p-3 font-mono text-slate-700">850 kW</td>
                    <td className="p-3 font-mono text-amber-600 font-bold">96.4%</td>
                    <td className="p-3 font-mono text-slate-600">1.8 hrs</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Attention (INV-204)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" /> BESS Storage
                    </td>
                    <td className="p-3 font-mono text-slate-600">42 Units</td>
                    <td className="p-3 font-mono text-slate-700">450 kWh</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold">99.8%</td>
                    <td className="p-3 font-mono text-slate-600">18 mins</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Exceeding
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-cyan-600" /> Smart Bi-dir Meters
                    </td>
                    <td className="p-3 font-mono text-slate-600">120 Units</td>
                    <td className="p-3 font-mono text-slate-700">Telemetry</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold">99.9%</td>
                    <td className="p-3 font-mono text-slate-600">8 mins</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Optimal
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
            <button
              onClick={() => handleExport('CSV')}
              className="text-xs text-indigo-600 font-bold hover:text-indigo-800 inline-flex items-center gap-1"
            >
              <span>Download Full SLA Incident Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. PREDICTIVE MAINTENANCE VIEW
function PredictiveMaintenanceView({ createAiTicket }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Wrench className="w-6 h-6 text-indigo-600 shrink-0" />
          <span>Predictive Maintenance Engine</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          AI failure probability matrix based on IoT thermal, vibration, and power factor patterns.
        </p>
      </div>

      {/* Risk Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3.5 sm:p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Asset Failure Probability Matrix</h3>
        </div>
        <div className="overflow-x-auto touch-scroll">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5">Asset</th>
                <th className="p-3.5">Health</th>
                <th className="p-3.5">Failure Risk</th>
                <th className="p-3.5">Predicted Anomaly</th>
                <th className="p-3.5">Recommended Action</th>
                <th className="p-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="bg-rose-50/30">
                <td className="p-3.5 font-bold font-mono text-slate-900">INV-204 (Inverter)</td>
                <td className="p-3.5 font-mono text-rose-600 font-bold">72%</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">High Risk</span>
                </td>
                <td className="p-3.5 text-slate-700">Thermal stress & cooling intake restriction</td>
                <td className="p-3.5 text-slate-700">Inspect fan motor within 24 hours</td>
                <td className="p-3.5">
                  <button
                    onClick={() => createAiTicket('INV-204', 'Predictive Maintenance: Inspect cooling fan motor')}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-bold shadow-sm"
                  >
                    Dispatch Ticket
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-mono text-slate-900">TX-08 (Transformer)</td>
                <td className="p-3.5 font-mono text-amber-600 font-bold">87%</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Medium</span>
                </td>
                <td className="p-3.5 text-slate-700">Oil temperature rising trend</td>
                <td className="p-3.5 text-slate-700">Monitor peak load cycle</td>
                <td className="p-3.5">
                  <button className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold">
                    Monitor
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-mono text-slate-900">PV-17 (Solar PV Array)</td>
                <td className="p-3.5 font-mono text-emerald-600 font-bold">96%</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Low Risk</span>
                </td>
                <td className="p-3.5 text-slate-700">Dust accumulation on string 3</td>
                <td className="p-3.5 text-slate-700">Schedule routine cleaning</td>
                <td className="p-3.5">
                  <button className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold">
                    Queue Cleaning
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* How Predictive Maintenance Works Workflow Infographic */}
      <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="font-bold text-xs sm:text-sm text-indigo-300 uppercase tracking-wider mb-4">
          How LiveGrid Predictive AI Maintenance Operates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 text-center">
          <WorkflowStep step="1" title="IoT Sensors" desc="Continuous SCADA telemetry streams temperature & power output" />
          <WorkflowStep step="2" title="AI Pattern Engine" desc="Compares real-time curves against expected physics models" />
          <WorkflowStep step="3" title="Anomaly Flag" desc="Identifies thermal overheating & 23% output drop" />
          <WorkflowStep step="4" title="CRM Synchronization" desc="Links asset health directly with customer account context" />
          <WorkflowStep step="5" title="Work Order Dispatch" desc="Auto-generates Field Service Ticket SR-1043 for technician" />
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({ step, title, desc }) {
  return (
    <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 flex flex-col items-center">
      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-2">
        {step}
      </div>
      <p className="font-bold text-white text-xs">{title}</p>
      <p className="text-[11px] text-slate-400 mt-1 leading-tight">{desc}</p>
    </div>
  );
}

// 10. ARCHITECTURE & SYSTEM MODAL
function ArchitectureModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">System Architecture & Data Pipeline</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <div className="p-3 bg-indigo-950/60 rounded-lg border border-indigo-800/50">
            <p className="font-bold text-indigo-300 text-xs">Enterprise Energy CRM Core Principle:</p>
            <p className="text-slate-300 mt-1">
              "AI acts as the intelligence bridge that ingests raw IoT/SCADA energy readings and converts operational anomalies into automated customer service and maintenance decisions."
            </p>
          </div>

          <p className="font-bold text-white">Architecture Data Flow:</p>
          <div className="font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800 text-indigo-300 leading-normal">
            ☀️ Solar PV / Wind / Battery / Smart Meters
            <br />
            ↓ IoT Sensors & SCADA Protocol
            <br />
            ↓ Operational Telemetry Data Platform
            <br />
            ↓ LiveGrid AI Analytics Engine (Anomaly Detection)
            <br />
            ↓ LiveGrid CRM & Field Service Orchestrator
            <br />↓ Automated Work Order Ticket SR-1043 & Customer Alert
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
            >
              Got It, Return to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
