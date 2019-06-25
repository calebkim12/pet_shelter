import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPet: {
                name: "",
                type: "",
                description: "",
                skillOne: "",
                skillTwo: "",
                skillThree: "",
                likes: 0
            },
            errors: {}
        }
    }

    change = (key, e) => {
        let p = {...this.state.newPet};
        p[key] = e.target.value;
        this.setState({newPet: p});
    }

    makePet = (e) => {
        e.preventDefault();
        axios.post("/api/pets", this.state.newPet)
        .then( res => {
            if(res.data.errors){
                console.log(res.data.errors);
                this.setState({errors: res.data.errors.errors})
            } else {
                this.props.history.push("/pets");
            }
        })
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Pet Shelter</h1>
                    <h3>Know of a pet needing a home?</h3>
                </div>
                <form onSubmit={this.makePet}>
                    <div className="form-group">
                        <label>Pet Name:</label>
                        <input type="text" onChange={this.change.bind(this, "name")} />
                        {
                            this.state.errors.name ? 
                            <p>{this.state.errors.name.message}</p>:
                            ""
                        }
                    </div>

                    <div className="form-group">
                        <label>Pet Type:</label>
                        <input type="text" onChange={this.change.bind(this, "type")} />
                        {
                            this.state.errors.type ? 
                            <p>{this.state.errors.type.message}</p>:
                            ""
                        }
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" onChange={this.change.bind(this, "description")} />
                        {
                            this.state.errors.description ? 
                            <p>{this.state.errors.description.message}</p>:
                            ""
                        }
                    </div>
                    <label>Skills:</label>
                    <div className="form-group">
                        <label>Skill 1:</label>
                        <input type="text" onChange={this.change.bind(this, "skillOne")} />
                    </div>
                    <div className="form-group">
                        <label>Skill 2:</label>
                        <input type="text" onChange={this.change.bind(this, "skillTwo")} />
                    </div>
                    <div className="form-group">
                        <label>Skill 3:</label>
                        <input type="text" onChange={this.change.bind(this, "skillThree")} />
                    </div>
                    <input type="submit" className="btn-submit" value="Add pet" />
                    <Link to={"/pets"}>Cancel</Link>
                </form>
            </div>
        )
    }
}

export default New
