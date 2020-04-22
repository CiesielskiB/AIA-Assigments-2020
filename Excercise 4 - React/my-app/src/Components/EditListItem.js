import React from "react"
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
function EditListItem(props){

    return(
        <Card className="col-md-4 mx-auto mb-3">
            <Card.Body>
                <Form.Label>
                    Image Url:
                </Form.Label>
                <Form.Control 
                    onChange={(event) => props.handleChange(event, props.item.Id)} 
                    value={props.item.ImageUrl} 
                    type="text" 
                    name="ImageUrl"
                />
            </Card.Body>
            <Card.Body>
                <Card.Title>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <Form.Control 
                        onChange={(event) => props.handleChange(event, props.item.Id)} 
                        value={props.item.Name} 
                        type="text" 
                        name="Name"
                    />
                </Card.Title>
                <Card.Text>
                    <Form.Label>
                        Description:
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        onChange={(event) => props.handleChange(event, props.item.Id)} 
                        value={props.item.Description} 
                        type="text" 
                        name="Description"
                    />
                </Card.Text>
            </Card.Body>
                <Form.Label>
                        Rating:
                </Form.Label>
                <Form.Control 
                    as="select" 
                    onChange={(event) => props.handleChange(event, props.item.Id)} 
                    value={props.item.Rating} 
                    name="Rating"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Control>
            <Card.Body>
                <Button 
                    className="m-2" 
                    onClick={() => props.handleSubmit(props.item.Id)}> 
                    Save 
                </Button>
                <Button 
                    variant="danger" 
                    className="m-2" 
                    onClick={() => props.handleDeleteClick(props.item.Id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    )
}


export default EditListItem
