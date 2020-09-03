import React, { useState } from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';
import 'swiper/swiper.scss';
import MobileSwiper from '../swiper/mobile-swiper';
import Card from '../card/card';
import CardSeparator  from '../card/card-separator';
import CardRow from '../card/card-row';
import MobileCardList from '../mobile-table';

const CurrentSeasonDriversMobile = ({ drivers, columnsNames, rowsValuesProperties, onCardClick }) => {
	const [isSwiper, setIsSwiper] = useState(true);

	const getCardsList = () => {
		return drivers.map(({ name, nationality, position, points }, index) => {
			return (
				<Card key={index} onClick={() => (onCardClick ? onCardClick(index) : '')}>
					<CardRow title='name' value={name} />
					<CardSeparator />
					<CardRow title='nationality' value={nationality} />
					<CardSeparator />
					<CardRow title='position' value={position} />
					<CardSeparator />
					<CardRow title='points' value={points} />
				</Card>
			);
		});
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
			{isSwiper ? (
				<MobileSwiper slides={getCardsList()} />
			) : (
				<MobileCardList
					cardsValues={drivers}
					cardTitles={columnsNames}
					rowsValuesProperties={rowsValuesProperties}
					onCardClick={onCardClick}
				/>
			)}
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

const ViewTypeLabel = styled.h3`
	margin-top: 5px;
`;

export default CurrentSeasonDriversMobile;
