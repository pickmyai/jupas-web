import 'dart:js_interop';
import 'bridge.dart';

@JS('jupasCompute')
external set compute(JSFunction callback);

void main() {
  compute = ((JSString input) => handle(input.toDart).toJS).toJS;
}
