import { useState } from "react";
import ImagesHeader from "./ImagesHeader";
import ImagesTable from "./ImagesTable";

function AdminImagesPageLayout() {
  const [sortImages, setSortImages] = useState("");
  return (
    <>
      <ImagesHeader sortImages={sortImages} setSortImages={setSortImages} />
      <ImagesTable sortImages={sortImages} />
    </>
  );
}

export default AdminImagesPageLayout;
