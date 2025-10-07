import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Post({ title, contents, author: userId, imageUrl }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <div>{imageUrl}</div>
      {userId && (
        <em>
          <br />
          Recipe by: <User id={userId} />
        </em>
      )}
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
}
