import { Vacation } from "@/constants/interfaces";

interface Destination extends Vacation {
  description: string
}

const DestinationCard = ({
  imgSrc,
  city,
  price,
  day_trip,
  rating,
  description = '',
}: Destination) => {
  return (
    <div className='rounded-[20px] border border-[#66666608] bg-primary-foreground transition-shadow duration-300 hover:shadow-lg'>
      <div className='relative'>
        <img
          src={imgSrc}
          alt={city}
          className='h-[232px] w-full rounded-lg object-cover'
        />
      </div>

      <div className='p-2.5'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[18px] font-semibold text-accent-foreground'>{city}</h3>
          <p className='text-[16px] font-semibold'>
            {price}
          </p>
        </div>
        {description && (
          <p className='mt-2 mb-4 line-clamp-2 text-[14px] text-[#546179]'>
            {description}
          </p>
        )}

        <div className='mt-2 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <img src='/assets/navigation.svg' alt='Nav' className='h-2 w-2' />
            <span className='text-[14px] text-muted-foreground'>{day_trip} Day(s) Trip</span>
          </div>
          <div className='flex items-center gap-1'>
            <img src='/assets/star.svg' alt='Star' className='h-2 w-2' />
            <span className='text-xs font-medium text-muted-foreground'>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
