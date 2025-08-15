import './Hero.css'
export default function Hero({ title , x, BackGround}) {
  return (
    <div className={x ? 'Hero' :'Hero2'}>
      <img src={BackGround} alt='' className='Bg-Img'/>
      <div className='Title'>
        <h2>{title}</h2>
        {x && <p>Choose Your Favourite Destination.</p>}
      </div>
      {x && <div className='notice'>
       <span className='num'>+40</span> types from the best car brands.
      </div>}
    </div>
  )
}
