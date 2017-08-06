import React from 'react'
import { Row, Column } from 'hedron'

export const Header = () => (
  <Row>
    <Column sm={3}>Email arrival date</Column>
    <Column sm={3}>From (email address)</Column>
    <Column sm={3}>Score</Column>
    <Column sm={3}>Published</Column>
  </Row>
)

export default Header
