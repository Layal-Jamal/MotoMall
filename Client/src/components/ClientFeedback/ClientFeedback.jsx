import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { RiDoubleQuotesR } from "react-icons/ri";
import './ClientFeedback.css'
function ClientFeedback({name, text}) {
  return (
    <Card className="ClientCard rounded-4 pt-4 mt-2 text-start">
      <div className="text-start ms-3 stars"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /></div>

      <Card.Body>
        <Card.Text className="text-start">
          {text}
        </Card.Text>

        <div className=" d-flex">
          <h5 className="clientname">{name}</h5>
          <RiDoubleQuotesR className="ms-auto font-size-5" />
        </div>
      </Card.Body>
    </Card>
  );
}
export default ClientFeedback;