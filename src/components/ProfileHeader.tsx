import { useState } from 'react';
import { Camera } from 'lucide-react';
import { ProfileData } from '../types/profile';

interface ProfileHeaderProps {
  profile: ProfileData;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [imgError, setImgError] = useState(false);

  const rawMobile =
    profile.mobile.find((m) => m.enabled)?.mobile || '+20 109 112 4879';
  const cleanPhone = rawMobile.replace(/[\s\-()]/g, '');

  return (
    <header className="w-full" id="profile-header">
      <div className="flex justify-center relative">
        <div className="relative h-[310px] w-full overflow-hidden">
          {!imgError ? (
            <img
              src={profile.image}
              alt={profile.fullName}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-[50%_64%]"
              style={{
                maskImage:
                  'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-white text-neutral-600 gap-2">
              <Camera className="w-10 h-10 stroke-[1.5]" aria-hidden="true" />
              <span className="text-sm font-medium">{profile.fullName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col pb-2 w-full items-center">
        <h1
          id="profile-fullname"
          title={profile.fullName}
          dir="ltr"
          className="text-center text-[20px] font-semibold mt-2 break-word text-balance"
          style={{ color: profile.link_color || '#000000' }}
        >
          {profile.fullName}
        </h1>

        {profile.bio && (
          <p
            id="profile-arabic-name"
            dir="rtl"
            className="text-[16px] break-word text-center px-2 text-[#00000099] font-medium"
          >
            {profile.bio}
          </p>
        )}

        {profile.title && (
          <p
            id="profile-photography-tagline"
            dir="ltr"
            className="text-[15px] font-medium break-word text-center px-2 text-[#00000099] mt-0.5"
          >
            {profile.title}
          </p>
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-2 flex-row mb-1">
        <a
          id="header-call-btn"
          href={`tel:${cleanPhone}`}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            boxShadow: '0px 0px 1px 0.4px #00000066',
          }}
          className="w-[78px] h-[43px] rounded-full cursor-pointer flex justify-center items-center p-0 hover:bg-neutral-50 transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          title={`Call ${cleanPhone}`}
          aria-label={`Call ${cleanPhone}`}
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8333 2.375C10.4882 2.375 10.2083 2.65483 10.2083 3C10.2083 3.34517 10.4882 3.625 10.8333 3.625C11.6267 3.625 12.4123 3.78127 13.1454 4.08489C13.8784 4.38852 14.5444 4.83354 15.1054 5.39457C15.6664 5.95558 16.1115 6.62161 16.4151 7.35462C16.7187 8.08763 16.875 8.87325 16.875 9.66667C16.875 10.0118 17.1548 10.2917 17.5 10.2917C17.8452 10.2917 18.125 10.0118 18.125 9.66667C18.125 8.70911 17.9364 7.76093 17.5699 6.87627C17.2035 5.9916 16.6664 5.18777 15.9893 4.51068C15.3123 3.83358 14.5084 3.29648 13.6237 2.93004C12.7391 2.56361 11.7909 2.375 10.8333 2.375ZM17.5 16.3333V14.9617C17.5 14.2802 17.0851 13.6673 16.4523 13.4142L14.7572 12.7362C13.9524 12.4143 13.0352 12.763 12.6475 13.5383L12.5 13.8333C12.5 13.8333 10.4167 13.4167 8.75 11.75C7.08333 10.0833 6.66667 8 6.66667 8L6.96168 7.85249C7.73698 7.46484 8.08571 6.54762 7.76378 5.7428L7.08574 4.04768C6.83263 3.41492 6.21978 3 5.53827 3H4.16667C3.24619 3 2.5 3.74619 2.5 4.66667C2.5 12.0305 8.4695 18 15.8333 18C16.7538 18 17.5 17.2538 17.5 16.3333Z"
              fill="#000000"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
