import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import SecureLife from '../pages/SecureLife/Index'
import Protectors from '../pages/Protectors'
import CheckPeople from '../pages/CheckPeople'
import CheckIndividual from '../pages/CheckIndividual/Index'

class Main extends Component {
  render(){
    return (
      <main style={{ paddingTop: '3.5rem' }}>
        <Switch>
          <Route exact path="/protectors" component={ Protectors } />
          <Route path="/checkPeople/:user" component={ CheckIndividual } />
          <Route exact path="/checkPeople" component={ CheckPeople } />
          <Route exact path="/" component={ SecureLife } />
          <Redirect to="/" component={ SecureLife } />
        </Switch>
      </main>
    )
  }
}

export default Main