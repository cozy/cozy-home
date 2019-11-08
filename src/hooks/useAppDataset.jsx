import { useState, useEffect } from 'react'

const useAppDataset = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    const root = document.querySelector('[role=application]')
    setData(root.dataset)
  }, [])

  return data
}

export default useAppDataset
