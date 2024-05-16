import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADING',
}

class Jobs extends Component {
  state = {
    profileData: {},
    apiStatus: apiStatusConstant.initial,
    checkboxInputs: [],
    radioInput: '',
    searchValue: '',
    jobs: [],
    apiJobStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getProfileJobs()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.loader})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profile = data.profile_details
      const updatedData = {
        name: profile.name,
        profileUrl: profile.profile_image_url,
        bio: profile.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getProfileJobs = async () => {
    this.setState({apiJobStatus: apiStatusConstant.loader})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchValue} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchValue}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employementType: each.employment_type,
        description: each.job_description,
        location: each.location,
        packagePA: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobs: jobsData,
        apiJobStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiJobStatus: apiStatusConstant.failure})
    }
  }

  onChangeSearch = e => {
    this.setState({searchValue: e.target.value})
  }

  onRetryJobs = () => {
    this.getProfileJobs()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetryJobs}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileView = () => {
    const {profileData} = this.state
    const {name, profileUrl, bio} = profileData
    return (
      <div>
        <img src={profileUrl} alt="profile" className="profileImage" />
        <h1 className="profileName">{name}</h1>
        <p className="profileBio">{bio}</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.getProfileView()
      case apiStatusConstant.loader:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  radioboxInputOption = event => {
    this.setState({radioInput: event.target.id}, this.getProfileJobs)
  }

  checkboxInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      each => each === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getProfileJobs,
      )
    } else {
      const filterData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prevState => ({checkboxInputs: filterData}),
        this.getProfileJobs,
      )
    }
  }

  onGetCheckBoxes = () => (
    <ul>
      {employmentTypesList.map(each => (
        <li className="checkboxStyle" key={each.employmentTypeId}>
          <input
            id={each.employmentTypeId}
            type="checkbox"
            onChange={this.checkboxInputOption}
          />
          <label className="labelled" htmlFor={each.employmentTypeId}>
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioBoxes = () => (
    <ul>
      {salaryRangesList.map(each => (
        <li className="checkboxStyle" key={each.salaryRangeId}>
          <input
            id={each.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.radioboxInputOption}
          />
          <label className="labelled" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getJobs = () => {
    const {jobs} = this.state
    const noJobs = jobs.length > 0
    return noJobs ? (
      <ul className="jobCont">
        {jobs.map(each => (
          <JobCard key={each.id} jobDescription={each} />
        ))}
      </ul>
    ) : (
      <div className="noJobsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  onRenderJobStatus = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiStatusConstant.success:
        return this.getJobs()
      case apiStatusConstant.failure:
        return this.renderFailure()
      case apiStatusConstant.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  onSubmitSearch = () => {
    this.getProfileJobs()
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getProfileJobs()
    }
  }

  render() {
    const {searchValue} = this.state
    return (
      <>
        <Header className="jobHeader" />
        <div className="ultimateJobsPage">
          <div className="profileAndSorts">
            <div className="profileCard">{this.renderProfileDetails()}</div>
            <hr className="hrLine" />
            <h1 className="checkBoxHeading">Type of Employment</h1>
            {this.onGetCheckBoxes()}
            <hr className="hrLine" />
            <h1 className="checkBoxHeading">Salary Range</h1>
            {this.onGetRadioBoxes()}
          </div>
          <div className="jobsDetails">
            <div className="search">
              <input
                value={searchValue}
                onKeyDown={this.onEnterSearch}
                onChange={this.onChangeSearch}
                type="search"
                className="searchInput"
                placeholder="Search"
                id="search"
              />
              <button
                className="search-icon"
                type="button"
                data-testid="searchButton"
                onClick={this.onSubmitSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.onRenderJobStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
