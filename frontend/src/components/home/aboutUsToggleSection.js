function AboutUsToggleSection(props) {
  return (
    <>
      <div className="hidden md:flex md:w-6/12 w-4/12">
        <img alt="about" className="w-full" src={props?.data.imgSrc} />
      </div>

      <div className="lg:px-10 lg:py-5 px-5 w-full md:w-8/12">
        <div className="lg:text-3xl text-lg mb:text-xl font-bold lg:mr-10 mt-3 mb-3 text-center md:text-left">
          {props.data.title}
        </div>
        <div className="font-light">
          <p className="text-sm md:text-xl text-center md:text-left">{props.data.text}</p>
          <br />
        </div>
      </div>
    </>
  );
}

export default AboutUsToggleSection;
