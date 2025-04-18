import React from 'react';

const TestimonialCard = ({ name, location, rating, content, avatar }) => {
  return (
    <div>
      <div className='absolute -top-[45px] -left-[30px] z-999'>
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className='h-9 w-9 rounded-full object-cover shadow-md'
        />
      </div>
      <div
        className={`relative mx-auto max-w-md rounded-lg bg-white px-5 py-2 shadow-md`}
      >
        <div className='mb-0.5 flex items-start'>
          <div className='flex-1'>
            <div className='mb-3.5'>
              <p className='text-base leading-relaxed text-gray-700'>
                "{content}"
              </p>
            </div>

            <div>
              <h3 className='text-lg font-bold text-gray-900'>{name}</h3>
              <p className='text-sm text-gray-600'>{location}</p>
            </div>

            <div className='mt-2 flex items-center'>
              {[...Array(rating)].map((_, i) => (
                <img
                  key={i}
                  src='/assets/star.svg'
                  alt='star'
                  className='mr-1 h-2 w-2'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
