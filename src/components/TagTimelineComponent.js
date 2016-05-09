
'use strict';

import React from 'react';
//import ReactDOM from 'react-dom'

require('styles//TagPlayer.css');


class TagTimelineComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log('timeline props', props);

	}

	_gotoFrame(i) {
		console.log('GOTO FRAME', i, this.props.conceptData[i], this.props.gotoTime);
		const time = this.props.conceptData[i].start;
		this.props.gotoTime(time);
	}

	componentWillReceiveProps(newProps) {
		console.log('UPDATE', this.props, newProps)
		if(newProps.videoURL) {
			console.log('VIDEO URL', newProps.videoURL);
		}
	}

	render() {
		//const width = 500;
		let conceptList = this.props.conceptData.map((d, i) => {
			
			return (
		 		<li key={i}  onClick={this._gotoFrame.bind(this, i)} style={{left: d.start+'px'}}>
		 			<span className='info'>
		 				<span className='time'>{Math.round(d.start)}s</span>
		 				<span className='tags'>{d.concepts}</span>
		 				<canvas className='screenshot'></canvas>

		 			</span>

		 		</li>
		 	)
		})

		return (
			<div className="tagtimeline-component">
				<ul>
					{conceptList}
				</ul>
			</div>
		);
	}
}

TagTimelineComponent.displayName = 'TagTimeline';

export default TagTimelineComponent;