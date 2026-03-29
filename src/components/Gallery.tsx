import { PhotoProvider, PhotoView } from "react-photo-view";

import type { Gallery as ImageGallery } from "@/types";

const gallery: ImageGallery[] = [
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 1",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 2",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 3",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 4",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 5",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 6",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 7",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 8",
  },
  {
    thumbSrc: "https://placehold.co/212x200/4a413a/4a413a",
    src: "https://placehold.co/1000x1000/4a413a/4a413a",
    name: "Gallery Image 9",
  },
];

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <PhotoProvider>
        {gallery.map(({ thumbSrc, src, name }) => (
          <PhotoView key={name} src={src}>
            <div className="h-40 overflow-hidden rounded-md md:h-50">
              <img src={thumbSrc} alt={name} className="h-full w-full object-cover" />
            </div>
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
};

export default Gallery;
