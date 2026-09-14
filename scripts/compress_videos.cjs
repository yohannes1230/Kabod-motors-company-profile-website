const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { execSync } = require('child_process');
const fs = require('fs');

console.log('Using ffmpeg from:', ffmpeg.path);

const videos = [
  {
    input: 'public/images/hero-showcase.mp4',
    output: 'public/images/hero-showcase-compressed.mp4'
  },
  {
    input: 'public/images/fleet-operations-loop.mp4',
    output: 'public/images/fleet-operations-loop-compressed.mp4'
  }
];

for (const v of videos) {
  const originalSize = fs.statSync(v.input).size;
  console.log(`\nCompressing ${v.input} (Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);
  
  // Re-encode with H.264, crf 29, preset medium, scale max width 1280, 24fps, no audio
  const cmd = `"${ffmpeg.path}" -y -i "${v.input}" -vcodec libx264 -crf 29 -preset medium -vf "scale='min(1280,iw)':-2" -an -movflags +faststart "${v.output}"`;
  execSync(cmd, { stdio: 'inherit' });

  const newSize = fs.statSync(v.output).size;
  console.log(`Compressed size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
}
