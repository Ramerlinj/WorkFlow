export interface Country {
  id_country: number;
  name: string;
}

export interface Location {
  id_location: number;
  id_country: number;
  city: string;
  country?: Country;
}

export interface Profession {
  id_profession: number;
  name: string;
}

export interface User {
  id_user: number;
  id_profession: number;
  username: string;
  email: string;
  hash_password: string;
  first_name: string;
  middle_name: string | null;
  first_surname: string;
  second_surname: string | null;
  date_of_birth: string;
  creation_date: string;
  direction: string | null;
  profession?: Profession;
  profile?: Profile | null;
  skills?: Skill[];
  links?: Link[];
  link_type?: LinkType[];
  work_experience?: WorkExperience[];
  user_config?: UserConfig | null;
  notification_settings?: NotificationSettings | null;
  applications?: JobApplication[];
}

export interface Profile {
  id_profile: number;
  id_user: number;
  about_me: string;
  avatar_url: string | null;
  cv_url: string | null;
}

export interface Skill {
  id_skill: number;
  name: string;
}

export interface Link {
  id_link: number;
  id_user: number;
  id_link_type: number;
  url: string;
  
}

export interface LinkType {
  id_link_type: number;
  name: string;
}

export interface WorkExperience {
  id_experience: number;
  id_user: number;
  title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
}

export interface CreateApplicationDTO {
  coverLetter: string
}

export interface UserConfig {
  id_config: number;
  id_user: number;
  public_profile: boolean;
  job_alert: boolean;
  language: 'Español' | 'Ingles';
}

export interface NotificationSettings {
  id_notif: number;
  id_user: number;
  by_email: boolean;
  by_sms: boolean;
  push_notifications: boolean;
}

export interface TypeJob {
  id_type_job: number;
  name: string;
}

export interface Employment {
  id_employment: number;
  id_type_job: number;
  id_profession: number;
  title: string;
  description: string | null;
  company: string;
  salary_min: string | null;
  salary_max: string | null;
  publication_date: string;
  status: 'Open' | 'Closed';
  id_location: number | null;
  type_job?: TypeJob;
  profession?: Profession;
  location?: Location;
}

export interface JobApplication {
  id_application: number;
  id_user: number;
  id_employment: number;
  application_date: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  employment?: Employment;
}

export interface Testimonial {
  id_testimonial: number;
  id_user_source: number;
  id_user_target: number;
  title: string;
  description: string;
  rating: number;
  likes: number;
  created_at: string;
}

export interface TestimonialComment {
  id_comment: number;
  id_testimonial: number;
  id_user: number;
  comment: string;
  created_at: string;
}

// src/types/interfaces.ts

export interface CreateEmploymentDTO {
  id_type_job: number;
  id_profession: number;
  title: string;
  description: string;
  company: string;
  salary_min: number;
  salary_max: number;
  // publication_date ha sido eliminada
  status: "Open" | "Closed";
  id_location: number;
}

