// Headless smoke tests. Run: node test/smoke.test.js
const fs = require("fs"), path = require("path");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const js = html.split("<script>")[1].split("</scr" + "ipt>")[0];

// ---- DOM/canvas stubs ----
const noop = () => {};
const ctxStub = new Proxy({}, { get: (t,p) => (typeof p === "string" ? noop : undefined), set: () => true });
const cvsStub = { width:448, height:560, style:{}, getContext: () => ctxStub, addEventListener: noop };
const nameEntryStub = { classList: { add: noop, remove: noop }, setAttribute: noop, style: {} };
const nameInputStub = { value: "", focus: noop, blur: noop, addEventListener: noop };
const nameSkipStub = { addEventListener: noop };
const els = {
  game: cvsStub,
  nameEntry: nameEntryStub,
  nameInput: nameInputStub,
  nameSkip: nameSkipStub,
};
const windowListeners = {};
function FakeAudioContext() {
  this.state = "running";
  this.destination = {};
  this.currentTime = 0;
  this.createGain = () => ({ gain: { value: 0, setValueAtTime: noop, exponentialRampToValueAtTime: noop }, connect: noop });
  this.createOscillator = () => ({
    type: "square", frequency: { value: 0, linearRampToValueAtTime: noop },
    connect: noop, start: noop, stop: noop,
  });
  this.resume = noop;
}
global.document = { getElementById: (id) => els[id] || null };
global.window = {
  addEventListener: (type, fn) => { windowListeners[type] = fn; },
  innerWidth: 800,
  innerHeight: 900,
  AudioContext: FakeAudioContext,
  webkitAudioContext: FakeAudioContext,
};
global.requestAnimationFrame = noop;
global.fetch = () => Promise.reject(new Error("offline"));

const suite = fs.readFileSync(path.join(__dirname, "suite.js"), "utf8");
eval(js + "\n" + suite);
