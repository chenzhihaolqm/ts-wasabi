import React from 'react';

interface ILoaderState{
  data: any,
  isLoading: Boolean
}

interface ILoaderProps{
  data: any
}

let a = 'abc'
if(a == 'abc'){
  
}

const WithLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState>{
    constructor(props: any){
      super(props);
      this.state = {
        data: null,
        isLoading: true
      }
    }
    shouldComponentUpdate(){
      // console.log(arguments)
      return false  // 无效
    }
    componentDidMount(){
      setTimeout(()=> {
        if(!this.state.isLoading){
          return
        }
        this.setState({
          isLoading: false,
          data: { status: true, message: '成功回调了'}
        })
      },500)
    }
    render(){
      const { data, isLoading } = this.state;
      return <>
          {
            (isLoading || !data) ? <p>data is Loading</p> :
            <WrappedComponent {...this.state as P} ></WrappedComponent>
          }
      </>
      ;
    }
  }
}

export default WithLoader
