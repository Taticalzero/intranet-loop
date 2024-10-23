import { getSurveyChartData } from '@/lib/actions/surveyActions'
import { ChartSurvey } from '../_components/chart-survey'

export default async function Page() {
  const chartData = await getSurveyChartData()
  return (
    <ChartSurvey
      chartData={{
        totalFormularios: chartData.totalFormularios,
        totalRespostas: chartData.totalRespostas,
      }}
    />
  )
}
