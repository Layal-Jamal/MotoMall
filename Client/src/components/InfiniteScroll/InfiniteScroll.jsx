
import './InfiniteScroll.css';
import logo1 from './../../assets/images/logo1.png';
import logo2 from './../../assets/images/logo2.png';
import logo3 from './../../assets/images/logo3.png';
import logo4 from './../../assets/images/logo4.png';
import logo5 from './../../assets/images/logo5.png';
import logo6 from './../../assets/images/logo6.png';
import logo7 from './../../assets/images/logo7.png';
import logo8 from './../../assets/images/logo8.png';
import logo9 from './../../assets/images/logo9.png';
import logo10 from './../../assets/images/logo10.png';
import logo11 from './../../assets/images/logo11.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,logo11];

export default function InfiniteScroll() {
  const allLogos = [...logos, ...logos];

  return (
    <div className="infinite-scroll-container">
      <div className="infinite-scroll-track">
        {allLogos.map((logo, index) => (
          <div className="infinite-scroll-card" key={index}>
            <div className="card-content">
              <img src={logo} alt={`logo${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}