/**
 * Remotion Configuration
 * Optimized for Instagram Reels (1080x1920) and Laptop Hardware (Intel i7-1185G7, 16GB RAM)
 */

import { Config } from "@remotion/cli/config";

// Config.setRspack(true); // Default to Webpack for seamless cross-platform and AppLocker compatibility
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
Config.setConcurrency(2);
