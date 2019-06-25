import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class List extends Component {

    constructor(props){
        super(props);
        this.state = {
            pets: []
        }
    }

    sortPets(arr){
        arr.sort(function(a, b) {
            var typeA = a.type.toUpperCase();
            var typeB = b.type.toUpperCase();
            if (typeA < typeB) {
                return -1;
            }
            if (typeA > typeB) {
                return 1;
            }
            return 0;
        });
        return arr;
    }

    componentDidMount = () => {
        axios.get("http://localhost:8000//api/pets")
            .then( res => {
                let pets = res.data.pets;
                this.setState({pets: this.sortPets(pets)});
            })
            .catch( err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Pet Shelter</h1>
                    <h3>These pets are looking for a home!</h3>
                    <Link to={"/pets/new"}>Add a pet to the shelter</Link>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.pets.map( pet =>
                            <tr key={pet._id}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td><Link to={`/pet/${pet._id}`}>Details</Link> <Link to={`/pet/${pet._id}/edit`}>Edit</Link></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List