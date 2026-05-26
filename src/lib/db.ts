import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Auth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  Firestore,
} from "firebase/firestore";

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
  icon: string;
  title: string;
  desc: string;
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

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if we have valid Firebase config variables (not placeholder or empty)
const hasFirebaseConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "" &&
  !firebaseConfig.apiKey.includes("PLACEHOLDER") &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "" &&
  !firebaseConfig.projectId.includes("PLACEHOLDER");

// Initialize Firebase client-side safely
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

if (hasFirebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

export const isMockMode = (): boolean =>
  !hasFirebaseConfig || !auth || !firestore;

// ----------------------------------------------------------------------
// LOCAL STORAGE MOCK PROVIDER (for previewing without Firebase API Keys)
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
  // Trigger custom storage event for same-tab updates
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
    icon: "GraduationCap",
    title: "AI Learning Materials",
    desc: "Curated foundational AI and digital literacy content for beginners and intermediates.",
    order: 1,
  },
  {
    id: "res-2",
    icon: "BookOpen",
    title: "Reading Lists",
    desc: "Essential reads on AI, governance, ethics, African tech and digital transformation.",
    order: 2,
  },
  {
    id: "res-3",
    icon: "Wrench",
    title: "Recommended Tools",
    desc: "Trusted tools and platforms for learning, building and experimenting with AI.",
    order: 3,
  },
];

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

// ----------------------------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------------------------
export const dbLogin = async (
  email: string,
  password: string,
): Promise<User | AdminUser> => {
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
  if (!auth) throw new Error("Firebase auth not initialized");
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const dbLogout = async (): Promise<void> => {
  if (isMockMode()) {
    localStorage.removeItem("tf_mock_user");
    window.dispatchEvent(new Event("tf_mock_auth_change"));
    return;
  }
  if (!auth) return;
  await signOut(auth);
};

export const dbOnAuthStateChanged = (
  callback: (user: AdminUser | User | null) => void,
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
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
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
    createdAt: new Date().toISOString(),
  };

  if (isMockMode()) {
    const currentList = getMockData<Application[]>("applications", []);
    setMockData("applications", [
      { id: `app-${Date.now()}`, ...application },
      ...currentList,
    ]);
    return;
  }

  if (!firestore) return;
  await addDoc(collection(firestore, "applications"), {
    ...application,
    createdAt: Timestamp.now(),
  });
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
    createdAt: new Date().toISOString(),
  };

  if (isMockMode()) {
    const currentList = getMockData<Contact[]>("contacts", []);
    setMockData("contacts", [
      { id: `cont-${Date.now()}`, ...contact },
      ...currentList,
    ]);
    return;
  }

  if (!firestore) return;
  await addDoc(collection(firestore, "contacts"), {
    ...contact,
    createdAt: Timestamp.now(),
  });
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

  if (!firestore) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(firestore, "applications"),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(q, (snapshot) => {
    const apps = snapshot.docs.map((docEl) => {
      const data = docEl.data();
      return {
        id: docEl.id,
        name: data.name || "",
        email: data.email || "",
        country: data.country || "",
        org: data.org || "",
        track: data.track || "",
        message: data.message || "",
        status: data.status || "pending",
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || new Date().toISOString(),
      } as Application;
    });
    callback(apps);
  });
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
  if (!firestore) return;
  await updateDoc(doc(firestore, "applications", id), { status });
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

  if (!firestore) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(firestore, "contacts"),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(q, (snapshot) => {
    const contactsList = snapshot.docs.map((docEl) => {
      const data = docEl.data();
      return {
        id: docEl.id,
        name: data.name || "",
        email: data.email || "",
        org: data.org || "",
        subject: data.subject || "",
        message: data.message || "",
        read: !!data.read,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || new Date().toISOString(),
      } as Contact;
    });
    callback(contactsList);
  });
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
  if (!firestore) return;
  await updateDoc(doc(firestore, "contacts", id), { read });
};

// ----------------------------------------------------------------------
// CMS CRUD API
// ----------------------------------------------------------------------

