import React, { Component } from 'react'
import { baseUrl } from '../constant';
import store from '../store';
import Select from 'react-select';
import $ from 'jquery'
import { getAllCities } from '../actions';
import Axios from 'axios'
import { connect } from 'react-redux';
import Forecast from './forecast';
import Wind from './wind';
import Atmosphere from './atmosphere';
import Astronomy from './astronomy';
import './index.css'

var headers = {
    "Content-Type": "application/json"
}
class Weather extends Component {

    constructor(props){
        super(props);

         //state
    this.state = {
        selectedOption: '',
        weather:'',
        location:'',
        current_observation:'',
        city:'',
        historyLoaded: 0
    };

        this.historyClick = this.historyClick.bind(this)
    }

    historyClick(event){
        var data = {
            "city": event.target.id
        }
        Axios.post(
            `${baseUrl}/upload`,
            { data },
            {
                headers
            }
        ).then(res => {
            const result = res.data;
            const weather = JSON.parse(result)
            this.setState({
                weather
            })
            this.getHistory();
            $(".btnSubmit").html('Check Forecast')
        });
    }
   
    // selected city
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    //submit form
    formSubmit = (e) => {
        e.preventDefault()
        $(".errMsg").removeClass('d-block').addClass('d-none')
        if(this.state.selectedOption.value) {
            $(".btnSubmit").html('Loading...')
            this.setState({
                weather:''
            })
            
            var data = {
                "city": this.state.selectedOption.value,
                "label": this.state.selectedOption.label
            }
            Axios.post(
                `${baseUrl}/upload`,
                { data },
                {
                    headers
                }
            ).then(res => {
                const result = res.data;
                const weather = JSON.parse(result)
                this.setState({
                    weather
                })
                this.getHistory();
                $(".btnSubmit").html('Check Forecast')
            });
        }
        else {
            $(".errMsg").removeClass('d-none').addClass('d-block')
        }
    }
    componentDidMount(){
        store.dispatch(getAllCities())

        this.getHistory();
    }

    // componentDidUpdate(){
    //     this.getHistory();
    // }

    getHistory = () => {
        Axios.post(
            `${baseUrl}/getHistory`,
            { 1:'1' },
            {
                headers
            }
        ).then(res => {
            this.setState({
                history: res.data
            }, () => {
                this.setState({
                    historyLoaded: 1
                })
            })
        });
    }

    render() {
        const { selectedOption } = this.state;
        const {location, current_observation, forecasts} = this.state.weather
        return (
            <React.Fragment>
                <div className="container mb-2 bg_lblue">
                    <div className="row">
                <div className="form-signin">
                    <form className=" " onSubmit={this.formSubmit}>
                        <div className="text-center mb-4">
                            <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                            <h1 className="h3 mb-3 font-weight-normal">Weather Forecast</h1>
                            <p className="small">Check weather of your nearby cities</p>
                        </div>
                        <div className="form-label-group">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.props.cities.data}
                                placeholder={'Select city'}
                            />
                        </div>

                        <button className="btn btn-primary btn-block btnSubmit" type="submit">
                            Check Forecast
                        </button>
                        <div className="form-label-group">
                            <div className=" alert alert-danger errMsg d-none">
                                Please select a city.
                            </div>
                        </div>
                    </form>
                    {
                        this.state.weather &&
                        <React.Fragment>

                    <div className="container my-2">
                         <div className="row">
                             <div className=" col-12 p-0">
                                <div className="text-dark h5">{location && location.city}</div>
                                <div className=" small">{location && location.country}</div>
                                <div className="h1">{current_observation && current_observation.condition.temperature} <sup><i className="fas fa-genderless"></i></sup>  F</div>
                             </div>
                         </div>
                    </div>
                    </React.Fragment>
                    }
                </div>
                </div>
                </div>
                <div className="container my-2">
                    <div className="row">
                        {this.state.weather &&
                        <React.Fragment>
                            <div className="col-4 col-sm-12 col-md-4">
                                <Wind wind={current_observation} />
                                <Atmosphere atmosphere={current_observation} />
                            </div>
                            <div className="col-4 col-sm-12 col-md-4">
                                <Forecast forecasts={forecasts} />
                            </div>
                            <div className="col-4 col-sm-12 col-md-4">
                                <Astronomy astronomy={current_observation} />
                            </div>
                        </React.Fragment>
                        }
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="card w-100">
                        <div className="card-body">
                        <div className="card-text h5"> History </div>
                        <hr/>
                        {this.state.historyLoaded == 1?
                            this.state.history && this.state.history.length > 0? 
                                <React.Fragment>
                                {this.state.history.map((val, index) => 
                        <div key={index}> 
                            <div className="row">
                                <div className="col-6 col-md-6 col-sm-12 mouse_pointer" onClick={this.historyClick} id={val.city}>{val.city}</div> 
                                <div className="col-6 col-md-6 col-sm-12 text-right mouse_pointer">{ new Date(val.date).getFullYear()+"-"+(new Date(val.date).getMonth()+1)+"-"+new Date(val.date).getDate()+" "+new Date(val.date).getHours()+":"+new Date(val.date).getMinutes()  }</div>
                            </div>
                        </div>     )}
                            </React.Fragment>:
                                <div>You do not have any history, Start searching for city.</div>
                        :
                            <div> Loading your history.</div>
                        }
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({ 
    cities:state.cities
  });
export default  connect( mapStateToProps)(Weather)
  