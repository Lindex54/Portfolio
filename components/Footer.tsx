import React from "react";
import MagicButton from "@/components/ui/MagicButton";
import {FaLocationArrow} from "react-icons/fa";
import {socialMedia} from "@/data";
import ContactForm from "@/components/ui/ContactForm";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[70px]" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
         <ContactForm />
      </div>

        <div className="flex mt-16 md:flex-row flex-col justify-between items-center" >
            <p className="md:text-base text-sm md:font-normal font-ligh">Copyright © 2025 Malinde</p>

            <div className="flex items-center md:gap-3 mt-2">
                {socialMedia.map((profile) => (
                    <a  key={profile.id}
                        href={profile.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur
                    saturate-180 bg-opacity bg-black-200 rounded-lg border border-b-black-300">
                            <img src={profile.img} alt={profile.id} width={20} height={20}/>
                        </div>
                    </a>


                ))}

            </div>
        </div>
    </footer>
  );
};

export default Footer;
