export interface User {
  id_user: number;
  username: string;
  first_name: string;
  middle_name: string;
  first_surname: string;
  second_surname: string;
  email: string;
  date_of_birth: string;
  creation_date: string;
  profile: Profile;
  skills: Skill[];
  links: Link[];
  work_experience: WorkExperience[];
  user_config: UserConfig;
  profession: Profession;
  address: string;

}

export interface Profession{
  id_profession: number;
  name: string;
}

export interface Profile {
  id_user: number;
  about_me: string;
  avatar: string | null;
  cv: string | null;
  id_profile: number;
}

export interface Skill {
  id_skill: number;
  nombre: string;
}

export interface Link {
  id_links: number;
  id_user: number;
  name: string;
  url: string;
}

export interface WorkExperience {
  id_experience: number;
  id_user: number;
  title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface UserConfig {
  public_profile: boolean;
  notification_by_mail: boolean;
  job_alert: boolean;
  language: string;
  id_config: number;
}
