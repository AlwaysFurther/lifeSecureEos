import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, ListGroupItem, Alert } from 'reactstrap'
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// Index component
class CheckPeople extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className='SecureLife'>
        <Row>
          <Col className='text-center' md={{ size: 8, offset: 2 }}>
            <div className='p-lg-5 py-5 px-md-0'>
              <h1 className="py-4">Pascal account: Your People</h1>
              <ListGroup>
                <Link
                  to="/checkPeople/someone"
                  className="list-group-item my-2 bg-danger text-white"
                  style={{pointer: 'arrow'}}
                >
                  Corentin Robineau
                </Link>
                <ListGroupItem className="my-2">Alex Junker</ListGroupItem>
                <ListGroupItem className="my-2">Tom Bouquet</ListGroupItem>
                <ListGroupItem className="my-2">Noby Fujioka</ListGroupItem>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default CheckPeople;
