import * as React from 'react';

const FeatureCard = ({ iconSrc, imgBackground, title, description }) => {
  return (
    <>
      <div
        className={`bg-background-white drop-shadow-feature border-light-gray/8 flex h-[278px] w-[370px] flex-col rounded-[8px] border-[2px] p-5`}
        style={{
          backgroundImage: imgBackground ? `url(${imgBackground})` : 'none',
        }}
      >
        <img src={iconSrc} alt={title} className='mr-auto h-[48px]' />
        <h3 className='text-h3 font-body text-primary-black mt-6 font-semibold'>
          {title}
        </h3>
        <p className='text-content text-light-gray mt-2'>{description}</p>
      </div>
    </>
  );
};

export default FeatureCard;
