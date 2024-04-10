import React from 'react';
import { useTranslation } from 'react-i18next';
import {
   LocationIcon,
   PhoneIcons,
   WebSideIcons,
   InvateIcons,
   InstaIcons,
   EmailIcons,
} from '../../../iconFolder/icon';
import { NavLink } from 'react-router-dom';
const MuseumOnecontact = ({
   working_days = '',
   region = '',
   director = '',
   address = '',
   phones = [],
   links = {},
   email = '',
}) => {
   const { t, i18n } = useTranslation();

   const getBaseUrl = React.useCallback((url) => {
      const regex = /^(?:([^\:]+)\:\/\/)?([^\/]+)/;
      const match = url.match(regex);
      return match?.[2];
   }, []);

   return (
      <div className="museumOne_pageStyle blockRigth_styles">
         {working_days && (
            <div>
               <h4>{t(`working_hours`)}</h4>
               <p className="par-contactMinBlock">
                  {/* <span>
                  <LocationIcon />
               </span> */}
                  {working_days}
               </p>
            </div>
         )}
         {address && (
            <div>
               <h4>{t(`our_address`)}</h4>
               <p className="par-contactMinBlock">
                  <LocationIcon width={20} height={20} fill="#3F3D56" />
                  {region && t(`${region}`)}
                  {address}
               </p>
            </div>
         )}

         {email && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <EmailIcons />
                  <p>
                     <NavLink to={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
                        {email}
                     </NavLink>
                  </p>
               </div>
            </div>
         )}

         {director && (
            <div>
               <h4>{t(`director`)}</h4>
               <p className="par-contactMinBlock">{director}</p>
            </div>
         )}
         {links?.web_site && (
            <div>
               <h4>{t(`webSideMusum.0`)}</h4>
               <div className="blockRigth_styles-parPhone">
                  <WebSideIcons width={17} />
                  <p className="par-contactMinBlock">
                     <a href={`${links?.web_site}`} rel="noopener noreferrer" target="_blank">
                        {getBaseUrl(links?.web_site)}
                     </a>
                  </p>
               </div>
            </div>
         )}
         {phones.length > 0 && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <PhoneIcons width={22} height={22} />
                  {phones?.map((el, idx) => (
                     <p key={idx} className="par-contactMinBlock">
                        <a href={`tel:${el}`}>{el},</a>
                     </p>
                  ))}
               </div>
            </div>
         )}
         <div>
            <div className="blockRigth_styles-parPhone">
               <InvateIcons width={22} />
               <p>{t(`webSideMusum.1`)}</p>
            </div>
         </div>
         {links?.instagram && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <InstaIcons />
                  <p>
                     <a href={links?.instagram} rel="noopener noreferrer" target="_blank">
                        Instagram
                     </a>
                  </p>
               </div>
            </div>
         )}
      </div>
   );
};

export default MuseumOnecontact;
