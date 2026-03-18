import { PhotoProvider, PhotoView } from "react-photo-view";

const PreviewGallery = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <PhotoProvider>
        <PhotoView src="https://placehold.co/212x200/4a413a/4a413a">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img
              src="https://placehold.co/212x200/4a413a/4a413a"
              alt="1"
              className="h-full w-full object-cover"
            />
          </div>
        </PhotoView>
        <PhotoView src="https://placehold.co/212x200/4a413a/4a413a">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img
              src="https://placehold.co/212x200/4a413a/4a413a"
              alt="2"
              className="h-full w-full object-cover"
            />
          </div>
        </PhotoView>
        <PhotoView src="https://placehold.co/212x200/4a413a/4a413a">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img
              src="https://placehold.co/212x200/4a413a/4a413a"
              alt="3"
              className="h-full w-full object-cover"
            />
          </div>
        </PhotoView>
        <PhotoView src="https://placehold.co/212x200/4a413a/4a413a">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img
              src="https://placehold.co/212x200/4a413a/4a413a"
              alt="4"
              className="h-full w-full object-cover"
            />
          </div>
        </PhotoView>
        <PhotoView src="https://placehold.co/212x200/4a413a/4a413a">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img
              src="https://placehold.co/212x200/4a413a/4a413a"
              alt="5"
              className="h-full w-full object-cover"
            />
          </div>
        </PhotoView>
      </PhotoProvider>
    </div>
  );
};

export default PreviewGallery;
