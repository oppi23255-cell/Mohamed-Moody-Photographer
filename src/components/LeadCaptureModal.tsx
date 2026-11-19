import { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';
import { ProfileData } from '../types/profile';

interface LeadCaptureModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

interface FormValues {
  'full-name': string;
  email: string;
  'phone-mobile': string;
  note: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function LeadCaptureModal({
  profile,
  isOpen,
  onClose,
  onSuccess,
}: LeadCaptureModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<FormValues>({
    'full-name': '',
    email: '',
    'phone-mobile': '',
    note: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleMouseDown(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateField = (name: keyof FormValues, value: string): string => {
    if (name === 'full-name' && !value.trim()) {
      return 'Full Name is required';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    if (name === 'phone-mobile') {
      if (!value.trim()) return 'Mobile is required';
      if (!/^\+?[\d\s\-()]{7,20}$/.test(value)) {
        return 'Please enter a valid mobile number';
      }
    }
    return '';
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormValues;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => {
      if (error) return { ...prev, [name]: error };
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    const nameErr = validateField('full-name', values['full-name']);
    if (nameErr) nextErrors['full-name'] = nameErr;

    const emailErr = validateField('email', values.email);
    if (emailErr) nextErrors.email = emailErr;

    const mobileErr = validateField('phone-mobile', values['phone-mobile']);
    if (mobileErr) nextErrors['phone-mobile'] = mobileErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const existingRaw = localStorage.getItem('exchanged_contacts');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        existing.push({
          ...values,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('exchanged_contacts', JSON.stringify(existing));
      } catch {
        // Ignore storage quota errors
      }

      setIsSubmitting(false);
      onSuccess('Your information has been sent successfully');
      setValues({
        'full-name': '',
        email: '',
        'phone-mobile': '',
        note: '',
      });
      setErrors({});
      onClose();
    }, 600);
  };

  return (
    <div
      id="lead-capture-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-capture-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div
        ref={cardRef}
        id="lead-capture-card"
        className="w-[90%] max-w-sm rounded-2xl shadow-xl p-5 max-h-[90vh] overflow-y-auto bg-white relative animate-fade-in-up text-black"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <button
          id="modal-close-btn"
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4 pr-8">
          <img
            src={profile.image}
            alt={profile.fullName}
            referrerPolicy="no-referrer"
            className="rounded-full object-cover object-center w-[39px] h-[39px] border border-gray-200 flex-shrink-0"
            width={39}
            height={39}
          />
          <div>
            <p
              id="lead-capture-title"
              className="font-medium text-sm text-[#111827]"
            >
              {profile.leadCaptureForm.form_config.form_title}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <div className="w-full">
            <input
              id="field-full-name"
              type="text"
              name="full-name"
              placeholder="Enter your full name"
              value={values['full-name']}
              onChange={handleChange}
              autoComplete="name"
              className={`w-full bg-white text-black px-3 py-2 h-[53px] rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 ${
                errors['full-name'] ? 'border-red-500' : 'border-[#EBEBEB]'
              }`}
            />
            {errors['full-name'] && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors['full-name']}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              id="field-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              className={`w-full bg-white text-black px-3 py-2 h-[53px] rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 ${
                errors.email ? 'border-red-500' : 'border-[#EBEBEB]'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="w-full">
            <input
              id="field-mobile"
              type="tel"
              name="phone-mobile"
              placeholder="Mobile number"
              value={values['phone-mobile']}
              onChange={handleChange}
              autoComplete="tel"
              className={`w-full bg-white text-black px-3 py-2 h-[53px] rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 ${
                errors['phone-mobile'] ? 'border-red-500' : 'border-[#EBEBEB]'
              }`}
            />
            {errors['phone-mobile'] && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors['phone-mobile']}
              </span>
            )}
          </div>

          <div className="w-full">
            <textarea
              id="field-note"
              name="note"
              placeholder="Add a note (Optional)"
              rows={3}
              value={values.note}
              onChange={handleChange}
              className="w-full bg-white text-black px-3 py-2 rounded-xl border border-[#EBEBEB] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <button
            id="lead-capture-submit-btn"
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: '#000000', color: '#ffffff' }}
            className={`w-full rounded-full py-2 h-[56px] text-[16px] font-semibold transition-opacity duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isSubmitting
              ? 'Sending...'
              : profile.leadCaptureForm.form_config.submit_button_text}
          </button>
        </form>
      </div>
    </div>
  );
}
