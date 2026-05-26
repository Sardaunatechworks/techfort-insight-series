"use client";

import { useEffect, useState, ComponentType } from "react";
import {
  dbLogout,
  dbListenApplications,
  dbUpdateApplicationStatus,
  dbListenContacts,
  dbToggleContactRead,
  dbGetPrograms,
  dbSaveProgram,
  dbDeleteProgram,
  dbGetSessions,
  dbSaveSession,
  dbDeleteSession,
  dbGetArticles,
  dbSaveArticle,
  dbDeleteArticle,
  dbGetResources,
  dbSaveResource,
  dbDeleteResource,
  dbGetSocialLinks,
  dbSaveSocialLink,
  dbDeleteSocialLink,
  AdminUser,
  Application,
  Contact,
  Program,
  Session,
  Article,
  Resource,
  SocialLink,
} from "@/lib/db";
import type { User as FirebaseUser } from "firebase/auth";
import {
  Loader2,
  LogOut,
  User,
  GraduationCap,
  FolderOpen,
  Calendar,
  BookOpen,
  Wrench,
  Users,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Archive,
  RefreshCw,
  Eye,
  EyeOff,
  MapPin,
  Building,
  Clock,
  Shield,
  Search,
  Check,
  ChevronRight,
  FileText,
  Presentation,
  Library,
  Share2,
  Youtube,
  Github,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";

interface DashboardClientProps {
  user: AdminUser | FirebaseUser;
}

type TabType =
  | "applications"
  | "contacts"
  | "programs"
  | "sessions"
  | "research"
  | "resources"
  | "socials";

export default function DashboardClient({ user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("applications");

  // Real-time states
  const [applications, setApplications] = useState<Application[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // CMS states
  const [programs, setPrograms] = useState<Program[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [cmsLoading, setCmsLoading] = useState(false);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "program" | "session" | "article" | "resource" | "social" | null
  >(null);
  const [editingItem, setEditingItem] = useState<
    Program | Session | Article | Resource | SocialLink | null
  >(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Form Fields
  const [programForm, setProgramForm] = useState({
    title: "",
    tag: "",
    overview: "",
    impact: "",
    goals: "", // comma separated
    outcomes: "", // comma separated
    future: "",
  });

  const [sessionForm, setSessionForm] = useState({
    title: "",
    date: "Coming Soon",
    category: "",
    status: "upcoming", // upcoming | past
  });

  const [articleForm, setArticleForm] = useState({
    title: "",
    tag: "",
    excerpt: "",
  });

  const [resourceForm, setResourceForm] = useState({
    title: "",
    desc: "",
    icon: "GraduationCap", // GraduationCap, BookOpen, Wrench, FileText, Presentation, Library
  });

  const [socialForm, setSocialForm] = useState({
    platform: "",
    url: "",
    icon: "Globe", // Globe, Linkedin, Twitter, Instagram, Mail, Youtube, Github
  });

  // Load Realtime Data
  useEffect(() => {
    const unsubApps = dbListenApplications((data) => {
      setApplications(data);
    });

    const unsubConts = dbListenContacts((data) => {
      setContacts(data);
    });

    return () => {
      unsubApps();
      unsubConts();
    };
  }, []);

  // Load CMS Data
  const loadCMS = async () => {
    setCmsLoading(true);
    try {
      const progs = await dbGetPrograms();
      const sesss = await dbGetSessions();
      const arts = await dbGetArticles();
      const ress = await dbGetResources();
      const socs = await dbGetSocialLinks();

      setPrograms([...progs].sort((a, b) => (a.order || 0) - (b.order || 0)));
      setSessions([...sesss].sort((a, b) => (a.order || 0) - (b.order || 0)));
      setArticles([...arts].sort((a, b) => (a.order || 0) - (b.order || 0)));
      setResources([...ress].sort((a, b) => (a.order || 0) - (b.order || 0)));
      setSocialLinks([...socs].sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (e) {
      console.error("Error loading CMS data:", e);
    } finally {
      setCmsLoading(false);
    }
  };

  useEffect(() => {
    loadCMS();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await dbLogout();
    }
  };

  // Open Add Modal
  const openAddModal = (
    type: "program" | "session" | "article" | "resource" | "social",
  ) => {
    setModalType(type);
    setEditingItem(null);
    setIsModalOpen(true);

    // Reset forms
    setProgramForm({
      title: "",
      tag: "",
      overview: "",
      impact: "",
      goals: "",
      outcomes: "",
      future: "",
    });
    setSessionForm({
      title: "",
      date: "Coming Soon",
      category: "",
      status: "upcoming",
    });
    setArticleForm({ title: "", tag: "", excerpt: "" });
    setResourceForm({ title: "", desc: "", icon: "GraduationCap" });
    setSocialForm({ platform: "", url: "", icon: "Globe" });
  };

  // Open Edit Modal
  const openEditModal = (
    type: "program" | "session" | "article" | "resource" | "social",
    item: Program | Session | Article | Resource | SocialLink,
  ) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);

    if (type === "program") {
      const prog = item as Program;
      setProgramForm({
        title: prog.title || "",
        tag: prog.tag || "",
        overview: prog.overview || "",
        impact: prog.impact || "",
        goals: Array.isArray(prog.goals) ? prog.goals.join(", ") : "",
        outcomes: Array.isArray(prog.outcomes) ? prog.outcomes.join(", ") : "",
        future: prog.future || "",
      });
    } else if (type === "session") {
      const sess = item as Session;
      setSessionForm({
        title: sess.title || "",
        date: sess.date || "",
        category: sess.category || "",
        status: sess.status || "upcoming",
      });
    } else if (type === "article") {
      const art = item as Article;
      setArticleForm({
        title: art.title || "",
        tag: art.tag || "",
        excerpt: art.excerpt || "",
      });
    } else if (type === "resource") {
      const res = item as Resource;
      setResourceForm({
        title: res.title || "",
        desc: res.desc || "",
        icon: res.icon || "GraduationCap",
      });
    } else if (type === "social") {
      const soc = item as SocialLink;
      setSocialForm({
        platform: soc.platform || "",
        url: soc.url || "",
        icon: soc.icon || "Globe",
      });
    }
  };

  // Submit Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (modalType === "program") {
        const payload = {
          ...(editingItem as Program),
          title: programForm.title,
          tag: programForm.tag,
          overview: programForm.overview,
          impact: programForm.impact,
          goals: programForm.goals
            .split(",")
            .map((g) => g.trim())
            .filter(Boolean),
          outcomes: programForm.outcomes
            .split(",")
            .map((o) => o.trim())
            .filter(Boolean),
          future: programForm.future,
        };
        await dbSaveProgram(payload);
      } else if (modalType === "session") {
        await dbSaveSession({
          ...(editingItem as Session),
          ...sessionForm,
        });
      } else if (modalType === "article") {
        await dbSaveArticle({
          ...(editingItem as Article),
          ...articleForm,
        });
      } else if (modalType === "resource") {
        await dbSaveResource({
          ...(editingItem as Resource),
          ...resourceForm,
        });
      } else if (modalType === "social") {
        await dbSaveSocialLink({
          ...(editingItem as SocialLink),
          ...socialForm,
        });
      }
      setIsModalOpen(false);
      await loadCMS();
    } catch (err) {
      console.error(err);
      alert("Failed to save content. Please try again.");
    } finally {
      setModalLoading(false);
    }
  };

  // Delete Item
  const handleDelete = async (
    type: "program" | "session" | "article" | "resource" | "social",
    id: string | undefined,
  ) => {
    if (!id) return;
    if (
      !confirm(
        `Are you sure you want to delete this ${type}? This action is permanent.`,
      )
    )
      return;
    try {
      if (type === "program") await dbDeleteProgram(id);
      else if (type === "session") await dbDeleteSession(id);
      else if (type === "article") await dbDeleteArticle(id);
      else if (type === "resource") await dbDeleteResource(id);
      else if (type === "social") await dbDeleteSocialLink(id);
      await loadCMS();
    } catch (e) {
      console.error(e);
      alert("Failed to delete item.");
    }
  };

  // Application Actions
  const handleAppStatus = async (id: string | undefined, status: string) => {
    if (!id) return;
    try {
      await dbUpdateApplicationStatus(id, status);
    } catch (e) {
      console.error(e);
      alert("Failed to update application status.");
    }
  };

  // Contact Actions
  const handleContactToggle = async (id: string | undefined, read: boolean) => {
    if (!id) return;
    try {
      await dbToggleContactRead(id, read);
    } catch (e) {
      console.error(e);
      alert("Failed to update message status.");
    }
  };

  // Sidebar Menu Items
  interface MenuItem {
    id:
      | "applications"
      | "contacts"
      | "programs"
      | "sessions"
      | "research"
      | "resources"
      | "socials";
    label: string;
    Icon: ComponentType<{ className?: string }>;
    count?: number;
  }

  const menuItems: MenuItem[] = [
    {
      id: "applications",
      label: "Applications",
      Icon: Users,
      count: applications.filter((a) => a.status === "pending").length,
    },
    {
      id: "contacts",
      label: "Inquiries",
      Icon: MessageSquare,
      count: contacts.filter((c) => !c.read).length,
    },
    { id: "programs", label: "CMS: Programs", Icon: FolderOpen },
    { id: "sessions", label: "CMS: Sessions", Icon: Calendar },
    { id: "research", label: "CMS: Research", Icon: BookOpen },
    { id: "resources", label: "CMS: Resources", Icon: Wrench },
    { id: "socials", label: "CMS: Social Links", Icon: Share2 },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card/45 backdrop-blur-md flex flex-col justify-between shrink-0 sticky top-0 h-screen">
        <div>
          {/* Logo Section */}
          <div className="p-6 border-b border-border flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <Shield className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display font-semibold text-[15px] leading-tight">
                TechFort <span className="text-primary">Admin</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                Dashboard & CMS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map(({ id, label, Icon, count }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4.5 w-4.5 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
                    {label}
                  </div>
                  {count !== undefined && count > 0 && (
                    <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground shadow-elegant">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-border bg-card/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 font-bold text-xs uppercase">
                {user.email ? user.email[0] : "A"}
              </span>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold truncate text-foreground">
                  {user.email || "Administrator"}
                </div>
                <div className="text-[10px] text-muted-foreground truncate">
                  Admin Session
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto px-8 py-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-display font-bold capitalize">
              {activeTab === "contacts"
                ? "Inquiries"
                : activeTab === "socials"
                  ? "Social Links"
                  : activeTab.replace("cms:", "")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTab === "applications" &&
                "Review and manage applicant submissions for speaker, community, or partner tracks."}
              {activeTab === "contacts" &&
                "Respond to public contact inquiries and messaging streams."}
              {activeTab === "programs" &&
                "Update core initiatives: AI SENSE, DSAPI, Curiosity to Creation etc."}
              {activeTab === "sessions" &&
                "Manage upcoming learning events and past sessions archive."}
              {activeTab === "research" &&
                "Publish and edit policy reports, briefs, and founder logs."}
              {activeTab === "resources" &&
                "Update recommended software tools, slides, books and report files."}
              {activeTab === "socials" &&
                "Manage social platform coordinates, custom links, and layout icons."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {cmsLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            )}
            {[
              "programs",
              "sessions",
              "research",
              "resources",
              "socials",
            ].includes(activeTab) && (
              <button
                onClick={() => {
                  if (activeTab === "programs") openAddModal("program");
                  else if (activeTab === "sessions") openAddModal("session");
                  else if (activeTab === "research") openAddModal("article");
                  else if (activeTab === "resources") openAddModal("resource");
                  else if (activeTab === "socials") openAddModal("social");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
              >
                <Plus className="h-4 w-4" /> Add New
              </button>
            )}
            <button
              onClick={() => {
                if (["applications", "contacts"].includes(activeTab)) {
                  // Realtime listeners sync automatically, but refresh confirms connection
                  window.location.reload();
                } else {
                  loadCMS();
                }
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-card transition-all"
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Content Tabs */}

        {/* 1. APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card/30 border border-border rounded-2xl p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search applicants by name, email, org..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {["all", "pending", "accepted", "rejected", "archived"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                        statusFilter === st
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background hover:bg-card"
                      }`}
                    >
                      {st}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* List */}
            {applications.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <Users className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No applications found
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Pending and reviewed submissions will show up here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications
                  .filter((a) => {
                    const matchQuery =
                      a.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      a.email
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      a.org
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      a.track
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    const matchFilter =
                      statusFilter === "all" || a.status === statusFilter;
                    return matchQuery && matchFilter;
                  })
                  .map((app) => (
                    <article
                      key={app.id}
                      className="rounded-2xl border border-border bg-card/45 p-6 shadow-card hover:border-primary/20 transition-all space-y-4"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-lg font-semibold text-foreground">
                              {app.name}
                            </h3>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                app.status === "accepted"
                                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                  : app.status === "rejected"
                                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                    : app.status === "archived"
                                      ? "bg-muted/20 text-muted-foreground border border-border"
                                      : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {app.email}
                            </span>
                            {app.org && (
                              <span className="flex items-center gap-1">
                                <Building className="h-3 w-3" /> {app.org}
                              </span>
                            )}
                            {app.country && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {app.country}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />{" "}
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Status changing actions */}
                        <div className="flex items-center gap-1.5">
                          {app.status !== "accepted" && (
                            <button
                              onClick={() =>
                                handleAppStatus(app.id, "accepted")
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-green-500 hover:bg-green-500/10 transition-colors"
                              title="Accept Application"
                            >
                              <CheckCircle className="h-4.5 w-4.5" />
                            </button>
                          )}
                          {app.status !== "rejected" && (
                            <button
                              onClick={() =>
                                handleAppStatus(app.id, "rejected")
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Reject Application"
                            >
                              <XCircle className="h-4.5 w-4.5" />
                            </button>
                          )}
                          {app.status !== "archived" && (
                            <button
                              onClick={() =>
                                handleAppStatus(app.id, "archived")
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-card transition-colors"
                              title="Archive Application"
                            >
                              <Archive className="h-4.5 w-4.5" />
                            </button>
                          )}
                          {app.status !== "pending" && (
                            <button
                              onClick={() => handleAppStatus(app.id, "pending")}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-amber-500 hover:bg-amber-500/10 transition-colors"
                              title="Mark Pending"
                            >
                              <RefreshCw className="h-4.5 w-4.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-sm text-foreground/90 space-y-1.5 leading-relaxed">
                        <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                          Selected Track:{" "}
                          <span className="underline font-bold text-foreground capitalize">
                            {app.track}
                          </span>
                        </div>
                        <p className="whitespace-pre-line mt-2">
                          {app.message}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* 2. CONTACT INQUIRIES TAB */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card/30 border border-border rounded-2xl p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search inquiries by name, email, subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {["all", "unread", "read"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                      statusFilter === st
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background hover:bg-card"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {contacts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <MessageSquare className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No inquiries found
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  General and partnership outreach messages will show up here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts
                  .filter((c) => {
                    const matchQuery =
                      c.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      c.email
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      c.subject
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      c.message
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    const isUnread = !c.read;
                    const matchFilter =
                      statusFilter === "all" ||
                      (statusFilter === "unread" && isUnread) ||
                      (statusFilter === "read" && c.read);
                    return matchQuery && matchFilter;
                  })
                  .map((cont) => (
                    <article
                      key={cont.id}
                      className={`rounded-2xl border p-6 shadow-card transition-all space-y-4 ${
                        cont.read
                          ? "border-border bg-card/35 opacity-75"
                          : "border-primary/30 bg-card/60 shadow-elegant"
                      }`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-lg font-semibold text-foreground">
                              {cont.name}
                            </h3>
                            {!cont.read && (
                              <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                                New
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {cont.email}
                            </span>
                            {cont.org && (
                              <span className="flex items-center gap-1">
                                <Building className="h-3 w-3" /> {cont.org}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />{" "}
                              {new Date(cont.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Read/Unread toggles */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              handleContactToggle(cont.id, !cont.read)
                            }
                            className="inline-flex h-9 px-3 items-center justify-center rounded-lg border border-border text-sm font-medium hover:bg-card transition-colors gap-1.5"
                          >
                            {cont.read ? (
                              <>
                                <EyeOff className="h-4 w-4 text-muted-foreground" />{" "}
                                Mark Unread
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 text-primary" /> Mark
                                Read
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-sm text-foreground/90 space-y-1">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Subject:{" "}
                          <span className="text-foreground font-semibold">
                            {cont.subject || "No Subject"}
                          </span>
                        </div>
                        <p className="whitespace-pre-line mt-2 text-foreground">
                          {cont.message}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* 3. PROGRAMS CMS TAB */}
        {activeTab === "programs" && (
          <div className="space-y-6">
            {cmsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <FolderOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No programs configured
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure your first program structure above.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {programs.map((prog) => (
                  <div
                    key={prog.id}
                    className="rounded-2xl border border-border bg-card/45 p-6 shadow-card hover:border-primary/20 transition-all flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div>
                        <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                          {prog.tag || "Initiative"}
                        </span>
                        <h3 className="text-xl font-bold text-foreground mt-2">
                          {prog.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {prog.overview}
                      </p>

                      {prog.impact && (
                        <div className="text-xs text-foreground/90">
                          <span className="font-bold text-primary">
                            Impact:
                          </span>{" "}
                          {prog.impact}
                        </div>
                      )}
                    </div>

                    <div className="flex md:flex-col justify-end items-end gap-2 shrink-0">
                      <button
                        onClick={() => openEditModal("program", prog)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-card transition-all"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete("program", prog.id)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. SESSIONS CMS TAB */}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            {cmsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <Calendar className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No sessions configured
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure your first session schedule above.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="rounded-xl border border-border bg-card/45 p-5 shadow-card hover:border-primary/20 transition-all flex justify-between items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            sess.status === "past"
                              ? "bg-muted text-muted-foreground border border-border"
                              : "bg-primary/10 text-primary border border-primary/20"
                          }`}
                        >
                          {sess.status}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          · {sess.category || "General"}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground text-base mt-1">
                        {sess.title}
                      </h3>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary" /> Date:{" "}
                        {sess.date || "Coming Soon"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditModal("session", sess)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-card transition-all"
                        title="Edit Session"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("session", sess.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all"
                        title="Delete Session"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. RESEARCH ARTICLES CMS TAB */}
        {activeTab === "research" && (
          <div className="space-y-6">
            {cmsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No research articles configured
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Write your first research article post above.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="rounded-2xl border border-border bg-card/45 p-6 shadow-card hover:border-primary/20 transition-all flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                        {art.tag || "Research"}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">
                        {art.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex md:flex-col justify-end items-end gap-2 shrink-0">
                      <button
                        onClick={() => openEditModal("article", art)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-card transition-all"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete("article", art.id)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. RESOURCES CMS TAB */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            {cmsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <Wrench className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No resources configured
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first learning resource above.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((res) => {
                  const iconNameMap: Record<
                    string,
                    ComponentType<{ className?: string }>
                  > = {
                    GraduationCap,
                    BookOpen,
                    Wrench,
                    FileText,
                    Presentation,
                    Library,
                  };
                  const IconComponent =
                    iconNameMap[res.icon || ""] || FolderOpen;

                  return (
                    <div
                      key={res.id}
                      className="rounded-xl border border-border bg-card/45 p-5 shadow-card hover:border-primary/20 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                          <IconComponent className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-bold text-foreground text-base truncate">
                            {res.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-3">
                            {res.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-1.5 mt-5 pt-3 border-t border-border/40">
                        <button
                          onClick={() => openEditModal("resource", res)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-card transition-all"
                          title="Edit Resource"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete("resource", res.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all"
                          title="Delete Resource"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 7. SOCIAL LINKS CMS TAB */}
        {activeTab === "socials" && (
          <div className="space-y-6">
            {cmsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : socialLinks.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                <Share2 className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">
                  No social links configured
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first social media connection above.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {socialLinks.map((link) => {
                  const iconNameMap: Record<
                    string,
                    ComponentType<{ className?: string }>
                  > = {
                    Globe,
                    Linkedin,
                    Twitter,
                    Instagram,
                    Mail,
                    Youtube,
                    Github,
                  };
                  const IconComponent = iconNameMap[link.icon || ""] || Globe;

                  return (
                    <div
                      key={link.id}
                      className="rounded-xl border border-border bg-card/45 p-5 shadow-card hover:border-primary/20 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                            <IconComponent className="h-5 w-5" />
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-2 py-0.5 rounded border border-border">
                            Order: {link.order || 0}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-base truncate">
                            {link.platform}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate leading-relaxed mt-1 font-mono">
                            {link.url}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-1.5 mt-5 pt-3 border-t border-border/40">
                        <button
                          onClick={() => openEditModal("social", link)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-card transition-all"
                          title="Edit Social Link"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete("social", link.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all"
                          title="Delete Social Link"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* POPUP CMS EDITOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl p-6 md:p-8 shadow-elegant space-y-6 animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                {editingItem
                  ? "Edit Content Entry"
                  : "Create New Content Entry"}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                Content Type: {modalType}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {/* PROGRAMS FORM FIELDS */}
              {modalType === "program" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={programForm.title}
                        onChange={(e) =>
                          setProgramForm({
                            ...programForm,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g. AI SENSE"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Tag / Status
                      </label>
                      <input
                        type="text"
                        required
                        value={programForm.tag}
                        onChange={(e) =>
                          setProgramForm({
                            ...programForm,
                            tag: e.target.value,
                          })
                        }
                        placeholder="e.g. Flagship · Active"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Overview / Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={programForm.overview}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          overview: e.target.value,
                        })
                      }
                      placeholder="Brief summary of the program's vision and core goals..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Impact metrics / stats
                    </label>
                    <input
                      type="text"
                      value={programForm.impact}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          impact: e.target.value,
                        })
                      }
                      placeholder="e.g. 300+ students trained"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Goals (comma-separated list)
                      </label>
                      <textarea
                        rows={2}
                        value={programForm.goals}
                        onChange={(e) =>
                          setProgramForm({
                            ...programForm,
                            goals: e.target.value,
                          })
                        }
                        placeholder="e.g. AI literacy, Equal access, Mentorship support"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Outcomes (comma-separated list)
                      </label>
                      <textarea
                        rows={2}
                        value={programForm.outcomes}
                        onChange={(e) =>
                          setProgramForm({
                            ...programForm,
                            outcomes: e.target.value,
                          })
                        }
                        placeholder="e.g. 10 prototypes created, 5 interns hired"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Future Roadmaps
                    </label>
                    <textarea
                      rows={2}
                      value={programForm.future}
                      onChange={(e) =>
                        setProgramForm({
                          ...programForm,
                          future: e.target.value,
                        })
                      }
                      placeholder="Future scaling plans and next milestones..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              {/* SESSIONS FORM FIELDS */}
              {modalType === "session" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={sessionForm.title}
                      onChange={(e) =>
                        setSessionForm({
                          ...sessionForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. AI Governance in Africa"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Date Text
                      </label>
                      <input
                        type="text"
                        required
                        value={sessionForm.date}
                        onChange={(e) =>
                          setSessionForm({
                            ...sessionForm,
                            date: e.target.value,
                          })
                        }
                        placeholder="e.g. Coming Soon or May 25, 2026"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Category / Initiative Name
                      </label>
                      <input
                        type="text"
                        required
                        value={sessionForm.category}
                        onChange={(e) =>
                          setSessionForm({
                            ...sessionForm,
                            category: e.target.value,
                          })
                        }
                        placeholder="e.g. DSAPI or AI SENSE"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </label>
                    <select
                      value={sessionForm.status}
                      onChange={(e) =>
                        setSessionForm({
                          ...sessionForm,
                          status: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="upcoming">Upcoming (Calendar list)</option>
                      <option value="past">Past Session (Archive list)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* RESEARCH ARTICLES FORM FIELDS */}
              {modalType === "article" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) =>
                          setArticleForm({
                            ...articleForm,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g. Inclusion as a Design Principle"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Category / Tag
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.tag}
                        onChange={(e) =>
                          setArticleForm({
                            ...articleForm,
                            tag: e.target.value,
                          })
                        }
                        placeholder="e.g. AI Governance"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Excerpt / Summary Paragraph
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={articleForm.excerpt}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          excerpt: e.target.value,
                        })
                      }
                      placeholder="What is the key perspective or takeaway of this article..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              {/* RESOURCES FORM FIELDS */}
              {modalType === "resource" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Resource Title
                    </label>
                    <input
                      type="text"
                      required
                      value={resourceForm.title}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Reading Lists"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={resourceForm.desc}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          desc: e.target.value,
                        })
                      }
                      placeholder="Description of links, documents, or content offered..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Lucide Display Icon
                    </label>
                    <select
                      value={resourceForm.icon}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          icon: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="GraduationCap">
                        Graduation Cap (Learning)
                      </option>
                      <option value="BookOpen">Open Book (Readings)</option>
                      <option value="Wrench">Wrench (Tools)</option>
                      <option value="FileText">File/Paper (Reports)</option>
                      <option value="Presentation">
                        Presentation (Slides)
                      </option>
                      <option value="Library">Library (Resources)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* SOCIAL LINKS FORM FIELDS */}
              {modalType === "social" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      required
                      value={socialForm.platform}
                      onChange={(e) =>
                        setSocialForm({
                          ...socialForm,
                          platform: e.target.value,
                        })
                      }
                      placeholder="e.g. Twitter, LinkedIn, Youtube, Github"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      URL / Link Address
                    </label>
                    <input
                      type="text"
                      required
                      value={socialForm.url}
                      onChange={(e) =>
                        setSocialForm({
                          ...socialForm,
                          url: e.target.value,
                        })
                      }
                      placeholder="e.g. https://twitter.com/techfort_fnd or mailto:info@..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Lucide Display Icon
                    </label>
                    <select
                      value={socialForm.icon}
                      onChange={(e) =>
                        setSocialForm({
                          ...socialForm,
                          icon: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="Globe">Globe (Website)</option>
                      <option value="Linkedin">Linkedin</option>
                      <option value="Twitter">Twitter / X</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Mail">Mail / Envelope</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Github">Github</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  disabled={modalLoading}
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all disabled:opacity-55"
                >
                  {modalLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {modalLoading ? "Saving..." : "Save Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
