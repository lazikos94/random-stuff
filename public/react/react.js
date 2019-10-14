class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    const target = event.target;
    const firstname = target.name;
    const lastname = target.name;
    const age = target.name;
    const value = target.value;

    this.setState({
      [firstname]:value,
      [lastname]:value,
      [age]:value,
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.firstname +' ' + this.state.lastname +' ' + this.state.age);
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          FirstName:
          <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} />
        </label>
        <br/>
        <label>
          LastName:
          <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} />
        </label>
        <br/>
        <label>
          Age:
          <input name="age" type="number" value={this.state.age} onChange={this.handleChange} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root')
);