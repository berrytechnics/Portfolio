// Helper function to convert hex to HSL
export function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [h * 360, s * 100, l * 100];
}

// Optimized HSL to hex conversion with caching
const hslToHexCache = new Map();
export function hslToHex(h, s, l) {
  const key = `${Math.round(h)}_${Math.round(s)}_${Math.round(l)}`;
  if (hslToHexCache.has(key)) {
    return hslToHexCache.get(key);
  }
  
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  const hex = `#${f(0)}${f(8)}${f(4)}`;
  
  // Limit cache size to prevent memory issues
  if (hslToHexCache.size > 1000) {
    const firstKey = hslToHexCache.keys().next().value;
    hslToHexCache.delete(firstKey);
  }
  hslToHexCache.set(key, hex);
  return hex;
}

