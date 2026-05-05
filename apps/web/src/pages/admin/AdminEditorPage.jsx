import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Save,
  Upload,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Tag,
  Globe,
  Loader2,
  Rocket,
  Clock,
  Calendar as CalendarIcon,
  FileText,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import api, { resolveImageUrl } from '@/lib/apiClient';
import { ALL_INDUSTRIES, ALL_RESOURCES } from '@/lib/tracks.js';

const slugify = (str) =>
  String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

// Format a Date (or ISO string) for <input type="datetime-local"> — keeps the local timezone.
const toLocalInputValue = (value) => {
  const d = value ? new Date(value) : new Date();
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const emptyForm = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: '',
  track: '',
  author: '',
  publishDate: toLocalInputValue(new Date()),
  coverImage: '',
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: ''
  }
};

// Convert a `track` field value (e.g. 'industries:d2c' or '') into the
// section + sub-slug we render the picker UI from.
const parseTrack = (track) => {
  if (!track || typeof track !== 'string') return { section: 'general', slug: '' };
  const [section, slug] = track.split(':');
  if (section === 'industries' || section === 'resources') {
    return { section, slug: slug || '' };
  }
  return { section: 'general', slug: '' };
};

const TrackPicker = ({ track, onChange }) => {
  const { section, slug } = parseTrack(track);
  const subOptions =
    section === 'industries' ? ALL_INDUSTRIES : section === 'resources' ? ALL_RESOURCES : [];

  const onSectionClick = (next) => {
    if (next === 'general') {
      onChange('');
    } else if (next === 'industries') {
      onChange(`industries:${slug && ALL_INDUSTRIES.some((t) => t.slug === slug) ? slug : ALL_INDUSTRIES[0].slug}`);
    } else {
      onChange(`resources:${slug && ALL_RESOURCES.some((t) => t.slug === slug) ? slug : ALL_RESOURCES[0].slug}`);
    }
  };

  const SectionButton = ({ value, label, icon: Icon }) => {
    const active = section === value;
    return (
      <button
        type="button"
        onClick={() => onSectionClick(value)}
        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
          active
            ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25'
            : 'border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5'
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
    );
  };

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-6 md:p-8 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.2)]">
      <div className="flex items-start gap-3 mb-6">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 flex-shrink-0">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Where does this post live?</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Pick the section first. The post appears on the matching list page under that
            section.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SectionButton value="general" label="Blog (general)" icon={FileText} />
        <SectionButton value="industries" label="Industries" icon={Layers} />
        <SectionButton value="resources" label="Resources" icon={Layers} />
      </div>

      {subOptions.length > 0 && (
        <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
          <Label
            htmlFor="track-sub"
            className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
          >
            {section === 'industries' ? 'Industry' : 'Resource type'}
          </Label>
          <div className="relative mt-2">
            <select
              id="track-sub"
              value={slug}
              onChange={(e) => onChange(`${section}:${e.target.value}`)}
              className="w-full appearance-none rounded-md border border-slate-300 bg-white pl-3 pr-10 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {subOptions.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            This post will appear at{' '}
            <span className="font-mono text-primary">
              /{section}/{slug}
            </span>
            .
          </p>
        </div>
      )}

      {section === 'general' && (
        <p className="mt-4 text-xs text-slate-500">
          Will appear at <span className="font-mono text-primary">/blogs</span> with all general
          posts.
        </p>
      )}
    </section>
  );
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

