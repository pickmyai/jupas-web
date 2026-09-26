import { snapshot, schools, slugFor, programmePath, institutionNames } from './admissions';

// Homepage chips: programmes with the most Band A applicants (JUPAS 2025),
// at most two per institution so the links spread across schools.
export function popularProgrammes(limit = 12, perInstitution = 2) {
  const taken = {};
  return snapshot.programmes
    .filter(p => p.band_a_apply > 0 && slugFor(p.institution))
    .sort((a, b) => b.band_a_apply - a.band_a_apply)
    .filter(p => (taken[p.institution] = (taken[p.institution] ?? 0) + 1) <= perInstitution)
    .slice(0, limit)
    .map(p => {
      const school = schools[slugFor(p.institution)];
      const uni = school.shortName === '自資院校' ? (institutionNames[p.institution] ?? p.institution).replace(/^香港/, '') : school.shortName;
      const title = p.title.replace(/\s*\(.*$|（.*$/, '');
      return { href: programmePath(p), label: `${uni} ${title}`, code: p.js_code };
    });
}
