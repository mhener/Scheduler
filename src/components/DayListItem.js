import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });

  // Changes based on the number of spots available:
  const formatSpots = (spots) => {
    if (!spots) {
      return `No spots remaining`;
    }

    if (spots === 1) {
      return `${spots} spot remaining`;
    }

    return `${spots} spots remaining`;
  };

  const spotsAvailable = formatSpots(props.spots);

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid='day'
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{spotsAvailable}</h3>
    </li>
  );
}
