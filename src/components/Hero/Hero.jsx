import './Hero.css'
export default function Hero({ title }) {
  return (
    <div className='Hero'>
      <div className='Title'>
        <h2>{title}</h2>
        <p>Choose Your Favourite Destination</p>
      </div>
      <div className='notice'>
       <span className='num'>+20</span> types from the best car brands.
      </div>
    </div>
  )
}
