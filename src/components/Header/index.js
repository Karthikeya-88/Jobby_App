import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navEl">
      <ul className="listContainer">
        <li className="logoCont">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>
        <li className="navLinksCont">
          <Link to="/" className="navLink">
            <h1 className="navName">Home</h1>
            <AiFillHome className="navIcon" />
          </Link>
          <Link to="/jobs" className="navLink">
            <h1 className="navName">Jobs</h1>
            <BsFillBriefcaseFill className="navIcon" />
          </Link>
        </li>
        <li className="navBtnCont">
          <FiLogOut onClick={onClickLogout} className="navIcon" />
          <button type="button" onClick={onClickLogout} className="logoutBtn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
