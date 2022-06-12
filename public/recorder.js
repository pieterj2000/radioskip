
class Recorder extends AudioWorkletProcessor {
    process (inputs, outputs, parameters) {
      console.log("hoi");
    }
}

registerProcessor('recorder', Recorder);