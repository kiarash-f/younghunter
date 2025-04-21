import { useLanguage } from "../../context/useLanguageContext";
import useAlbums from "../../hooks/useAlbums";
import { LazyLoading } from "../../ui/Loading";
import FooterNavlink from "./FooterNavlink";
import toast from "react-hot-toast";
import {
  Footer,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

function FooterMain() {
  const { albums, isLoading, isError, error } = useAlbums();
  const { language } = useLanguage();

  if (isLoading) return <LazyLoading />;

  if (isError) {
    toast.error(error?.response?.data?.message);
    return (
      <p className="text-center text-red-600">
        {language === "en"
          ? "Failed to load Albums"
          : "مشکلی در بارگذاری آلبوم ها وجود دارد!"}
      </p>
    );
  }

  return (
    <Footer
      container
      className="bg-gray-950 dark:bg-opacity-65 dark:text-black bg-opacity-90 rounded-none"
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 w-full">
            {/* Pages Section */}
            <div>
              <FooterTitle
                className="dark:text-black text-neutral-200 text-center"
                title={language === "en" ? "Pages" : "صفحات"}
              />
              <FooterLinkGroup col className="space-y-2">
                <ul>
                  <li>
                    <FooterNavlink to="/">
                      <span>{language === "en" ? "Home" : "صفحه اصلی"}</span>
                    </FooterNavlink>
                  </li>
                  <li>
                    <FooterNavlink to="/albums">
                      <span>{language === "en" ? "Gallery" : "گالری"}</span>
                    </FooterNavlink>
                  </li>
                </ul>
              </FooterLinkGroup>
            </div>
            {/* Albums Section */}
            <div>
              <FooterTitle
                className="dark:text-black text-neutral-200 text-center"
                title={`${language === "en" ? "Albums" : "آلبوم ها"}`}
              />
              <FooterLinkGroup
                col
                className={`grid items-center justify-between space-y-0 gap-y-2 ${
                  albums.length > 5 ? "grid-cols-2" : "grid-cols-1"
                } dark:text-black dark:text-opacity-80`}
              >
                {albums.length ? (
                  albums.map((album) => (
                    <FooterLink
                      key={album._id}
                      className="text-center !me-0 !mr-0"
                      href={`/albums/${album._id}/sub-albums`}
                    >
                      {language === "en" ? album.title.en : album.title.fa}
                    </FooterLink>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    {language === "en"
                      ? "No Albums available!"
                      : "آلبومی یافت نشد!"}
                  </p>
                )}
              </FooterLinkGroup>
            </div>
            {/* SubAlbums Section */}
            <div className="space-y-0.5">
              <FooterTitle
                className="text-neutral-200 md:px-20 dark:text-black"
                title={`${language === "en" ? "Sub Albums" : "زیر آلبوم ها"}`}
              />
              {albums.length ? (
                albums.map((album) => (
                  <FooterLinkGroup
                    key={album._id}
                    col
                    className={`grid space-y-0 items-center ${
                      album.subAlbums.length > 5 ? "grid-cols-2" : "grid-cols-1"
                    } dark:text-opacity-80 dark:text-black gap-2`}
                  >
                    {album.subAlbums.map((subAlbum) => (
                      <FooterLink
                        key={subAlbum._id}
                        className="!me-0 !mr-0"
                        href={`/albums/${album._id}/sub-albums/${subAlbum._id}`}
                      >
                        {language === "en"
                          ? subAlbum.title.en
                          : subAlbum.title.fa}
                      </FooterLink>
                    ))}
                  </FooterLinkGroup>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  {language === "en"
                    ? "No sub-albums available!"
                    : "زیر آلبومی یافت نشد!"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterMain;
