import { ArrowRightLeft } from 'lucide-react';
import { ProfileData } from '../types/profile';

interface ActionButtonsProps {
  profile: ProfileData;
  isSaving: boolean;
  onSaveContact: () => void;
  onOpenExchange: () => void;
}

export function ActionButtons({
  profile,
  isSaving,
  onSaveContact,
  onOpenExchange,
}: ActionButtonsProps) {
  const bgColor = profile.save_contact_background_color || '#000000';
  const textColor = profile.save_contact_text_color || '#ffffff';

  return (
    <div
      className="flex justify-center gap-4 mb-8 w-full"
      id="action-buttons-group"
    >
      {profile.save_contact_flag && (
        <div className="relative flex flex-col items-center flex-1">
          <button
            id="save-contact-btn"
            type="button"
            onClick={onSaveContact}
            disabled={isSaving}
            style={{ backgroundColor: bgColor, color: textColor }}
            className={`rounded-full w-full h-16 px-6 text-lg font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 ${
              isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Contact'}
          </button>
        </div>
      )}

      {profile.is_lead_capture && (
        <div className="flex-shrink-0">
          <button
            id="exchange-info-btn"
            type="button"
            onClick={onOpenExchange}
            style={{ backgroundColor: bgColor, color: textColor }}
            className="w-16 h-16 rounded-full flex justify-center items-center cursor-pointer hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
            title="Exchange contact"
            aria-label="Exchange Contact"
          >
            <ArrowRightLeft size={20} color={textColor} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
