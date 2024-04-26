import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSingleEvent } from '../../store/slices/SingleEventSlice/SingleEventSlice';
import './SingleEventModal.css';
import TicketCountDiv from '../TicketCountDiv/TicketCountDiv';
import { useTranslation } from 'react-i18next';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { postTicketCart } from '../../store/slices/Shop/ShopApi';
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import { postBuyTicket } from '../../store/slices/BuyTicketSlice/BuyTicketApi';
import { setObj } from '../../store/slices/BuyTicketSlice/BuyTicketSlice';
import { setModalTicketIsOpen, setTicketType } from '../../store/slices/MuseumTicket/MuseumTicketSlice';
import { TicketMuseumBlock } from '../MuseumPage/MuseumOne/Ticket';

function SingleEventModal({ setOpenConfigModal, cartErrorMessage, setCartErrorMessage }) {
    const respConfigSingleEvent = useSelector(selectSingleEvent);
    const [quantityEvent, setQuantityEvent] = useState([]);
    const [fullValueTicket, setFullValueTicket] = useState(0);
    const [errorMessageTicket, setErrorMessageTicket] = useState(false);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    if (!respConfigSingleEvent || !respConfigSingleEvent.data || !respConfigSingleEvent.data.event_configs) {
        return null; // or render a loading indicator, or an error message
    }

    const addCart = async (e) => {
        e.stopPropagation();
        if (isAuth) {
            await dispatch(postTicketCart({
                items: respConfigSingleEvent.data.event_configs.map(el => ({
                    type: 'event',
                    id: el.id,
                    quantity: sessionStorage.getItem(`quantity${el.id}`)
                })).filter(el => el.quantity > 0)
            }));

            // respConfigSingleEvent.data.event_configs.forEach(item => {
            //     sessionStorage.removeItem(`quantity${item.id}`);
            // });

            dispatch(setModalIsOpenShop(true));
        } else {
            setCartErrorMessage(true);
            setTimeout(() => {
                setCartErrorMessage(false);
            }, 4000);
        }
    };

    const buyTicket = async (e) => {
        e.preventDefault();

        if (isAuth) {
            await dispatch(postBuyTicket({
                items: respConfigSingleEvent.data.event_configs.map(el => ({
                    type: 'event',
                    id: el.id,
                    quantity: sessionStorage.getItem(`quantity${el.id}`)
                })).filter(el => el.quantity > 0)
            }))
                .then(res => {
                    if (res.meta.requestStatus === "fulfilled") {
                        window.location.href = res.payload.data.redirect_url;
                    }
                });
        } else {
            await dispatch(setObj({
                items: respConfigSingleEvent.data.event_configs.map(el => ({
                    type: 'event',
                    id: el.id,
                    quantity: sessionStorage.getItem(`quantity${el.id}`)
                })).filter(el => {
                    if (el.quantity > 0) {
                        dispatch(setTicketType({ kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart' }));
                        dispatch(setModalTicketIsOpen(true));
                        setErrorMessageTicket(false);
                        return el;
                    } else {
                        setErrorMessageTicket(true);
                    }
                })
            }));
        }
    };

    return (
        <>
            <div className='single_event_modal'>

            <div className='single_event_modal_block'>
                <span className='single_event_modal_block_xMark' onClick={() => setOpenConfigModal(false)}>X</span>
                <div className='single_event_modal_items'>
                    {
                        respConfigSingleEvent.data.event_configs.map(config =>
                            <div key={config.id} className='single_event_modal_item'>
                                <div className='single_event_modal_item_left'>
                                    <div className='single_event_modal_item_left_date_and_time'>
                                        <div>
                                            <span>{t('event_single_page_modal.0')}</span>
                                            <span>{config.day}</span>
                                        </div>

                                        <div>
                                            <span>{t('event_single_page_modal.1')}</span>
                                            <span>{config.start_time.slice(0,5)}</span>
                                        </div>
                                    </div>

                                    <div className='single_event_modal_item_left_price_and_count'>
                                        <div className='single_event_modal_item_left_price'>
                                            <span>{t('event_single_page_modal.2')}</span>
                                            <span className='single_event_modal_item_left_price_number'>{config.price} AMD</span>
                                        </div>

                                        <div className='single_event_modal_item_left_count'>
                                            <span>{t('event_single_page_modal.3')}</span>
                                            <span className='single_event_modal_item_left_count_number'>{config.tickets.max}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='single_event_modal_item_right'>
                                    <TicketCountDiv max={config.tickets.max} min={config.tickets.min} price={config.tickets.price} setFullValueTicket={setFullValueTicket} setQuantityEvent={setQuantityEvent} quantityEvent={quantityEvent} item={config} />
                                </div>
                            </div>
                        )
                    }
                </div>

                {fullValueTicket !== 0 && (
                    <div className='single_event_modal_item_total_and_bay'>
                        <div className='single_event_modal_item_total'>
                            <span>{t('Ticket_type_placeholder.7')}   {fullValueTicket} AMD</span>
                        </div>

                        {errorMessageTicket && <p className='err_message_tickets'>{t('ticket_error_message')}</p>}

                        <div className='single_event_modal_item_buy'>

                            <button className='single_event_modal_bay_ticket_btn' onClick={buyTicket}>{t('buttons.0')}</button>
                            <button className='single_event_modal_add_cart_btn' onClick={addCart}>{t('buttons.3')}</button>
                        </div>
                    </div>)}
            </div>
        </div>

        <TicketMuseumBlock/>

        </>
    );
}

export default SingleEventModal;
