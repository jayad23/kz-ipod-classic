export const getOnlyImages = (albums) => {
  const images = albums.map((album) => album.cover);
  return images;
};

export const getSongsImages = (songs) => {
  const images = songs.map((album) => album.img);
  return images;
};
