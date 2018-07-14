import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import Tags from "./Tags"

class SolutionModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal:false,
      mobile:window.screen.width > 540 ? false : true
    }

    this.checkIfActive = this.checkIfActive.bind(this);
    //this.updateSolutionViews = this.updateSolutionViews.bind(this);
  }

  componentDidMount() {
    this.checkIfActive();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.checkIfActive();
    }
  }

  // updateSolutionViews() {
  //     var data = this.props.solution
  //     data.views += 1
  //     var url = 'https://www.solutionconnect.org/api/postings/solution/update/'
  //     fetch(url + this.props.solution.pk + '/', {
  //       method: 'put',
  //       headers: {
  //         'content-type':'application/json',
  //       },
  //       body: JSON.stringify(data)
  //     })
  // }

  checkIfActive() {
    if (this.props.activeModal === this.props.solution.pk) {
      this.setState({modal:true});
      // this.updateSolutionViews();
    }
    else {
      this.setState({modal:false});
    }
  }

  render() {
    return (
      <div>
        <Modal size={this.state.mobile ? "md":"lg"} isOpen={this.state.modal} toggle={this.props.toggle}>
          <h4 className="mb-2"><i className="fa fa-window-close mx-1 float-right pointerHand" onClick={() => {  this.props.toggle() }}></i><i className="fa fa-bookmark mx-1 float-right pointerHand"></i><i className="fa fa-share-alt-square mx-1 float-right pointerHand"></i></h4>
          <div className="text-center">
            <h2>{this.props.solution.name} by {this.props.solution.provider_name}</h2>
            <p className="alert alert-secondary">{this.props.solution.status} {this.props.solution.status_date}</p>
          </div>
          <ModalBody>
            <br/>
            <h4 class="m-0">Who it's for:</h4>
            <Tags tags={this.props.solution.tags} />
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" className="btn-block">Additional Solution Media</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default SolutionModal;