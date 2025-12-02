// Import all orchid images from assets
import lan1 from '../assets/lan1.jpg';
import lan2 from '../assets/lan2.jpg';
import lan3 from '../assets/lan3.jpg';
import lan4 from '../assets/lan4.jpg';
import lan5 from '../assets/lan5.jpg';
import lan6 from '../assets/lan6.jpg';
import lan7 from '../assets/lan7.webp';
import lan8 from '../assets/lan8.jpg';
import lan9 from '../assets/lan9.webp';
import lan10 from '../assets/lan10.jpg';
import lan11 from '../assets/lan11.jpg';
import lan12 from '../assets/lan12.jpg';
import lan13 from '../assets/lan13.jpg';
import lan14 from '../assets/lan14.jpg';
import lan15 from '../assets/lan15.jpg';
import lan16 from '../assets/lan16.jpg';
import lan17 from '../assets/lan17.jpg';
import lan18 from '../assets/lan18.jpg';
import lan19 from '../assets/lan19.jpg';
import lan20 from '../assets/lan20.jpg';

// Map orchid ID to local images
export const orchidImages = {
    '1': lan1,
    '2': lan2,
    '3': lan3,
    '4': lan4,
    '5': lan5,
    '6': lan6,
    '7': lan7,
    '8': lan8,
    '9': lan9,
    '10': lan10,
    '11': lan11,
    '12': lan12,
    '13': lan13,
    '14': lan14,
    '15': lan15,
    '16': lan16,
    '17': lan17,
    '18': lan18,
    '19': lan19,
    '20': lan20,
};

// Get local image or fallback to provided URL
export const getOrchidImage = (orchid) => {
    // If orchid.image is a number/string key in orchidImages (e.g., "1", "2", "3")
    if (orchid.image && orchidImages[orchid.image]) {
        return orchidImages[orchid.image];
    }

    // If orchid has a local image mapped by ID, use it
    if (orchid.id && orchidImages[orchid.id]) {
        return orchidImages[orchid.id];
    }

    // If it's a URL (starts with http), use it
    if (orchid.image && (orchid.image.startsWith('http://') || orchid.image.startsWith('https://'))) {
        return orchid.image;
    }

    // Default fallback
    return lan1;
};// Get random image for new orchids
export const getRandomOrchidImage = () => {
    const imageKeys = Object.keys(orchidImages);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return orchidImages[randomKey];
};
