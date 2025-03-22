import Testimonial from '../Testimonial';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import css from './Slider.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

const Slider = ({ items, type }) => {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            slidesPerView={1}
            className={css.sliderContainer}
        >
            {items.map((item, index) =>
                type === 'testimonial' ? (
                    <SwiperSlide key={item.id || index}>
                        <Testimonial item={item} />
                    </SwiperSlide>
                ) : null
            )}
        </Swiper>
    );
};

export default Slider;
