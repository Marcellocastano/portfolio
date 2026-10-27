import { i18n } from './i18n.model';
import { COMMITS } from './stack/career.model';
import { profile } from './profile.model';

export interface Fact {
  label: string;
  value: string;
}

export interface Competence {
  title: string;
  detail: string;
}

const current = COMMITS.find((c) => c.head);
const firstYear = COMMITS.filter((c) => c.period)
  .map((c) => Number(c.period?.match(/\d{4}/)?.[0]))
  .reduce((min, y) => Math.min(min, y), Infinity);

export const about = {
  title: i18n.about.title(profile.firstName),
  bio: i18n.about.bio,
  factsTitle: i18n.about.factsTitle,
  facts: [
    { label: i18n.about.facts.sede, value: i18n.about.facts.sedeValue(profile.city) },
    { label: i18n.about.facts.oggi, value: current?.message ?? profile.role },
    { label: i18n.about.facts.esperienza, value: i18n.about.facts.esperienzaValue(firstYear) },
    { label: i18n.about.facts.formazione, value: i18n.about.facts.formazioneValue },
    { label: i18n.about.facts.lingue, value: i18n.about.facts.lingueValue },
  ] satisfies Fact[],
  badge: {
    label: i18n.about.badge.label,
    sub: i18n.about.badge.sub,
    fields: [
      { label: i18n.about.badge.fields.dal, value: String(firstYear) },
      { label: i18n.about.badge.fields.sede, value: profile.city },
      { label: i18n.about.badge.fields.stack, value: i18n.about.badge.stackValue },
    ] satisfies Fact[],
    backTitle: i18n.about.badge.backTitle,
    hint: i18n.about.badge.hint,
  },
  competences: i18n.about.competences,
};
