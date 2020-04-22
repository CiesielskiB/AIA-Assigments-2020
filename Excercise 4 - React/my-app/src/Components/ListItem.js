import React from "react"
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

function ListItem(props){

    return(
            <Card className="col-md-4 mx-auto mb-3">
            <Image 
                variant="top" 
                src={props.item.ImageUrl} 
                widht="200"
                height="200"
                alt="itemImage"
                className="m-3 align-self-center "
            />
            <Card.Body>
                <Card.Title>{props.item.Name}</Card.Title>
                <Card.Text>
                {props.item.Description}
                </Card.Text>
            </Card.Body>
                <p>
                    Rating : {props.item.Rating}/5
                </p>
            <Card.Body>
                <Button className="m-2" onClick={() => props.handleEditClick(props.item.Id)}> Edit </Button>
                <Button variant="danger" className="m-2" onClick={() => props.handleDeleteClick(props.item.Id)}> Delete</Button>
            </Card.Body>
            </Card>
    )
}


export default ListItem
