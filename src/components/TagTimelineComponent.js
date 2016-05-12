
'use strict';

import React from 'react';
import ReactDOM from 'react-dom'

require('styles//TagPlayer.css');


class TagTimelineComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentWidth: 30,
			currentSlide: -130
		}

	}

	_gotoFrame(i) {
		const time = this.props.conceptData[i].start;
		this.props.gotoTime(time);
	}

	componentWillReceiveProps(newProps) {

		// called when props get updated (e.g. video url is set after ajax call)
		if(newProps.videoURL) {

			// virtual video element to create screenshots
			const vid= document.createElement('video');
			const self = this;
					

			let createScreenshot = function(i) {

				let d = self.props.conceptData[i];

				const canvas =  ReactDOM.findDOMNode( self.refs['canvas'+i])

				// vid.src is the same. shouldn't change but without reseting it
				// inloadeddata is not getting called (which seems to be needed)
				vid.src = newProps.videoURL;
				vid.currentTime = d.start;

				const ctx = canvas.getContext('2d');

				vid.onloadeddata = function() {
					  
					ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
					if(i<self.props.conceptData.length-1) {
						//create screenshot for the next frame
						createScreenshot(i+1)
					}
				}

			}

			createScreenshot(0);
					

		}
	}

	_moveLeft() {
		if(this.state.currentSlide < 100) {
			this.state.currentSlide += 100;
			this.forceUpdate();
		}
	}

	_moveRight() {
		if(this.state.currentSlide > -this.state.currentWidth*30) {
			this.state.currentSlide -= 100;
			this.forceUpdate();
		}

	}

	_zoomIn() {
		if(this.state.currentWidth < 160) {
			this.state.currentWidth += 20;
		
			this.forceUpdate();
		}
	}

	_zoomOut() {
		if(this.state.currentWidth > 20) {
			this.state.currentWidth -= 20;
			this.forceUpdate();
		}

	}

	render() {
		//const width = 500;
		let conceptList = this.props.conceptData.map((d, i) => {

			const styles = {
							'left' :  Math.round(d.start)+'px',
							 'width' : (d.end-d.start)+'px'
							}
			
			return (
				
			 		<li key={i}  onClick={this._gotoFrame.bind(this, i)} style={Object.assign(styles)}>
			 			<span className='info'>
			 				<span className='time'>{Math.round(d.start)}s</span>
			 				<span className='tags'>{d.concepts}</span>
			 				

			 			</span>

			 		</li>
			 	
		 	)
		})

		let canvases = this.props.conceptData.map((d, i) => {
			return (
				<canvas key={'canvas'+i} className='screenshot' onClick={this._gotoFrame.bind(this, i)} style={{left: i*this.state.currentWidth+'px'}} ref={'canvas'+i}></canvas>
			)
		})

		return (
			<div className="tagtimeline-component">
				<ul key='ls' className='timeline-list'>
					{conceptList}
				</ul>
				<div className='canvas-container'>
					<div className='canvas-slider' style={{marginLeft: this.state.currentSlide}}>
						{canvases}
					</div>
				</div>
				<div className='control'>
	      			<button className='fa fa-hand-o-left' onClick={this._moveLeft.bind(this)}></button>
	      			<button className='fa fa-search-plus' onClick={this._zoomIn.bind(this)}></button>
	      			<button className='fa fa-search-minus' onClick={this._zoomOut.bind(this)}></button>
	      			<button className='fa fa-hand-o-right' onClick={this._moveRight.bind(this)}></button>
	      		</div>

			</div>
		);
	}
}

TagTimelineComponent.displayName = 'TagTimeline';

export default TagTimelineComponent;