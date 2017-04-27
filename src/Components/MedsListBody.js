import React, {Component} from 'react';

var MedicationList = [
    {
        name: "Medication #1"
    },
    {
        name: "Medication #2"
    },
    {
        name: "Medication #3"
    }
];

class MedsListBody extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log(this.input.value);
        e.preventDefault();
    }
    render() {
        return (
                <nav className="panel">
                    <p className="panel-heading has-text-centered">
                        Medications
                    </p>
                    <div className="panel-block">
                        <div className="control has-icons-left">
                            <div className="field has-addons">
                                <p className="control">
                                    <input className="input is-small" ref={(input) => this.input = input} type="text" placeholder="Add medication"/>
                                </p>
                                <p className="control">
                                    <a className="button is-small">Add</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <MedicationBlock MedicationList={MedicationList} />
                </nav>

        )
    }
}


const MedicationBlock = ({MedicationList}) => {
        return(
            <div>
            {MedicationList.map((e) =>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-plus-square"></i>
                    </span>
                    {e.name}
                </a>
            )}
            </div>
        )
}


export default MedsListBody;
