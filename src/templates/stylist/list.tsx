import React, { useEffect, useState } from 'react'

import styles from 'sass/templates/stylist/list.module.scss'
import ListBox from 'src/components/list-box'
import communicate from 'lib/api/index'

export default function List() {
  const [supplierLists, setSupplierLists] = useState([])
  useEffect(() => {
    async function fetchSupplierData() {
      const res = await communicate({ url: '/supplier' })
      const suppliers = await res.json()
      setSupplierLists(suppliers.list)
    }
    fetchSupplierData()
  }, [])
  return (
    <div className={styles.listContainer}>
      { supplierLists.map((value) => (
        <ListBox info={value} key={value.id} />
      ))}
    </div>
  )
}
