export const calculateTotalImageSpacePercentage = (): number => {
  const images = listImagesInPage();
  const totalImageSpace = images.reduce((sum, image) => sum + image.size, 0);
  const totalPageSpace = document.body.scrollHeight * document.body.scrollWidth;
  return totalImageSpace / totalPageSpace;
}

interface Image {
  width: number;
  height: number;
  size: number;
}

const listImagesInPage = (): Image[] => {
  const images = document.getElementsByTagName("img");
  const imageList: Image[] = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const width = image.width;
    const height = image.height;
    const size = width * height;
    imageList.push({
      width,
      height,
      size
    });
  }
  return imageList;
}
