import './ManagersSection.css'
import ManagersComponent from './../ManagersComponent/ManagersComponent';
import ManagersData from './../../Data/ManagersData'
import gold from './../../assets/images/gold.png'
export default function ManagersSection() {
  return (
    <div className="Managerscards">
      <h2><img className='gold' src={gold} alt='' />Managers<img className='gold' src={gold} alt='' /></h2>
      <p className='Description text-secondary'>Take a look at the company's managers.</p>

      <div className='ManagersCardsContainer'>
        {ManagersData.map((item, index) => (
          <ManagersComponent key={index} name={item.name} work={item.work} link={item.link} gmail={item.gmail} />
        ))}
      </div>
    </div>
  );
}
