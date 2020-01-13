import React, { PropTypes as T } from 'react'


export class SignUpForm extends React.Component {

  onClick(place, map, google) {
    if (this.props.onListItemClick) {
      place.place = place;
      this.props.onListItemClick(place, map, google)
    }
  }
  render() {
    return (
      <div className={classnames(styles.sidebar)}>
        <h1> hi </h1>
      </div>
    )
  }
}

SignUpForm.propTypes = {
  places: T.array,
  title: T.string,
  onListItemClick: T.func
}

SignUpForm.defaultProps = {
  title: 'Restaurants'
}

export default SignUpForm