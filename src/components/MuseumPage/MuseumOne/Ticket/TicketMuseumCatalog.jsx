import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
   setDataItems,
   setTicketType,
} from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';
import { postMuseumTicket } from '../../../../store/slices/MuseumTicket/MuseumTicketApi';
import { useTranslation } from 'react-i18next';

import { BuyTicketBlock, AbonementTicketBlock } from './index';
import ButtonSecond from '../../../ButtonSecond/ButtonSecond';

const TicketMuseumCatalog = () => {
   const dispatch = useDispatch();
   const [t, i18n] = useTranslation();

   const { ticketType, dataItems } = useSelector((state) => state.museumTicket);
   const { isAuth } = useSelector((store) => store.auth);
   const hendleClickItems = useCallback((dovnUp, obj) => {
      dispatch(setDataItems({ dovnUp, obj }));
   }, []);

   const HendleBuyTicket = useCallback(() => {
      const userToken = localStorage.getItem('token');
      if (dataItems.length) {
         if (isAuth) {
            dispatch(
               postMuseumTicket({
                  userToken,
                  postData: {
                     request_name: 'web',
                     items: dataItems,
                  },
               }),
            );
         } else {
            dispatch(setTicketType({ kindOf: 'form', type: 'Buy Ticket' }));
         }
      }
   }, [dataItems]);

   return (
      <div className="TicketMuseumCatalog-parent">
         <div className="TicketMuseumCatalog-header" style={{ textAlign: 'center' }}>
            <p>{ticketType.type === 'Buy Ticket' ? t(`infoBuyTicket.5`) : t(`infoBuyTicket.6`)}</p>
         </div>
         <div>
            {ticketType.type === 'Buy Ticket' ? (
               <BuyTicketBlock hendleClickItems={hendleClickItems} />
            ) : (
               <AbonementTicketBlock hendleClickItems={hendleClickItems} />
            )}
         </div>
         <div className="TicketMuseumCatalog-buttonBlock">
            <ButtonSecond
               txt="0"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               boxShadow={'none'}
               fontSize="12px"
               newClass="newStyleBtn"
               onClick={HendleBuyTicket}
            />
            <ButtonSecond
               txt="12"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               boxShadow={'none'}
               fontSize="12px"
               newClass="newStyleBtn"
            />
         </div>
      </div>
   );
};

export default memo(TicketMuseumCatalog);
