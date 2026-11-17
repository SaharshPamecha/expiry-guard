# expiry-guard: Managing Temporary Linux User Accounts with Automatic Expiry

**Day 2 of 100 Days of DevOps**

---

## Introduction

Every production environment has them. Contractors who need temporary access. Consultants brought in for specific projects. Developers rotating through on-call shifts. Each one needs a user account—but for how long?

This is where most teams stumble. We create accounts when needed, but we rarely remember to clean them up. Six months later, your `/etc/passwd` is littered with stale accounts. During your next security audit, you're scrambling to explain why "contractor-june" still has shell access in December.

After building `userctl` yesterday for service account auditing, I realized the next logical step was tackling time-bound access. Today, I built `expiry-guard`—a lightweight CLI for managing temporary Linux user accounts with automatic expiry.

---

## The Compliance Reality

Modern compliance frameworks (SOC2, ISO27001, PCI-DSS) explicitly require time-bound access controls. They want evidence that:

- Temporary accounts have defined end dates
- Expired accounts are regularly reviewed
- Access violations are flagged and remediated

The Linux kernel gives us the tools—`useradd -e`, `chage`, `/etc/shadow`—but they're buried in manual pages and easy to misuse. What we need is a wrapper that makes these operations consistent, auditable, and repeatable.

---

## What expiry-guard Does

`expiry-guard` provides four core commands:

### 1. Create with Expiry

```bash
sudo expiry-guard create contractor-ux 2025-06-30
```

Creates a user with automatic expiry on the specified date. No manual `chage` commands, no forgetting to set the date.

### 2. Audit All Temporary Accounts

```bash
sudo expiry-guard audit
```

Scans all accounts and displays a table with days remaining. Shows expired accounts in red, urgent ones in amber. Gives you the full picture in seconds.

### 3. Alert on Upcoming Expiry

```bash
sudo expiry-guard alert --days=7
```

Filters accounts expiring within your specified window. Perfect for cron jobs that email your security team every morning.

### 4. Generate Compliance Reports

```bash
sudo expiry-guard report --format=html --output=audit-report.html
```

Exports account status to HTML, JSON, or CSV. Drop the HTML into your auditor's shared folder. Import the CSV into your GRC platform.

---

## Design Philosophy

Like `userctl`, `expiry-guard` follows a few core principles:

- **Single-file distribution**: One Bash script, zero dependencies
- **Idempotent operations**: Running the same command twice produces the same result
- **Machine-parseable output**: Every command supports JSON for automation
- **Colorized, readable output**: Humans should understand the output at a glance

The tool wraps standard Linux utilities (`useradd`, `chage`, `awk`, `date`) rather than reinventing them. This means it works on any Linux distro without installation headaches.

---

## Interactive Demo

I've deployed an interactive terminal simulator at **https://expiry-guard-pi.vercel.app** where you can try the commands without installing anything. It runs against mock data but demonstrates all the features.

The web version uses an amber/orange color scheme to visually distinguish it from `userctl`'s cyan theme—small details matter when you're building multiple tools.

---

## Installation

```bash
curl -sL https://raw.githubusercontent.com/SaharshPamecha/expiry-guard/main/install.sh | sudo bash
```

Or download the script directly from the [GitHub repository](https://github.com/SaharshPamecha/expiry-guard).

---

## Real-World Usage Pattern

Here's how I'd use this in production:

1. **Onboarding**: Create accounts with explicit expiry dates matching contract end dates
2. **Daily monitoring**: Cron job runs `expiry-guard alert --days=7` and emails the security team
3. **Weekly cleanup**: Run `expiry-guard audit` during Monday standup to review expired accounts
4. **Quarterly compliance**: Generate HTML reports for auditors documenting least-privilege enforcement

---

## Source Code

**Repository**: https://github.com/SaharshPamecha/expiry-guard

The project includes:
- Full CLI source code
- Interactive web demo
- Install script
- Cron job examples
- MIT license

---

## What's Next

Two tools down, more to come. Follow along for daily open-source DevOps tools. If you have specific infrastructure pain points you'd like to see addressed, drop a comment.

---

**About the Author**

Saharsh Pamecha is a Staff Engineer exploring the intersection of DevOps, Data, AI and infrastructure automation and security. This post is part of a 100-day open-source DevOps journey. Follow on [X @SaharshPamecha1](https://x.com/SaharshPamecha1) and [LinkedIn](https://www.linkedin.com/in/saharsh-pamecha-6219961b7/) for daily updates.
