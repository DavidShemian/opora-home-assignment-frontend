import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import './swiper.scss';

const DriversTableMobile = ({ drivers, columns }) => {
	const [activeSlideIndex, updateCurrentIndex] = useState(0);
	const [isSwiper, setIsSwiper] = useState(true);
	const numberOfSlides = drivers.length;
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

	const MobileTableRow = (columnName, value) => {
		return (
			<Fragment>
				<Row>
					<Column>{columnName}</Column>
					<Value>{value}</Value>
				</Row>
			</Fragment>
		);
	};

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

	const getCards = () => {
		const swiperSlides = drivers.map(({ forename, surname, nationality, position, points }, index) => {
			return (
				<Card key={index}>
					{MobileTableRow('name', `${forename} ${surname}`)}
					<Separator />
					{MobileTableRow('nationality', nationality)}
					<Separator />
					{MobileTableRow('position', position)}
					<Separator />
					{MobileTableRow('points', points)}
				</Card>
			);
		});

		return swiperSlides;
	};

	const renderSwiper = () => {
		return (
			<Fragment>
				<SwiperContainer>
					<NavButton onClick={slidePrev}>{'<'}</NavButton>
					<Swiper {...swiperParams} ref={swiperRef}>
						{getCards()}
					</Swiper>
					<NavButton onClick={slideNext}>{'>'}</NavButton>
				</SwiperContainer>
				<Pagination>{getSwiperPagination()}</Pagination>
			</Fragment>
		);
	};

	const renderList = () => {
		const cards = getCards();

		const warpedCards = cards.map((card, index) => {
			return <ListCardWrapper key={index}>{card}</ListCardWrapper>;
		});

		return <Fragment>{warpedCards}</Fragment>;
	};

	const SwitchViewsTypeButton = () => {
		return (
			<Switch
				checked={isSwiper}
				onChange={(value) => {
					setIsSwiper(value);
				}}
				onColor='#86d3ff'
				offColor='#86d3ff'
				onHandleColor='#2693e6'
				handleDiameter={30}
				uncheckedIcon={false}
				checkedIcon={false}
				boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
				activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
				height={20}
				width={48}
				className='react-switch'
				id='material-switch'
			/>
		);
	};

	return (
		<Container>
			<SwitchViewsTypeButton />
			<ViewTypeLabel>{isSwiper ? 'Swiper' : 'List'}</ViewTypeLabel>
			{isSwiper ? renderSwiper() : renderList()}
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

const Card = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	background-color: ${(props) => props.theme.colors.lightGrey};
`;

const ListCardWrapper = styled.div`
	width: 80%;
	margin-top: 10px;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
`;

const Column = styled.span`
	margin-left: 10px;
	font-weight: bold;
	text-transform: capitalize;
`;

const Value = styled.span`
	margin-right: 10px;
`;

const ViewTypeLabel = styled.h3`
	margin-top: 5px;
`;

const Separator = styled.hr`
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin: 1px 0;
	padding: 0;
`;

const NavButton = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	font-size: 30px;
`;

export default DriversTableMobile;
