import React, { Component } from 'react';
import { Input } from 'antd';
import ListView from './components/listview/listview'
import Footer from './components/footer/footer'
import './App.css';

const API = 'https://api.github.com/search/repositories';
const Search = Input.Search;
// const pageSize = 10;
// let pageNo = 1;

class App extends Component {
  constructor () {
    super() ;
    this.state = {
      listItems: [], //列表
      keyword: '', //关键字,
      totalCount: 0 //总数
    }
  } 
  search = (keyword,pageNo=1,pageSize=10)=> {
    if (!keyword) return; 
    let _this = this;
    this.setState ({
      keyword
    });
    const url = `${API}?q=${keyword}&sort=star&order=desc&page=${pageNo}&per_page=${pageSize}`;
    fetch(url).then( resp => {
      return resp.json();
    }).then(data => {
      _this.setState({
        listItems: data.items,
        totalCount:data.total_count
      })
    })
  }
  changePage = (pageNo,pageSize=10) => {
    // console.log(pageNo);
    let _this = this;
    const url = `${API}?q=${this.state.keyword}&sort=stars&order=desc&page=${pageNo}&per_page=${pageSize}`
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      _this.setState({
        listItems: data.items
      })
      if (_this.refs.listview) {
        window.scrollTo(0, 0);
      }
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <svg  style={{ display:'inline-block',verticalAlign:'middle' }} height="32" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            <h1 className="App-title">Search GitHub</h1>
          </div>
        </header>
        <div className="main px-3">
          <Search  placeholder="Search GitHub" maxLength={15} onSearch={this.search}    enterButton="Search"/>
        </div>
        <div className="App-intro">
          {
            this.state.listItems.length ? 
            <ListView  ref='listview' totalcount= {this.state.totalCount} data={this.state.listItems}  onchangePage={this.changePage} />
            : <h4 className="text-normal">
                <svg height="24" className="octicon octicon-search" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fillRule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg>
                  Search more than <strong>91M</strong> repositories
              </h4>
          }
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
