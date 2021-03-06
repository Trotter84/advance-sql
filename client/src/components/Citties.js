import React from 'react'
import { Form, Table } from 'semantic-ui-react'
import axios from 'axios'

const Citties = [
  'Sandy',
  'Draper',
  'SLC',
  'Orem',
  'Provo',
  'Ogden',
  'Layton',
  'Midvale',
  'Murray'
]

const options = Citties.map( c => { return { key: c, text: c, value: c }} )

class Citties extends React.Component {
  state = { city: null, properties: [], page: 1, total_pages: 0 }

  handleChange = (e, { value }) => {
    this.setState({ city: value, properties: [] }, () => {
      this.getProperties()
    })
  }

  getProperties = () => {
    const { city } = this.state
    axios.get(`/api/citties/${city}`)
      .then( res => {
        this.setState({ properties: res.data.properties })
      })
  }

  render() {
    const { page, total_pages, properties } = this.state;
    return (
      <div>
        <Form.Select options={options} onChange={this.handleChange} />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Beds</Table.HeaderCell>
              <Table.HeaderCell>Baths</Table.HeaderCell>
              <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { properties.map( p =>
                <Table.Row key={p.id}>
                  <Table.Cell>${p.price}</Table.Cell>
                  <Table.Cell>{p.beds}</Table.Cell>
                  <Table.Cell>{p.baths}</Table.Cell>
                  <Table.Cell>{p.sq_ft}</Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default Citties
