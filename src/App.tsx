import { useState } from 'react';
import { PROFILE_DATA } from './data/profile';
import { ToastState } from './types/profile';
import { downloadVCard } from './utils/vcard';
import { ProfileHeader } from './components/ProfileHeader';
import { ActionButtons } from './components/ActionButtons';
import { LinksGrid } from './components/LinksGrid';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { Toast } from './components/Toast';

export default function App() {
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const handleSaveContact = () => {
    setIsSaving(true);
    try {
      downloadVCard(PROFILE_DATA);
      setToast({
        message: 'تم حفظ جهة الاتصال بنجاح',
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      setToast({
        message: 'حدث خطأ أثناء حفظ الـ Contact',
        type: 'error',
      });
    } finally {
      setTimeout(() => setIsSaving(false), 700);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleExchangeSuccess = (message: string) => {
    downloadVCard(PROFILE_DATA);
    setToast({ message, type: 'success' });
    setTimeout(() => setToast(null), 4500);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex justify-center items-start sm:py-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <main
        id="profile-card"
        className="min-h-screen sm:min-h-0 sm:rounded-[32px] sm:shadow-lg sm:border sm:border-gray-200/60 max-w-[426px] w-full relative bg-white overflow-hidden pb-12 transition-all"
        style={{
          backgroundColor: PROFILE_DATA.background_color || '#ffffff',
          color: PROFILE_DATA.link_color || '#000000',
        }}
      >
        <ProfileHeader profile={PROFILE_DATA} />

        <div className="main_container">
          <ActionButtons
            profile={PROFILE_DATA}
            isSaving={isSaving}
            onSaveContact={handleSaveContact}
            onOpenExchange={() => setIsExchangeOpen(true)}
          />
          <LinksGrid profile={PROFILE_DATA} />
        </div>
      </main>

      <LeadCaptureModal
        profile={PROFILE_DATA}
        isOpen={isExchangeOpen}
        onClose={() => setIsExchangeOpen(false)}
        onSuccess={handleExchangeSuccess}
      />
    </div>
  );
}
