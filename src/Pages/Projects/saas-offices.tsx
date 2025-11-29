import React from "react";
import ProjectTemplate from "../../Components/ProjectTemplate";

export default function SaasOffices() {
  return (
    <ProjectTemplate
      projectSlug="/projects/saas-offices"
      prevSlug="aljubailah-farm"
      nextSlug="terra-café"
    >
      {/* Project Images Grid */}
      <div className="mt-16 space-y-8">

        {/* HERO is already handled by ProjectTemplate */}

        {/* Row 1 — Two Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtq39xpF15afN5SMmPvhKDoJIycb2GWukwr4nT"
              alt="Saas Offices image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtixcedzfcbVits87eYDgj5G4zflHLph1QRuxw"
              alt="Saas Offices image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 2 — Single Centered */}
        <div className="aspect-[16/9]">
          <img
            src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTteojruckrjqCYKLwiTs78lEIx2P5W0ef4Xpmh"
            alt="Saas Offices image 3"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 3 — Two Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt6eKiHucmrEOlNZeoxYv81jVUAFyn9b2kJ7uh"
              alt="Saas Offices image 4"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtRhwpaVbasyJRoDmA4vpVjN1HYUn52CWOQPgq"
              alt="Saas Offices image 5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 4 — Single Centered */}
        <div className="aspect-[16/9]">
          <img
            src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtob3MWiQM4ObdcC3ln1UzqD9si0WALVgpZvrB"
            alt="Saas Offices image 6"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 5 — Single Centered */}
        <div className="aspect-[16/9]">
          <img
            src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtoEGGzPQM4ObdcC3ln1UzqD9si0WALVgpZvrB"
            alt="Saas Offices image 7"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 6 — Single Centered */}
        <div className="aspect-[16/9]">
          <img
            src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtDTwKY624LPw73KrWQM90BTl2yox1meqdgXGz"
            alt="Saas Offices image 8"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 7 — Two Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtozncvXQM4ObdcC3ln1UzqD9si0WALVgpZvrB"
              alt="Saas Offices image 9"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtTkccVoFg0SOit9Ckny3R7jfb2vIrc8xQPopW"
              alt="Saas Offices image 10"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 8 — Single Centered */}
        <div className="aspect-[16/9]">
          <img
            src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt4PZFpKsiU3RSJQ01dGMAOK2BxNaWz4feoXp6"
            alt="Saas Offices image 11"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 9 — Two Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt62edxedcmrEOlNZeoxYv81jVUAFyn9b2kJ7u"
              alt="Saas Offices image 12"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt5rXndBLo4AGrMJHhYKm3gLkawENcRpdTxev0"
              alt="Saas Offices image 13"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </ProjectTemplate>
  );
}
