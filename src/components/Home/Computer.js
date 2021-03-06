import React, { Component } from 'react';
import styled from 'styled-components'
import Header from './Computer/Header'
import Limit from './Limit'


import Content1 from "./Computer/Content1";
import Content2 from "./Computer/Content2"

const Container = styled(Limit)`
  padding: 1em;
`

export default class Computer extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Content1 />
                </Container>

                <Container>
                    <Content2 />
                </Container>
            </div>
        );
    }
}

