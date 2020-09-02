import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import './swiper.scss';
import CleanButton from '../clean-button';

const MobileSwiper = ({ slides }) => {
	const [activeSlideIndex, updateCurrentIndex] = useState(0);
	const numberOfSlides = slides.length;
	const swiperRef = useRef(null);

	const swiperParams = {
		spaceBetween: 10,
		loop: true,
	};

	const updateIndex = useCallback(() => updateCurrentIndex(swiperRef.current.swiper.realIndex), []);

	useEffect(() => {
		if (swiperRef.current) {
			const swiperInstance = swiperRef.current.swiper;

			if (swiperInstance) {
				swiperInstance.on('slideChange', updateIndex);
			}

			return () => {
				if (swiperInstance) {
					swiperInstance.off('slideChange', updateIndex);
				}
			};
		}
	}, [updateIndex]);

	const isWiperLoaded = () => swiperRef.current && swiperRef.current.swiper;

	const slideNext = () => {
		if (isWiperLoaded()) {
			swiperRef.current.swiper.slideNext();
		}
	};

	const slidePrev = () => {
		if (isWiperLoaded()) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const getSwiperPagination = () => {
		return `${activeSlideIndex + 1}/${numberOfSlides}`;
	};

	return (
		<Container>
			<SwiperContainer>
				<NavButton onClick={slidePrev}>{'<'}</NavButton>
				<Swiper {...swiperParams} ref={swiperRef}>
					{slides}
				</Swiper>
				<NavButton onClick={slideNext}>{'>'}</NavButton>
			</SwiperContainer>
			<Pagination>{getSwiperPagination()}</Pagination>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
	margin-top: 10px;
`;

const SwiperContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

const Pagination = styled.div`
	margin-top: 10px;
`;

const NavButton = styled(CleanButton)`
	font-size: 30px;
`;

export default MobileSwiper;
