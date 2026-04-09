import { PhotoProvider, PhotoView } from "react-photo-view";

import type { Gallery } from "@/types";

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
            <div
              className="h-40 overflow-hidden rounded-md hover:cursor-pointer md:h-50"
              itemScope
              itemType="http://schema.org/ImageObject"
            >
              <img
                src={src}
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
                itemProp="contentUrl"
              />
            </div>
          </PhotoView>
        ))}
      </PhotoProvider>
    </div>
  );
};

export default PreviewGallery;
