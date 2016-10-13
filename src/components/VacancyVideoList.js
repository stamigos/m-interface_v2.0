import React from 'react';
import List from 'react-list-select'
import DropdownMenu from 'react-dd-menu';
import { Link } from 'react-router'
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

import VideoButton from '../components/VideoButton'
import ModalProfile from '../components/ModalProfile'

function applicationStatus(application){
    if(application.status == "DECLINED")
      return 'rejected';
    if(application.status == "CONTACTED")
      return 'accepted';
    return 'applied';
}
function formatDateApplication(date) {
    var splitedDate = date.split("-");
    var day = splitedDate[2].split("T")[0]
    var month = splitedDate[1]
    return day + "/" + month
}
class VacancyVideo extends React.Component {
    constructor(){
      super()
      this.state = {
        isMenuOpen: false,
        isShowingModal: false
      };
      this.toggle = this.toggle.bind(this);
      this.close = this.close.bind(this);
      this.onApplicationClick = this.onApplicationClick.bind(this);
    }
    close() {
        this.setState({ 
          isMenuOpen: false 
        });
      }
    toggle() {
        this.setState({ 
          isMenuOpen: !this.state.isMenuOpen,
          isShowingModal: false
        });
    }
    onApplicationClick() {
        this.setState({isShowingModal: true})
    }
    render() {
      var application = this.props.application;
      var menuOptions = {
        isOpen: this.state.isMenuOpen,
        close: this.close,
        toggle: <i onClick={this.toggle} className="fa fa-chevron-down in-applicant" aria-hidden="true"></i>,
        align: 'right',
        animAlign: 'center',
        animate: true
      }
    return (
        <div className="applicant-message">
          <Video controls onClick={this.onApplicationClick.bind(this)}>
              <Controls>
                  <VideoButton type="play"/>
                  <VideoButton type="stop"/>
              </Controls>
              <source src={application.video} type="video/mp4" />
              <Overlay />
          </Video>
          <div className="applicant-info">
                  <h2 className="name">{application.owner.first_name} {application.owner.last_name}</h2>
                  <h2 className="date">{formatDateApplication(application.created)}</h2>
                  <div className="applicant-dropdown">
                    <div className="user-menu-button">
                      <DropdownMenu {...menuOptions}>
                        <li><Link to="" href="#">Accept</Link></li>
                        <li><Link to="" href="#">Decline</Link></li>
                        <li><a onClick={this.onApplicationClick}>View full profile</a></li>
                      </DropdownMenu>
                    </div>
                  </div>
          </div>
          <ModalProfile isShowingModal={this.state.isShowingModal} application={application}/>
        </div>
    );
  }
};
 
export default class VacancyVideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        applications: []
    }
    this.filterVideos = this.filterVideos.bind(this);
  }
  componentWillReceiveProps(nextProps, nextState) {
      this.setState({
          applications: this.filterVideos(nextProps)
      })
  }
  componentDidMount() {
      this.setState({
          applications: this.filterVideos(this.props)
      })
  }
  filterVideos(props) {
    var applications = []
    props.applicationList.map(function(application, i) {
        if (applicationStatus(application) == props.applicationStatus) {
            applications.push(<VacancyVideo key={i} application={application} />)
        }
    })
    return applications;
  }
  render() {
    var applications = this.state.applications;
    return (
      <div>
          {applications}
      </div>
    )
  }
};