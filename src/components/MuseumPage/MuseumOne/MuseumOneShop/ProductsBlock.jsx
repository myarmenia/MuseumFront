import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShopMinIcons } from '../../../../iconFolder/icon';

const ProductsBlock = ({ id, image, product_category_id, price, name }) => {
   const { t, i18n } = useTranslation();
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   return (
      <div className="ProductsBlock">
         <div className="ProductsBlock-img">
            <img src={image} alt="images products" />
         </div>
         <div className="ProductsBlock-description">
            <p className="ProductsBlock-description-title">{name.slice(0, 30)}</p>
            <p className="ProductsBlock-description-categoru"></p>
            <div className="ProductsBlock-description-parPrice">
               <p className="ProductsBlock-description-price">{price}AMD</p>

               {/* <ShopMinIcons /> */}
            </div>
            <Link to={`/${leng}/store/${id}`}>
               <button className="ProductsBlock-description-btn">{t(`buy`)} </button>
            </Link>
         </div>
      </div>
   );
};

export default ProductsBlock;
