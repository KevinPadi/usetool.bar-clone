export function getDeviceInfo() {
  const ua =
    typeof navigator !== "undefined" && navigator.userAgent
      ? navigator.userAgent
      : "";
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;

  let browser = "Unknown";
  let browserVersion = "Unknown";
  let os = "Unknown";
  const deviceType = /Mobi|Android/i.test(ua) ? "mobile" : "desktop";

  if (/Chrome\/([\d.]+)/.test(ua)) {
    browser = "Chrome";
    browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown";
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    browser = "Firefox";
    browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown";
  } else if (/Safari\/([\d.]+)/.test(ua) && !/Chrome/.test(ua)) {
    browser = "Safari";
    browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
  }

  if (/Win/.test(ua)) os = "Windows";
  else if (/Mac/.test(ua)) os = "MacOS";
  else if (/Linux/.test(ua)) os = "Linux";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad/.test(ua)) os = "iOS";

  return {
    userAgent: ua,
    os,
    browser,
    browserVersion,
    deviceType,
    language: typeof navigator !== "undefined" ? navigator.language : "Unknown",
    screenWidth: width,
    screenHeight: height,
    hardwareConcurrency:
      typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 0 : 0,
  };
}
