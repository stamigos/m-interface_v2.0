import React from 'react';
// import ReactVideo from 'react.video';
import Video from 'react-html5video';
class VacancyVideo extends React.Component {


  render() {
    return (
      <div>
        <div className="applicant-message">

        <Video controls autoPlay loop muted
            onCanPlayThrough={() => {
                // Do stuff 
            }}>
            <source src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type="video/mp4" />
        </Video>

        </div>
        <div className="applicant-message">
          <Video controls autoPlay loop muted
              onCanPlayThrough={() => {
                  // Do stuff 
              }}>
              <source src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type="video/mp4" />
          </Video>
        </div>
      </div>
    );
  }
};
 
export default VacancyVideo;