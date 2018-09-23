import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// Index component
class Protectors extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className='SecureLife'>
        <Row>
          <Col className='text-center'>
            <div className='p-lg-5 py-5 px-md-0'>
              <h1>My Protectors</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default Protectors;