import { useEffect, useReducer } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import Loading from "../../ui/Loading";
import toast from "react-hot-toast";
import { useLanguage } from "../../context/useLanguageContext";
import useImages from "../../hooks/useImages";
import useAlbums from "../../hooks/useAlbums";
import { useNavigate } from "react-router-dom";

const carouselReducer = (state, { type, payload }) => {
  switch (type) {
    case "Next":
      return {
        ...state,
        activeItemIndex: (state.activeItemIndex + 1) % payload,
      };
    case "Prev":
      return {
        ...state,
        activeItemIndex:
          state.activeItemIndex === 0 ? payload - 1 : state.activeItemIndex - 1,
      };
    case "SetIndex":
      return {
        ...state,
        activeItemIndex: payload,
      };
    default:
      return state;
  }
};

function Carousel() {
  const { images, isLoading, isError, error } = useImages();
  const {
    albums,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    error: albumError,
  } = useAlbums();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(carouselReducer, { activeItemIndex: 0 });

  let carouselImages =
    images && images.filter((img) => img.isFeaturedCarousel === true);

  carouselImages = carouselImages && carouselImages.slice(0, 5);

  const prevCarouselItemHandler = () => {
    if (!carouselImages.length) return;
    dispatch({ type: "Prev", payload: carouselImages.length });
  };

  const nextCarouselItemHandeler = () => {
    if (!carouselImages.length) return;
    dispatch({ type: "Next", payload: carouselImages.length });
  };

  const indicatorClickHandler = (id) => {
    const index = carouselImages.findIndex((image) => image._id === id);
    if (index !== -1) dispatch({ type: "SetIndex", payload: index });
  };

  //find subAlbum and album which contains that specific image
  const findSubAlbumAndAlbumByImageId = (imageId) => {
    for (let album of albums) {
      for (let subAlbum of album.subAlbums) {
        const foundImage = subAlbum.images.find((img) => img._id === imageId);
        if (foundImage) {
          return { subAlbumId: subAlbum._id, albumId: album._id };
        }
      }
    }
    return null;
  };

  const imageClickHandler = (imageId) => {
    const subAlbumData = findSubAlbumAndAlbumByImageId(imageId);

    if (subAlbumData) {
      navigate(
        `/albums/${subAlbumData.albumId}/sub-albums/${subAlbumData.subAlbumId}`
      );
    } else {
      toast.error(
        language === "en"
          ? "Image not found in any subAlbum!"
          : "عکس در هیچ زیرآلبومی یافت نشد!"
      );
    }
  };

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      dispatch({ type: "Next", payload: carouselImages.length });
    }, 10000);

    return () => clearInterval(carouselInterval);
  }, [carouselImages]);

  if (isLoading || isAlbumLoading) return <Loading />;
  if (isError || isAlbumError)
    return toast.error(
      error?.response?.data?.message || albumError?.response?.data?.message
    );

  const activeImage = carouselImages[state.activeItemIndex] || [];

  return (
    <div className="w-full dark:bg-zinc-950 transition-all duration-300 py-10">
      <div className="max-w-[500px] mx-auto bg-neutral-100 shadow-3xl dark:shadow-neutral-600 flex items-center justify-center relative p-5 rounded-2xl transition-all duration-300">
        <div className="flex flex-col items-center gap-y-6 w-full">
          <div className="flex items-center justify-between bg-neutral-200">
            <button
              onClick={prevCarouselItemHandler}
              className="min-[475px]:min-w-[40px] min-w-[30px] min-[475px]:h-[40px] h-[30px] rounded-full flex items-center justify-center text-white bg-neutral-800 hover:text-black hover:bg-neutral-500 duration-200 absolute left-0 min-[475px]:left-7"
            >
              <FaCaretLeft className="min-[475px]:size-8 size-5" />
            </button>
            <div
              className={`md:min-w-[300px] min-w-fit flex items-center justify-center h-full rounded-lg `}
            >
              <button onClick={() => imageClickHandler(activeImage._id)}>
                <img
                  src={`${activeImage.url}`}
                  alt=""
                  className="object-contain shadow-3xl w-[326px] h-[456px]"
                />
              </button>
            </div>
            <button
              onClick={nextCarouselItemHandeler}
              className="min-[475px]:min-w-[40px] min-w-[30px] min-[475px]:h-[40px] h-[30px] rounded-full flex items-center justify-center text-white bg-neutral-800 hover:text-black hover:bg-neutral-500 duration-200 absolute right-0 min-[475px]:right-7"
            >
              <FaCaretRight className="min-[475px]:size-8 size-5" />
            </button>
          </div>
          <div
            className="flex items-center justify-center gap-x-3 filmstrip w-full sm:gap-x-6"
            style={{ direction: "ltr" }}
          >
            {carouselImages.map((img) => (
              <button
                key={img._id}
                onClick={() => indicatorClickHandler(img._id)}
              >
                <img
                  src={`${img.url}`}
                  alt=""
                  className={`border-2 border-transparent w-[70px] h-[100px] object-cover transition-opacity ${
                    img._id === activeImage._id ? "opacity-100" : "opacity-30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
