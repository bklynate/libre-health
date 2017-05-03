import React, {Component} from 'react';

class MedsInteract extends Component {
    render() {
        // this.props.medications will be used to call the interactions api
        return (
            <div className="box has-text-centered">
                <h5 className="title is-5">Medication Interactions</h5>
                <div className="tabs is-medium">
                    <ul>
                        <li class="is-active">
                            <a>Tylenol</a>
                        </li>
                        <li>
                            <a>Xanax</a>
                        </li>
                        <li>
                            <a>Cocaine</a>
                        </li>
                        <li>
                            <a>Allergy Med</a>
                        </li>
                    </ul>
                </div>
                <div className="media">
                    <table className="table is-bordered is-striped is-narrow">
                        <thead>
                            <tr>
                                <th>Medication</th>
                                <th>Severity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="is-selected">
                                <td>Tylenol</td>
                                <td><span class="tag is-medium is-warning">Warning</span></td>
                            </tr>
                            <tr>
                                <td>Tylenol</td>
                                <td>Crazy Bad</td>
                            </tr>
                            <tr>
                                <td>Tylenol</td>
                                <td>Crazy Bad</td>
                            </tr>
                            <tr>
                                <td>Tylenol</td>
                                <td>Crazy Bad</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const medsTab = ({interactionList}) => {
    return (
        <div className="tabs is-medium">
            <ul>
                {interactionList.map((e, i) =>
                    <li><a>{e.name}</a></li>
                )}
            </ul>
        </div>
    )
}

const MedsTable = ({interactionResults}) =>{
    return (
        <div className="media">
                    <table className="table is-bordered is-striped is-narrow">
                        <thead>
                            <tr>
                                <th>Medication</th>
                                <th>Severity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interactionResults.map((e, i) =>
                                <tr>
                                <td>{e.name}</td>
                                <td>{e.message}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
    )
}

const MedicationBlock = ({MedicationList}) => {
    return (
        <div>
            {MedicationList.map((e, i) => <a key={i} className="panel-block">
                <span className="panel-icon">
                    <i className="fa fa-plus-square"></i>
                </span>
                {e.name}
            </a>)}
        </div>
    )
}

export default MedsInteract;