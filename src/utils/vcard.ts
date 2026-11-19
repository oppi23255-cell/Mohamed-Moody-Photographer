import { ProfileData, SocialLink } from '../types/profile';

export function resolveLinkHref(link: SocialLink): string {
  let data = String(link.data || '');
  const dataLink = link.data_link || '';
  const dataTypeId = link.link_data_type_id;
  const typeId = link.link_type_id;

  if (
    dataLink.includes('wa.me') ||
    dataLink.includes('api.whatsapp.com') ||
    dataLink.includes('tel:') ||
    dataLink.includes('sms:') ||
    dataLink.includes('viber') ||
    dataLink.includes('facetime')
  ) {
    data = data.replace(/[\s\-()]/g, '');
    if (dataLink.includes('wa.me') || dataLink.includes('api.whatsapp.com')) {
      data = data.replace(/\+/g, '');
    }
  }

  if (data.startsWith('tel:') || dataLink.startsWith('tel:')) {
    return `tel:${data.replace('tel:', '').replace(/[\s\-()]/g, '')}`;
  }

  if (data.startsWith('mailto:') || dataLink.startsWith('mailto:')) {
    return `mailto:${data.replace('mailto:', '').trim()}`;
  }

  const hasProtocol = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  if (dataTypeId !== 1 && typeId !== 42) {
    if (hasProtocol(data)) return data;
    if (hasProtocol(dataLink)) return dataLink + data;
    return `https://${dataLink}${data}`;
  }

  if (typeId === 42) {
    return /@[^@\s]+\.[^@\s]+$/.test(data)
      ? `${dataLink}${data}?subject=&body=`
      : `${dataLink}${data}@gmail.com?subject=&body=`;
  }

  return hasProtocol(data) ? data : `https://${data}`;
}

export function generateVCard(profile: ProfileData): string {
  const mobile = profile.mobile.find((m) => m.enabled)?.mobile || '';
  const email = profile.emails.find((e) => e.enabled)?.email || '';
  const nameParts = profile.fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${profile.fullName}`,
    profile.company ? `ORG:${profile.company}` : '',
    profile.title ? `TITLE:${profile.title}` : '',
    mobile ? `TEL;TYPE=CELL,VOICE:${mobile}` : '',
    email ? `EMAIL;TYPE=INTERNET,PREF:${email}` : '',
    `NOTE:${profile.bio}`,
    `URL:https://www.tiktok.com/@${profile.username}`,
    `PHOTO;VALUE=URI:${window.location.origin}${profile.image}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');
}

export function downloadVCard(profile: ProfileData): void {
  const vcfContent = generateVCard(profile);
  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.setAttribute('download', `${profile.fullName || 'contact'}.vcf`);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
