var React = require('react');

var SuccessComponent = React.createClass({

  render: function(){
    return (
  		<div className="success">
        <p> Playlist successfuly created which can be seen</p>
        <a href={this.props.data}> here </a>
  		</div>
  	);
  }
});

module.exports = SuccessComponent;