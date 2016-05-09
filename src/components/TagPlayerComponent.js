'use strict';

import React from 'react';
import ReactDOM from 'react-dom'

import YoutubeUtils from '../lib/YoutubeUtils';
import TagTimeline from '../components/TagTimelineComponent';


require('styles//TagPlayer.css');


class TagPlayerComponent extends React.Component {

	

	constructor(props) {
    	super(props);
  		console.log('constructor...', props);
  		YoutubeUtils.queryVideoInfo(props.youtubeId)
  			.then(function(info) {
  				this.webmURL = info.webmURL;
  				console.log('webmURL', this.webmURL);
  				console.log(this.$video);
  				//console.log('state', this.state)
  				this.$video.src = this.webmURL;

  				// TO FORCE render to pass videoURL down. better solution?!
  				this.forceUpdate();
  				
  			}.bind(this))
  			.catch(function(error) { console.log(error) });
  	}

	componentDidMount(){
		
		
		this.$video = ReactDOM.findDOMNode( this.refs.vid )
		console.log('$video', this.$video);
		//$video.addEventListener("loadedmetadata", this._metaDataLoaded )
		//$video.addEventListener("progress", this._progress )
		

	}

	_play() {
  			console.log('play', this.$video)
  			this.$video.play();
  	}

  	
	_pause() {
  			this.$video.pause();
  	}

  	gotoTime(time) {
  		this.$video.currentTime = time;

  	}


	render() {

		//console.log('render this.webmURL', this.webmURL)

	    return (
	    <div className="tagplayer-component">
	      <div >
	        <video ref="vid"></video>
	        
	      </div>
	      <div>
	      	<button onClick={this._play.bind(this)}>Play</button>
	      	<button onClick={this._pause.bind(this)}>Pause</button>
	      </div>
	      <div>
	      	    <TagTimeline conceptData={this.props.conceptData}
	      	    			 gotoTime={this.gotoTime.bind(this)}
	      	    			 videoURL={this.webmURL}>
	      	    </TagTimeline>
	      </div>
	     </div>
	    );
	}
}

TagPlayerComponent.displayName = 'TagPlayer';

// Uncomment properties you need
// TagPlayerComponent.propTypes = {};
// TagPlayerComponent.defaultProps = {};

export default TagPlayerComponent;

