import { useState } from 'react';
import styles from './Card.module.scss';

export function Card({ title, img, price, onPlus, onFavorite, isFavorite = false }) {

  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(isFavorite);

  const onClickPlus = () => {
    onPlus({title, img, price})
    setIsAdded(!isAdded);
  };

  const onClickFavorit = () => {
    onFavorite({title, img, price})
    setIsLiked(!isLiked);
  }

  return(
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorit}>
        <img src={isLiked ? '/img/liked.svg' : '/img/unliked.svg'} 
             alt='Heart' 
             title={!isLiked ? "Set as Favorite" : 'Сhosen as Favorite'}/>
      </div>
      <img width={170} height={140} style={{borderRadius:'10px'}}  src={img} alt="Goods"/>
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div className={styles.cardPrice}>
          <span>Price:</span>
          <b>{price} UAH</b>
        </div>
        <img className={styles.plus} 
             onClick={onClickPlus} 
             src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} 
             alt='Plus' 
             title={!isAdded ? "Add to Cart" : 'Item was Added to Cart'}/>
      </div>
    </div>
  )
}