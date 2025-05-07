import { isMobile, isTablet, isBrowser, osName, osVersion, browserName, browserVersion } from "react-device-detect";

const getUserMetadata = async () => {

    let deviceType = null;
    let os = null;
    let browser = null;

    // Set device type, OS, and browser metadata
    deviceType = isMobile ? "Mobile" : isTablet ? "Tablet" : isBrowser ? "Desktop" : "Unknown";
    os = `${osName} ${osVersion}`;
    browser = `${browserName} ${browserVersion}`;

    return { deviceType, os, browser };
};

export default getUserMetadata;