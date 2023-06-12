
import { Fade } from 'react-reveal';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SectionTitle from '../../../components/SectionTitle';

SwiperCore.use([Navigation, Pagination]);

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jakariya Ahmad',
      photo: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
      testimonial: 'I joined the sports academy training program a few months ago, and it has been an incredible experience. The coaches are highly knowledgeable and supportive. They have helped me improve my skills and enhance my performance on the field. I highly recommend this training program to any aspiring athlete.',
    },
    {
      id: 2,
      name: 'Sumon Khan',
      photo: 'https://img.freepik.com/free-photo/smiling-caucasian-young-guy-wearing-pink-shirt-isolated-orange-background_141793-38612.jpg',
      testimonial: 'The sports academy training has exceeded my expectations. The training sessions are well-structured and focus on both physical fitness and technical skills. The trainers push me to my limits and help me reach new levels of performance. Being a part of this academy has been a game-changer for my athletic journey.',
    },
    {
      id: 3,
      name: 'Farjana Begum',
      photo: 'https://img.freepik.com/free-photo/young-girl-with-pleasant-appearance-standing-against-pink-wall-dresses-denim-jacket-white-shirt_176532-10387.jpg',
      testimonial: 'I have been training at the sports academy for over a year now, and I can confidently say that it has made a significant impact on my athletic abilities. The training programs are tailored to individual needs, and the coaches provide personalized attention. The facilities are top-notch, and the atmosphere is highly motivating. This academy has truly helped me excel in my sport.',
    },
  ];

  return (
    <div className="p-4">
      <SectionTitle title="Student Says" />
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="swiper-container"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="p-4 py-3 border rounded shadow-md">
            <Fade bottom>
              <p className="text-lg mb-2">{testimonial.testimonial}</p>
              <figure className="flex justify-center items-center">
                <img src={testimonial.photo} className="w-40 h-36 rounded-full" alt="" />
              </figure>
              <p className="text-gray-600 font-bold my-2">- {testimonial.name}</p>
            </Fade>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
