import {
  createClient,
  SupabaseClient,
  User as SupabaseUser,
} from "@supabase/supabase-js";

// Models
export interface Application {
  id?: string;
  name: string;
  email: string;
  country: string;
  org: string;
  track: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  org: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Program {
  id?: string;
  tag: string;
  title: string;
  overview: string;
  goals: string[];
  impact: string;
  outcomes: string[];
  future: string;
  order?: number;
}

export interface Session {
  id?: string;
  title: string;
  date: string;
  category: string;
  status: string;
  order?: number;
  theme?: string;
}

export interface Article {
  id?: string;
  tag: string;
  title: string;
  excerpt: string;
  order?: number;
}

export interface Resource {
  id?: string;
  courseTitle: string;
  pdfUrl: string;
  resourceId: string;
  order?: number;
}

export interface Partner {
  id?: string;
  name: string;
  logoUrl: string;
  order?: number;
}

export interface Speaker {
  id?: string;
  name: string;
  pictureUrl: string;
  shortBio: string;
  date: string;
  theme: string;
  type: "upcoming" | "past";
  order?: number;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  specialization: string;
  pictureUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  order?: number;
}

export interface SiteSettings {
  id?: string;
  aboutHeroUrl: string;
  logoUrl?: string;
  heroBgUrl?: string;
}

export interface GalleryImage {
  id?: string;
  url: string;
  caption?: string;
  order?: number;
}

export interface SocialLink {
  id?: string;
  platform: string;
  url: string;
  icon: string;
  order?: number;
}

export interface AdminUser {
  email: string | null;
  uid: string;
  displayName?: string | null;
}

// Supabase Config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we have valid Supabase config variables (not placeholder or empty)
const hasSupabaseConfig =
  supabaseUrl &&
  supabaseUrl !== "" &&
  !supabaseUrl.includes("PLACEHOLDER") &&
  supabaseAnonKey &&
  supabaseAnonKey !== "" &&
  !supabaseAnonKey.includes("PLACEHOLDER");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabase: SupabaseClient<any> | undefined;

if (hasSupabaseConfig) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase = createClient<any>(supabaseUrl!, supabaseAnonKey!);
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
  }
}

export const isMockMode = (): boolean => !hasSupabaseConfig || !supabase;

// ----------------------------------------------------------------------
// LOCAL STORAGE MOCK PROVIDER (for previewing without Supabase API Keys)
// ----------------------------------------------------------------------
const getMockData = <T>(key: string, defaultVal: T): T => {
  if (typeof window === "undefined") return defaultVal;
  const data = localStorage.getItem(`tf_mock_${key}`);
  if (!data) {
    localStorage.setItem(`tf_mock_${key}`, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(data) as T;
};

const setMockData = (key: string, data: unknown): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`tf_mock_${key}`, JSON.stringify(data));
  window.dispatchEvent(new Event("tf_mock_storage_change"));
};

// Initial hardcoded mock templates to ensure the site is pre-populated
const defaultPrograms: Program[] = [
  {
    id: "prog-1",
    tag: "Flagship · Active",
    title: "AI SENSE",
    overview:
      "An AI literacy initiative bringing foundational AI awareness and digital understanding to young people across underserved communities.",
    goals: [
      "Foundational AI literacy",
      "Inclusive access",
      "Community-rooted delivery",
    ],
    impact: "300+ young people impacted across multiple cohorts.",
    outcomes: [
      "Increased AI awareness",
      "Pathways into deeper learning",
      "Active alumni network",
    ],
    future:
      "Scale AI SENSE across additional Nigerian states and West African communities.",
    order: 1,
  },
  {
    id: "prog-2",
    tag: "Partnership · Active",
    title: "From Curiosity to Creation",
    overview:
      "A practical AI and emerging technology program in partnership with Window on America Dutse under American Spaces Nigeria.",
    goals: [
      "Practical AI exposure",
      "Emerging tech experimentation",
      "Youth-led creation",
    ],
    impact: "150+ participants trained in hands-on AI & emerging technology.",
    outcomes: [
      "Working prototypes",
      "Mentor-led learning",
      "Strong cohort identity",
    ],
    future: "Expand into multi-track cohorts spanning AI, robotics and drones.",
    order: 2,
  },
  {
    id: "prog-3",
    tag: "Policy · Active",
    title: "DSAPI — Digital Society & AI Policy Initiative",
    overview:
      "A continental policy initiative focused on AI governance, digital ethics and responsible technology adoption.",
    goals: [
      "Africa-centered AI governance",
      "Digital ethics literacy",
      "Policy convening",
    ],
    impact: "Convenes researchers, policy voices and community leaders.",
    outcomes: [
      "Policy briefs",
      "Public conversations",
      "Research collaborations",
    ],
    future:
      "Publish a recurring DSAPI policy series and convene cross-border dialogues.",
    order: 3,
  },
];

