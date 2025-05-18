import { categoryTrendsSalesData, colors, months } from './DummyData'

const categoryTrendsSalesDataset = Object.keys(categoryTrendsSalesData).map((key, index) => {
  const category = {
    label: key,
    backgroundColor: colors[index % colors.length],
    data: categoryTrendsSalesData[key],
    borderColor: colors[index % colors.length]
  }
  return category
});

export const lineData = {
    labels: months,
    datasets: categoryTrendsSalesDataset,
  }
  
  export const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Category Trends Per Sales Over Time',
        font: {
          size: 16
        },
        color: '#e5e7eb'
      }}
  }
  