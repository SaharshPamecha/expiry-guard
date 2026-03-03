"use client";

import React, { useState, useRef, useEffect } from "react";
import { AlertTriangle, Clock, Shield, Calendar, FileText, Bell } from "lucide-react";

interface Command {
  input: string;
  output: string[];
  isError?: boolean;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulated user database
  const mockUsers = [
    { username: "contractor-ux", expiry: "2025-06-30", daysLeft: 117 },
    { username: "temp-dev", expiry: "2025-03-15", daysLeft: -5 },
    { username: "consultant-a", expiry: "2025-04-01", daysLeft: 18 },
    { username: "backup-agent", expiry: "never", daysLeft: null },
    { username: "ammar", expiry: "2027-03-28", daysLeft: 755 },
  ];

  const quickActions = [
    { label: "Create User", command: "expiry-guard create contractor-ux 2025-06-30", icon: <Calendar className="w-3 h-3" /> },
    { label: "Audit Accounts", command: "expiry-guard audit", icon: <Shield className="w-3 h-3" /> },
    { label: "Alert (7 days)", command: "expiry-guard alert --days=7", icon: <Bell className="w-3 h-3" /> },
    { label: "HTML Report", command: "expiry-guard report --format=html", icon: <FileText className="w-3 h-3" /> },
    { label: "Help", command: "expiry-guard help", icon: <Clock className="w-3 h-3" /> },
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    let output: string[] = [];
    let isError = false;

    const parts = trimmedCmd.split(" ");
    const mainCmd = parts[0];
    const subCmd = parts[1];

    if (mainCmd === "expiry-guard" || mainCmd === "sudo") {
      const actualCmd = mainCmd === "sudo" ? parts[1] : subCmd;
      const actualParts = mainCmd === "sudo" ? parts.slice(2) : parts.slice(2);

      switch (actualCmd) {
        case "version":
        case "--version":
        case "-v":
          output = ["expiry-guard version 1.0.0"];
          break;

        case "help":
        case "--help":
        case "-h":
          output = [
            "",
            "\x1b[1mexpiry-guard\x1b[0m — Temporary User Lifecycle Manager v1.0.0",
            "",
            "\x1b[1mUSAGE:\x1b[0m",
            "    expiry-guard <command> [options]",
            "",
            "\x1b[1mCOMMANDS:\x1b[0m",
            "    create <user> <YYYY-MM-DD>  Create temporary user with expiry date",
            "    audit [--days=N]             List all expiring/temporary users",
            "    report [--format=html|json]  Generate compliance report",
            "    alert [--days=7]             Show accounts expiring soon",
            "    help                         Show this help message",
            "    version                      Show version information",
            "",
            "\x1b[1mEXAMPLES:\x1b[0m",
            "    sudo expiry-guard create contractor-a 2025-12-31",
            "    sudo expiry-guard audit",
            "    sudo expiry-guard alert --days=14",
          ];
          break;

        case "create":
          const username = actualParts[0];
          const date = actualParts[1];
          if (!username || !date) {
            output = ["[✗] Usage: expiry-guard create <username> <YYYY-MM-DD>"];
            isError = true;
          } else {
            output = [
              "[INFO] Creating temporary user: " + username,
              "[INFO] Expiry date: " + date,
              "[✓] Temporary user '" + username + "' created successfully",
              "",
              "Verification:",
              "Account expires : " + date,
              "Last password change : password must be changed",
              "",
              "[INFO] Account will expire in 365 days",
            ];
          }
          break;

        case "audit":
          const daysFilter = actualParts.find(p => p.startsWith("--days="))?.split("=")[1];
          output = [
            "[INFO] Auditing user accounts...",
            "",
            "\x1b[1mUSERNAME             EXPIRES            DAYS LEFT    STATUS\x1b[0m",
            "-------------------- ------------------ ------------ ----------",
            "contractor-ux        2025-06-30              117    \x1b[32mactive\x1b[0m",
            "temp-dev             2025-03-15               -5    \x1b[31mEXPIRED\x1b[0m",
            "consultant-a         2025-04-01               18    \x1b[33murgent\x1b[0m",
            "ammar                2027-03-28              755    \x1b[32mactive\x1b[0m",
            "",
            "[✓] Found 4 temporary account(s)",
          ];
          break;

        case "alert":
          const alertDays = actualParts.find(p => p.startsWith("--days="))?.split("=")[1] || "7";
          output = [
            "[INFO] Checking for accounts expiring within " + alertDays + " days...",
            "",
            "\x1b[1mUSERNAME             EXPIRES            DAYS LEFT    ACTION\x1b[0m",
            "-------------------- ------------------ ------------ ------------",
            "temp-dev             2025-03-15               -5    \x1b[31mDELETE NOW\x1b[0m",
            "consultant-a         2025-04-01               18    \x1b[33mREVIEW\x1b[0m",
            "",
            "[!] Found 1 expired and 1 urgent account(s)",
            "",
            "Recommended actions:",
            "  • Run: expiry-guard cleanup (to remove expired accounts)",
            "  • Review urgent accounts and extend or revoke access",
            "  • Update documentation for temporary access procedures",
          ];
          break;

        case "report":
          const format = actualParts.find(p => p.startsWith("--format="))?.split("=")[1] || "table";
          const now = new Date().toISOString().replace("T", " ").slice(0, 19);
          if (format === "html") {
            output = [
              "<!DOCTYPE html>",
              "<html><head><title>Expiry Guard Report</title></head><body>",
              "<h1>🔐 Expiry Guard - Compliance Report</h1>",
              "<p><strong>Generated:</strong> " + now + "</p>",
              "<p><strong>System:</strong> web-simulator</p>",
              "<table border=\"1\">",
              "<tr><th>Username</th><th>Expiry Date</th><th>Days Left</th><th>Status</th></tr>",
              "<tr><td>contractor-ux</td><td>2025-06-30</td><td>117</td><td>Active</td></tr>",
              "<tr><td>temp-dev</td><td>2025-03-15</td><td>-5</td><td style=\"color:red\">EXPIRED</td></tr>",
              "<tr><td>consultant-a</td><td>2025-04-01</td><td>18</td><td style=\"color:orange\">Expiring Soon</td></tr>",
              "<tr><td>ammar</td><td>2027-03-28</td><td>755</td><td>Active</td></tr>",
              "</table>",
              "</body></html>",
            ];
          } else if (format === "json") {
            output = [JSON.stringify({
              generated: now,
              system: "web-simulator",
              version: "1.0.0",
              accounts: [
                { username: "contractor-ux", expiry_date: "2025-06-30", days_remaining: 117, status: "active" },
                { username: "temp-dev", expiry_date: "2025-03-15", days_remaining: -5, status: "expired" },
                { username: "consultant-a", expiry_date: "2025-04-01", days_remaining: 18, status: "expiring_soon" },
                { username: "ammar", expiry_date: "2027-03-28", days_remaining: 755, status: "active" },
              ]
            }, null, 2)];
          } else {
            output = [
              "",
              "=== EXPIRY-GUARD COMPLIANCE REPORT ===",
              "Generated: " + now,
              "System: web-simulator",
              "======================================",
              "",
              "USERNAME             EXPIRY DATE        DAYS LEFT",
              "-------------------- ------------------ ------------",
              "contractor-ux        2025-06-30              117",
              "temp-dev             2025-03-15               -5",
              "consultant-a         2025-04-01               18",
              "ammar                2027-03-28              755",
              "",
              "=== END OF REPORT ===",
            ];
          }
          break;

        default:
          output = ["[✗] Unknown command: " + (actualCmd || "") + "", "Run 'expiry-guard help' for usage."];
          isError = true;
      }
    } else if (mainCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (mainCmd === "cat" && parts[1] === "/etc/passwd") {
      output = [
        "root:x:0:0:root:/root:/bin/bash",
        "daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin",
        "contractor-ux:x:1001:1001::/home/contractor-ux:/bin/bash",
        "temp-dev:x:1002:1002::/home/temp-dev:/bin/bash",
        "consultant-a:x:1003:1003::/home/consultant-a:/bin/bash",
        "ammar:x:1004:1004::/home/ammar:/bin/bash",
        "backup-agent:x:1005:1005::/home/backup-agent:/sbin/nologin",
      ];
    } else if (mainCmd === "sudo" && parts[1] === "chage" && parts[2] === "-l") {
      const user = parts[3];
      const userData = mockUsers.find(u => u.username === user);
      if (userData) {
        output = [
          "Last password change : password must be changed",
          "Password expires : never",
          "Password inactive : never",
          "Account expires : " + (userData.expiry === "never" ? "never" : userData.expiry),
          "Minimum number of days between password change : 0",
          "Maximum number of days between password change : 99999",
          "Number of days of warning before password expires : 7",
        ];
      } else {
        output = ["chage: user '" + user + "' does not exist in /etc/passwd"];
        isError = true;
      }
    } else {
      output = ["Command not found in simulator: " + mainCmd, "Try: expiry-guard help"];
      isError = true;
    }

    setHistory(prev => [...prev, { input: trimmedCmd, output, isError }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  const runQuickAction = (command: string) => {
    handleCommand(command);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#1c1917] border border-[#44403c] rounded-xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-[#292524] px-4 py-3 flex items-center gap-2 border-b border-[#44403c]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>
          <span className="ml-4 text-sm text-[#a8a29e] font-mono">expiry-guard@linux:~</span>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1c1917] border-b border-[#44403c] px-4 py-2 flex flex-wrap gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => runQuickAction(action.command)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#fafaf9] bg-[#292524] hover:bg-[#44403c] rounded-lg transition-colors border border-[#44403c]"
            >
              <span className="text-[#f59e0b]">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="h-[400px] overflow-y-auto p-4 font-mono text-sm terminal-scrollbar bg-[#0c0a09]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Welcome Message */}
          {history.length === 0 && (
            <div className="mb-4">
              <p className="text-[#f59e0b] mb-2">
                <AlertTriangle className="inline w-4 h-4 mr-2" />
                Welcome to expiry-guard interactive simulator
              </p>
              <p className="text-[#a8a29e] mb-1">This is a simulated environment. Commands run against mock data.</p>
              <p className="text-[#78716c]">Try the quick actions above or type: expiry-guard help</p>
            </div>
          )}

          {history.map((cmd, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex items-center gap-2 text-[#fafaf9]">
                <span className="text-[#f59e0b]">➜</span>
                <span className="text-[#10b981]">{currentPath}</span>
                <span className="text-[#a8a29e]">$</span>
                <span>{cmd.input}</span>
              </div>
              <div className={`mt-1 whitespace-pre-wrap ${cmd.isError ? "text-[#ef4444]" : "text-[#e7e5e4]"}`}>
                {cmd.output.map((line, lineIdx) => {
                  // Handle ANSI color codes
                  let styledLine = line
                    .replace(/\x1b\[32m/g, '<span class="text-[#10b981]">')
                    .replace(/\x1b\[31m/g, '<span class="text-[#ef4444]">')
                    .replace(/\x1b\[33m/g, '<span class="text-[#f59e0b]">')
                    .replace(/\x1b\[1m/g, '<span class="font-bold">')
                    .replace(/\x1b\[0m/g, '</span>');
                  
                  const openTags = (styledLine.match(/<span/g) || []).length;
                  const closeTags = (styledLine.match(/<\/span>/g) || []).length;
                  for (let i = 0; i < openTags - closeTags; i++) {
                    styledLine += '</span>';
                  }
                  
                  return <div key={lineIdx} dangerouslySetInnerHTML={{ __html: styledLine }} />;
                })}
              </div>
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center gap-2 text-[#fafaf9]">
            <span className="text-[#f59e0b]">➜</span>
            <span className="text-[#10b981]">{currentPath}</span>
            <span className="text-[#a8a29e]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-[#e7e5e4] font-mono"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="cursor-blink text-[#f59e0b]">▋</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-[#78716c]">
        <p>Commands: create, audit, alert, report, help | Supports sudo, cat /etc/passwd, chage -l</p>
      </div>
    </div>
  );
};

export default Terminal;
