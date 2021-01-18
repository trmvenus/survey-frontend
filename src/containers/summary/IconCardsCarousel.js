/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from '../../components/cards/IconCard';
import GlideComponent from '../../components/carousel/GlideComponent';

const IconCardsCarousel = ({ 
  className = 'icon-cards-row' ,
  totalResponses = 0,
  surveyStatus = '-',
  averageTime = '0s',
  sharing = 'NO',
}) => {
  const data = [
    { 
      title: 'summary.total-responses', 
      icon: 'iconsminds-mail-read', 
      value: totalResponses 
    },
    {
      title: 'summary.survey-status',
      icon: 'iconsminds-arrow-refresh',
      value: surveyStatus,
    },
    {
      title: 'summary.average-time',
      icon: 'iconsminds-clock', 
      value: averageTime,
    },
    { 
      title: 'summary.survey-sharing', 
      icon: 'iconsminds-share', 
      value: sharing 
    },
  ];

  return (
    <div className={className}>
      <GlideComponent
        settings={{
          gap: 5,
          perView: 4,
          type: 'carousel',
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 },
            1800: { perView: 4 },
          },
          hideNav: true,
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <IconCard {...item} className="mb-4" />
            </div>
          );
        })}
      </GlideComponent>
    </div>
  );
};
export default IconCardsCarousel;
