import './NumbersComponent.css';

export default function NumbersComponent({ title, number }) {
  return (
    <div className="NumberCard">
      <p className='title'>{title}</p>
      <p className='num'>{number}</p>
    </div>
  );
}