import React  from 'react'
import { Pagination } from 'antd';
import ListItem from '../listItem/listItem'
import pub from '../../utils/utils'

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isdown: false,
      clineH: document.documentElement.clientHeight
    }
  }
  componentDidMount () {
  } 
  refresh = ()=> {
    this.setState({ 
      refreshing: true
    });
    this.props.onLoadMore(() => {
      this.setState({ 
        refreshing: false 
      });
    });
  }

  render() {
    let listEle = null;
    listEle = this.props.data.map( (item, index) => {
      return (
        item 
          ? <ListItem  key={ index }
            data={{
              name: item.name,
              desc:item.description,
              url:item.html_url,
              star:item.stargazers_count,
              owner: item.owner.login, 
              language: item.language,
              update:item.updated_at
            }}
            ></ListItem>
          : 'nolist'
      )
    } )
    return (
      <div> 
        <ul>
          <p ref='listContent' style={{width:'100%',textAlign:'left',lineHeight:'2',fontSize:'16px'}}>{pub.toThousands(this.props.totalcount)} repository results</p>
          { listEle }
        </ul>
        <Pagination total={1000} onChange={this.props.onchangePage}/>
      </div>
    )
  }
}