const defaultSessions: Session[] = [
  {
    id: "sess-1",
    title: "AI Governance in Africa: From Policy to Practice",
    date: "Coming Soon",
    category: "DSAPI",
    status: "upcoming",
    order: 1,
  },
  {
    id: "sess-2",
    title: "Emerging Technologies & African Youth",
    date: "Coming Soon",
    category: "From Curiosity to Creation",
    status: "upcoming",
    order: 2,
  },
  {
    id: "sess-3",
    title: "Foundations of AI Literacy",
    date: "Coming Soon",
    category: "AI SENSE",
    status: "upcoming",
    order: 3,
  },
  {
    id: "sess-4",
    title: "Why AI Literacy Matters for Africa",
    date: "Past Session",
    category: "AI SENSE",
    status: "past",
    order: 4,
  },
  {
    id: "sess-5",
    title: "Practical AI: A Hands-on Cohort Reflection",
    date: "Past Session",
    category: "From Curiosity to Creation",
    status: "past",
    order: 5,
  },
];

const defaultArticles: Article[] = [
  {
    id: "art-1",
    tag: "AI Governance",
    title: "Why African AI Policy Must Be African-Led",
    excerpt:
      "A perspective on building AI governance frameworks that reflect African realities, communities and aspirations.",
    order: 1,
  },
  {
    id: "art-2",
    tag: "Digital Ethics",
    title: "Inclusion as a Design Principle for African AI",
    excerpt:
      "What it means to build technology that genuinely serves underserved communities — beyond access alone.",
    order: 2,
  },
  {
    id: "art-3",
    tag: "Founder Writing",
    title: "Building TechFort: An Institutional Approach to Youth Tech",
    excerpt:
      "Reflections on building a youth-driven African technology initiative with long-term institutional ambition.",
    order: 3,
  },
];

const defaultResources: Resource[] = [
  {
    id: "res-1",
    courseTitle: "Introduction to AI Governance",
    resourceId: "RES-AI-101",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    order: 1,
  },
  {
    id: "res-2",
    courseTitle: "Digital Ethics in African Tech",
    resourceId: "RES-ETHICS-202",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    order: 2,
  },
  {
    id: "res-3",
    courseTitle: "TechFort Recommended Tools Guide",
    resourceId: "RES-TOOLS-303",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    order: 3,
  },
];

const defaultPartners: Partner[] = [
  {
    id: "part-1",
    name: "Acme Corp",
    logoUrl: "https://via.placeholder.com/150",
    order: 1,
  },
  {
    id: "part-2",
    name: "Global Tech",
    logoUrl: "https://via.placeholder.com/150",
    order: 2,
  },
];

const defaultGalleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000",
    caption: "AI literacy program graduation ceremony",
    order: 1,
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
    caption: "Hands-on robotics prototyping workshop",
    order: 2,
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000",
    caption: "Collaborative learning and group discussion",
    order: 3,
  },
];

const defaultSpeakers: Speaker[] = [
  {
    id: "spk-1",
    name: "Jane Doe",
    pictureUrl: "https://via.placeholder.com/150",
    shortBio: "AI Policy Expert.",
    date: "2024-05-10",
    theme: "AI Governance",
    type: "upcoming",
    order: 1,
  },
  {
    id: "spk-2",
    name: "John Smith",
    pictureUrl: "https://via.placeholder.com/150",
    shortBio: "Data Scientist at Tech",
    date: "2023-10-15",
    theme: "Data Privacy",
    type: "past",
    order: 2,
  },
];

const defaultTeamMembers: TeamMember[] = Array.from({ length: 8 }).map(
  (_, i) => ({
    id: `team-${i + 1}`,
    name: `Team Member ${i + 1}`,
    role: "Software Engineer",
    specialization: "Frontend & UI/UX",
    pictureUrl: "https://via.placeholder.com/150",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    order: i + 1,
  }),
);

const defaultSiteSettings: SiteSettings = {
  id: "global",
  aboutHeroUrl:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
  logoUrl: "",
  heroBgUrl: "",
};

