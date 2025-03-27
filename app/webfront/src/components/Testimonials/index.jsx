import TestimonialCard from '../TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import css from './Testimonials.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = ({ items, type }) => {
    return (
        <div className={css.sliderContainer}>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ el: `.${css.customPagination}`, clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                autoHeight={true}
            >
                {items.map((item, index) =>
                    type === 'testimonial' ? (
                        <SwiperSlide key={item.id || index}>
                            <TestimonialCard item={item} />
                        </SwiperSlide>
                    ) : null
                )}
            </Swiper>
            <div className={css.customPagination}></div>
        </div>
    );
};

export default Testimonials;
