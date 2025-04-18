import { Deal } from "@/constants/interfaces";

const DealCard = ({ imgSrc, city, country, rating, price, discount }: Deal) => {
  return (
    <>
      <div className='border-light-gray/8 bg-background-white drop-shadow-feature flex h-[426px] w-[270px] flex-col rounded-[8px] border-[2px]'>
        <img className='rounded-[8px]' src={imgSrc} alt={city} />
        <div className='mt-4 flex flex-row px-2'>
          <p className='text-title font-medium'>{city}</p>
          <div className='ml-auto flex flex-row items-center justify-end gap-1'>
            <img className='h-2' src='/assets/star.svg' alt="Rating Icon's" />
            <p>{rating}</p>
          </div>
        </div>
        <div className='flex flex-row px-2'>
          <div className='flex flex-row items-center gap-1'>
            <img
              className='h-2'
              src='/assets/location-icon.svg'
              alt="Location Icon's"
            />
            <p className='text-light-gray text-content'>{country}</p>
          </div>
          <div className='ml-auto flex flex-row items-center justify-end gap-2'>
            <p className='text-content font-medium text-muted-foreground line-through'>
              {discount}
            </p>
            <p className='text-content text-primary-foreground rounded-lg bg-[#FFE7DB] px-1 py-0.5 font-semibold'>
              {price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCard;
