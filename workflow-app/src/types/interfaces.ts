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

export interface UserCreate {
  id_profession: number;
  username: string;
  email: string;
  first_name: string;
  middle_name: string;
  first_surname: string;
  second_surname: string;
  date_of_birth: string;
  direction: string;
  password: string;
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
  skills?: SkillResponse[];
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


export interface Link {
  id_link: number;
  id_user: number;
  id_link_type: number;
  url: string;
  
}

export interface UserLink {
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


export interface TestimonialComment {
  id_comment: number;
  id_user: number;
  id_testimonial: number;
  comment: string;
  created_at: string;
  user: User;
}

export interface TestimonialResponse {
  id_testimonial: number;
  id_user_source: number;
  title: string;
  description: string;
  rating: number;
  likes: number;
  created_at: string;
  user_source: User;
  comments: TestimonialComment[];
}

export interface CreateEmploymentDTO {
  id_type_job: number;
  id_profession: number;
  title: string;
  description: string;
  company: string;
  salary_min: number;
  salary_max: number;
  status: "Open" | "Closed";
  id_location: number;
}

export interface SkillCreate {
  name: string;
}

export interface SkillResponse {
  id_skill: number;
  name: string;
}

export interface UserSkillCreate {
  id_user: number;
  id_skill: number;
}

export interface UserSkillWithName {
  id_skill: number;
  name: string;
}
