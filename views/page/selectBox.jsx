import React from 'react';

export default class BTSelectBox extends React.Component {
    componentDidMount() {
        setTimeout(()=>{
            this.setOptions(['action1After','action2After'],'before');
        },1000);
    }
    setOptions=(options,type='before')=>{
        if (type==='before')
        {
            this.setState({options:{data:options,type:'before'}},()=>this.setOptions(options,'after'));
        }else{
            this.setState({options:{data:options,type:'after'}});
        }

    }
    state={
        options:{
            data:[
                "action1Before",
                "action2Before",
            ],
            type:'before'
        }
    };
    render() {
        const options=this.state.options;
        const Option=({children})=><li><a href="#">{children}</a></li>;
        return (<div>
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        onClick={()=>{
                            const newOptions=this.state.options.data.slice();
                            newOptions.push(newOptions.length);
                            this.setOptions(newOptions)
                        }}
                >
                    add <span className="caret"></span>
                </button>
                <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {
                            options.data.map((option)=><Option>{option}</Option>)
                        }
                    </ul>
                </div>
        </div>
        );
    }
}
