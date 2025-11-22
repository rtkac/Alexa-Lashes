import { PhotoProvider, PhotoView } from "react-photo-view";

const Gallery = () => {
  return (
    <div className="mb-18 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <PhotoProvider>
        <PhotoView src="/home/1.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/1.jpg" alt="1" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/2.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/2.jpg" alt="2" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/3.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/3.jpg" alt="3" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/6.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/6.jpg" alt="4" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/5.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/5.jpg" alt="5" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/2.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/2.jpg" alt="2" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/3.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/3.jpg" alt="3" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/6.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/6.jpg" alt="4" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/5.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/5.jpg" alt="5" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/1.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/1.jpg" alt="1" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/1.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/1.jpg" alt="1" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/2.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/2.jpg" alt="2" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/3.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/3.jpg" alt="3" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/6.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/6.jpg" alt="4" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
        <PhotoView src="/home/5.jpg">
          <div className="h-40 overflow-hidden rounded-md md:h-50">
            <img src="/home/5.jpg" alt="5" className="h-full w-full object-cover" />
          </div>
        </PhotoView>
      </PhotoProvider>
    </div>
  );
};

export default Gallery;
