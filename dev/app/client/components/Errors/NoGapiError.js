var React = require('react');
var NoGapiError = React.createClass({

  render: function(){
    return (
  		<section id="preAuth">
        <div className="content">
          <h1> Oops we could not load the google api to
               authorize your account Please refresh the page
               and try again
          </h1>
        </div>
      </section>
  	);
  }
});

module.exports = NoGapiError;