function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    // 0x01000193 is the FNV prime, >>>0 to force unsigned wrap
    h = (h * 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Generate a 6-char beta access code from a TikTok username.
 * The code is based on username + a secret Cow Juice string.
 *
 * @param {string} username TikTok handle (e.g. 'juiceofacow')
 * @returns {string}        6-char uppercase code (e.g. '1A3B9F')
 */
const generateBetaAccessCode = (username) => {
  const SECRET = 'COW_JUICE_IS_THE_MOST_RETORTED_MILK_ON_EARTH';
  const clean  = username.trim().toLowerCase();
  const hash   = fnv1a(clean + SECRET);

  // Convert to base36, pad to ≥6 chars, take the last 6, then uppercase
  return hash
    .toString(36)
    .padStart(6, '0')
    .slice(-6)
    .toUpperCase();
};

export default generateBetaAccessCode;