import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
import { LanguageProvider } from "./context/useLanguageContext";
import SingleAlbum from "./features/album/SingleAlbum";
import Albums from "./features/gallery/Albums";
import ThemeModeProvider from "./context/useThemeModeContext";
import SingleSubAlbum from "./features/album/SingleSubAlbum";
import AdminProvider from "./context/useAdminContext";
import Empty from "./ui/Empty";
import AdminPageLayout from "./features/admin/layout/AdminPageLayout";
import AdminImagesPageLayout from "./features/admin/images/AdminImagesPageLayout";
import AdminAlbumsPageLayout from "./features/admin/album/AdminAlbumsPageLayout";
import HomePageLayout from "./features/carousel/HomePageLayout";
import AdminSubAlbumPageLayout from "./features/admin/subAlbum/AdminSubAlbumPageLayout";
import AdminSubAlbumImagesPageLayout from "./features/admin/subAlbum/image/AdminSubAlbumImagesPageLayout";
import { LazyLoading } from "./ui/Loading";

function App() {
  const queryClient = new QueryClient();

  document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  return (
    <ThemeModeProvider>
      <AdminProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <Toaster />
            <Suspense fallback={<LazyLoading />}>
              <Routes>
                <Route path="/" element={<HomePageLayout />}>
                  <Route index element={<Home />} />
                  <Route path="albums" element={<Gallery />}>
                    <Route index element={<Albums />} />
                    <Route path=":id/sub-albums" element={<SingleAlbum />} />
                    <Route
                      path=":albumId/sub-albums/:subAlbumId"
                      element={<SingleSubAlbum />}
                    />
                  </Route>
                </Route>
                <Route path="/admin" element={<AdminPageLayout />}>
                  <Route index element={<Navigate to="images" replace />} />
                  <Route path="images" element={<AdminImagesPageLayout />} />
                  <Route path="albums" element={<AdminAlbumsPageLayout />}>
                    <Route
                      path=":albumId/sub-albums"
                      element={<AdminSubAlbumPageLayout />}
                    >
                      <Route
                        path=":subAlbumId"
                        element={<AdminSubAlbumImagesPageLayout />}
                      />
                    </Route>
                  </Route>
                </Route>
                <Route path="*" element={<Empty />} />
              </Routes>
            </Suspense>
          </LanguageProvider>
        </QueryClientProvider>
      </AdminProvider>
    </ThemeModeProvider>
  );
}

export default App;
