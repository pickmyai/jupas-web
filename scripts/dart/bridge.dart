import 'dart:convert';
import 'app/lib/models/jupas/dse_result.dart';
import 'app/lib/models/jupas/grade.dart';
import 'app/lib/models/jupas/programme.dart';
import 'app/lib/models/jupas/subject.dart';
import 'app/lib/services/jupas/score_calculator.dart';

// Thin transport only. All selection, weighting and requirements come from
// the app's unmodified Dart sources, copied into the temporary build directory.
Map<String, dynamic> calculate(Map<String, dynamic> input) {
  final p = Programme.fromJson(input['programme'] as Map<String, dynamic>);
  final r = DseResult.fromJson(input['grades'] as Map<String, dynamic>);
  const engine = ScoreCalculator();
  final score = engine.computeScore(r, p);
  final req = engine.meetsMinRequirement(r, p);
  return {
    'total': score.total,
    'approx': score.approx,
    'formula': score.formulaText,
    'requirement': {'kind': req.kind.name, 'reason': req.reason},
    'used': [for (final item in score.used) {
      'subject': item.subject.display,
      'grade': item.grade.label,
      'weight': item.weight,
      'weighted': item.weighted,
    }],
  };
}

String handle(String raw) => jsonEncode(calculate(jsonDecode(raw) as Map<String, dynamic>));

Map<String, dynamic> metadata() => {
  'subjects': [for (final s in Subject.all) {
    'key': s.key, 'display': s.display, 'core': s.isCore,
    'csd': s.isCsd, 'm12': s.isM12,
  }],
  'grades': [for (final g in Grade.values) {'key': g.key, 'label': g.label}],
};
