import React , { Component } from  'react'
import pub from '../../utils/utils'
import './listitem.css'

export default class ListItem extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showLug:true
    }
  }
  componentDidMount () {
    // console.log(this.props.data.update);
  }
  render () {
    return (
      <li className="list_item">
         <div>
              <a href={this.props.data.url} target="_blank"><span className="name">{this.props.data.name}</span></a>
              {
                this.props.data.star !== 0 
                ?<div style={{display:'flex',alignItems:'center'}}>
                    <img src={require('./star.svg')}  alt="star"/>
                    <p style={{marginLeft:'5px',fontSize:'14px',color:'#586069'}}>{pub.toDecimal(this.props.data.star)}k</p>
                </div>
                : ''
              }
          </div>
          <div>
              <span className="desc">{this.props.data.desc}</span>
          </div>
          <div className="language">
             {
              this.props.data.language!==null ?
              <p className="item_language">{this.props.data.language}</p>
              :''
             }
          </div>
          <div className="bottom_desc">
            <p> {this.props.data.owner}</p>
            <p className="update"> Updated {pub.getTimes(this.props.data.update)}</p>
          </div>
      </li>
    )
  }
}