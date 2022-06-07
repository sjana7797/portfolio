/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Website } from "../../typing";
import { urlFor } from "../../utils/sanityClient";
import WebsiteCard from "./WebsiteCard";

type Props = { websites: Website[] };

function Projects({ websites }: Props) {
  const initialWebImage = `${urlFor(websites[0].web_image.asset._ref)}`;
  const initialMobileImage = `${urlFor(websites[0].mobile_image.asset._ref)}`;
  const [mobileImage, setMobileImage] = useState(initialMobileImage);
  const [webImage, setWebImage] = useState(initialWebImage);
  const [counter, setCounter] = useState(0);
  const [description, setDescription] = useState(websites[0].description);
  const setImage = (webImage: string, mobileImage: string, desc: string) => {
    setWebImage(webImage);
    setMobileImage(mobileImage);
    setDescription(desc);
  };
  const changeImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      } else if (counter <= 0) {
        setCounter(websites.length - 1);
      }
    } else if (direction === "next") {
      if (counter < websites.length - 1) {
        setCounter(counter + 1);
      } else if (counter >= websites.length - 1) {
        setCounter(0);
      }
    }
  };
  useEffect(() => {
    const webImage = `${urlFor(websites[counter].web_image.asset._ref)}`;
    const mobileImage = `${urlFor(websites[counter].mobile_image.asset._ref)}`;
    const desc = websites[counter].description;
    setImage(webImage, mobileImage, desc);
  }, [counter, websites]);
  return (
    <section className="my-10 border-t-2 border-blue-300 py-10">
      <h2 className="text-center text-3xl font-semibold uppercase text-secondary underline decoration-wavy underline-offset-4">
        Projects
      </h2>
      <div className="relative mt-5 select-none">
        <FiChevronLeft
          className="absolute top-1/4 left-5 z-50 -translate-y-1/4 cursor-pointer text-7xl transition-all duration-300 hover:text-secondary active:scale-90 lg:top-1/2 lg:-translate-y-1/2"
          onClick={() => changeImage("prev")}
        />
        <FiChevronRight
          className="absolute top-1/4 right-5 z-50 -translate-y-1/4 cursor-pointer text-7xl transition-all duration-300 hover:text-secondary active:scale-90 lg:top-1/2 lg:-translate-y-1/2"
          onClick={() => changeImage("next")}
        />
        <div className="flex flex-col items-center justify-between space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5">
          <div className="mockup-window border-4 border-primary bg-secondary/20 text-secondary lg:w-4/5">
            <img
              src={webImage}
              className="lazyload h-auto w-full object-contain"
              alt=""
            />
          </div>
          <div className="mockup-phone w-auto border-primary">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo !max-w-xs">
                <img
                  src={mobileImage}
                  className="lazyload h-auto w-full object-contain"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex snap-x snap-mandatory space-x-5 overflow-x-scroll scrollbar-hide lg:space-x-10">
          {websites.map((website, index) => (
            <WebsiteCard
              key={website._id}
              setImage={setImage}
              website={website}
              setCounter={setCounter}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="prose mx-auto mt-10 space-y-2 lg:prose-xl">
        <h2 className="text-center text-secondary">Description</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default Projects;