const defaultSocialLinks: SocialLink[] = [
  {
    id: "soc-1",
    platform: "Website",
    url: "https://techfortfoundation.org",
    icon: "Globe",
    order: 1,
  },
  {
    id: "soc-2",
    platform: "LinkedIn",
    url: "https://linkedin.com/company/techfort-foundation",
    icon: "Linkedin",
    order: 2,
  },
  {
    id: "soc-3",
    platform: "Twitter",
    url: "https://twitter.com/techfort_fnd",
    icon: "Twitter",
    order: 3,
  },
  {
    id: "soc-4",
    platform: "Instagram",
    url: "https://instagram.com/techfort_fnd",
    icon: "Instagram",
    order: 4,
  },
  {
    id: "soc-5",
    platform: "Email",
    url: "mailto:info@techfortfoundation.org",
    icon: "Mail",
    order: 5,
  },
];

interface ResourceRow {
  id: string;
  course_title?: string;
  pdf_url?: string;
  resource_id?: string;
  order?: number;
}

interface PartnerRow {
  id: string;
  name?: string;
  logo_url?: string;
  order?: number;
}

interface GalleryImageRow {
  id: string;
  url?: string;
  caption?: string;
  order?: number;
}

interface SpeakerRow {
  id: string;
  name?: string;
  picture_url?: string;
  short_bio?: string;
  date?: string;
  theme?: string;
  type?: "upcoming" | "past";
  order?: number;
}

interface TeamMemberRow {
  id: string;
  name?: string;
  role?: string;
  specialization?: string;
  picture_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  order?: number;
}

interface SiteSettingsRow {
  id: string;
  about_hero_url?: string;
  logo_url?: string;
  hero_bg_url?: string;
}

interface ApplicationRow {
  id: string;
  name?: string;
  email?: string;
  country?: string;
  org?: string;
  track?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

interface ContactRow {
  id: string;
  name?: string;
  email?: string;
  org?: string;
  subject?: string;
  message?: string;
  read?: boolean;
  created_at?: string;
}

// Helper to convert DB rows to front-end types
const mapResourceRow = (row: ResourceRow): Resource => ({
  id: row.id,
  courseTitle: row.course_title || "",
  pdfUrl: row.pdf_url || "",
  resourceId: row.resource_id || "",
  order: row.order || 0,
});

const mapPartnerRow = (row: PartnerRow): Partner => ({
  id: row.id,
  name: row.name || "",
  logoUrl: row.logo_url || "",
  order: row.order || 0,
});

const mapGalleryImageRow = (row: GalleryImageRow): GalleryImage => ({
  id: row.id,
  url: row.url || "",
  caption: row.caption || "",
  order: row.order || 0,
});

const mapSpeakerRow = (row: SpeakerRow): Speaker => ({
  id: row.id,
  name: row.name || "",
  pictureUrl: row.picture_url || "",
  shortBio: row.short_bio || "",
  date: row.date || "",
  theme: row.theme || "",
  type: row.type || "upcoming",
  order: row.order || 0,
});

const mapTeamMemberRow = (row: TeamMemberRow): TeamMember => ({
  id: row.id,
  name: row.name || "",
  role: row.role || "",
  specialization: row.specialization || "",
  pictureUrl: row.picture_url || "",
  linkedinUrl: row.linkedin_url || "",
  twitterUrl: row.twitter_url || "",
  order: row.order || 0,
});

const mapSiteSettingsRow = (row: SiteSettingsRow): SiteSettings => ({
  id: row.id,
  aboutHeroUrl: row.about_hero_url || "",
  logoUrl: row.logo_url || "",
  heroBgUrl: row.hero_bg_url || "",
});

const mapApplicationRow = (row: ApplicationRow): Application => ({
  id: row.id,
  name: row.name || "",
  email: row.email || "",
  country: row.country || "",
  org: row.org || "",
  track: row.track || "",
  message: row.message || "",
  status: row.status || "pending",
  createdAt: row.created_at || new Date().toISOString(),
});

const mapContactRow = (row: ContactRow): Contact => ({
  id: row.id,
  name: row.name || "",
  email: row.email || "",
  org: row.org || "",
  subject: row.subject || "",
  message: row.message || "",
  read: !!row.read,
  createdAt: row.created_at || new Date().toISOString(),
});

// ----------------------------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------------------------
export const dbLogin = async (
  email: string,
  password: string,
): Promise<SupabaseUser | AdminUser> => {
  if (isMockMode()) {
    if (email === "admin@techfort.org" && password === "admin123") {
      const mockUser: AdminUser = {
        email,
        uid: "mock-admin-uid",
        displayName: "TechFort Admin",
      };
      localStorage.setItem("tf_mock_user", JSON.stringify(mockUser));
      window.dispatchEvent(new Event("tf_mock_auth_change"));
      return mockUser;
    }
    throw new Error("Invalid credentials. Try admin@techfort.org / admin123");
  }
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!data.user) throw new Error("Authentication failed");
  return data.user;
};

