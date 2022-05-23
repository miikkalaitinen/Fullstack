const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) throw Error('Weight must not be 0')
  else {
    const bmi: number = weight / ((height / 100) * (height / 100))
    if (bmi < 18.5) return 'Underweight (Unhealthy)'
    if (bmi >= 18.5 && bmi < 25) return 'Normal range (Healthy)'
    if (bmi >= 25 && bmi < 30) return 'Overweight (At risk)'
    if (bmi >= 30) return 'Overweight (At risk)'
  }
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

console.log(calculateBmi(a, b))
