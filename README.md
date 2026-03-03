# expiry-guard — Temporary User Lifecycle Manager

<p align="center">
  <strong>Create. Audit. Alert.</strong><br/>
  A production-grade CLI for managing temporary Linux user accounts with automatic expiry.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#commands">Commands</a> •
  <a href="#interactive-demo">Demo</a> •
  <a href="#use-cases">Use Cases</a>
</p>

---

## Why expiry-guard?

Temporary access is a security paradox: you need it for contractors, automation, and short-term projects, but **forgotten temporary accounts are a top attack vector**.

Every compliance framework (SOC2, ISO27001, GDPR) requires:
- Time-bound access for non-permanent users
- Regular auditing of account lifecycles
- Evidence of automatic cleanup

`expiry-guard` makes this trivial. One tool, zero dependencies, production-ready.

## Features

| Command | What It Does |
|---------|-------------|
| `expiry-guard create <user> <date>` | Create temporary user with exact expiry |
| `expiry-guard audit` | List all expiring users with days remaining |
| `expiry-guard alert --days=7` | Flag accounts expiring soon (default: 7 days) |
| `expiry-guard report --format=html` | Generate compliance reports (HTML/JSON/CSV) |

### Key Highlights

- **Zero dependencies** — pure Bash, works on any Linux distro with shadow-utils
- **Production-grade** — proper date validation, error handling, colored output
- **Compliance-ready** — HTML reports, JSON for SIEM, CSV for auditors
- **Alerting built-in** — proactive notifications before accounts expire
- **Idempotent** — safe to run in cron jobs and automation pipelines

## Quick Start

### Option 1 — Quick Install

```bash
curl -sL https://raw.githubusercontent.com/SaharshPamecha/expiry-guard/main/install.sh | sudo bash
```

### Option 2 — Manual

```bash
git clone https://github.com/SaharshPamecha/expiry-guard.git
chmod +x expiry-guard/cli/expiry-guard
sudo cp expiry-guard/cli/expiry-guard /usr/local/bin/
```

### Verify

```bash
expiry-guard version
# expiry-guard version 1.0.0
```

## Commands

### Create Temporary User

```bash
# Create contractor account expiring end of project
sudo expiry-guard create contractor-a 2025-12-31

# Create short-term dev access
sudo expiry-guard create temp-dev 2025-03-15
```

### Audit All Temporary Accounts

```bash
# List all expiring users
sudo expiry-guard audit

# Show only accounts expiring within 30 days
sudo expiry-guard audit --days=30
```

### Alert on Expiring Accounts

```bash
# Default: alert on accounts expiring within 7 days
sudo expiry-guard alert

# Custom alert window
sudo expiry-guard alert --days=14
```

### Generate Reports

```bash
# Console table (default)
sudo expiry-guard report

# HTML report for compliance documentation
sudo expiry-guard report --format=html --output=audit-report.html

# JSON for SIEM integration
sudo expiry-guard report --format=json --output=report.json

# CSV for spreadsheet analysis
sudo expiry-guard report --format=csv > accounts.csv
```

## Interactive Demo

Try expiry-guard directly in your browser — no install needed:

**[Launch Interactive Demo →](https://expiry-guard.vercel.app)**

The web simulator lets you run all expiry-guard commands against a simulated user database.

## Use Cases

### Contractor Lifecycle Management
```bash
# Onboard contractor
sudo expiry-guard create contractor-ux 2025-06-30

# Weekly audit
sudo expiry-guard alert --days=7

# Generate compliance report for security team
sudo expiry-guard report --format=html --output=/var/www/reports/contractors.html
```

### CI/CD Integration
```bash
# In your pipeline: fail if expired accounts exist
EXPIRED=$(sudo expiry-guard report --format=json | grep -c "expired")
if [ "$EXPIRED" -gt 0 ]; then
  echo "FAIL: $EXPIRED expired accounts found"
  exit 1
fi
```

### Automated Fleet Monitoring
```bash
# Daily cron job (add to /etc/cron.d/expiry-guard)
0 9 * * * root /usr/local/bin/expiry-guard alert --days=7 | mail -s "Daily Account Expiry Report" security@company.com
```

### Pre-Audit Preparation
```bash
# Generate comprehensive report before auditor visit
sudo expiry-guard report --format=html --output=/tmp/compliance-$(date +%Y%m%d).html
```

## /etc/shadow vs /etc/passwd

`expiry-guard` uses `chage` to read from `/etc/shadow`, where expiry dates are stored securely. This requires root privileges — by design. Regular users cannot query account expiration data, maintaining the security boundary.

## Project Structure

```
expiry-guard/
├── cli/
│   └── expiry-guard         # The CLI tool (Bash)
├── web/                     # Interactive web demo (Next.js)
│   ├── app/
│   │   ├── components/
│   │   │   └── Terminal.tsx  # Terminal simulator
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx          # Landing page
│   └── package.json
├── examples/
│   └── cron-example.txt     # Example cron job
├── docs/
├── install.sh               # Quick installer
└── README.md
```

## Open Source

**[github.com/SaharshPamecha/expiry-guard](https://github.com/SaharshPamecha/expiry-guard)**

Contributions welcome:
- LDAP/Active Directory integration
- Webhook alerts (Slack, Teams, PagerDuty)
- Kubernetes temporary ServiceAccount support
- Terraform provider

## License

MIT License — see [LICENSE](LICENSE) for details.

## Author

**Saharsh Pamecha** — Staff Engineer | DevOps • Data • AI

- **X**: [@SaharshPamecha1](https://x.com/SaharshPamecha1)
- **LinkedIn**: [Saharsh Pamecha](https://www.linkedin.com/in/saharsh-pamecha-6219961b7/)
- **GitHub**: [SaharshPamecha](https://github.com/SaharshPamecha)
