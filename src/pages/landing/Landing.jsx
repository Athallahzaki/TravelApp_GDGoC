import * as React from 'react';
import Navbar from '@/components/Section/Navbar';
import FeatureCard from '@/components/Card/FeatureCard';
import TodoList from '@/constants/ToDoList';
import DealsList from '@/constants/DealsList';
import DealCard from '@/components/Card/DealCard';
import VacationList from '@/constants/VacationList';
import VacationSlider from '@/components/Slider/VacationSlider';
import TestimonialsList from '@/constants/TestimonialsList';
import TestimonialCard from '@/components/Card/TestimonialCard';

function Landing() {
  return (
    <div className='grid grid-rows-1 items mx-auto landing'>
      <section
        id='home'
        className='bg-background-white text-primary-black h-[999px] w-full landing'
      >
        <Navbar />
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-span-[521px] mt-auto ml-[120px]'>
            <h1 className='text-h1 font-display text-primary-black leading-[70px] font-bold'>
              Get started your exciting{' '}
              <span className='text-primary-orange'>journey</span> with us.
            </h1>
            <p className='text-p1 text-light-gray font-body mt-[37px] w-[497px] leading-[40px]'>
              A Team of experienced tourism professionals will provide you with
              the best advice and tips for your desire place.
            </p>
            <button className='text-p2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-background-white mt-[59px] h-[60px] w-[178px] rounded-[5px] border-1 font-medium transition-all duration-300 hover:border-none'>
              Discover Now
            </button>
          </div>
          <div className='col-span-[785px]'>
            <img src='/assets/jumbotron.svg' alt='Jumbotron' />
          </div>
        </div>
      </section>
      <section className='bg-background-ash text-primary-black font-body h-[724px] w-full'>
        <div className='grid grid-cols-3 gap-7 pt-[120px]'>
          <div className='col-start-2 flex flex-col gap-3'>
            <h2 className='font-display text-h2 text-center font-bold'>
              Things you need <span className='text-primary-orange'>to do</span>
            </h2>
            <p className='text-p2 text-light-gray mx-auto w-[482px] text-center leading-[32px]'>
              We ensure that you'll embark on a perfectly planned, safe vacation
              at a price you can afford.
            </p>
          </div>
          <img className='my-auto' src='/assets/plane.svg' alt='Plane' />
        </div>
        <div className='mx-auto grid max-w-[1170px] grid-cols-3 gap-[30px] pt-8'>
          {TodoList.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </section>
      <section className='bg-background-white text-primary-black font-body h-[960px] w-full'>
        <h2 className='font-display text-h2 pt-[120px] text-center font-bold'>
          Exclusive{' '}
          <span className='text-primary-orange'>deals & discounts</span>
        </h2>
        <p className='text-p2 text-light-gray mx-auto mt-4 w-[433px] text-center leading-[32px]'>
          Discover our fantastic early booking discounts & start planning your
          journey.
        </p>
        <div className='mx-auto mt-8 grid w-[1170px] grid-cols-4'>
          {DealsList.map((item, index) => (
            <DealCard key={index} {...item} />
          ))}
        </div>
        <div className='mt-[71px] flex flex-row items-center justify-center gap-3'>
          <button className='bg-background-white h-[40px] w-[40px] rounded-full border-[1px] border-[#999999]/50'>
            <img
              className='mx-auto my-auto'
              src='/assets/arrow-gray.svg'
              alt='Arrow Left'
            />
          </button>
          <button className='bg-primary-orange h-[40px] w-[40px] rounded-full'>
            <img
              className='mx-auto my-auto'
              src='/assets/arrow-white.svg'
              alt='Arrow Right'
            />
          </button>
        </div>
      </section>

      {/* Destinations Section */}
      <BestVacationPlanSection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className='bg-background-white w-full py-16'>
        <div className='mx-auto grid max-w-[1170px] grid-cols-4 gap-8'>
          <div>
            <div className='flex flex-row gap-1'>
              <h3 className='text-h3 text-primary-black font-bold'>Trabook</h3>
              <img src='/assets/logo.svg' alt='logo' />
            </div>
            <p className='text-light-gray mt-4'>
              Book your trip in minute, get full control for much longer.
            </p>
            <div className='mt-6 flex gap-4'>
              <a href='#' className='bg-background-ash rounded-full p-2'>
                <img
                  src='/assets/facebook.svg'
                  alt='Facebook'
                  className='h-5 w-5'
                />
              </a>
              <a href='#' className='bg-background-ash rounded-full p-2'>
                <img
                  src='/assets/instagram.svg'
                  alt='Instagram'
                  className='h-5 w-5'
                />
              </a>
              <a href='#' className='bg-background-ash rounded-full p-2'>
                <img
                  src='/assets/twitter.svg'
                  alt='Twitter'
                  className='h-5 w-5'
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className='text-primary-black mb-6 font-bold'>Company</h4>
            <ul className='space-y-4'>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Mobile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-primary-black mb-6 font-bold'>Contact</h4>
            <ul className='space-y-4'>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Help/FAQ
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Affiliates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-primary-black mb-6 font-bold'>More</h4>
            <ul className='space-y-4'>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Airline Fees
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Airline
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-light-gray hover:text-primary-orange'
                >
                  Low Fare Tips
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='text-light-gray mx-auto mt-10 max-w-[1170px] border-t border-gray-200 pt-8 text-center'>
          <p>© 2023 Trabook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const BestVacationPlanSection = () => {
  return (
    <section
      id='destination'
      className='text-primary-black font-body w-full py-[120px]'
    >
      <div className='mx-auto max-w-[1170px]'>
        <div className='relative mx-auto flex max-w-[521px] flex-col items-center'>
          <h2 className='font-display text-h2 text-center font-bold'>
            Best <span className='text-primary-orange'>vacation plan</span>
          </h2>
          <p className='text-p2 text-light-gray mx-auto mt-4 text-center leading-[32px]'>
            Plan your perfect vacation with our travel agency. Choose among
            hundreds of all-inclusive offers!
          </p>
          <div className='absolute top-0 -right-16'>
            <img src='/assets/coconut-tree-ornament.svg' alt='Plane' />
          </div>
        </div>

        <div>
          <VacationSlider destinations={VacationList} />
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) =>
      prev === TestimonialsList.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) =>
      prev === 0 ? TestimonialsList.length - 1 : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const next =
      activeIndex === TestimonialsList.length - 1 ? 0 : activeIndex + 1;
    return [
      { ...TestimonialsList[activeIndex], position: 'top' },
      { ...TestimonialsList[next], position: 'bottom' },
    ];
  };

  return (
    <section className='w-full py-16'>
      <div className='mx-auto flex max-w-[1170px]'>
        <div className='relative mx-auto flex max-w-[521px] flex-col items-start'>
          <h2 className='text-h2 font-display text-left font-bold'>
            What People Say{' '}
            <span className='text-primary-orange'>About Us</span>
          </h2>
          <p className='text-light-gray text-p2 mx-auto mt-4 text-left'>
            Our clients send us bunch of smilies with our services and we love
            them.
          </p>

          <div className='items-left mt-4 flex h-max justify-start gap-3'>
            <button
              onClick={prevTestimonial}
              className='bg-background-white flex h-5 w-5 items-center justify-center rounded-full border border-[#999999]/50 transition hover:bg-gray-100'
              aria-label='Previous testimonial'
            >
              <img
                className='h-2 w-2'
                src='/assets/arrow-gray.svg'
                alt='Arrow Left'
              />
            </button>
            <button
              onClick={nextTestimonial}
              className='bg-primary-orange flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-orange-600'
              aria-label='Next testimonial'
            >
              <img
                className='h-2 w-2'
                src='/assets/arrow-white.svg'
                alt='Arrow Right'
              />
            </button>
          </div>
        </div>

        <div className='relative mt-4 ml-[20px] flex justify-center'>
          <div className='absolute -top-12 -right-16'>
            <img src='assets\planes-ornament.svg' alt='Plane' />
          </div>
          <div className='mx-auto mb-8 max-w-md'>
            {getVisibleTestimonials().map((data, index) => {
              return (
                <div
                  key={`${data.id}-${index}`}
                  className={`transform transition duration-300 ${
                    data.position === 'top'
                      ? 'relative z-20'
                      : 'absolute -right-[50px] -bottom-[35px] z-10 opacity-50'
                  }`}
                >
                  <TestimonialCard {...data} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  return (
    <section className='w-full py-[120px]'>
      <div className='bg-primary-orange relative mx-auto max-w-[1170px] rounded-xl p-12 text-center'>
        <div className='absolute top-2 right-0'>
          <img
            src='assets\white-coconut-tree-ornament.svg'
            alt='coconut tree'
          />
        </div>
        <div className='absolute bottom-0 left-0'>
          <img src='assets\news-background-ornament.svg' alt='coconut tree' />
        </div>
        <h2 className='font-display text-h2 text-background-white mx-auto max-w-[650px] font-bold'>
          Subscribe and get exclusive deals & offers
        </h2>
        <div className='mt-10 flex justify-center'>
          <div className='relative w-[650px]'>
            <img
              src='assets/email-icon.svg'
              className='absolute top-1/2 left-4 h-3 w-3 -translate-y-1/2 transform'
              alt='Email icon'
            />
            <input
              type='email'
              placeholder='Enter your email'
              className='text-content w-full rounded-lg bg-primary-foreground px-6 py-4 pl-8'
            />
            <button className='bg-primary-orange text-background-white absolute top-1/2 right-2 -translate-y-1/2 transform rounded-lg px-5 py-2 font-medium'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
