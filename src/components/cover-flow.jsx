import { motion, AnimatePresence } from 'framer-motion';

function CoverFlow({ currentIndex, albums, direction }) {
  const getVisibleAlbums = () => {
    const buffer = [];
    const totalAlbums = albums.length;
    for (let i = -1;i <= 1;i++) {
      const index = ((currentIndex + i) % totalAlbums + totalAlbums) % totalAlbums;
      buffer.push({
        ...albums[index],
        virtualIndex: i
      });
    }
    return buffer;
  };

  return (
    <div className="cover-container w-full h-full flex items-center justify-center">
      <AnimatePresence initial={false} custom={direction}>
        {getVisibleAlbums().map((album) => {
          const isCenter = album.virtualIndex === 0;
          const offset = album.virtualIndex;

          return (
            <motion.div
              key={`${album.id}-${offset}`}
              className="album-cover absolute"
              custom={direction}
              initial={(direction) => ({
                x: direction > 0 ? 200 : -200,
                rotateY: direction > 0 ? 45 : -45,
                scale: 0.7,
                opacity: 0
              })}
              animate={{
                x: offset * 160,
                rotateY: isCenter ? 0 : offset > 0 ? 45 : -45,
                scale: isCenter ? 1 : 0.7,
                opacity: 1,
                zIndex: isCenter ? 2 : 1
              }}
              exit={(direction) => ({
                x: direction > 0 ? -200 : 200,
                rotateY: direction > 0 ? -45 : 45,
                scale: 0.7,
                opacity: 0
              })}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              style={{
                transformOrigin: `${offset > 0 ? 'left' : 'right'} center`
              }}
            >
              <img
                src={album.cover}
                alt={album.title}
                className="w-48 h-48 rounded-lg shadow-xl"
                style={{
                  filter: `brightness(${isCenter ? 100 : 70}%)`
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default CoverFlow;