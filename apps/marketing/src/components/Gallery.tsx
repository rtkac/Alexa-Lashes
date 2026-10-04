import { PhotoProvider, PhotoView } from 'react-photo-view';

import { m } from '@/paraglide/messages';
import type { Gallery as ImageGallery } from '@/types';

const galleryWork: ImageGallery[] = [
  {
    src: '/1.webp',
    name: 'Gallery Image 1',
  },
  {
    src: '/3.webp',
    name: 'Gallery Image 3',
  },
  {
    src: '/2.webp',
    name: 'Gallery Image 2',
  },
  {
    src: '/4.webp',
    name: 'Gallery Image 4',
  },
  {
    src: '/0.webp',
    name: 'Gallery Image',
  },
  {
    src: '/5.webp',
    name: 'Gallery Image 5',
  },
  {
    src: '/7.webp',
    name: 'Gallery Image 7',
  },
  {
    src: '/8.webp',
    name: 'Gallery Image 8',
  },
  {
    src: '/9.webp',
    name: 'Gallery Image 9',
  },
  {
    src: '/10.webp',
    name: 'Gallery Image 10',
  },
  {
    src: '/11.webp',
    name: 'Gallery Image 11',
  },
  {
    src: '/12.webp',
    name: 'Gallery Image 12',
  },
  {
    src: '/13.webp',
    name: 'Gallery Image 13',
  },
  {
    src: '/14.webp',
    name: 'Gallery Image 14',
  },
  {
    src: '/15.webp',
    name: 'Gallery Image 15',
  },
  {
    src: '/16.webp',
    name: 'Gallery Image 16',
  },
  {
    src: '/17.webp',
    name: 'Gallery Image 17',
  },
  {
    src: '/18.webp',
    name: 'Gallery Image 18',
  },
  {
    src: '/19.webp',
    name: 'Gallery Image 19',
  },
  {
    src: '/20.webp',
    name: 'Gallery Image 20',
  },
  {
    src: '/6.webp',
    name: 'Gallery Image 6',
  },
  {
    src: '/21.webp',
    name: 'Gallery Image 21',
  },
  {
    src: '/22.webp',
    name: 'Gallery Image 22',
  },
  {
    src: '/23.webp',
    name: 'Gallery Image 23',
  },
  {
    src: '/24.webp',
    name: 'Gallery Image 24',
  },
  {
    src: '/25.webp',
    name: 'Gallery Image 25',
  },
  {
    src: '/26.webp',
    name: 'Gallery Image 26',
  },
];

const galleryTraining: ImageGallery[] = [
  {
    src: '/course-1.webp',
    name: 'Gallery Image 1',
  },
  {
    src: '/course-2.webp',
    name: 'Gallery Image 2',
  },
  {
    src: '/course-3.webp',
    name: 'Gallery Image 3',
  },
  {
    src: '/course-4.webp',
    name: 'Gallery Image 4',
  },
  {
    src: '/course-5.webp',
    name: 'Gallery Image 5',
  },
  {
    src: '/course-6.webp',
    name: 'Gallery Image 6',
  },
  {
    src: '/course-7.webp',
    name: 'Gallery Image 7',
  },
  {
    src: '/course-8.webp',
    name: 'Gallery Image 8',
  },
  {
    src: '/course-9.webp',
    name: 'Gallery Image 9',
  },
  {
    src: '/course-10.webp',
    name: 'Gallery Image 10',
  },
  {
    src: '/course-11.webp',
    name: 'Gallery Image 11',
  },
  {
    src: '/advanced-training-banner.webp',
    name: 'Gallery Image 12',
  },
  {
    src: '/course-13.webp',
    name: 'Gallery Image 13',
  },
  {
    src: '/course-14.webp',
    name: 'Gallery Image 14',
  },
  {
    src: '/course-15.webp',
    name: 'Gallery Image 15',
  },
  {
    src: '/course-16.webp',
    name: 'Gallery Image 16',
  },
  {
    src: '/course-17.webp',
    name: 'Gallery Image 17',
  },
  {
    src: '/course-18.webp',
    name: 'Gallery Image 18',
  },
  {
    src: '/course-19.webp',
    name: 'Gallery Image 19',
  },
  {
    src: '/course-20.webp',
    name: 'Gallery Image 20',
  },
  {
    src: '/course-21.webp',
    name: 'Gallery Image 21',
  },
  {
    src: '/course-22.webp',
    name: 'Gallery Image 22',
  },
  {
    src: '/course-23.webp',
    name: 'Gallery Image 23',
  },
  {
    src: '/course-24.webp',
    name: 'Gallery Image 24',
  },
  {
    src: '/course-25.webp',
    name: 'Gallery Image 25',
  },
];

type GalleryGridProps = {
  title: string;
  images: ImageGallery[];
  eagerCount?: number;
};

const GalleryGrid = ({ title, images, eagerCount = 0 }: GalleryGridProps) => {
  return (
    <div itemScope itemType="http://schema.org/ImageGallery">
      <h2 className="mb-4 font-bold text-xl md:text-2xl" itemProp="name">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map(({ src, name }, index) => (
          <PhotoView key={name} src={src}>
            <button
              type="button"
              className="group block h-40 w-full appearance-none overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong md:h-60"
              itemScope
              itemType="http://schema.org/ImageObject"
            >
              <img
                src={src}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                itemProp="contentUrl"
                loading={index < eagerCount ? 'eager' : 'lazy'}
              />
            </button>
          </PhotoView>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <PhotoProvider>
      <div className="space-y-14">
        <GalleryGrid title={m.gallery_work_title()} images={galleryWork} eagerCount={4} />
        <GalleryGrid title={m.gallery_training_title()} images={galleryTraining} />
      </div>
    </PhotoProvider>
  );
};

export default Gallery;
