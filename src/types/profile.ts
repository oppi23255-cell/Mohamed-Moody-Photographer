export type SocialPlatform = 'tiktok' | 'instagram' | 'facebook' | 'whatsapp';

export interface ProfileEmail {
  email: string;
  enabled: boolean;
}

export interface ProfileMobile {
  mobile: string;
  country: string;
  enabled: boolean;
}

export interface SocialLink {
  id: number;
  name: string;
  platform: SocialPlatform;
  data: string;
  data_link: string;
  link_type_id: number;
  link_data_type_id: number;
  isEnabled: boolean;
  order: number;
  description: string | null;
}

export interface LeadCaptureField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  is_required: boolean;
  order: number;
}

export interface LeadCaptureFormConfig {
  fields: LeadCaptureField[];
  form_config: {
    form_title: string;
    form_description: string | null;
    submit_button_text: string;
    is_lead_capture: number;
  };
}

export interface ProfileData {
  id: number;
  fullName: string;
  username: string;
  title: string;
  company: string;
  bio: string;
  background_color: string | null;
  link_color: string;
  button_color: string;
  save_contact_background_color: string | null;
  save_contact_text_color: string | null;
  image: string;
  coverImage: string;
  save_contact_flag: boolean;
  is_lead_capture: boolean;
  emails: ProfileEmail[];
  mobile: ProfileMobile[];
  links: SocialLink[];
  leadCaptureForm: LeadCaptureFormConfig;
}

export interface ToastState {
  message: string;
  type: 'success' | 'error';
}
