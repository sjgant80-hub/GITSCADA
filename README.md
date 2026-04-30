# 🏭 GitSCADA

**Supervisory Control & Data Acquisition — the orchestrator**

Ties GitPLC + GitHMI + GitTAG into a unified SCADA runtime.
Historian, trending, site map, alarm journal, reports — all from
GitHub repos + Issues, served as a GitHub Pages app.

## Structure

```
SCADA/
├── pages/              GitHub Pages app (SCADA supervisor)
│   ├── ui/             Dark theme + grid layout
│   ├── engine/         Historian, site model, alarm journal, data bridge
│   ├── views/          Dashboard, trends, alarms, site map, reports, config
│   ├── widgets/        Trend chart, sparkline, gauge, KPI card, site node
│   └── assets/         Site map SVGs, report templates
├── config/             SCADA system configuration
│   ├── sites.json      Site definitions (ISA-95 L1-L2)
│   ├── historian.json  History storage config
│   └── reports.json    Report schedule definitions
├── historian/          Tag history storage (Issues as time-series)
├── index.html          Redirect → pages/
└── README.md
```

## How It Works

1. **Reads tags** from GitTAG (GitHub Issues, gittag label)
2. **Reads UDTs** from GitPLC (repo contents API)
3. **Renders HMI** faceplates from GitHMI patterns
4. **Historian** — snapshots tag values to Issues (gittag-history label)
5. **Trend charts** — Canvas-based real-time + historical
6. **Alarm journal** — persistent alarm log via Issues
7. **Site map** — ISA-95 hierarchy visualization
8. **Reports** — scheduled KPI summaries (OEE, downtime, quality)
