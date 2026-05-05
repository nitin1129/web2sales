import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Mic, Globe, Tag, Loader2, Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/apiClient';

const slugify = (str) =>
  String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

const toLocalInputValue = (value) => {
  const d = value ? new Date(value) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const emptyForm = {
  slug: '',
  title: '',
  description: '',
  speaker: '',
  scheduledFor: toLocalInputValue(),
  durationMinutes: 60,
  meetingUrl: '',
  recordingUrl: '',
  tagsInput: '',
  seo: { metaTitle: '', metaDescription: '', keywords: '' }
};

const Section = ({ icon: Icon, title, description, children }) => (
  <section className="rounded-3xl border border-slate-200/70 bg-white p-6 md:p-8 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.2)]">
    <div className="flex items-start gap-3 mb-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
    {children}
  </section>
);

const AdminWebinarEditorPage = () => {
  const { slug: editSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(editSlug);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getWebinar(editSlug);
        if (cancelled) return;
        setForm({
          slug: data.slug || '',
          title: data.title || '',
          description: data.description || '',
          speaker: data.speaker || '',
          scheduledFor: toLocalInputValue(data.scheduledFor),
          durationMinutes: data.durationMinutes || 60,
          meetingUrl: data.meetingUrl || '',
          recordingUrl: data.recordingUrl || '',
          tagsInput: (data.tags || []).join(', '),
          seo: {
            metaTitle: data.seo?.metaTitle || '',
            metaDescription: data.seo?.metaDescription || '',
            keywords: data.seo?.keywords || ''
          }
        });
      } catch (err) {
        toast({
          title: 'Failed to load',
          description: err.message || 'Try again.',
          variant: 'destructive'
        });
        navigate('/admin/webinars');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isEdit, editSlug, navigate, toast]);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const updateSeo = (field, value) =>
    setForm((f) => ({ ...f, seo: { ...f.seo, [field]: value } }));

  const onTitleChange = (value) => {
    setForm((f) => ({ ...f, title: value, slug: slugEdited ? f.slug : slugify(value) }));
  };

  const onSlugChange = (value) => {
    setSlugEdited(true);
    update('slug', slugify(value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.scheduledFor) {
      toast({
        title: 'Missing fields',
        description: 'Title and scheduled time are required.',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      const tags = form.tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const payload = {
        slug: form.slug || slugify(form.title),
        title: form.title.trim(),
        description: form.description.trim(),
        speaker: form.speaker.trim(),
        scheduledFor: new Date(form.scheduledFor).toISOString(),
        durationMinutes: Number(form.durationMinutes) || null,
        meetingUrl: form.meetingUrl.trim(),
        recordingUrl: form.recordingUrl.trim(),
        tags,
        seo: {
          metaTitle: form.seo.metaTitle.trim(),
          metaDescription: form.seo.metaDescription.trim(),
          keywords: form.seo.keywords.trim()
        }
      };

      const saved = isEdit
        ? await api.updateWebinar(editSlug, payload)
        : await api.createWebinar(payload);

      toast({
        title: isEdit ? 'Webinar updated' : 'Webinar scheduled',
        description: `"${saved.title}" — ${new Date(saved.scheduledFor).toLocaleString()}`
      });
      navigate('/admin/webinars');
    } catch (err) {
      toast({
        title: 'Save failed',
        description: err.message || 'Try again.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-slate-500">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
        <p className="mt-3 text-sm">Loading webinar...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit webinar' : 'New webinar'} — Admin · Web2Sales</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link
            to="/admin/webinars"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to webinars
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {isEdit ? 'Edit webinar' : 'New webinar'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Title, schedule, meeting link, and SEO. After the date passes, the recording URL takes over.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <Section icon={Mic} title="Webinar details" description="Title and the host.">
            <div className="space-y-5">
              <div>
                <Label htmlFor="title">
                  Title <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="e.g. Conversion-first design — live audit"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL slug</Label>
                <div className="mt-1.5 flex items-stretch rounded-md border border-slate-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary overflow-hidden">
                  <span className="inline-flex items-center bg-slate-50 px-3 text-sm text-slate-500 border-r border-slate-200 font-mono">
                    /webinars/
                  </span>
                  <input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => onSlugChange(e.target.value)}
                    placeholder="auto-generated-from-title"
                    className="flex-1 px-3 py-2 text-sm outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="What attendees will learn (2-3 sentences)."
                  rows={4}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="speaker">Speaker(s)</Label>
                <Input
                  id="speaker"
                  value={form.speaker}
                  onChange={(e) => update('speaker', e.target.value)}
                  placeholder="e.g. Nitin Verma · Web2Sales"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Section>

          <Section icon={Calendar} title="Schedule & links" description="When and how attendees join.">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduledFor">
                    Scheduled for <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={form.scheduledFor}
                    onChange={(e) => update('scheduledFor', e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                  <Input
                    id="durationMinutes"
                    type="number"
                    min={15}
                    max={240}
                    step={15}
                    value={form.durationMinutes}
                    onChange={(e) => update('durationMinutes', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="meetingUrl">Meeting URL</Label>
                <Input
                  id="meetingUrl"
                  type="url"
                  value={form.meetingUrl}
                  onChange={(e) => update('meetingUrl', e.target.value)}
                  placeholder="https://meet.google.com/... or https://zoom.us/j/..."
                  className="mt-1.5 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Shown to attendees on upcoming sessions. Google Meet, Zoom, or any other link.
                </p>
              </div>

              <div>
                <Label htmlFor="recordingUrl">Recording URL (after the session)</Label>
                <Input
                  id="recordingUrl"
                  type="url"
                  value={form.recordingUrl}
                  onChange={(e) => update('recordingUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... (optional)"
                  className="mt-1.5 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Add this after the live session ends. Past webinars without a recording URL show
                  "Recording coming soon".
                </p>
              </div>
            </div>
          </Section>

          <Section icon={Tag} title="Tags" description="Comma-separated, used for filtering and SEO.">
            <Input
              value={form.tagsInput}
              onChange={(e) => update('tagsInput', e.target.value)}
              placeholder="conversion, seo, live, q&a"
              className="font-mono text-sm"
            />
          </Section>

          <Section icon={Globe} title="SEO" description="How this webinar appears on Google + social shares.">
            <div className="space-y-5">
              <div>
                <Label htmlFor="metaTitle">Meta title</Label>
                <Input
                  id="metaTitle"
                  value={form.seo.metaTitle}
                  onChange={(e) => updateSeo('metaTitle', e.target.value)}
                  placeholder="Defaults to webinar title if empty"
                  maxLength={70}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-slate-500">{form.seo.metaTitle.length}/70</p>
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta description</Label>
                <Textarea
                  id="metaDescription"
                  value={form.seo.metaDescription}
                  onChange={(e) => updateSeo('metaDescription', e.target.value)}
                  rows={3}
                  maxLength={180}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-slate-500">{form.seo.metaDescription.length}/180</p>
              </div>
              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={form.seo.keywords}
                  onChange={(e) => updateSeo('keywords', e.target.value)}
                  placeholder="comma, separated, keywords"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Section>

          <div className="sticky bottom-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-4 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.3)]">
            <div className="flex-1 text-sm text-slate-600">
              {form.title && form.scheduledFor ? (
                <>
                  Scheduled for{' '}
                  <span className="font-semibold text-primary">
                    {new Date(form.scheduledFor).toLocaleString()}
                  </span>
                </>
              ) : (
                'Add a title and date to schedule.'
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Link
                to="/admin/webinars"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? 'Saving...' : isEdit ? 'Update webinar' : 'Schedule webinar'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminWebinarEditorPage;
