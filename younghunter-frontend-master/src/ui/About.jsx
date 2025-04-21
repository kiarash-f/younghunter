import { useLanguage } from "../context/useLanguageContext";

function About() {
  const { language } = useLanguage();
  return (
    <>
      <div className="max-w-[300px] pt-10 text-center mx-auto font-bold md:text-base text-sm">
        <h5>
          {language === "en"
            ? "See the world from my camera lenz! I'm Ali Zolghadr, a street photographer! Welcome to my profetional world."
            : "از لنز دوربین من به دنیا نگاه کن! من علی ذوالقدر هستم، یک عکاس خیابانی! به دنیای کاری من خوش آمدید."}
        </h5>
      </div>
    </>
  );
}

export default About;
