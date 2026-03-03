import Terminal from "./components/Terminal";
import { Clock, Shield, AlertTriangle, FileText, Calendar, Bell, Github, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0a09] grid-bg">
      {/* Nav */}
      <nav className="border-b border-[#292524] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#ea580c] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#0c0a09]" />
            </div>
            <span className="font-bold text-[#fafaf9] text-lg">expiry-guard</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/SaharshPamecha/expiry-guard" target="_blank" rel="noopener noreferrer" className="text-[#a8a29e] hover:text-[#f59e0b] transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#f59e0b]/5 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#ea580c]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-medium mb-8">
            <Clock className="w-3 h-3" />
            Open Source — Linux Security Toolkit
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">expiry</span>
            <span className="text-[#f59e0b] glow-text-amber">-guard</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#a8a29e] max-w-2xl mx-auto mb-4 leading-relaxed">
            Create. Audit. Alert.
          </p>
          <p className="text-base text-[#78716c] max-w-xl mx-auto mb-10">
            A production-grade CLI for managing temporary Linux user accounts with automatic expiry.
            Zero dependencies. Works on any Linux distro.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center gap-3 bg-[#1c1917] border border-[#44403c] rounded-xl px-6 py-3 mb-10">
            <span className="text-[#78716c] select-none">$</span>
            <code className="text-[#e7e5e4] text-sm font-mono">curl -sL ... | sudo bash</code>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="https://github.com/SaharshPamecha/expiry-guard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f59e0b] text-[#0c0a09] font-medium hover:bg-[#d97706] transition-colors">
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#44403c] text-[#a8a29e] hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors">
              <ExternalLink className="w-4 h-4" />
              Try Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-[#292524]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#1c1917] border border-[#44403c] hover:border-[#f59e0b]/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <h3 className="text-lg font-semibold text-[#fafaf9] mb-2">Create with Expiry</h3>
              <p className="text-sm text-[#a8a29e] leading-relaxed">
                Create temporary users with exact expiry dates using <code className="text-[#f59e0b]">useradd -e</code>. 
                Perfect for contractors, short-term access, and compliance requirements.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#1c1917] border border-[#44403c] hover:border-[#ea580c]/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#ea580c]/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-[#ea580c]" />
              </div>
              <h3 className="text-lg font-semibold text-[#fafaf9] mb-2">Audit & Monitor</h3>
              <p className="text-sm text-[#a8a29e] leading-relaxed">
                Scan all temporary accounts with days remaining. Filter by expiry window.
                Identify expired and urgent accounts at a glance.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#1c1917] border border-[#44403c] hover:border-[#f59e0b]/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                <Bell className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <h3 className="text-lg font-semibold text-[#fafaf9] mb-2">Proactive Alerts</h3>
              <p className="text-sm text-[#a8a29e] leading-relaxed">
                Get notified before accounts expire. Configure alert windows.
                Never miss a cleanup window again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section id="demo" className="py-20 px-6 border-t border-[#292524]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#fafaf9] mb-4">Interactive Terminal</h2>
            <p className="text-[#a8a29e] max-w-2xl mx-auto">
              Try expiry-guard commands in your browser. No installation required.
              This simulator runs against mock data to demonstrate all features.
            </p>
          </div>
          <Terminal />
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 border-t border-[#292524]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#fafaf9] mb-12 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#1c1917]/50 border border-[#44403c]">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
                <h3 className="font-semibold text-[#fafaf9]">Contractor Lifecycle</h3>
              </div>
              <p className="text-sm text-[#a8a29e] mb-4">
                Onboard contractors with automatic cleanup. Audit weekly. Generate compliance reports.
              </p>
              <code className="block p-3 rounded-lg bg-[#0c0a09] text-[#f59e0b] text-xs font-mono">
                sudo expiry-guard create contractor-ux 2025-06-30
              </code>
            </div>

            <div className="p-6 rounded-xl bg-[#1c1917]/50 border border-[#44403c]">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="font-semibold text-[#fafaf9]">Compliance Reports</h3>
              </div>
              <p className="text-sm text-[#a8a29e] mb-4">
                Generate HTML, JSON, or CSV reports for auditors. Document your least-privilege enforcement.
              </p>
              <code className="block p-3 rounded-lg bg-[#0c0a09] text-[#f59e0b] text-xs font-mono">
                sudo expiry-guard report --format=html --output=audit.html
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#44403c] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#ea580c] flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-[#0c0a09]" />
            </div>
            <span className="text-sm text-[#78716c]">
              expiry-guard — Built by{" "}
              <a href="https://x.com/SaharshPamecha1" target="_blank" rel="noopener noreferrer" className="text-[#a8a29e] hover:text-[#f59e0b] transition-colors">
                Saharsh Pamecha
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#78716c]">
            <a href="https://www.linkedin.com/in/saharsh-pamecha-6219961b7/" target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/SaharshPamecha/expiry-guard" target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
