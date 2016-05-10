
'use strict';

import React from 'react';
import ReactDOM from 'react-dom'

require('styles//TagPlayer.css');


class TagTimelineComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log('timeline props', props);

		this.state = {
			currentWidth: 30,
			currentSlide: -130
		}

	}

	_gotoFrame(i) {
		console.log('GOTO FRAME', i, this.props.conceptData[i], this.props.gotoTime);
		const time = this.props.conceptData[i].start;
		this.props.gotoTime(time);
	}

	componentWillReceiveProps(newProps) {
		//console.log('UPDATE', this.props, newProps)
		if(newProps.videoURL) {
			//console.log('VIDEO URL', newProps.videoURL);
			console.log(this.refs);
			const vid= document.createElement('video');
			//vid.src = newProps.videoURL;
			const self = this;
				console.log('onloadeddata', vid);

				//self.props.conceptData.forEach(function(d,i) {
					

					let createScreenshot = function(i) {
						console.log('createScreenshot', i)
						let d = self.props.conceptData[i];

						const canvas =  ReactDOM.findDOMNode( self.refs['canvas'+i])

						// vid.src is the same. shouldn't change but without reseting it
						// inloadeddata is not getting called (which seems to be needed)
						vid.src = newProps.videoURL;
	    				vid.currentTime = d.start;

	    				const ctx = canvas.getContext('2d');


	    				console.log('waiting for load');
				   

						vid.onloadeddata = function() {
							console.log('DRAW', vid.currentTime, i,  self.props.conceptData.length)
							  
							ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
							if(i<self.props.conceptData.length-1) {
								console.log('call', i+1);
								createScreenshot(i+1)
							}
						}

					}

					createScreenshot(0);
					
				    

				    

    				//ctx.restore();


				   
				//});

			//}

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
				<canvas className='screenshot' onClick={this._gotoFrame.bind(this, i)} style={{left: i*this.state.currentWidth+'px'}} ref={'canvas'+i}></canvas>
			)
		})

		return (
			<div className="tagtimeline-component">
				<ul>
					{conceptList}
				</ul>
				<div className='canvas-container'>
					<div className='canvas-slider' style={{marginLeft: this.state.currentSlide}}>
						{canvases}
					</div>
				</div>
				<div>
	      			<button className='btn' onClick={this._moveLeft.bind(this)}>&lt;</button>
	      			<button className='btn' onClick={this._zoomIn.bind(this)}>+</button>
	      			<button className='btn' onClick={this._zoomOut.bind(this)}>-</button>
	      			<button className='btn' onClick={this._moveRight.bind(this)}>&gt;</button>
	      		</div>

			</div>
		);
	}
}

TagTimelineComponent.displayName = 'TagTimeline';

export default TagTimelineComponent;