require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import _ from 'underscore';


//import TagPlayerComponent from 'TagPlayerComponent';
import TagPlayer from '../components/TagPlayerComponent';

let rawConceptData = require('dsv!../data/car.csv');

//let yeomanImage = require('../images/yeoman.png');
//let TagPlayerComponent = require('components/TagPlayerComponent');


class AppComponent extends React.Component {
	constructor(props) {
		super(props)
		let allConceptData = _.chain(rawConceptData)
  			.groupBy('youtubeID')
  			.sortBy(function(d) {
  				
  				return d.length;
  			})
  			.reverse()
  			.value();
  		this.topId = allConceptData[1][0].youtubeID;
  		this.conceptData = _.sortBy(allConceptData[1], (d) =>  parseFloat(d.start));
  		//console.log(conceptData);

	}

  render() {
    return (
      <div className='index container'>
        <TagPlayer youtubeId={this.topId} conceptData={this.conceptData}></TagPlayer>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
