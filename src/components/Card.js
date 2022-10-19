
export function Card() {

  return(
    <div className="card">
      <div className='favorite'>
        <img src='/img/unliked.svg' alt="Unliked" title="Set as Favorite"/>
      </div>
      <img width={170} height={140} style={{borderRadius:'10px'}}  src="/img/Goods/1.jpg" alt="Goods"/>
      <h5>Fighter Aircraft Hawker Tempest</h5>
      <div className='cardBottom'>
        <div className="cardPrice">
          <span>Price:</span>
          <b>200 uah</b>
        </div>
        <button className='button'>
          <img src='/img/plus.svg' width={11} height={11} alt='Plus' title="Add to Cart"/>
        </button>
      </div>
      </div>
  )
}