// PROGRAMS
export const dbGetPrograms = async (): Promise<Program[]> => {
  if (isMockMode()) {
    return getMockData<Program[]>("programs", defaultPrograms);
  }
  if (!firestore) return defaultPrograms;
  try {
    const q = query(collection(firestore, "programs"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return defaultPrograms;
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        tag: data.tag || "",
        title: data.title || "",
        overview: data.overview || "",
        goals: Array.isArray(data.goals) ? data.goals : [],
        impact: data.impact || "",
        outcomes: Array.isArray(data.outcomes) ? data.outcomes : [],
        future: data.future || "",
        order: data.order || 0,
      } as Program;
    });
  } catch (e) {
    console.error(e);
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

  if (!firestore) return;
  if (program.id) {
    const { id, ...data } = program;
    await setDoc(doc(firestore, "programs", id), data, { merge: true });
  } else {
    const list = await dbGetPrograms();
    await addDoc(collection(firestore, "programs"), {
      ...program,
      order: list.length + 1,
    });
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
  if (!firestore) return;
  await deleteDoc(doc(firestore, "programs", id));
};

// SESSIONS
export const dbGetSessions = async (): Promise<Session[]> => {
  if (isMockMode()) {
    return getMockData<Session[]>("sessions", defaultSessions);
  }
  if (!firestore) return defaultSessions;
  try {
    const q = query(collection(firestore, "sessions"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return defaultSessions;
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        date: data.date || "",
        category: data.category || "",
        status: data.status || "",
        order: data.order || 0,
      } as Session;
    });
  } catch (e) {
    console.error(e);
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

  if (!firestore) return;
  if (session.id) {
    const { id, ...data } = session;
    await setDoc(doc(firestore, "sessions", id), data, { merge: true });
  } else {
    const list = await dbGetSessions();
    await addDoc(collection(firestore, "sessions"), {
      ...session,
      order: list.length + 1,
    });
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
  if (!firestore) return;
  await deleteDoc(doc(firestore, "sessions", id));
};

// ARTICLES
export const dbGetArticles = async (): Promise<Article[]> => {
  if (isMockMode()) {
    return getMockData<Article[]>("articles", defaultArticles);
  }
  if (!firestore) return defaultArticles;
  try {
    const q = query(collection(firestore, "articles"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return defaultArticles;
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        tag: data.tag || "",
        title: data.title || "",
        excerpt: data.excerpt || "",
        order: data.order || 0,
      } as Article;
    });
  } catch (e) {
    console.error(e);
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

  if (!firestore) return;
  if (article.id) {
    const { id, ...data } = article;
    await setDoc(doc(firestore, "articles", id), data, { merge: true });
  } else {
    const list = await dbGetArticles();
    await addDoc(collection(firestore, "articles"), {
      ...article,
      order: list.length + 1,
    });
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
  if (!firestore) return;
  await deleteDoc(doc(firestore, "articles", id));
};

// RESOURCES
export const dbGetResources = async (): Promise<Resource[]> => {
  if (isMockMode()) {
    return getMockData<Resource[]>("resources", defaultResources);
  }
  if (!firestore) return defaultResources;
  try {
    const q = query(
      collection(firestore, "resources"),
      orderBy("order", "asc"),
    );
    const snap = await getDocs(q);
    if (snap.empty) return defaultResources;
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        icon: data.icon || "",
        title: data.title || "",
        desc: data.desc || "",
        order: data.order || 0,
      } as Resource;
    });
  } catch (e) {
    console.error(e);
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
        icon: resource.icon || "GraduationCap",
        title: resource.title || "",
        desc: resource.desc || "",
        id: `res-${Date.now()}`,
        order: list.length + 1,
      };
      setMockData("resources", [...list, newRes]);
    }
    return;
  }

  if (!firestore) return;
  if (resource.id) {
    const { id, ...data } = resource;
    await setDoc(doc(firestore, "resources", id), data, { merge: true });
  } else {
    const list = await dbGetResources();
    await addDoc(collection(firestore, "resources"), {
      ...resource,
      order: list.length + 1,
    });
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
  if (!firestore) return;
  await deleteDoc(doc(firestore, "resources", id));
};

// SOCIAL LINKS
export const dbGetSocialLinks = async (): Promise<SocialLink[]> => {
  if (isMockMode()) {
    return getMockData<SocialLink[]>("socialLinks", defaultSocialLinks);
  }
  if (!firestore) return defaultSocialLinks;
  try {
    const q = query(
      collection(firestore, "socialLinks"),
      orderBy("order", "asc"),
    );
    const snap = await getDocs(q);
    if (snap.empty) return defaultSocialLinks;
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        platform: data.platform || "",
        url: data.url || "",
        icon: data.icon || "Globe",
        order: data.order || 0,
      } as SocialLink;
    });
  } catch (e) {
    console.error(e);
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

  if (!firestore) return;
  if (link.id) {
    const { id, ...data } = link;
    await setDoc(doc(firestore, "socialLinks", id), data, { merge: true });
  } else {
    const list = await dbGetSocialLinks();
    await addDoc(collection(firestore, "socialLinks"), {
      ...link,
      order: list.length + 1,
    });
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
  if (!firestore) return;
  await deleteDoc(doc(firestore, "socialLinks", id));
};
