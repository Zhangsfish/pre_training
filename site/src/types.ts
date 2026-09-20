export interface DisplayLink {
  id: string;
  label: string;
  url: string;
  verification: string;
}
export interface DisplayProject {
  id: string;
  title: string;
  status: string;
  period: string | null;
  summary: string;
  ownership: string;
  result: string;
  boundary: string;
  links: DisplayLink[];
}
export interface PublicView {
  profile: {
    name: string;
    romanized_name: string;
    email: string;
    education: { school: string; program: string; period: string }[];
  };
  hero: { title: string; eyebrow: string; intro: string };
  projects: DisplayProject[];
  personal: { title: string; text: string }[];
  moreProjects: DisplayProject[];
  methods: { text: string; project_id: string }[];
  links: DisplayLink[];
}
