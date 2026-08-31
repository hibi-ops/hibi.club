'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { SITE } from '@/content/site';
import type { FormCopy } from '@/content/types';

type Role = 'merchant' | 'creator';

/**
 * Early-access form.
 * - If NEXT_PUBLIC_FORM_ENDPOINT is set (Formspree / Tally / Basin / own API), POSTs JSON there.
 * - Otherwise falls back to a prefilled mailto: — zero backend, nothing stored on the site.
 */
export default function AccessForm({ t, initialRole = 'merchant', lang }: { t: FormCopy; initialRole?: Role; lang: string }) {
  const [role, setRole] = useState<Role>(initialRole);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  /* A cap carried over from the estimator. The visitor already chose it, so the
     form's job is to show it back, not to ask for it again. Read after mount so
     the prerendered HTML stays identical for every visitor. */
  const [cap, setCap] = useState<string | null>(null);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('cap');
    if (v && /^\d{1,6}$/.test(v)) setCap(v);
  }, []);
  const hasEndpoint = Boolean(SITE.formEndpoint);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data._gotcha) return; // honeypot
    const payload = { ...data, role, lang, page: typeof location !== 'undefined' ? location.pathname : '' };

    if (!hasEndpoint) {
      const subject = `Hibi early access — ${role} — ${data.name || ''}`;
      const body = Object.entries(payload).filter(([k]) => k !== '_gotcha').map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState('done');
      return;
    }
    try {
      setState('sending');
      const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(String(r.status));
      setState('done');
      form.reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="form-ok" role="status">
        {/* a confirmation is a state the visitor lands in, not a dead end:
            it gets the same icon language as the rest of the page */}
        <span className="ok-mark" aria-hidden="true"><Icon name="check" size={18} /></span>
        <h3 className="h2" style={{ marginTop: 'var(--s2)' }}>{t.done.title}</h3>
        <p className="lead sec-body tight">{t.done.body}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      {cap && (
        <p className="form-progress" role="status">
          <span className="fp-bar" aria-hidden="true"><i style={{ width: '50%' }} /></span>
          {t.progress} · {t.capPrefix} ${cap}
        </p>
      )}
      <div className="field full">
        <label>{t.role.merchant} / {t.role.creator}</label>
        <div className="seg" role="group">
          <button type="button" aria-pressed={role === 'merchant'} onClick={() => setRole('merchant')}>{t.role.merchant}</button>
          <button type="button" aria-pressed={role === 'creator'} onClick={() => setRole('creator')}>{t.role.creator}</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-name">{t.fields.name}</label>
        <input id="f-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="f-email">{t.fields.email}</label>
        <input id="f-email" name="email" type="email" required autoComplete="email" inputMode="email" />
      </div>
      <div className="field">
        <label htmlFor="f-org">{role === 'merchant' ? t.fields.business : t.fields.handle}</label>
        <input id="f-org" name={role === 'merchant' ? 'business' : 'handle'} required />
      </div>
      <div className="field">
        <label htmlFor="f-hood">{t.fields.neighborhood}</label>
        <input id="f-hood" name="neighborhood" autoComplete="address-level2" defaultValue={t.hoodDefault} />
      </div>
      <div className="field full">
        <label htmlFor="f-note">{t.fields.note}</label>
        <textarea id="f-note" name="note" placeholder={t.fields.notePlaceholder} />
      </div>
      {cap && <input type="hidden" name="monthlyCap" value={cap} />}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="sr" aria-hidden="true" />
      <div className="form-foot">
        <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
          {state === 'sending' ? t.submitting : t.submit} <span className="arr" aria-hidden="true">→</span>
        </button>
        <p className="form-note">{state === 'error' ? t.error : (hasEndpoint ? '' : t.fallbackNote)}</p>
      </div>
    </form>
  );
}
