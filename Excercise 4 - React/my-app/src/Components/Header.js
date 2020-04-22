import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header(props){

    return(
        <nav>
            <Row>
                    <Col xs={12} md={12} className="m-2">
                        <Form.Label>
                            Sort by:
                        </Form.Label>
                        <Form.Control as="select" value={props.sort} onChange={(event) => props.handleNavbarChange(event) }  name="sort">
                            <option value="Default">Default</option>
                            <option value="NameAsc">Name: A-Z </option>
                            <option value="NameDesc">Name: Z-A</option>
                            <option value="RatingAsc">Rating: lowest first</option>
                            <option value="RatingDesc">Rating: highest first</option>
                        </Form.Control>
                    </Col >
                    <Col xs={12} md={12} className="m-2">
                        <Form.Label>
                            Search:
                        </Form.Label>
                        <Form.Control 
                            value={props.filter}
                            onChange={(event) => props.handleNavbarChange(event) } 
                            name="filter" 
                            type="text" 
                            placeholder="search" 
                        />
                    </Col>
                    <Col xs={12} md={12} className="m-2">
                        <Button onClick={() => props.addItemClick()}>Add item</Button>
                    </Col>
                    
            </Row>
            
            <hr/>
        </nav>
    )
}


export default Header
