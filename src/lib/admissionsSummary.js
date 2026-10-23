import { snapshot, schools, programmesFor, has2026 } from './admissions';

// Build-time summary of the same projection used by every programme page.
// Only these small counts are serialized into the homepage React island.
export const admissionsSummary = {
  programmeCount: snapshot.programmes.length,
  score2026Count: snapshot.programmes.filter(has2026).length,
  sourceDate: snapshot.sourceUpdatedAt.slice(0, 10),
  institutions: Object.entries(schools).map(([slug, school]) => ({
    slug, code: school.code, name: school.shortName,
    programmeCount: programmesFor(school.code).length,
    score2026Count: programmesFor(school.code).filter(has2026).length,
  })),
};
