import {useContext} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import {LanguageContext} from '../App'


export default function Information() {

    const {data} = useContext(LanguageContext)

    return(
        <div className='container-xl' style={{background: "#F5F5F5"}}>
        <Row id="guide" className=' my-5 px-5 py-3 rounded border text-secondary' >
          <Col sm={4}>
          <Image src="map.jpg" title="Photo by Element5 Digital on Unsplash" thumbnail rounded  />
          </Col>
          <Col sm={8}>
            <h1 className='text-dark pt-4'>Guide to Poland</h1>
            <p className='pt-4 fs-5 fw-bolder'>{data["description"]}</p>
          </Col>
           </Row>
      </div>
    );
}