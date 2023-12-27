import React, { useEffect, useState } from "react";
import axios from "axios";
//import partnerPlaceholder from "../assets/partner-placeholder.png"; // Import a placeholder image for partners if needed

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch partners and reviews from the backend when the component mounts
    axios
      .all([
        axios.get("http://localhost:5000/partners"),
        axios.get("http://localhost:5000/getallfeedbacks"),
      ])
      .then(
        axios.spread((partnersResponse, reviewsResponse) => {
          // Update the state with the fetched partners and reviews
          setPartners(partnersResponse.data);
          setReviews(reviewsResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="bg-blue h-screen w-full relative ">
      <div className="text-white text-4xl font-semibold text-center pt-20">
        Subscribed Partners
      </div>
      <div className="bg-gray h-[23%] absolute top-40 flex justify-around w-full">
        {partners.map((partner) => (
          <img
            key={partner.user_id}
            src={partner.logo}
            // alt={partner.name}
            className="p-8"
          />
        ))}
      </div>
      <div className="text-white text-4xl font-semibold text-center pt-64">
        Service Review Board
      </div>
      <div className="absolute top-[65%] w-full h-[60%] flex  ">
        {/* Map over the reviews array and render each review */}
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-[25%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-bold items-center"
          >
            {review.username}
            <div className="font-medium mt-2">{review.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;

// --------------------------------------------------------------------

// import React, { useState, useEffect } from "react";

// const Partners = () => {
//   const [partnerImages, setPartnerImages] = useState([]);

//   useEffect(() => {
//     const fetchPartnerImages = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/partners");
//         const data = await response.json();
//         console.log(`dd`, data.imageurl);
//         setPartnerImages(data || []); // Provide an empty array as default if data.images is undefined
//       } catch (error) {
//         console.error("Error fetching partner images:", error);
//         setPartnerImages([]); // Set an empty array in case of an error
//       }
//     };

//     fetchPartnerImages();
//   }, []);
//   console.log(`pp`, partnerImages);
//   return (
//     <div className="bg-blue h-screen w-full relative">
//       <div className="text-white text-4xl font-semibold text-center pt-20">
//         Our Partners
//       </div>
//       <div className="bg-gray h-[23%] absolute top-40 flex justify-around w-full">
//         {partnerImages.map((imageurl, index) => (
//           <img
//             key={index}
//             src={partnerImages[0]?.imageurl}
//             alt={`Partner ${index + 1}`}
//             className="p-8"
//           />
//         ))}
//       </div>
//       {/* The rest of your component remains unchanged */}
//     </div>
//   );
// };

// export default Partners;
