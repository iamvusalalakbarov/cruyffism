import React from "react";

interface IPageHeroProps {
  title: string;
  description?: string;
}

const PageHero: React.FC<IPageHeroProps> = (props) => {
  return (
    <section className="wrapper bg-primary space-y-4 rounded-lg py-10 text-center text-white lg:py-16">
      <h1 className="text-3xl font-bold lg:text-4xl">{props.title}</h1>
      {props.description && <p>{props.description}</p>}
    </section>
  );
};

export default PageHero;
