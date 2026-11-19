import { ProfileData, SocialLink } from '../types/profile';
import { resolveLinkHref } from '../utils/vcard';
import { SocialIcon } from './SocialIcons';

interface LinksGridProps {
  profile: ProfileData;
}

export function LinksGrid({ profile }: LinksGridProps) {
  const enabledLinks = [...profile.links]
    .filter((link) => link.isEnabled)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const perRow = enabledLinks.length === 4 ? 2 : 3;
  const rows: SocialLink[][] = [];
  for (let i = 0; i < enabledLinks.length; i += perRow) {
    rows.push(enabledLinks.slice(i, i + perRow));
  }

  return (
    <div className="flex flex-col gap-3 w-full" id="profile-links-container">
      {rows.map((row, rowIndex) => {
        const colSpanClass =
          row.length === 1
            ? 'col-span-6'
            : row.length === 2
              ? 'col-span-3'
              : 'col-span-2';

        return (
          <div className="grid grid-cols-6 gap-2 w-full" key={rowIndex}>
            {row.map((link) => {
              const href = resolveLinkHref(link);
              const isDirectProtocol =
                href.startsWith('tel:') || href.startsWith('mailto:');

              return (
                <div className={colSpanClass} key={link.id}>
                  <a
                    id={`link-item-${link.id}`}
                    href={href}
                    target={isDirectProtocol ? undefined : '_blank'}
                    rel={isDirectProtocol ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02] flex-col justify-center w-full h-[99px] rounded-[18px] text-center px-2 overflow-hidden border bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
                    style={{
                      backgroundColor: profile.button_color || '#FFFFFF',
                      color: profile.link_color || '#121212',
                      borderColor: '#E5E7EB',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div className="relative w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
                      <SocialIcon platform={link.platform} />
                    </div>
                    <span
                      className="text-[13px] font-medium break-word mt-1 line-clamp-2 w-full"
                      style={{ color: '#121212' }}
                    >
                      {link.name}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
