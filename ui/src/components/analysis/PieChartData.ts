import { countryRevenueData, pieColor } from './DummyData'

export const pieData = {
    labels: Object.keys(countryRevenueData),
    datasets: [
      {
        backgroundColor: pieColor, 
        data: Object.values(countryRevenueData).map(value => Number(value))
      }
    ]
  }
  
  export const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
          display: true,
          text: 'Most Purchases By Countries',
          font: {
            size: 16
          },
          color: '#e5e7eb' 
        }}
  }
  