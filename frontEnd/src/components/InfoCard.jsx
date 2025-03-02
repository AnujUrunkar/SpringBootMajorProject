import React from 'react'
import Card from 'react-bootstrap/Card';

function InfoCard(props) {
    console.log(props);
    const {title , status , desc} = props ;
    return (
        <>
            <Card className='m-auto mt-4 mb-4' style={{ width: '23rem' , textAlign: "center"}}>

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {status}
                    </Card.Text>
                    <Card.Text>
                       {desc}
                    </Card.Text>

                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </>
    )
}

export default InfoCard