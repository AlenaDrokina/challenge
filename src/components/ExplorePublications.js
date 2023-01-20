import React, { useEffect, useState } from "react";
import { explorePublications } from "../lensQueries/explorePublications";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineInbox } from "react-icons/ai";
import { TbArrowsLeftRight } from "react-icons/tb";

import "./ExplorePublications.css";

export default function ExplorePublications(props) {
  //   console.log("this is props", props);
  let [publication, setPublication] = useState();

  const init = async () => {
    try {
      const request = {
        sortCriteria: "LATEST", //You can filter by TOP_COMMENTED | TOP_COLLECTED | TOP_MIRRORED | LATEST
        noRandomize: true,
        sources: ["5bba5781-78b5-4927-8d2f-122742817583"],
        publicationTypes: ["POST"],
        cursor: '{"timestamp":1,"offset":0}',
        limit: 24,
      };
      const response = await explorePublications(request); // To get next result replace the cursor with the value of response.pageInfo.next
      console.log("Ex", response);
      setPublication(response.data.explorePublications.items);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(publication);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="ExplorePublications">
      <div className="top">
        <h1>Lens AI </h1>
        <h4>The LensAI frens has shared beautiful artworks!</h4>
        <h5>Sort by:</h5>
        <div className="Buttons">
          <button className="btn1">
            Date created <AiOutlineArrowDown />
          </button>
          <button className="btn2">
            Most collected <AiOutlineInbox />
          </button>
          <button className="btn3">
            Most mirrored <TbArrowsLeftRight />
          </button>
        </div>
      </div>
      {publication &&
        publication.map((p) => (
          <div key={p.id}>
            <p>{p.id}</p>
            <h1>{p.profile.name}</h1>

            {/* <img alt="" scr={p.profile.original} /> */}
          </div>
        ))}
      <p>Hey</p>
    </div>
  );
}
