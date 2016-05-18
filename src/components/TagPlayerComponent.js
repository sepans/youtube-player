'use strict';

import React from 'react';
import ReactDOM from 'react-dom'

import YoutubeUtils from '../lib/YoutubeUtils';
import TagTimeline from '../components/TagTimelineComponent';


require('styles//TagPlayer.css');


class TagPlayerComponent extends React.Component {

	// getInitialState () {
 //    	return {
 //      		webmURL: null
 //    	};
 //  	}

	constructor(props) {
    	super(props);

    	this.state = {
      		webmURL: null,
      		playing: false
    	}

  		console.log('constructor...', props);
  		YoutubeUtils.queryVideoInfo(props.youtubeId)
  			.then(function(info) {
  				this.webmURL = info.webmURL;
  				this.$video.src = this.webmURL;

  				this.setState({
  					webmURL: this.webmURL
  				});

  				
  			}.bind(this))
  			.catch(function(error) { console.log(error) });
  	}

	componentDidMount(){
		
		//create a reference to the video element
		this.$video = ReactDOM.findDOMNode( this.refs.vid )
		

	}

	_play() {
  			this.state.playing = true;
  			this.$video.play();
  			this.forceUpdate();
  	}

  	
	_pause() {
  			this.state.playing = false;
  			this.$video.pause();
  			this.forceUpdate();
  	}

  	_togglePlay() {
  		if(this.state.playing) {
  			this._pause();
  		}
  		else {
  			this._play();
  		}
  	}

  	gotoTime(time) {
  		this.$video.currentTime = time;

  	}


	render() {

		const vidClassName = this.state.playing  ? 'video-container playing' : 'video-container';

	    return (
	    <div className="tagplayer-component">
	      <div className={vidClassName} >
	        <video ref="vid" onClick={this._togglePlay.bind(this)}></video>
	        
	      </div>
	      <div>
	      	<button className='fa fa-play' onClick={this._play.bind(this)}></button>
	      	<button className='fa fa-pause' onClick={this._pause.bind(this)}></button>
	      </div>
	      <div>
	      	    <TagTimeline conceptData={this.props.conceptData}
	      	    			 gotoTime={this.gotoTime.bind(this)}
	      	    			 videoURL={this.state.webmURL}>
	      	    </TagTimeline>
	      </div>
	     </div>
	    );
	}
}

TagPlayerComponent.displayName = 'TagPlayer';


export default TagPlayerComponent;


