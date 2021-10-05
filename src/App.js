import React,{Component} from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      search:'',
      condition:'all',
      array:[],
      completed:[],
      clear:[]
    }
  }
  onChangeSearch=(event)=>{
    this.setState({search:event.target.value})
  }
  onClickSearch=()=>{
    const array=this.state.array;
    array.push(this.state.search);
    this.setState({search:''})
  }
  onClickClearAll=()=>{
    this.setState({array:[]})
    this.setState({completed:[]})
    this.setState({clear:[]})
  }
  onChangeRadio=(items)=>{
    const completed=this.state.completed;
    completed.push(items);
    const filtered=this.state.array.filter(item=>!completed.includes(item))
    this.setState({array:[]})
    this.setState({array:filtered})
  }
  onClickCompleted=()=>{
    this.setState({condition:"completed"})
  }
  onClickAll=()=>{
    this.setState({condition:"all"})
  }
  onClickActive=()=>{
    this.setState({condition:"active"})
  }
  onClickCompletedClear=()=>{
    this.setState({completed:[]})
  }
  onKeyEnter=(event)=>{
    if (event.key==='Enter'){
      const array=this.state.array;
      array.push(this.state.search);
      this.setState({search:''})
    }
  }
  onClickCross=(item)=>{
    const clear=this.state.clear;
    clear.push(item)
    const trash=this.state.array.filter(i=>!this.state.clear.includes(i))
    this.setState({array:trash})
  }
  onClickCompletedCross=(item)=>{
    const clear=this.state.clear;
    clear.push(item)
    const trash=this.state.completed.filter(i=>!this.state.clear.includes(i))
    this.setState({completed:trash})
  }
  render(){
  return (
    <div className="App ">
      <div className="box flex flex-column items-center pt7">
        <div className="">
          <div className="ba b--transparent tc pt0 pb0 pl0 pr0">
            <div><input className="search bg-transparent white br3" type='search' onKeyPress={this.onKeyEnter} onChange={this.onChangeSearch} value={this.state.search} placeholder="Add a items"/></div>
            {/*<div className="button"><input type="button" value="Add" onClick={this.onClickSearch}/></div>*/}
          </div>
          <div className="pt4">
            <div className="box1 br3 shadow-3 pt2 pl1 pr2 pb2">
              <ul className="tl flex flex-column pl0">
                { 
                  this.state.condition==='all'
                  ? this.state.array.map((itemsval)=>{
                    return (<li className="list white bb b--black flex items-center pa2 tc">
                              <div className="pr2">
                                <input onChange={()=>{this.onChangeRadio(itemsval)}} type="checkbox"/>
                              </div><div className="tc">{itemsval}</div>
                              <div className="buffer"></div>
                              <div className="symbol flex tr justify-end">
                                {/*<div className="pr2">✓</div>*/}
                                <div className="pointer dim" onClick={()=>{this.onClickCross(itemsval)}}>✕</div>
                              </div>
                              </li>)
                  })
                  : ( this.state.condition==="completed"
                      ? this.state.completed.map((itemsval)=>{
                        return (<li className="list white bb b--black flex items-center pa3">
                                  {itemsval}
                                  <div className="symbol flex tr justify-end">
                                    {/*<div className="pr2">✓</div>*/}
                                    <div className="pointer dim" onClick={()=>{this.onClickCompletedCross(itemsval)}}>✕</div>
                                  </div>
                                </li>)
                      })
                      : this.state.array.map((itemsval)=>{
                        if (this.state.completed.includes(itemsval)===false){
                          return (<li className="list white bb b--black flex items-center pa2">
                                    <div className="pr2">
                                      <input onChange={()=>{this.onChangeRadio(itemsval)}} type="checkbox"/>
                                    </div>{itemsval}
                                    <div className="symbol flex tr justify-end">
                                      {/*<div className="pr2">✓</div>*/}
                                      <div className="pointer dim" onClick={()=>{this.onClickCross(itemsval)}}>✕</div>
                                    </div>
                                  </li>)
                        }
                      })             
                  )     
                }
              </ul>
              <div className="flex pa4 pb0">
                <div><input className="bg-transparent ba b--transparent pointer dim" onClick={this.onClickAll} type="button" value="All"/></div>
                <div><input className="bg-transparent ba b--transparent pointer dim" onClick={this.onClickActive} type="button" value="Active"/></div>
                <div><input className="bg-transparent ba b--transparent pointer dim" onClick={this.onClickCompleted} type="button" value="Completed"/></div>
                <div><input className="bg-transparent ba b--transparent pointer dim" onClick={this.onClickCompletedClear} type="button" value="Completed Clear"/></div>
                <div><input className="bg-transparent ba b--transparent pointer dim" onClick={this.onClickClearAll} type="button" value="Clear All"/></div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
}

export default App;

