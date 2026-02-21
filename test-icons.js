import * as icons from 'lucide-react';
const needed = ['Zap', 'Compass', 'Wand2', 'Smile', 'Fingerprint', 'Video', 'Clapperboard', 'Users', 'Castle', 'Landmark', 'Ghost', 'Music', 'Search', 'Heart', 'Rocket', 'Tv', 'Eye', 'Shield', 'Sun', 'Gamepad', 'Newspaper', 'Radio', 'Coffee', 'MessageCircle', 'Globe', 'Swords', 'Skull', 'Sparkles', 'Siren'];
const missing = needed.filter(n => !icons[n]);
console.log("Missing icons:", missing);
