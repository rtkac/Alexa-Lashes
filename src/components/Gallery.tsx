import { PhotoProvider, PhotoView } from "react-photo-view";

import { m } from "@/paraglide/messages";
import type { Gallery as ImageGallery } from "@/types";

const galleryWork: ImageGallery[] = [
  {
    thumbSrc: "/1.JPG",
    src: "/1.webp",
    name: "Gallery Image 1",
  },
  {
    thumbSrc: "/3.jpg",
    src: "/3.webp",
    name: "Gallery Image 3",
  },
  {
    thumbSrc: "/2.jpg",
    src: "/2.webp",
    name: "Gallery Image 2",
  },
  {
    thumbSrc: "/4.jpg",
    src: "/4.webp",
    name: "Gallery Image 4",
  },
  {
    thumbSrc: "/0.jpg",
    src: "/0.webp",
    name: "Gallery Image",
  },
  {
    thumbSrc: "/5.jpg",
    src: "/5.webp",
    name: "Gallery Image 5",
  },
  {
    thumbSrc: "/7.jpg",
    src: "/7.webp",
    name: "Gallery Image 7",
  },
  {
    thumbSrc: "/8.jpg",
    src: "/8.webp",
    name: "Gallery Image 8",
  },
  {
    thumbSrc: "/9.JPG",
    src: "/9.webp",
    name: "Gallery Image 9",
  },
  {
    thumbSrc: "/10.jpg",
    src: "/10.webp",
    name: "Gallery Image 10",
  },
  {
    thumbSrc: "/11.jpg",
    src: "/11.webp",
    name: "Gallery Image 11",
  },
  {
    thumbSrc: "/12.jpg",
    src: "/12.webp",
    name: "Gallery Image 12",
  },
  {
    thumbSrc: "/13.JPG",
    src: "/13.webp",
    name: "Gallery Image 13",
  },
  {
    thumbSrc: "/14.jpg",
    src: "/14.jpg",
    name: "Gallery Image 14",
  },
  {
    thumbSrc: "/15.jpg",
    src: "/15.jpg",
    name: "Gallery Image 15",
  },
  {
    thumbSrc: "/16.jpg",
    src: "/16.jpg",
    name: "Gallery Image 16",
  },
  {
    thumbSrc: "/17.JPG",
    src: "/17.JPG",
    name: "Gallery Image 17",
  },
  {
    thumbSrc: "/18.JPG",
    src: "/18.JPG",
    name: "Gallery Image 18",
  },
  {
    thumbSrc: "/19.jpg",
    src: "/19.jpg",
    name: "Gallery Image 19",
  },
  {
    thumbSrc: "/20.JPG",
    src: "/20.JPG",
    name: "Gallery Image 20",
  },
  {
    thumbSrc: "/6.jpg",
    src: "/6.jpg",
    name: "Gallery Image 6",
  },
  {
    thumbSrc: "/21.JPG",
    src: "/21.JPG",
    name: "Gallery Image 21",
  },
  {
    thumbSrc: "/22.jpg",
    src: "/22.jpg",
    name: "Gallery Image 22",
  },
  {
    thumbSrc: "/23.JPG",
    src: "/23.JPG",
    name: "Gallery Image 23",
  },
  {
    thumbSrc: "/24.jpg",
    src: "/24.jpg",
    name: "Gallery Image 24",
  },
  {
    thumbSrc: "/25.jpg",
    src: "/25.jpg",
    name: "Gallery Image 25",
  },
  {
    thumbSrc: "/26.jpg",
    src: "/26.jpg",
    name: "Gallery Image 26",
  },
];

