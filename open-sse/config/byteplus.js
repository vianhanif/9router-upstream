// BytePlus ModelArk exposes the same model catalog on two API surfaces:
//   coding   — Coding Plan subscription (historical default)
//   standard — pay-as-you-go ModelArk API
// The only difference is the path prefix, so a connection picks a mode and
// both the chat path and the model probe derive their URL from it.
export const BYTEPLUS_ENDPOINTS = {
  coding: "https://ark.ap-southeast.bytepluses.com/api/coding/v3",
  standard: "https://ark.ap-southeast.bytepluses.com/api/v3",
};

export const BYTEPLUS_DEFAULT_ENDPOINT_MODE = "coding";

// First entry of the byteplus registry model list; both endpoints serve it.
export const BYTEPLUS_DEFAULT_MODEL = "seed-2-0-pro-260328";

export function resolveByteplusEndpointMode(providerSpecificData) {
  return providerSpecificData?.endpointMode === "standard" ? "standard" : BYTEPLUS_DEFAULT_ENDPOINT_MODE;
}

export function getByteplusBaseUrl(providerSpecificData) {
  return BYTEPLUS_ENDPOINTS[resolveByteplusEndpointMode(providerSpecificData)];
}

export function getByteplusChatUrl(providerSpecificData) {
  return `${getByteplusBaseUrl(providerSpecificData)}/chat/completions`;
}

// Legacy connections carry no `model`; fall back to the caller's registry default.
export function getByteplusModel(providerSpecificData, fallback = null) {
  const model = typeof providerSpecificData?.model === "string" ? providerSpecificData.model.trim() : "";
  return model || fallback;
}
