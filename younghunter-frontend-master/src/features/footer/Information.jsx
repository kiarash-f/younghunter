import About from "../../ui/About";
import Contact from "../../ui/Contact";

function Information() {
  return (
    <div className="flex flex-col justify-evenly w-full mx-auto md:flex-row bg-gray-950 bg-opacity-65 py-4 dark:bg-opacity-90 text-neutral-950 dark:text-neutral-200 transition-all duration-300">
      <div className="flex items-center justify-center min-w-[300px]">
        <img
          src="/new image/IMG_2358.JPG"
          alt=""
          className="md:max-w-[388px] max-w-[250px]"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center gap-y-10"
        id="about"
      >
        <About />
        <Contact />
      </div>
    </div>
  );
}

export default Information;
