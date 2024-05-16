import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFound"
    />
    <h1 className="notFoundHead">Page Not Found</h1>
    <p className="notFoundDes">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
