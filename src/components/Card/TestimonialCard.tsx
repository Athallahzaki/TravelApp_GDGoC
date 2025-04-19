const TestimonialCard = (bookings: any) => {
  return (
    <div>
      <div className='absolute -top-[45px] -left-[30px] z-999'>
        <img
          src="/assets/avatar1.svg"
          alt={`${bookings.user.name}'s avatar`}
          className='h-9 w-9 rounded-full object-cover shadow-md'
        />
      </div>
      <div
        className={`relative mx-auto max-w-md rounded-lg bg-primary-foreground px-5 py-2 shadow-md`}
      >
        <div className='mb-0.5 flex items-start'>
          <div className='flex-1'>
            <div className='mb-3.5'>
              <p className='text-base leading-relaxed text-primary'>
                "Nice View, App Good, Would Recommend. :ThumbsUp:" - {bookings.user.name}
              </p>
            </div>

            <div>
              <h3 className='text-lg font-bold text-primary'>{bookings.user.name}</h3>
              <p className='text-sm text-muted-foreground'>{bookings.destination.city}, {bookings.destination.country}</p>
            </div>

            <div className='mt-2 flex items-center'>
              {[...Array(5)].map((_, i) => (
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
