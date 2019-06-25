import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pet: {
                name: "",
                type: "",
                description: "",
                skillOne: "",
                skillTwo: "",
                skillThree: ""
            },
            errors: {}
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000//api/pets/${this.props.match.params._id}`)
        .then( res => {
            this.setState({pet: res.data.pet});
        })
        .catch( err => {
            console.log(err);
        });
    }

    change = (key, e) => {
        let p = {...this.state.pet};
        p[key] = e.target.value;
        this.setState({pet: p});
    }

    updatePet = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000//api/pets/${this.state.pet._id}`, this.state.pet)
        .then( res => {
            if(res.data.errors){
                this.setState({errors: res.data.errors.errors})
            } else {
                this.props.history.push("/pets");
            }
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Pet Shelter</h1>
                    <h3>Edit this pet</h3>
                </div>
                <form onSubmit={this.updatePet}>
                    <div className="form-group">
                        <label>Pet Name:</label>
                        <input type="text" onChange={this.change.bind(this, "name")} value={this.state.pet.name} />
                        {
                            this.state.errors.name ? 
                            <p>{this.state.errors.name.message}</p>:
                            ""
                        }
                    </div>

                    <div className="form-group">
                        <label>Pet Type:</label>
                        <input type="text" onChange={this.change.bind(this, "type")} value={this.state.pet.type} />
                        {
                            this.state.errors.type ? 
                            <p>{this.state.errors.type.message}</p>:
                            ""
                        }
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" onChange={this.change.bind(this, "description")} value={this.state.pet.description} />
                        {
                            this.state.errors.description ? 
                            <p>{this.state.errors.description.message}</p>:
                            ""
                        }
                    </div>
                    <label>Skills:</label>
                    <div className="form-group">
                        <label>Skill 1:</label>
                        <input type="text" onChange={this.change.bind(this, "skillOne")} value={this.state.pet.skillOne} />
                    </div>
                    <div className="form-group">
                        <label>Skill 2:</label>
                        <input type="text" onChange={this.change.bind(this, "skillTwo")} value={this.state.pet.skillTwo} />
                    </div>
                    <div className="form-group">
                        <label>Skill 3:</label>
                        <input type="text" onChange={this.change.bind(this, "skillThree")} value={this.state.pet.skillThree} />
                    </div>
                    <input type="submit" className="btn-submit" value="Edit Pet" />
                    <Link to={"/pets"}>Cancel</Link>
                </form>
            </div>
        )
    }
}

export default Edit