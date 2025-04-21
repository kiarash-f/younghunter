import Carousel from "../features/carousel/Carousel";
import Information from "../features/footer/Information";
import ScrollToTopButton from "../ui/ScrollButton";

function Home() {
  return (
    <>
      <Carousel />
      <Information />
      <ScrollToTopButton />
    </>
  );
}

export default Home;
