import assert from "node:assert/strict";
import {
  BYTEPLUS_DEFAULT_MODEL,
  getByteplusBaseUrl,
  getByteplusChatUrl,
  getByteplusModel,
} from "../open-sse/config/byteplus.js";

const STANDARD = "https://ark.ap-southeast.bytepluses.com/api/v3";
const CODING = "https://ark.ap-southeast.bytepluses.com/api/coding/v3";

// legacy connection (no providerSpecificData) stays on the coding surface
assert.equal(getByteplusBaseUrl(undefined), CODING);
assert.equal(getByteplusChatUrl({}), `${CODING}/chat/completions`);
assert.equal(getByteplusChatUrl({ endpointMode: "coding" }), `${CODING}/chat/completions`);

assert.equal(getByteplusBaseUrl({ endpointMode: "standard" }), STANDARD);
assert.equal(getByteplusChatUrl({ endpointMode: "standard" }), `${STANDARD}/chat/completions`);

// unknown mode is not trusted
assert.equal(getByteplusChatUrl({ endpointMode: "bogus" }), `${CODING}/chat/completions`);

assert.equal(getByteplusModel({}, BYTEPLUS_DEFAULT_MODEL), BYTEPLUS_DEFAULT_MODEL);
assert.equal(getByteplusModel({ model: "  glm-4-7-251222 " }, null), "glm-4-7-251222");
assert.equal(getByteplusModel({ model: "   " }, BYTEPLUS_DEFAULT_MODEL), BYTEPLUS_DEFAULT_MODEL);

console.log("byteplus endpoint mode: ok");
