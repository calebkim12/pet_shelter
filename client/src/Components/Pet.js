import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

export class Pet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pet: {},
            liked: false
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params._id);
        axios.get(`/api/pets/${this.props.match.params._id}`)
        .then( res => {
            this.setState({
                pet: res.data.pet
            });
        })
        .catch( err => {
            console.log(err);
        });
    }

    like = () => {
        let s = {...this.state}
        s.pet.likes += 1;
        s.liked = true;
        this.setState(s);
        axios.put(`/api/pets/${this.props.match.params._id}`, this.state.pet)
        .then( res => {
            console.log(res);
            this.componentDidMount();
        })
        .catch( err => {
            console.log(err);
        });
    }

    adopt = () => {
        axios.delete(`/api/pets/${this.props.match.params._id}`)
            .then( res => {
                if(res.data.errors){
                    console.log(res.data.errors.errors);
                } else {
                    this.props.history.push("/pets");
                }
            });
        }

    render() {
        return (
        <div>
            <div>
                <h1>Pet Shelter</h1>
                <h4>Details about {this.state.pet.name}</h4>
                <Link to={"/pets"}>Home</Link>
            </div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div className="petTags">
                    <h4>Pet type:</h4> <br/>
                    <h4>Description:</h4> <br/>
                    <h4>Skills</h4> <br/>
                    <h4>Likes</h4> <br/>
                    {this.state.liked ? 
                        <button onClick={this.like.bind(this)} disabled>Like this pet</button>:
                        <button onClick={this.like.bind(this)}>Like this pet</button>
                    }
                </div>
                <div className="petInfo">
                    <h1>{this.state.pet.type}</h1>
                    <p>{this.state.pet.description}</p>
                    <p>{this.state.pet.skillOne} <br/>
                        {this.state.pet.skillTwo} <br/>
                        {this.state.pet.skillThree}</p>
                    <p>{this.state.pet.likes}</p>
                    <button onClick={this.adopt.bind(this)}>Adopt this pet</button>
                </div>
            </div>
        </div>
        )
    }
}

export default Pet