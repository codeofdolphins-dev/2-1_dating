import React, { useState } from 'react';
import WallofFrameCard from '../WallofFrameCard/WallofFrameCard';
import { Button } from 'react-bootstrap';

const voteNumberArray = [
  { number: "1", textColor: "text-danger" },
  { number: "2", textColor: "text-danger" },
  { number: "3", textColor: "text-danger" },
  { number: "4", textColor: "text-warning" },
  { number: "5", textColor: "text-warning" },
  { number: "6", textColor: "text-warning" },
  { number: "7", textColor: "text-warning" },
  { number: "8", textColor: "text-warning" },
  { number: "9", textColor: "text-success" },
  { number: "10", textColor: "text-success" },
];

const originalText = `Era 1743 y en la Ciudad de Nueva Orleans, llamada la Nueva Francia se estableció oficialmente la fiesta del Mardi Gras Unos decían que empezó en el año 1699 , otros más tarde pero la realidad es que Joe y yo fuimos por primera vez en el año 1996 aun no éramos swingers pero nos gustó la idea de ir a ver, desde ese entonces hemos pasado grandes momentos en el Mardi Gras de New Orleans, y cada vez que podemos nos gusta ir, es muy satisfactorio para mi ganarme varios collares cada vez que enseño las tetas, y en ocasiones hemo ido varias parejas en grupo y entre las mujeres jugamos a ver quien gana más collares. Esto nos sucedió justamente el año pasado, era el Mardi Gras del 2024, no pensábamos ir por un situación familiar y un domingo antes nos decidimos pensando llegar el lunes, estar el martes de Mardi Gras y regresar el miércoles temprano.  Llego el martes, nos despertamos nos arreglamos después del desayuno y tomamos un taxi para llegar al vecindario Faubourg Marigny el taxi nos dejó cerca de la calle Frenchmen, yo en minivestido de carnaval con una máscara que compre en Venecia hace muchos años, normalmente no tomo alcohol, pero tenia ganas de una cerveza, la euforia me llenaba, los collares me ganaba y mi esposo se reía de mi con alegría. Llego la noche, reímos, nos divertimos y decidimos tomar un taxi de regreso al hotel, como estaba todo lleno y nuestra intención era salir muy`;

const translatedText = `It was 1743, and in the city of New Orleans, called New France at the time, the Mardi Gras festival was officially established. Some said it started in the year 1699, others later, but the truth is that Joe and I went for the first time in 1996. We weren’t swingers yet, but we liked the idea of going to check it out. Since then, we’ve had great moments at Mardi Gras in New Orleans, and whenever we can, we like to go.It is very satisfying for me to earn several bead necklaces every time I show my breasts, and on some occasions, we've gone with several couples as a group, and among the women, we play to see who can win the most necklaces.
This happened to us just last year. It was Mardi Gras 2024. We weren't planning to go because of a family situation, and the Sunday before we decided to go—thinking we’d arrive Monday, be there for Mardi Gras Tuesday, and return early Wednesday.Tuesday came, we woke up, got ready after breakfast, and took a taxi to get to the Faubourg Marigny neighborhood. The taxi dropped us off near Frenchmen Street. I was wearing a carnival mini dress with a mask I bought in Venice many years ago. I normally don't drink alcohol, but I felt like having a beer. The excitement filled me, I was winning necklaces, and my husband was laughing at me joyfully.Night came, we laughed, had fun, and decided to take a taxi back to the hotel. Since everything was full and our plan was to leave very...`;

const WritingContestTabContainer = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [translatedIndexes, setTranslatedIndexes] = useState([]);

  const toggleShowMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleTranslation = (index) => {
    setTranslatedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      {voteNumberArray.map((data, index) => {
        const isExpanded = expandedIndex === index;
        const isTranslated = translatedIndexes.includes(index);
        const displayText = isTranslated ? translatedText : originalText;
        const shortenedText = displayText.slice(0, 900) + '...';

        return (
          <div key={index}>
            <div className="mt-3">
              <div className="row gap-0">
                {/* Left Card */}
                <div className="col-xl-3 col-lg-4 d-flex justify-start-center mb-3 mb-lg-0 pb-3">
                  <WallofFrameCard />
                </div>

                {/* Right Content */}
                <div className="col-xl-9 col-lg-8">
                  {/* Title and Translate Button */}
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <h5 className="text-danger m-0">
                      Un taxi, una máscara y el Mardi Gras de New Orleans
                    </h5>
                    <Button
                      className="px-3 py-1 rounded-pill"
                      onClick={() => toggleTranslation(index)}
                     
                    >
                      {isTranslated ? 'Original' : 'Translate'}
                    </Button>
                  </div>

                  {/* Story Content */}
                  <p className="mb-4 text-justify">
                    {isExpanded ? displayText : shortenedText}
                  </p>

                  {/* Vote Section + Show More */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3 pb-3">
                      <span className="fw-semibold">Your Vote:</span>
                      <div className="d-flex gap-2">
                        {voteNumberArray.map((vote, idx) => (
                          <span key={idx} className={vote.textColor}>
                            {vote.number}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <a
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleShowMore(index);
                        }}
                      >
                        {isExpanded ? '– Show Less' : '+ Show More'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default WritingContestTabContainer;
