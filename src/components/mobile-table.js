import React, { Fragment } from 'react';
import 'swiper/swiper.scss';
import Card from './card/card';
import CardSeparator from './card/card-separator';
import CardRow from './card/card-row';

const MobileCardList = ({ cardsValues, cardTitles, rowsValuesProperties, onCardClick }) => {
	return cardsValues.map((cardValue, index) => {
		const cardRows = rowsValuesProperties.map((rowValueProperty, index) => {
			return (
				<Fragment key={index}>
					<CardRow title={cardTitles[index]} value={cardValue[rowValueProperty]} />
					<CardSeparator />
				</Fragment>
			);
		});
		return (
			<Card key={index} onClick={() => (onCardClick ? onCardClick(index) : '')}>
				{cardRows}
			</Card>
		);
	});
};

export default MobileCardList;
