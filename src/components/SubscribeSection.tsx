const SubscribeSection = () => {
  return (
    <section className="flex items-center justify-center bg-primary px-6 py-[60px] lg:px-0 lg:py-[100px]">
      <div>
        <h2 className="mb-8 max-w-3xl text-center text-white lg:mb-12">
          Get our stories delivered From us to your inbox weekly.
        </h2>

        <form
          method="post"
          className="mx-auto mb-6 flex flex-col justify-center gap-2 lg:max-w-[494px] lg:flex-row"
        >
          <input
            type="email"
            placeholder="Your Email"
            required
            className="flex-1 rounded-lg bg-white px-4 py-3 font-raleway text-grey-33 outline-0 placeholder:text-[#5A7184] lg:px-6 lg:py-[18px]"
          />

          <button
            type="submit"
            className="rounded-lg border border-white px-5 py-3 font-raleway text-lg text-white transition-colors duration-500 ease-in-out hover:bg-white hover:text-primary lg:px-8 lg:py-4"
          >
            Get started
          </button>
        </form>

        <p className="mx-auto max-w-[555px] text-center font-raleway text-[#bbb]">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm will get a reponse the following day.
        </p>
      </div>
    </section>
  );
};

export default SubscribeSection;
