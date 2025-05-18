import { BarDummyData } from './DummyData'

export const getFilteredBarData = (
    start: string,
    end: string
  ) => {
    const rawData = BarDummyData
    const startDate = new Date(start)
    const endDate = new Date(end)
  
    const labels: string[] = []
    const values: number[] = []
  
    rawData.forEach(entry => {
      const date = new Date(entry.label + '-01')
      if (date >= startDate && date <= endDate) {
        labels.push(entry.label)
        values.push(Number(entry.value))
      }
    })
  
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: values,
          backgroundColor: '#42A5F5'
        }
      ],
      
    }
  }
  
  export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
          display: true,
          text: 'Total Revenue Distribution',
          font: {
            size: 16
          },
          color: '#e5e7eb' 
        }}
  }
  