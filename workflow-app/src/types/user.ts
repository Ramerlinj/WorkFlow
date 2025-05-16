export interface User {
  id_user: number;
  username: string;
  first_name: string;
  middle_name: string | null;
  first_surname: string;
  second_surname: string | null;
  email: string;
  date_of_birth: string;
  creation_date: string;
  profession: Profession;
  profile: Profile | null;
  skills: Skill[];
  links: Link[];
  work_experience: WorkExperience[];
  user_config: UserConfig | null;
  notification_settings: NotificationSettings | null;
  applications: JobApplication[];
  direction: string | null;
}

export interface Profession {
  id_profession: number;
  name: string;
}

export interface Profile {
  id_profile: number;
  id_user: number;
  about_me: string;
  avatar: string | null;
  cv: string | null;
}

export interface Skill {
  id_skill: number;
  nombre: string;
}

export interface Link {
  id_link: number;
  id_user: number;
  id_link_type: number;
  url: string;
  link_type?: LinkType;
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

export interface UserConfig {
  id_config: number;
  public_profile: boolean;
  notification_by_mail: boolean;
  job_alert: boolean;
  language: string;
}

export interface NotificationSettings {
  id_notification_settings: number;
  id_user: number;
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
}

export interface TypeJob {
  id_type_job: number;
  name: string;
}

export interface Location {
  id_location: number;
  name: string;
}

export interface Employment {
  id_employment: number;
  id_type_job: number;
  id_profession: number;
  title: string;
  description: string | null;
  company: string;
  salary: number | null;
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
  status: string;
  application_date: string;
  cover_letter?: string | null;
  employment?: Employment;
}
