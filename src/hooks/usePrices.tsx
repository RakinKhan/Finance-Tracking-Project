import React, {useState, useEffect} from 'react'

const usePrices = (labels:any) => {
    console.log('hi')
    const [pall, setPall] = useState([]as any)
    const currentPriceAll = async (labels:any) => {
        const pAll = await Promise.all(labels.map((label: any) => {
          const response = fetch(`https://finnhub.io/api/v1/quote?symbol=${label}&token=bprteb7rh5r8s3uvb2ag`).then((res:any) => res.json()).then((res:any) => {return {
            stock: label,
            price: res.c
          }})
          return response
        }))
        setPall(pAll)
      }

    useEffect(() => {
        if (labels.length > 0) {
            currentPriceAll(labels)
        }
        if (pall.length > 0) {
            const interval = setInterval(() => {
                currentPriceAll(labels)
              }, 15000)
            return () => clearInterval(interval)
        }
    }, [labels, pall])
    console.log(pall)
}
export default usePrices;