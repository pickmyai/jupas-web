import 'dart:convert';
import 'dart:io';
import 'bridge.dart';

void main(List<String> args) {
  if (args.contains('--metadata')) {
    stdout.write(jsonEncode(metadata()));
    return;
  }
  for (String? line; (line = stdin.readLineSync()) != null;) {
    stdout.writeln(handle(line!));
  }
}
