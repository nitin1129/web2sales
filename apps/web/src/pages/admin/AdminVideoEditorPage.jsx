import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Video as VideoIcon, Globe, Tag, Loader2 } from 'lucide-react';
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

const extractYouTubeId = (url) => {
  if (!url) return null;
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/i
  );
  if (m) return m[1];
  const direct = url.match(/^([\w-]{11})$/);
  return direct ? direct[1] : null;
};

const emptyForm = {
  slug: '',
  title: '',
  description: '',
  youtubeUrl: '',
  tagsInput: '',
  publishDate: new Date().toISOString().slice(0, 10),
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

const AdminVideoEditorPage = () => {
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
        const data = await api.getVideo(editSlug);
        if (cancelled) return;
        setForm({
          slug: data.slug || '',
          title: data.title || '',
          description: data.description || '',
          youtubeUrl: data.youtubeUrl || '',
          tagsInput: (data.tags || []).join(', '),
          publishDate: (data.publishDate || '').slice(0, 10),
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
        navigate('/admin/videos');
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

  const youtubeId = useMemo(() => extractYouTubeId(form.youtubeUrl), [form.youtubeUrl]);
  const previewThumb = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.youtubeUrl.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Title and YouTube URL are required.',
        variant: 'destructive'
      });
      return;
    }
    if (!youtubeId) {
      toast({
        title: 'Invalid YouTube URL',
        description: 'Paste a full YouTube URL or 11-char video ID.',
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
        youtubeUrl: form.youtubeUrl.trim(),
        tags,
        publishDate: form.publishDate
          ? new Date(form.publishDate).toISOString()
          : new Date().toISOString(),
        seo: {
          metaTitle: form.seo.metaTitle.trim(),
          metaDescription: form.seo.metaDescription.trim(),
          keywords: form.seo.keywords.trim()
        }
      };

      const saved = isEdit
        ? await api.updateVideo(editSlug, payload)
        : await api.createVideo(payload);

      toast({
        title: isEdit ? 'Video updated' : 'Video published',
        description: `"${saved.title}" is live at /videos`
      });
      navigate('/admin/videos');
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
        <p className="mt-3 text-sm">Loading video...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit video' : 'New video'} — Admin · Web2Sales</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link
            to="/admin/videos"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to videos
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {isEdit ? 'Edit video' : 'New video'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a YouTube link plus SEO metadata. Thumbnail is fetched from YouTube automatically.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <Section icon={VideoIcon} title="Video" description="Source and basic info.">
            <div className="space-y-5">
              <div>
                <Label htmlFor="title">
                  Title <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="e.g. Auditing a slow D2C site in 12 minutes"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="youtubeUrl">
                  YouTube URL <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="youtubeUrl"
                  value={form.youtubeUrl}
                  onChange={(e) => update('youtubeUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="mt-1.5 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Full URL, youtu.be short link, or 11-character video ID.
                </p>
                {previewThumb && (
                  <div className="mt-3 flex gap-3 items-start">
                    <img
                      src={previewThumb}
                      alt="Video preview"
                      className="h-20 w-32 rounded-lg object-cover border border-slate-200"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-mono text-emerald-700">✓ Detected: {youtubeId}</p>
                      <p className="mt-1">Thumbnail will be fetched from YouTube.</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="slug">URL slug</Label>
                <div className="mt-1.5 flex items-stretch rounded-md border border-slate-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary overflow-hidden">
                  <span className="inline-flex items-center bg-slate-50 px-3 text-sm text-slate-500 border-r border-slate-200 font-mono">
                    /videos/
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
                  placeholder="Short summary shown on the public videos page (2-3 sentences)."
                  rows={4}
                  className="mt-1.5"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publishDate">Publish date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={form.publishDate}
                    onChange={(e) => update('publishDate', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section icon={Tag} title="Tags" description="Comma-separated, used for filtering and SEO.">
            <Input
              value={form.tagsInput}
              onChange={(e) => update('tagsInput', e.target.value)}
              placeholder="conversion, audit, page speed, d2c"
              className="font-mono text-sm"
            />
            <p className="mt-2 text-xs text-slate-500">
              Tip: 3–5 tags work best. Lowercase, comma-separated.
            </p>
          </Section>

          <Section icon={Globe} title="SEO" description="How this video appears on Google + social shares.">
            <div className="space-y-5">
              <div>
                <Label htmlFor="metaTitle">Meta title</Label>
                <Input
                  id="metaTitle"
                  value={form.seo.metaTitle}
                  onChange={(e) => updateSeo('metaTitle', e.target.value)}
                  placeholder="Defaults to video title if empty"
                  maxLength={70}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {form.seo.metaTitle.length}/70 — ideal is 50-60 characters.
                </p>
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta description</Label>
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
                  {form.seo.metaDescription.length}/180 — ideal is 150-160 characters.
                </p>
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
              {form.title ? (
                <>
                  Saving as{' '}
                  <span className="font-mono text-primary">
                    /videos/{form.slug || 'untitled'}
                  </span>
                </>
              ) : (
                'Add a title to generate a URL.'
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Link
                to="/admin/videos"
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
                {saving ? 'Saving...' : isEdit ? 'Update video' : 'Publish video'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminVideoEditorPage;