export const dbLogout = async (): Promise<void> => {
  if (isMockMode()) {
    localStorage.removeItem("tf_mock_user");
    window.dispatchEvent(new Event("tf_mock_auth_change"));
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const dbOnAuthStateChanged = (
  callback: (user: AdminUser | SupabaseUser | null) => void,
): (() => void) => {
  if (isMockMode()) {
    const checkUser = () => {
      const stored = localStorage.getItem("tf_mock_user");
      callback(stored ? (JSON.parse(stored) as AdminUser) : null);
    };
    checkUser();
    window.addEventListener("tf_mock_auth_change", checkUser);
    return () => window.removeEventListener("tf_mock_auth_change", checkUser);
  }
  if (!supabase) {
    callback(null);
    return () => {};
  }

  // Get current active session
  supabase.auth.getSession().then(({ data: { session } }) => {
    callback(session?.user ?? null);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
};

// ----------------------------------------------------------------------
// FORM SUBMISSIONS
// ----------------------------------------------------------------------
export const dbSubmitApplication = async (data: {
  name: string;
  email: string;
  country: string;
  org: string;
  track: string;
  message: string;
}): Promise<void> => {
  const application = {
    ...data,
    status: "pending",
  };

  if (isMockMode()) {
    const currentList = getMockData<Application[]>("applications", []);
    setMockData("applications", [
      {
        id: `app-${Date.now()}`,
        ...application,
        createdAt: new Date().toISOString(),
      },
      ...currentList,
    ]);
    return;
  }

  if (!supabase) return;
  const { error } = await supabase.from("applications").insert([application]);
  if (error) throw error;
};

export const dbSubmitContact = async (data: {
  name: string;
  email: string;
  org: string;
  subject: string;
  message: string;
}): Promise<void> => {
  const contact = {
    ...data,
    read: false,
  };

  if (isMockMode()) {
    const currentList = getMockData<Contact[]>("contacts", []);
    setMockData("contacts", [
      {
        id: `cont-${Date.now()}`,
        ...contact,
        createdAt: new Date().toISOString(),
      },
      ...currentList,
    ]);
    return;
  }

  if (!supabase) return;
  const { error } = await supabase.from("contacts").insert([contact]);
  if (error) throw error;
};

// ----------------------------------------------------------------------
// REAL-TIME DASHBOARD LISTENERS
// ----------------------------------------------------------------------
export const dbListenApplications = (
  callback: (apps: Application[]) => void,
): (() => void) => {
  if (isMockMode()) {
    const load = () => callback(getMockData<Application[]>("applications", []));
    load();
    window.addEventListener("tf_mock_storage_change", load);
    return () => window.removeEventListener("tf_mock_storage_change", load);
  }

  if (!supabase) {
    callback([]);
    return () => {};
  }

  const fetchApps = async () => {
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      callback(data.map(mapApplicationRow));
    }
  };

  fetchApps();

  // Listen to postgres changes on applications table
  const channel = supabase
    .channel("realtime-applications")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "applications" },
      () => {
        fetchApps();
      },
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(channel);
  };
};

export const dbUpdateApplicationStatus = async (
  id: string,
  status: string,
): Promise<void> => {
  if (isMockMode()) {
    const apps = getMockData<Application[]>("applications", []);
    const updated = apps.map((a) => (a.id === id ? { ...a, status } : a));
    setMockData("applications", updated);
    return;
  }
  if (!supabase) return;
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
};

export const dbListenContacts = (
  callback: (contacts: Contact[]) => void,
): (() => void) => {
  if (isMockMode()) {
    const load = () => callback(getMockData<Contact[]>("contacts", []));
    load();
    window.addEventListener("tf_mock_storage_change", load);
    return () => window.removeEventListener("tf_mock_storage_change", load);
  }

  if (!supabase) {
    callback([]);
    return () => {};
  }

  const fetchContacts = async () => {
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      callback(data.map(mapContactRow));
    }
  };

  fetchContacts();

  const channel = supabase
    .channel("realtime-contacts")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "contacts" },
      () => {
        fetchContacts();
      },
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(channel);
  };
};

