// placeholder — assertions land next
let failures = [];
const assert = (cond, msg) => { if (!cond) failures.push(msg); else console.log('PASS:', msg); };
