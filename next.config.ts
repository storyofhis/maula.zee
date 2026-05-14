import type { NextConfig } from "next";
import os from "os";

/**
 * Automatically detects local network IP addresses (IPv4)
 * to prevent cross-origin dev resource blocking when switching networks.
 */
const getNetworkIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];
  
  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (!networkInterface) continue;
    
    for (const iface of networkInterface) {
      // Use Family 'IPv4' and ignore internal (127.0.0.1)
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
};

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: getNetworkIPs(),
};

export default nextConfig;
