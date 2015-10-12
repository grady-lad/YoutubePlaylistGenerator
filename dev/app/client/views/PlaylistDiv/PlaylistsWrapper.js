var React = require('react');
var CreatePlaylistComponent = require('./CreatePlaylistComponent');
var ProgressComponent = require('./ProgressComponent');


var PlaylistsWrapper = React.createClass({
  //Used to create inital variables for our view
  getInitialState: function(){
    //console.log(this.props);
    return {
      showing: true,
      count: 0,
      loading: false,
      step: 1,
      title: 'Enter a name for your Playlist'
  	};
  },

  nextStep: function() {
  	this.setState({
  		step : this.state.step + 1
  	});
  },
  
  setTitle: function(plTitle){
     this.setState({
      title : plTitle
    });
  },

  render: function(){
    return(
     <div className="createDiv">
        <div className="bubble">
          <span>{this.state.title}</span>
        </div>
        <div className="playlistContent">
          {(() => {
            switch (this.state.step) {
              case 1: 
                return <CreatePlaylistComponent nextStep={this.nextStep} videos={this.props} setTitle={this.setTitle}/>
              case 2:
                return <ProgressComponent nextStep={this.nextStep} videos={this.props}/>
            }
          })()} 
        </div>
     </div>
     );
  }
});

module.exports = PlaylistsWrapper;