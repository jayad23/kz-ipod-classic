
//import { albums } from "../assets/cover.js";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//const images = albums.map((album) => album.cover);

const RandomFloatingImage = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cambia al siguiente índice
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const randomPosition = () => ({
    x: Math.floor(Math.random() * 20 - 10) + '%',
    y: Math.floor(Math.random() * 20 - 10) + '%',
  });

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <AnimatePresence>
        <motion.img
          key={imageIndex}
          src={images[imageIndex]}
          alt="Random"
          initial={{ scale: 1.2, opacity: 0, ...randomPosition() }}
          animate={{ scale: 1.2, opacity: 1, ...randomPosition() }}
          exit={{ opacity: 0 }}
          transition={{ duration: 6, ease: 'easeInOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </AnimatePresence>
    </div>

  );
};

export default RandomFloatingImage;

