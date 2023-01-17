import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useContext} from 'react';
import {LanguageContext} from '../App'

 
export default function Gallery()
{
    const {data, setLanguage} = useContext(LanguageContext)


    return (
        <div id="gallery" className='mb-5 pb-4 container-fluid ' style={{background: "#F5F5F5"}}>
            <h2 className='pt-4 px-5 pb-4 fw-normal'>{data["gallery"]}</h2>
            <Row xs={1} sm={2} md={4} className="g-3 mx-5">       
                <Col>
                    <Card>
                        <Card.Img variant="top" className='height:80' title="Photo by freestocks on Unsplash" src="gdansk.jpg" />
                        <Card.Body>
                            <Card.Title>{data["Gdansk"]}</Card.Title>
                            <Card.Text>
                                {data["Gdansk_info"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                        <Card.Img variant="top" title="Photo by David Mohseni on Unsplash" src="wroclaw1.jpg" />
                        <Card.Body>
                            <Card.Title>{data["Wroclaw"]}</Card.Title>
                            <Card.Text>
                                {data["Wroclaw_info"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" title="Photo by Severinus Dewantara on Unsplash" src="zdj3.jpg" />
                        <Card.Body>
                            <Card.Title>{data["Cracow"]}</Card.Title>
                            <Card.Text>
                                {data["Cracow_info"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src="malbork.jpg" title="Photo by MARCIN CZERNIAWSKI on Unsplash" />
                        <Card.Body>
                            <Card.Title>Malbork</Card.Title>
                            <Card.Text>
                                {data["Malbork_inf"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" title="Photo by Iwona Castiello d'Antonio on Unsplash" src="zdj4.jpg" />
                        <Card.Body>
                            <Card.Title>{data["Warsaw"]}</Card.Title>
                            <Card.Text>
                                {data["Warsaw_info"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                        <Card.Img variant="top" title="Photo by Andriyko Podilnyk on Unsplash" src="poznan.jpg" />
                        <Card.Body>
                            <Card.Title>{data["Poznan"]}</Card.Title>
                            <Card.Text>
                                {data["Poznan_inf"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>  
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" title="Photo by Nomadic Julien on Unsplash" src="katowice.jpg" />
                        <Card.Body>    
                            <Card.Title>Katowice</Card.Title>
                            <Card.Text>
                                {data["Katowice_inf"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>  
                    <Card className='mt-3'>
                        <Card.Img variant="top" title="Photo by Alex Blokstra on Unsplash"  src="zakopane.jpg"/>
                        <Card.Body>
                            <Card.Title>Zakopane</Card.Title>
                            <Card.Text>
                                {data["Zakopane_inf"]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}



