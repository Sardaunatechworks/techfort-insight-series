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
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: SupabaseClient<any> = createClient<any>(
  supabaseUrl,
  supabaseAnonKey,
);

export const isMockMode = (): boolean => false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logError = (name: string, e: any) => {
  if (e && typeof e === "object") {
    console.error(`${name} failed:`, {
      message: e.message || e.error_description || "No message",
      code: e.code || "No code",
      details: e.details || "No details",
      hint: e.hint || "No hint",
      error: e,
    });
  } else {
    console.error(`${name} failed:`, e);
  }
};

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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!data.user) throw new Error("Authentication failed");
  return data.user;
};

export const dbLogout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const dbOnAuthStateChanged = (
  callback: (user: AdminUser | SupabaseUser | null) => void,
): (() => void) => {
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

  const { error } = await supabase.from("contacts").insert([contact]);
  if (error) throw error;
};

// ----------------------------------------------------------------------
// REAL-TIME DASHBOARD LISTENERS
// ----------------------------------------------------------------------
export const dbListenApplications = (
  callback: (apps: Application[]) => void,
): (() => void) => {
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
    supabase.removeChannel(channel);
  };
};

export const dbUpdateApplicationStatus = async (
  id: string,
  status: string,
): Promise<void> => {
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
};

export const dbListenContacts = (
  callback: (contacts: Contact[]) => void,
): (() => void) => {
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
    supabase.removeChannel(channel);
  };
};

export const dbToggleContactRead = async (
  id: string,
  read: boolean,
): Promise<void> => {
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
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as Program[];
  } catch (e) {
    logError("dbGetPrograms", e);
    return [];
  }
};

export const dbSaveProgram = async (
  program: Partial<Program>,
): Promise<void> => {
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
  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) throw error;
};

// SESSIONS
export const dbGetSessions = async (): Promise<Session[]> => {
  try {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as Session[];
  } catch (e) {
    logError("dbGetSessions", e);
    return [];
  }
};

export const dbSaveSession = async (
  session: Partial<Session>,
): Promise<void> => {
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
  const { error } = await supabase.from("sessions").delete().eq("id", id);
  if (error) throw error;
};

// ARTICLES
export const dbGetArticles = async (): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as Article[];
  } catch (e) {
    logError("dbGetArticles", e);
    return [];
  }
};

export const dbSaveArticle = async (
  article: Partial<Article>,
): Promise<void> => {
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
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
};

// RESOURCES
export const dbGetResources = async (): Promise<Resource[]> => {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapResourceRow);
  } catch (e) {
    logError("dbGetResources", e);
    return [];
  }
};

export const dbSaveResource = async (
  resource: Partial<Resource>,
): Promise<void> => {
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
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
};

// SOCIAL LINKS
export const dbGetSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []) as SocialLink[];
  } catch (e) {
    logError("dbGetSocialLinks", e);
    return [];
  }
};

export const dbSaveSocialLink = async (
  link: Partial<SocialLink>,
): Promise<void> => {
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
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw error;
};

// PARTNERS
export const dbGetPartners = async (): Promise<Partner[]> => {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapPartnerRow);
  } catch (e) {
    logError("dbGetPartners", e);
    return [];
  }
};

export const dbSavePartner = async (
  partner: Partial<Partner>,
): Promise<void> => {
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
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) throw error;
};

// SPEAKERS
export const dbGetSpeakers = async (): Promise<Speaker[]> => {
  try {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapSpeakerRow);
  } catch (e) {
    logError("dbGetSpeakers", e);
    return [];
  }
};

export const dbSaveSpeaker = async (
  speaker: Partial<Speaker>,
): Promise<void> => {
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
  const { error } = await supabase.from("speakers").delete().eq("id", id);
  if (error) throw error;
};

// TEAM MEMBERS
export const dbGetTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapTeamMemberRow);
  } catch (e) {
    logError("dbGetTeamMembers", e);
    return [];
  }
};

export const dbSaveTeamMember = async (
  team: Partial<TeamMember>,
): Promise<void> => {
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
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
};

// SITE SETTINGS
export const dbGetSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error) throw error;
    if (!data || data.length === 0) {
      return {
        id: "global",
        aboutHeroUrl: "",
        logoUrl: "",
        heroBgUrl: "",
      };
    }
    return mapSiteSettingsRow(data[0]);
  } catch (e) {
    logError("dbGetSiteSettings", e);
    return {
      id: "global",
      aboutHeroUrl: "",
      logoUrl: "",
      heroBgUrl: "",
    };
  }
};

export const dbSaveSiteSettings = async (
  settings: Partial<SiteSettings>,
): Promise<void> => {
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

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("tf_mock_storage_change"));
  }
};

// UPLOAD FILE
export const dbUploadFile = async (
  file: File,
  path: string,
): Promise<string> => {
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
  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapGalleryImageRow);
  } catch (e) {
    logError("dbGetGalleryImages", e);
    return [];
  }
};

export const dbSaveGalleryImage = async (
  image: Partial<GalleryImage>,
): Promise<void> => {
  const dbData = {
    url: image.url,
    caption: image.caption,
    order: image.order,
  };

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
};

export const dbDeleteGalleryImage = async (id: string): Promise<void> => {
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw error;
};