const AdminEditorPage = () => {
  const { slug: editSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(editSlug);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [scheduleMode, setScheduleMode] = useState('now'); // 'now' | 'schedule'
  const [scheduledAt, setScheduledAt] = useState('');
  const coverInputRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await api.adminGetBlog(editSlug);
        if (cancelled) return;
        setForm({
          slug: data.slug || '',
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          category: data.category || '',
          track: data.track || '',
          author: data.author || '',
          publishDate: toLocalInputValue(data.publishDate),
          coverImage: data.coverImage || '',
          seo: {
            metaTitle: data.seo?.metaTitle || '',
            metaDescription: data.seo?.metaDescription || '',
            keywords: data.seo?.keywords || '',
            ogImage: data.seo?.ogImage || '',
            canonicalUrl: data.seo?.canonicalUrl || ''
          }
        });
      } catch (err) {
        toast({
          title: 'Failed to load post',
          description: err.message || 'Try again.',
          variant: 'destructive'
        });
        navigate('/admin');
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
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugEdited ? f.slug : slugify(value)
    }));
  };

  const onSlugChange = (value) => {
    setSlugEdited(true);
    update('slug', slugify(value));
  };

  const wordCount = useMemo(
    () => (form.content || '').split(/\s+/).filter(Boolean).length,
    [form.content]
  );

  const uploadCover = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      update('coverImage', res.url);
      if (!form.seo.ogImage) updateSeo('ogImage', res.url);
      toast({ title: 'Image uploaded', description: 'Cover image updated.' });
    } catch (err) {
      toast({
        title: 'Upload failed',
        description: err.message || 'Image must be under 5MB.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Title and content are required.',
        variant: 'destructive'
      });
      return false;
    }
    return true;
  };

  const openPublishDialog = () => {
    if (!validate()) return;
    // Prefill schedule input with the current form.publishDate, rounded up 1 hour from now if empty.
    const defaultSchedule =
      form.publishDate && new Date(form.publishDate).getTime() > Date.now()
        ? form.publishDate
        : toLocalInputValue(new Date(Date.now() + 60 * 60 * 1000));
    setScheduledAt(defaultSchedule);
    setScheduleMode(
      form.publishDate && new Date(form.publishDate).getTime() > Date.now() ? 'schedule' : 'now'
    );
    setPublishDialogOpen(true);
  };

  const save = async (publishDateIso) => {
    setSaving(true);
    setPublishDialogOpen(false);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        publishDate: publishDateIso
      };

      const saved = isEdit
        ? await api.updateBlog(editSlug, payload)
        : await api.createBlog(payload);

      const scheduled = new Date(saved.publishDate).getTime() > Date.now();
      toast({
        title: scheduled
          ? isEdit
            ? 'Post rescheduled'
            : 'Post scheduled'
          : isEdit
          ? 'Post updated'
          : 'Post published',
        description: scheduled
          ? `"${saved.title}" will go live on ${new Date(saved.publishDate).toLocaleString()}.`
          : `"${saved.title}" is live at /blog/${saved.slug}`
      });
      navigate('/admin');
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

  const confirmPublish = () => {
    if (scheduleMode === 'schedule') {
      if (!scheduledAt) {
        toast({
          title: 'Pick a date and time',
          description: 'Choose when this post should go live.',
          variant: 'destructive'
        });
        return;
      }
      const scheduled = new Date(scheduledAt);
      if (Number.isNaN(scheduled.getTime())) {
        toast({ title: 'Invalid date', variant: 'destructive' });
        return;
      }
      if (scheduled.getTime() <= Date.now()) {
        toast({
          title: 'Schedule must be in the future',
          description: 'Pick a date and time later than now, or use Publish now.',
          variant: 'destructive'
        });
        return;
      }
      save(scheduled.toISOString());
    } else {
      save(new Date().toISOString());
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    openPublishDialog();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-slate-500">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
        <p className="mt-3 text-sm">Loading post...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit post' : 'New post'} — Admin · Web2Sales</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {isEdit ? 'Edit post' : 'New post'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {isEdit ? 'Update content, image, and SEO metadata.' : 'Compose a new article for your public blog.'}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Section / track */}
          <TrackPicker track={form.track} onChange={(value) => update('track', value)} />

          {/* Content */}
          <Section icon={Tag} title="Content" description="The body readers will see.">
            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                  Title <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="e.g. Why your homepage needs only one CTA"
                  required
                  className="mt-1.5 text-base"
                />
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
                <div>
                  <Label htmlFor="slug" className="text-sm font-semibold text-slate-700">
                    URL slug
                  </Label>
                  <div className="mt-1.5 flex items-stretch rounded-md border border-slate-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary overflow-hidden">
                    <span className="inline-flex items-center bg-slate-50 px-3 text-sm text-slate-500 border-r border-slate-200 font-mono">
                      /blog/
                    </span>
                    <input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => onSlugChange(e.target.value)}
                      placeholder="auto-generated-from-title"
                      className="flex-1 px-3 py-2 text-sm outline-none font-mono"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    The permalink of the article. Auto-generated from the title, edit if needed.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => update('excerpt', e.target.value)}
                  placeholder="A 1-2 sentence summary shown on cards and search results."
                  rows={3}
                  className="mt-1.5"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="content" className="text-sm font-semibold text-slate-700">
                    Body <span className="text-rose-500">*</span>
                  </Label>
                  <span className="text-xs text-slate-400">{wordCount} words</span>
                </div>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => update('content', e.target.value)}
                  placeholder="Write your article here. Separate paragraphs with blank lines."
                  rows={18}
                  required
                  className="mt-1.5 font-mono text-sm leading-relaxed"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Plain text. Blank lines create new paragraphs on the published page.
                </p>
              </div>
            </div>
          </Section>

          {/* Meta */}
          <Section
            icon={ImageIcon}
            title="Cover image & metadata"
            description="Image shown at the top of the post and in share previews."
          >
            <div className="space-y-5">
              <div>
                <Label className="text-sm font-semibold text-slate-700">Cover image</Label>
                <div className="mt-2 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="h-32 w-56 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                    {form.coverImage ? (
                      <img
                        src={resolveImageUrl(form.coverImage)}
                        alt="Cover"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-slate-400 text-xs px-4">
                        <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-50" />
                        No image selected
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadCover(file);
                        e.target.value = '';
                      }}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2"
                      >
                        {uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        {form.coverImage ? 'Replace image' : 'Upload image'}
                      </Button>
                      {form.coverImage && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => update('coverImage', '')}
                          className="inline-flex items-center gap-2 rounded-full text-rose-600 hover:bg-rose-50 text-sm font-semibold px-4 py-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      JPG, PNG, WebP, GIF, or SVG · max 5 MB. Stored in the server's image folder.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-semibold text-slate-700">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => update('category', e.target.value)}
                    placeholder="e.g. Conversion, SEO"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="author" className="text-sm font-semibold text-slate-700">
                    Author
                  </Label>
                  <Input
                    id="author"
                    value={form.author}
                    onChange={(e) => update('author', e.target.value)}
                    placeholder="e.g. Nitin Verma"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="publishDate" className="text-sm font-semibold text-slate-700">
                    Publish date &amp; time
                  </Label>
                  <Input
                    id="publishDate"
                    type="datetime-local"
                    value={form.publishDate}
                    onChange={(e) => update('publishDate', e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Posts with a future date stay hidden until that moment. Use the Publish button
                    to publish now or confirm a schedule.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* SEO */}
          <Section
            icon={Globe}
            title="SEO & social"
            description="These fields control how the post appears on Google and shared links."
          >
            <div className="space-y-5">
              <div>
                <Label htmlFor="metaTitle" className="text-sm font-semibold text-slate-700">
                  Meta title
                </Label>
                <Input
                  id="metaTitle"
                  value={form.seo.metaTitle}
                  onChange={(e) => updateSeo('metaTitle', e.target.value)}
                  placeholder="Defaults to post title if empty"
                  maxLength={70}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {form.seo.metaTitle.length}/70 · ideal length is 50-60 characters.
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription" className="text-sm font-semibold text-slate-700">
                  Meta description
                </Label>
                <Textarea
                  id="metaDescription"
                  value={form.seo.metaDescription}
                  onChange={(e) => updateSeo('metaDescription', e.target.value)}
                  placeholder="Shown under the title in search results"
                  rows={3}
                  maxLength={180}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {form.seo.metaDescription.length}/180 · ideal length is 150-160 characters.
                </p>
              </div>

              <div>
                <Label htmlFor="keywords" className="text-sm font-semibold text-slate-700">
                  Keywords
                </Label>
                <Input
                  id="keywords"
                  value={form.seo.keywords}
                  onChange={(e) => updateSeo('keywords', e.target.value)}
                  placeholder="comma, separated, keywords"
                  className="mt-1.5"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ogImage" className="text-sm font-semibold text-slate-700">
                    Social share image URL
                  </Label>
                  <Input
                    id="ogImage"
                    value={form.seo.ogImage}
                    onChange={(e) => updateSeo('ogImage', e.target.value)}
                    placeholder="Defaults to cover image"
                    className="mt-1.5 font-mono text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="canonicalUrl" className="text-sm font-semibold text-slate-700">
                    Canonical URL
                  </Label>
                  <Input
                    id="canonicalUrl"
                    value={form.seo.canonicalUrl}
                    onChange={(e) => updateSeo('canonicalUrl', e.target.value)}
                    placeholder="https://yourdomain.com/blog/slug"
                    className="mt-1.5 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </Section>

          <div className="sticky bottom-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-4 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.3)]">
            <div className="flex-1 text-sm text-slate-600">
              {form.title ? (
                <>
                  Saving as{' '}
                  <span className="font-mono text-primary">
                    /blog/{form.slug || 'untitled'}
                  </span>
                </>
              ) : (
                'Add a title to generate a URL.'
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Link
                to="/admin"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? 'Saving...' : isEdit ? 'Update post' : 'Publish'}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              {isEdit ? 'Update & publish' : 'Publish post'}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Choose when this article should go live.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3">
            <button
              type="button"
              onClick={() => setScheduleMode('now')}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                scheduleMode === 'now'
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                  scheduleMode === 'now'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Rocket className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-900">Publish now</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Make this post live the moment you confirm.
                </span>
              </span>
              <span
                className={`mt-1.5 h-4 w-4 flex-shrink-0 rounded-full border-2 ${
                  scheduleMode === 'now'
                    ? 'border-primary bg-primary ring-2 ring-primary/20'
                    : 'border-slate-300'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => setScheduleMode('schedule')}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                scheduleMode === 'schedule'
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                  scheduleMode === 'schedule'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Clock className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-900">
                  Schedule for later
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Pick a future date and time. Post stays hidden until then.
                </span>
              </span>
              <span
                className={`mt-1.5 h-4 w-4 flex-shrink-0 rounded-full border-2 ${
                  scheduleMode === 'schedule'
                    ? 'border-primary bg-primary ring-2 ring-primary/20'
                    : 'border-slate-300'
                }`}
              />
            </button>

            {scheduleMode === 'schedule' && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Label
                  htmlFor="schedule-datetime"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Go live at
                </Label>
                <Input
                  id="schedule-datetime"
                  type="datetime-local"
                  value={scheduledAt}
                  min={toLocalInputValue(new Date(Date.now() + 60 * 1000))}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="mt-2"
                />
                {scheduledAt && (
                  <p className="mt-2 text-xs text-slate-500">
                    Publishes on{' '}
                    <span className="font-semibold text-slate-700">
                      {new Date(scheduledAt).toLocaleString()}
                    </span>
                    .
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="mt-4 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPublishDialogOpen(false)}
              className="rounded-full px-5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmPublish}
              disabled={saving}
              className="rounded-full bg-primary text-primary-foreground px-6 hover:bg-primary/90"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : scheduleMode === 'schedule' ? (
                <>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Publish now
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminEditorPage;
