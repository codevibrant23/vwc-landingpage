"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SignOut,
  Trash,
  Envelope,
  Phone,
  User,
  Clock,
  Tag,
  MagnifyingGlass,
  ArrowSquareOut,
  Check,
} from "@phosphor-icons/react";

interface Lead {
  id: string;
  name: string;
  phone?: string | null;
  email: string;
  interest: string;
  message: string | null;
  createdAt: string;
}

export function AdminDashboard({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [filterInterest, setFilterInterest] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    } finally {
      setDeletingId(null);
    }
  }

  function copyEmail(email: string, id: string) {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.message &&
        lead.message.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter =
      filterInterest === "all" || lead.interest === filterInterest;

    return matchesSearch && matchesFilter;
  });

  const uniqueInterests = Array.from(
    new Set(leads.map((l) => l.interest)),
  ).filter(Boolean);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="wrap admin-header-content">
          <div className="admin-brand">
            <span className="brand-logo">VWC</span>
            <div>
              <h2>Leads & Enquiries</h2>
              <p className="admin-subtitle">
                {leads.length} total enquiry{leads.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <div className="admin-actions">
            <a href="/" target="_blank" className="admin-btn-secondary">
              <ArrowSquareOut size={16} /> View Website
            </a>
            <button onClick={handleLogout} className="admin-btn-logout">
              <SignOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="wrap admin-main">
        <div className="admin-controls">
          <div className="admin-search-wrapper">
            <MagnifyingGlass size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or message content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-filter-wrapper">
            <select
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
              className="admin-filter-select"
            >
              <option value="all">All Designs ({leads.length})</option>
              {uniqueInterests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest} (
                  {leads.filter((l) => l.interest === interest).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="admin-empty">
            <h3>No enquiries found</h3>
            <p>
              {leads.length === 0
                ? "Submissions through the website enquiry form will appear here automatically."
                : "No leads matched your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="admin-leads-list">
            {filteredLeads.map((lead) => {
              const formattedDate = new Date(lead.createdAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );

              return (
                <article key={lead.id} className="admin-lead-card">
                  <div className="lead-card-header">
                    <div className="lead-user-info">
                      <div className="lead-avatar">
                        <User size={20} />
                      </div>
                      <div>
                        <h3>{lead.name}</h3>
                        <div className="lead-email-row">
                          <Envelope size={14} />
                          <span>{lead.email}</span>
                          <button
                            onClick={() => copyEmail(lead.email, lead.id)}
                            className="lead-copy-btn"
                            title="Copy email"
                          >
                            {copiedId === lead.id ? (
                              <Check size={14} color="#2e7d32" />
                            ) : (
                              "Copy"
                            )}
                          </button>
                        </div>
                        {lead.phone && (
                          <div className="lead-email-row" style={{ marginTop: "4px" }}>
                            <Phone size={14} />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lead-header-right">
                      <span className="lead-interest-badge">
                        <Tag size={12} /> {lead.interest}
                      </span>
                      <div className="lead-time">
                        <Clock size={13} />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="lead-message-box">
                      <p>{lead.message}</p>
                    </div>
                  )}

                  <div className="lead-card-footer">
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={deletingId === lead.id}
                      className="lead-delete-btn"
                    >
                      <Trash size={15} />
                      {deletingId === lead.id ? "Deleting..." : "Delete enquiry"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