const galleryTraining: ImageGallery[] = [
  {
    thumbSrc: "/course-1.jpg",
    src: "/course-1.webp",
    name: "Gallery Image 1",
  },
  {
    thumbSrc: "/course-2.jpg",
    src: "/course-2.webp",
    name: "Gallery Image 2",
  },
  {
    thumbSrc: "/course-3.jpg",
    src: "/course-3.webp",
    name: "Gallery Image 3",
  },
  {
    thumbSrc: "/course-4.jpg",
    src: "/course-4.webp",
    name: "Gallery Image 4",
  },
  {
    thumbSrc: "/course-5.jpg",
    src: "/course-5.webp",
    name: "Gallery Image 5",
  },
  {
    thumbSrc: "/course-6.jpg",
    src: "/course-6.jpg",
    name: "Gallery Image 6",
  },
  {
    thumbSrc: "/course-7.jpg",
    src: "/course-7.jpg",
    name: "Gallery Image 7",
  },
  {
    thumbSrc: "/course-8.jpg",
    src: "/course-8.jpg",
    name: "Gallery Image 8",
  },
  {
    thumbSrc: "/course-9.jpg",
    src: "/course-9.jpg",
    name: "Gallery Image 9",
  },
  {
    thumbSrc: "/course-10.jpg",
    src: "/course-10.jpg",
    name: "Gallery Image 10",
  },
  {
    thumbSrc: "/course-11.jpg",
    src: "/course-11.jpg",
    name: "Gallery Image 11",
  },
  {
    thumbSrc: "/advanced-training-banner.jpg",
    src: "/advanced-training-banner.webp",
    name: "Gallery Image 12",
  },
  {
    thumbSrc: "/course-13.jpg",
    src: "/course-13.jpg",
    name: "Gallery Image 13",
  },
  {
    thumbSrc: "/course-14.jpg",
    src: "/course-14.jpg",
    name: "Gallery Image 14",
  },
  {
    thumbSrc: "/course-15.jpg",
    src: "/course-15.jpg",
    name: "Gallery Image 15",
  },
  {
    thumbSrc: "/course-16.jpg",
    src: "/course-16.jpg",
    name: "Gallery Image 16",
  },
  {
    thumbSrc: "/course-17.jpg",
    src: "/course-17.jpg",
    name: "Gallery Image 17",
  },
  {
    thumbSrc: "/course-18.jpg",
    src: "/course-18.jpg",
    name: "Gallery Image 18",
  },
  {
    thumbSrc: "/course-19.jpg",
    src: "/course-19.jpg",
    name: "Gallery Image 19",
  },
  {
    thumbSrc: "/course-20.jpg",
    src: "/course-20.jpg",
    name: "Gallery Image 20",
  },
  {
    thumbSrc: "/course-21.jpg",
    src: "/course-21.jpg",
    name: "Gallery Image 21",
  },
  {
    thumbSrc: "/course-22.jpg",
    src: "/course-22.jpg",
    name: "Gallery Image 22",
  },
  {
    thumbSrc: "/course-23.jpg",
    src: "/course-23.jpg",
    name: "Gallery Image 23",
  },
  {
    thumbSrc: "/course-24.jpg",
    src: "/course-24.jpg",
    name: "Gallery Image 24",
  },
  {
    thumbSrc: "/course-25.jpg",
    src: "/course-25.jpg",
    name: "Gallery Image 25",
  },
];

const Gallery = () => {
  return (
    <PhotoProvider>
      <div itemScope itemType="http://schema.org/ImageGallery">
        <h2 className="mb-4 font-bold text-xl md:text-2xl" itemProp="name">
          {m.gallery_work_title()}
        </h2>
        <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryWork.map(({ src, name }) => (
            <PhotoView key={name} src={src}>
              <div
                className="h-40 overflow-hidden rounded-md hover:cursor-pointer md:h-60"
                itemScope
                itemType="http://schema.org/ImageObject"
              >
                <img
                  src={src}
                  alt={name}
                  className="h-full w-full object-cover"
                  itemProp="contentUrl"
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </div>
      <div itemScope itemType="http://schema.org/ImageGallery">
        <h2 className="mb-4 font-bold text-xl md:text-2xl" itemProp="name">
          {m.gallery_training_title()}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryTraining.map(({ src, name }) => (
            <PhotoView key={name} src={src}>
              <div
                className="h-40 overflow-hidden rounded-md hover:cursor-pointer md:h-60"
                itemScope
                itemType="http://schema.org/ImageObject"
              >
                <img
                  src={src}
                  alt={name}
                  className="h-full w-full object-cover"
                  itemProp="contentUrl"
                  loading="lazy"
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </div>
    </PhotoProvider>
  );
};

export default Gallery;
