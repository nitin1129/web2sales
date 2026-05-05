import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarClock, Send, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// All form submissions are emailed to this address via FormSubmit
// (https://formsubmit.co). The first time a new email is used, FormSubmit
// sends a one-time confirmation link to it — click that link once and every
// future submission delivers straight to the inbox.
const CONTACT_EMAIL = 'nitin@gmdstech.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// Google Calendar appointment booking page (opens in a new tab on Schedule).
export const SCHEDULE_URL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ffkWvxVikwIPJbpUTukQw0dzTgndGMqDVDP77kGD-v1_8pyOoVB5rv8DQFqd6mA6MupEmnd1G';

const ContactForm = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const scheduleHinted = searchParams.get('action') === 'schedule';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submittingMode, setSubmittingMode] = useState(null); // 'send' | 'schedule' | null
  const scheduleBtnRef = useRef(null);

  useEffect(() => {
    if (scheduleHinted && scheduleBtnRef.current) {
      scheduleBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [scheduleHinted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing details',
        description: 'Name, email, and message are required.',
        variant: 'destructive'
      });
      return false;
    }
    return true;
  };

  const submitToEmail = async (mode) => {
    const subject =
      mode === 'schedule'
        ? `Meeting request from ${formData.name}`
        : `Website enquiry from ${formData.name}`;

    const payload = {
      ...formData,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      action: mode === 'schedule' ? 'schedule_meeting' : 'send_message'
    };

    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `FormSubmit returned ${res.status}`);
    }

    return res.json().catch(() => ({}));
  };

  const handleSubmit = async (mode) => {
    if (submittingMode) return;
    if (!validate()) return;

    setSubmittingMode(mode);

    // Pop the calendar tab synchronously inside the click handler so the
    // browser's popup blocker treats it as user-initiated. We navigate it
    // after the request resolves. We deliberately do NOT pass 'noopener'
    // here — that would make window.open() return null and we'd lose the
    // reference we need for the post-success navigation.
    const scheduleWindow = window.open('about:blank', '_blank');

    try {
      await submitToEmail(mode);

      if (scheduleWindow && !scheduleWindow.closed) {
        try {
          scheduleWindow.opener = null;
        } catch {
          /* ignore — becomes cross-origin once navigated */
        }
        scheduleWindow.location.href = SCHEDULE_URL;
        toast({
          title:
            mode === 'schedule' ? 'Message sent — pick a slot' : 'Message sent',
          description:
            "We received your details. Pick a time on the calendar tab that just opened."
        });
      } else {
        // Popup was blocked — surface a manual link so the user can still get there.
        toast({
          title: 'Message sent — popup blocked',
          description:
            'Allow popups for this site, or open the calendar manually below.',
          action: (
            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Open calendar
            </a>
          )
        });
      }

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      if (scheduleWindow && !scheduleWindow.closed) scheduleWindow.close();
      toast({
        title: 'Submission failed',
        description:
          err.message ||
          'Something went wrong. Please try again or email us directly.',
        variant: 'destructive'
      });
    } finally {
      setSubmittingMode(null);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit('send');
      }}
      className="space-y-6"
    >
      {scheduleHinted && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-slate-700">
          <p className="font-semibold text-primary">Booking a meeting</p>
          <p className="mt-1 text-slate-600">
            Fill in your details below, then click <span className="font-semibold">Schedule a
            meeting</span> — we'll send your info to our team and open the calendar to pick a time.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">
            Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            autoComplete="name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">
            Email <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            autoComplete="email"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          autoComplete="tel"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message">
          Message <span className="text-rose-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project or what you'd like to discuss..."
          rows={5}
          required
          className="mt-1"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          disabled={Boolean(submittingMode)}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submittingMode === 'send' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send message
            </>
          )}
        </Button>

        <Button
          ref={scheduleBtnRef}
          type="button"
          onClick={() => handleSubmit('schedule')}
          disabled={Boolean(submittingMode)}
          className={`flex-1 rounded-full border font-semibold py-6 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 ${
            scheduleHinted
              ? 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary ring-2 ring-primary/30'
              : 'border-slate-300 bg-white text-slate-800 hover:bg-primary/5 hover:border-primary/40 hover:text-primary'
          }`}
        >
          {submittingMode === 'schedule' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CalendarClock className="mr-2 h-4 w-4" />
              Schedule a meeting
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-slate-500">
        Your details are sent to{' '}
        <span className="font-mono">{CONTACT_EMAIL}</span>. Choosing <span className="font-semibold">
        Schedule a meeting</span> also opens our Google Calendar so you can pick a time.
      </p>
    </form>
  );
};

export default ContactForm;