export const dbToggleContactRead = async (
  id: string,
  read: boolean,
): Promise<void> => {
  if (isMockMode()) {
    const contactsList = getMockData<Contact[]>("contacts", []);
    const updated = contactsList.map((c) => (c.id === id ? { ...c, read } : c));
    setMockData("contacts", updated);
    return;
  }
  if (!supabase) return;
  const { error } = await supabase
    .from("contacts")
    .update({ read })
    .eq("id", id);
  if (error) throw error;
};

// ----------------------------------------------------------------------
// CMS CRUD API
// ----------------------------------------------------------------------

// PROGRAMS
export const dbGetPrograms = async (): Promise<Program[]> => {
  if (isMockMode()) {
    return getMockData<Program[]>("programs", defaultPrograms);
  }
  if (!supabase) return defaultPrograms;
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as Program[];
  } catch (e) {
    console.error("Error dbGetPrograms:", e);
    return defaultPrograms;
  }
};

export const dbSaveProgram = async (
  program: Partial<Program>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Program[]>("programs", defaultPrograms);
    if (program.id) {
      const updated = list.map((p) =>
        p.id === program.id ? ({ ...p, ...program } as Program) : p,
      );
      setMockData("programs", updated);
    } else {
      const newProg: Program = {
        tag: program.tag || "",
        title: program.title || "",
        overview: program.overview || "",
        goals: program.goals || [],
        impact: program.impact || "",
        outcomes: program.outcomes || [],
        future: program.future || "",
        id: `prog-${Date.now()}`,
        order: list.length + 1,
      };
      setMockData("programs", [...list, newProg]);
    }
    return;
  }

  if (!supabase) return;
  if (program.id) {
    const { id, ...data } = program;
    const { error } = await supabase.from("programs").update(data).eq("id", id);
    if (error) throw error;
  } else {
    const list = await dbGetPrograms();
    const { error } = await supabase.from("programs").insert({
      ...program,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteProgram = async (id: string): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Program[]>("programs", defaultPrograms);
    setMockData(
      "programs",
      list.filter((p) => p.id !== id),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) throw error;
};

// SESSIONS
export const dbGetSessions = async (): Promise<Session[]> => {
  if (isMockMode()) {
    return getMockData<Session[]>("sessions", defaultSessions);
  }
  if (!supabase) return defaultSessions;
  try {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as Session[];
  } catch (e) {
    console.error("Error dbGetSessions:", e);
    return defaultSessions;
  }
};

export const dbSaveSession = async (
  session: Partial<Session>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Session[]>("sessions", defaultSessions);
    if (session.id) {
      const updated = list.map((s) =>
        s.id === session.id ? ({ ...s, ...session } as Session) : s,
      );
      setMockData("sessions", updated);
    } else {
      const newSess: Session = {
        title: session.title || "",
        date: session.date || "",
        category: session.category || "",
        status: session.status || "upcoming",
        id: `sess-${Date.now()}`,
        order: list.length + 1,
      };
      setMockData("sessions", [...list, newSess]);
    }
    return;
  }

  if (!supabase) return;
  if (session.id) {
    const { id, ...data } = session;
    const { error } = await supabase.from("sessions").update(data).eq("id", id);
    if (error) throw error;
  } else {
    const list = await dbGetSessions();
    const { error } = await supabase.from("sessions").insert({
      ...session,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteSession = async (id: string): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Session[]>("sessions", defaultSessions);
    setMockData(
      "sessions",
      list.filter((s) => s.id !== id),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("sessions").delete().eq("id", id);
  if (error) throw error;
};

// ARTICLES
export const dbGetArticles = async (): Promise<Article[]> => {
  if (isMockMode()) {
    return getMockData<Article[]>("articles", defaultArticles);
  }
  if (!supabase) return defaultArticles;
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as Article[];
  } catch (e) {
    console.error("Error dbGetArticles:", e);
    return defaultArticles;
  }
};

export const dbSaveArticle = async (
  article: Partial<Article>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Article[]>("articles", defaultArticles);
    if (article.id) {
      const updated = list.map((a) =>
        a.id === article.id ? ({ ...a, ...article } as Article) : a,
      );
      setMockData("articles", updated);
    } else {
      const newArt: Article = {
        tag: article.tag || "",
        title: article.title || "",
        excerpt: article.excerpt || "",
        id: `art-${Date.now()}`,
        order: list.length + 1,
      };
      setMockData("articles", [...list, newArt]);
    }
    return;
  }

  if (!supabase) return;
  if (article.id) {
    const { id, ...data } = article;
    const { error } = await supabase.from("articles").update(data).eq("id", id);
    if (error) throw error;
  } else {
    const list = await dbGetArticles();
    const { error } = await supabase.from("articles").insert({
      ...article,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteArticle = async (id: string): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Article[]>("articles", defaultArticles);
    setMockData(
      "articles",
      list.filter((a) => a.id !== id),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
};

// RESOURCES
export const dbGetResources = async (): Promise<Resource[]> => {
  if (isMockMode()) {
    return getMockData<Resource[]>("resources", defaultResources);
  }
  if (!supabase) return defaultResources;
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapResourceRow);
  } catch (e) {
    console.error("Error dbGetResources:", e);
    return defaultResources;
  }
};

export const dbSaveResource = async (
  resource: Partial<Resource>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Resource[]>("resources", defaultResources);
    if (resource.id) {
      const updated = list.map((r) =>
        r.id === resource.id ? ({ ...r, ...resource } as Resource) : r,
      );
      setMockData("resources", updated);
    } else {
      const newRes: Resource = {
        courseTitle: resource.courseTitle || "",
        resourceId: resource.resourceId || "",
        pdfUrl: resource.pdfUrl || "",
        id: `res-${Date.now()}`,
        order: list.length + 1,
      };
      setMockData("resources", [...list, newRes]);
    }
    return;
  }

  if (!supabase) return;
  const dbData = {
    course_title: resource.courseTitle,
    resource_id: resource.resourceId,
    pdf_url: resource.pdfUrl,
    order: resource.order,
  };

  if (resource.id) {
    const { error } = await supabase
      .from("resources")
      .update(dbData)
      .eq("id", resource.id);
    if (error) throw error;
  } else {
    const list = await dbGetResources();
    const { error } = await supabase.from("resources").insert({
      ...dbData,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteResource = async (id: string): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Resource[]>("resources", defaultResources);
    setMockData(
      "resources",
      list.filter((r) => r.id !== id),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
};

// SOCIAL LINKS
export const dbGetSocialLinks = async (): Promise<SocialLink[]> => {
  if (isMockMode()) {
    return getMockData<SocialLink[]>("socialLinks", defaultSocialLinks);
  }
  if (!supabase) return defaultSocialLinks;
  try {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as SocialLink[];
  } catch (e) {
    console.error("Error dbGetSocialLinks:", e);
    return defaultSocialLinks;
  }
};

export const dbSaveSocialLink = async (
  link: Partial<SocialLink>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<SocialLink[]>("socialLinks", defaultSocialLinks);
    if (link.id) {
      const updated = list.map((s) =>
        s.id === link.id ? ({ ...s, ...link } as SocialLink) : s,
      );
      setMockData("socialLinks", updated);
    } else {
      const newLink: SocialLink = {
        platform: link.platform || "",
        url: link.url || "",
        icon: link.icon || "Globe",
        id: `soc-${Date.now()}`,
        order: list.length + 1,
      };
      setMockData("socialLinks", [...list, newLink]);
    }
    return;
  }

  if (!supabase) return;
  if (link.id) {
    const { id, ...data } = link;
    const { error } = await supabase
      .from("social_links")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const list = await dbGetSocialLinks();
    const { error } = await supabase.from("social_links").insert({
      ...link,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteSocialLink = async (id: string): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<SocialLink[]>("socialLinks", defaultSocialLinks);
    setMockData(
      "socialLinks",
      list.filter((s) => s.id !== id),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw error;
};

// PARTNERS
export const dbGetPartners = async (): Promise<Partner[]> => {
  if (isMockMode()) {
    return getMockData<Partner[]>("partners", defaultPartners);
  }
  if (!supabase) return defaultPartners;
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapPartnerRow);
  } catch (e) {
    console.error("Error dbGetPartners:", e);
    return defaultPartners;
  }
};

export const dbSavePartner = async (
  partner: Partial<Partner>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Partner[]>("partners", defaultPartners);
    if (partner.id) {
      setMockData(
        "partners",
        list.map((p) =>
          p.id === partner.id ? ({ ...p, ...partner } as Partner) : p,
        ),
      );
    } else {
      setMockData("partners", [
        ...list,
        {
          name: partner.name || "",
          logoUrl: partner.logoUrl || "",
          id: `part-${Date.now()}`,
          order: list.length + 1,
        },
      ]);
    }
    return;
  }

  if (!supabase) return;
  const dbData = {
    name: partner.name,
    logo_url: partner.logoUrl,
    order: partner.order,
  };

  if (partner.id) {
    const { error } = await supabase
      .from("partners")
      .update(dbData)
      .eq("id", partner.id);
    if (error) throw error;
  } else {
    const list = await dbGetPartners();
    const { error } = await supabase.from("partners").insert({
      ...dbData,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeletePartner = async (id: string): Promise<void> => {
  if (isMockMode()) {
    setMockData(
      "partners",
      getMockData<Partner[]>("partners", defaultPartners).filter(
        (p) => p.id !== id,
      ),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) throw error;
};

// SPEAKERS
export const dbGetSpeakers = async (): Promise<Speaker[]> => {
  if (isMockMode()) {
    return getMockData<Speaker[]>("speakers", defaultSpeakers);
  }
  if (!supabase) return defaultSpeakers;
  try {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapSpeakerRow);
  } catch (e) {
    console.error("Error dbGetSpeakers:", e);
    return defaultSpeakers;
  }
};

export const dbSaveSpeaker = async (
  speaker: Partial<Speaker>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<Speaker[]>("speakers", defaultSpeakers);
    if (speaker.id) {
      setMockData(
        "speakers",
        list.map((s) =>
          s.id === speaker.id ? ({ ...s, ...speaker } as Speaker) : s,
        ),
      );
    } else {
      setMockData("speakers", [
        ...list,
        {
          ...speaker,
          id: `spk-${Date.now()}`,
          order: list.length + 1,
        } as Speaker,
      ]);
    }
    return;
  }

  if (!supabase) return;
  const dbData = {
    name: speaker.name,
    picture_url: speaker.pictureUrl,
    short_bio: speaker.shortBio,
    date: speaker.date,
    theme: speaker.theme,
    type: speaker.type,
    order: speaker.order,
  };

  if (speaker.id) {
    const { error } = await supabase
      .from("speakers")
      .update(dbData)
      .eq("id", speaker.id);
    if (error) throw error;
  } else {
    const list = await dbGetSpeakers();
    const { error } = await supabase.from("speakers").insert({
      ...dbData,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteSpeaker = async (id: string): Promise<void> => {
  if (isMockMode()) {
    setMockData(
      "speakers",
      getMockData<Speaker[]>("speakers", defaultSpeakers).filter(
        (s) => s.id !== id,
      ),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("speakers").delete().eq("id", id);
  if (error) throw error;
};

// TEAM MEMBERS
export const dbGetTeamMembers = async (): Promise<TeamMember[]> => {
  if (isMockMode()) {
    return getMockData<TeamMember[]>("teamMembers", defaultTeamMembers);
  }
  if (!supabase) return defaultTeamMembers;
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapTeamMemberRow);
  } catch (e) {
    console.error("Error dbGetTeamMembers:", e);
    return defaultTeamMembers;
  }
};

export const dbSaveTeamMember = async (
  team: Partial<TeamMember>,
): Promise<void> => {
  if (isMockMode()) {
    const list = getMockData<TeamMember[]>("teamMembers", defaultTeamMembers);
    if (team.id) {
      setMockData(
        "teamMembers",
        list.map((t) =>
          t.id === team.id ? ({ ...t, ...team } as TeamMember) : t,
        ),
      );
    } else {
      setMockData("teamMembers", [
        ...list,
        {
          ...team,
          id: `team-${Date.now()}`,
          order: list.length + 1,
        } as TeamMember,
      ]);
    }
    return;
  }

  if (!supabase) return;
  const dbData = {
    name: team.name,
    role: team.role,
    specialization: team.specialization,
    picture_url: team.pictureUrl,
    linkedin_url: team.linkedinUrl,
    twitter_url: team.twitterUrl,
    order: team.order,
  };

  if (team.id) {
    const { error } = await supabase
      .from("team_members")
      .update(dbData)
      .eq("id", team.id);
    if (error) throw error;
  } else {
    const list = await dbGetTeamMembers();
    const { error } = await supabase.from("team_members").insert({
      ...dbData,
      order: list.length + 1,
    });
    if (error) throw error;
  }
};

export const dbDeleteTeamMember = async (id: string): Promise<void> => {
  if (isMockMode()) {
    setMockData(
      "teamMembers",
      getMockData<TeamMember[]>("teamMembers", defaultTeamMembers).filter(
        (t) => t.id !== id,
      ),
    );
    return;
  }
  if (!supabase) return;
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
};

// SITE SETTINGS
export const dbGetSiteSettings = async (): Promise<SiteSettings> => {
  if (isMockMode()) {
    return getMockData<SiteSettings>("siteSettings", defaultSiteSettings);
  }
  if (!supabase) return defaultSiteSettings;
  try {
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error) throw error;
    if (!data || data.length === 0) return defaultSiteSettings;
    return mapSiteSettingsRow(data[0]);
  } catch (e) {
    console.error("Error dbGetSiteSettings:", e);
    return defaultSiteSettings;
  }
};

export const dbSaveSiteSettings = async (
  settings: Partial<SiteSettings>,
): Promise<void> => {
  if (isMockMode()) {
    const current = getMockData<SiteSettings>(
      "siteSettings",
      defaultSiteSettings,
    );
    setMockData("siteSettings", { ...current, ...settings });
    return;
  }
  const saveMock = () => {
    const current = getMockData<SiteSettings>(
      "siteSettings",
      defaultSiteSettings,
    );
    setMockData("siteSettings", { ...current, ...settings });
  };

  if (isMockMode()) {
    saveMock();
    return;
  }
  if (!supabase) return;
  try {
    const current = await dbGetSiteSettings();
    const dbData = {
      about_hero_url:
        settings.aboutHeroUrl !== undefined
          ? settings.aboutHeroUrl
          : current.aboutHeroUrl,
      logo_url:
        settings.logoUrl !== undefined
          ? settings.logoUrl
          : current.logoUrl || null,
      hero_bg_url:
        settings.heroBgUrl !== undefined
          ? settings.heroBgUrl
          : current.heroBgUrl || null,
    };

    const id = current.id || "global";
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id, ...dbData });
    if (error) throw error;
  } catch (e) {
    console.warn("dbSaveSiteSettings failed, falling back to mock storage:", e);
    saveMock();
  }
};

// UPLOAD FILE
export const dbUploadFile = async (
  file: File,
  path: string,
): Promise<string> => {
  if (isMockMode()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  }
  if (!supabase) throw new Error("Supabase client not initialized");

  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `${path}/${fileName}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);
  return data.publicUrl;
};

// GALLERY IMAGES
export const dbGetGalleryImages = async (): Promise<GalleryImage[]> => {
  if (isMockMode()) {
    return getMockData<GalleryImage[]>("galleryImages", defaultGalleryImages);
  }
  if (!supabase) return defaultGalleryImages;
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapGalleryImageRow);
  } catch (e) {
    console.warn("dbGetGalleryImages failed, falling back to mock storage:", e);
    return getMockData<GalleryImage[]>("galleryImages", defaultGalleryImages);
  }
};

export const dbSaveGalleryImage = async (
  image: Partial<GalleryImage>,
): Promise<void> => {
  const saveMock = () => {
    const list = getMockData<GalleryImage[]>(
      "galleryImages",
      defaultGalleryImages,
    );
    if (image.id) {
      setMockData(
        "galleryImages",
        list.map((item) =>
          item.id === image.id ? ({ ...item, ...image } as GalleryImage) : item,
        ),
      );
    } else {
      setMockData("galleryImages", [
        ...list,
        {
          url: image.url || "",
          caption: image.caption || "",
          id: `gal-${Date.now()}`,
          order: list.length + 1,
        },
      ]);
    }
  };

  if (isMockMode()) {
    saveMock();
    return;
  }

  if (!supabase) return;
  const dbData = {
    url: image.url,
    caption: image.caption,
    order: image.order,
  };

  try {
    if (image.id) {
      const { error } = await supabase
        .from("gallery_images")
        .update(dbData)
        .eq("id", image.id);
      if (error) throw error;
    } else {
      const list = await dbGetGalleryImages();
      const { error } = await supabase.from("gallery_images").insert({
        ...dbData,
        order: list.length + 1,
      });
      if (error) throw error;
    }
  } catch (e) {
    console.warn("dbSaveGalleryImage failed, falling back to mock storage:", e);
    saveMock();
  }
};

export const dbDeleteGalleryImage = async (id: string): Promise<void> => {
  const deleteMock = () => {
    setMockData(
      "galleryImages",
      getMockData<GalleryImage[]>("galleryImages", defaultGalleryImages).filter(
        (item) => item.id !== id,
      ),
    );
  };

  if (isMockMode()) {
    deleteMock();
    return;
  }
  if (!supabase) return;
  try {
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);
    if (error) throw error;
  } catch (e) {
    console.warn(
      "dbDeleteGalleryImage failed, falling back to mock storage:",
      e,
    );
    deleteMock();
  }
};
