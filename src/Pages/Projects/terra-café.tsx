import React from "react";
import ProjectTemplate from "../../Components/ProjectTemplate";

export default function TerraCafe() {
  return (
    <ProjectTemplate
      projectSlug="/projects/terra-café"
      prevSlug="saas-offices"
      nextSlug="001-villa"
    >
      {/* Project Images Grid */}
      <div className="mt-16 space-y-8">

        {/* Row 1 — Two Square Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtX5LDfsuQ9S7C4WKjGuVoZwsviq3Yk2dtryPh"
              alt="Terra Café image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtoYgDz7QM4ObdcC3ln1UzqD9si0WALVgpZvrB"
              alt="Terra Café image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 2 — Two Square Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtOcRgCqdVqPrsAn2YG0Ow496xDFlCXeJM758N"
              alt="Terra Café image 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtZ9LvuYIwQ42fTitNUoEO7HnMs6muXZFWAgql"
              alt="Terra Café image 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 3 — Two Square Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt6Cj2YacmrEOlNZeoxYv81jVUAFyn9b2kJ7uh"
              alt="Terra Café image 5"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtq3U0c8p5afN5SMmPvhKDoJIycb2GWukwr4nT"
              alt="Terra Café image 6"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 4 — Two Square Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtFqUe5zGxORdr4iUQqXJuntjb6e1yHS7xlGVw"
              alt="Terra Café image 7"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtkbtKu8T5wUsRrfG1tAi0XCE8dzWkBF93bZcK"
              alt="Terra Café image 8"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 5 — Two Square Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtzZXtvL4VOYoqlE8KBP1etFvkZn6fRJNjQwIW"
              alt="Terra Café image 9"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[1/1]">
            <img
              src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtvD5MhoAU60S9lVNzj2mPfTxsYKrMtInucLAW"
              alt="Terra Café image 10"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </ProjectTemplate>
  );
}
