const Component = React.Component;
const BrowserRouter = ReactRouterDom.BrowserRouter;
const Link = ReactRouterDom.Link;
const Switch = ReactRouterDom.Switch;
const Route = ReactRouterDom.Route;

const RouteWithAppState = ({component: ComponentName, appState, ...rest}) => (
  <Route {...rest} render={(args) => <ComponentName {...args} appState={appState}/>}/>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: true
    };
    this.toggleNetwork = this.toggleNetwork.bind(this);
  }

  componentDidMount() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.onmessage = (event) => {
        console.log("Broadcasted from SW : ", event.data);

        const data = event.data;
        if (data.command == "networkStatus") {
          this.setState({online: data.online});
        }
      };
    }
  }

  toggleNetwork() {
    this.setState({online: !this.state.online});
  }

  render() {
    const networkStatus = this.state.online ? "ONLINE" : "OFFLINE";

    return (
      <BrowserRouter>
        <div id="app" className="app">
          <div className="app__title-bar">
            <h1 className="app__title">Grand Canyon Tour</h1>
          </div>
          <div className="app__content">
            <nav className="app__nav">
              <Link className="nav__item" to="/">POI List</Link>
              <Link className="nav__item" to="/map">Map</Link>
              <button className="nav__item" onClick={this.toggleNetwork}>Toggle Network</button>
              <span className="app__network-state">{networkStatus}</span>
            </nav>

            <Switch>
              <RouteWithAppState path="/" exact component={HomePage} appState={this.state} />
              <RouteWithAppState path="/poi/:id" component={PoiPage} appState={this.state} />
              <RouteWithAppState path="/map" component={MapPage} appState={this.state} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}
