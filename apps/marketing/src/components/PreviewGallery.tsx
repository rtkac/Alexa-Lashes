import { PhotoProvider, PhotoView } from 'react-photo-view';

import type { Gallery } from '@/types';

type PreviewGalleryProps = {
  gallery: Gallery[];
};

const PreviewGallery = ({ gallery }: PreviewGalleryProps) => {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      itemScope
      itemType="http://schema.org/ImageGallery"
    >
      <PhotoProvider>
        {gallery.map(({ src, name }) => (
          <PhotoView key={name} src={src}>
            <button
              type="button"
              className="group block h-40 w-full max-sm:last:odd:col-span-2 max-sm:last:odd:h-64 appearance-none overflow-hidden rounded-md border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong md:h-50"
              itemScope
              itemType="http://schema.org/ImageObject"
            >
              <img
                src={src}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                loading="lazy"
                itemProp="contentUrl"
              />
            </button>
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
};

export default PreviewGallery;
