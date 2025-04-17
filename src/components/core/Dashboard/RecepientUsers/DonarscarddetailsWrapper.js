import { useParams } from 'react-router-dom'
import Donarscarddetails from './Donarscarddetails'
import { useSelector } from 'react-redux'

const DonarscarddetailsWrapper = () => {
  const { id } = useParams()
  const donor = useSelector(state =>
    state.donors.data.find(d => d._id === id)
  )

  if (!donor) return <div>Donor not found.</div>

  return <Donarscarddetails donor={donor} />
}


export default DonarscarddetailsWrapper;