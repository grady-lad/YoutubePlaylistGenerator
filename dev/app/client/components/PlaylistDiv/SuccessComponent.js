var React = require('react');

var SuccessComponent = React.createClass({

  render: function(){
  	console.log("within the success render component");
  	console.log(this.props.PLID);
  	return (
  		<div className="success">
  		 <p> Playlist successfuly created which can be seen</p>
  		 <a href={this.props.PLID}> here </a>
  		</div>
  	);
  }
});

module.exports = SuccessComponent;