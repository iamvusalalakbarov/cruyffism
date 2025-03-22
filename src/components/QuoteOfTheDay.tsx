import { Blockquote } from "@mantine/core";

const BlockQuoteIcon = () => {
  return <span className="flex size-8 items-center justify-center rounded-full border">14</span>;
};

const QuoteOfTheDay = () => {
  return (
    <section className="wrapper py-10 lg:py-16">
      <div className="px-2">
        <Blockquote cite="— Johan Cruyff" icon={<BlockQuoteIcon />} iconSize={50} radius="lg">
          Every disadvantage has its advantage.
        </Blockquote>
      </div>
    </section>
  );
};

export default QuoteOfTheDay;
