import Testimonial from '../Testimonial';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import css from './Slider.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = ({ items, type }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            pagination={true}
            navigation={true}
            spaceBetween={50}
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
