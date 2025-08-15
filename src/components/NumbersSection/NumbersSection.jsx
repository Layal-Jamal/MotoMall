
import './NumbersSection.css';
import NumbersData from './../../Data/NumbersData';
import NumbersComponent from '../NumbersComponent/NumbersComponent';

export default function NumbersSection() {
  return (
    <div className="numberscards">
     <div className='NumCardsContainer'>
       {NumbersData.map((item, index) => (
        <NumbersComponent key={index} title={item.title} number={item.number} />
      ))}
     </div>
    </div>
  );
}