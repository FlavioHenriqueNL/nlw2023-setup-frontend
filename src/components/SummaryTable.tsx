import  dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import {HabitDay, FutureHabitDay} from "./HabitDay";

const DiasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7 // 18 semanas
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length


type Summary = {
	id: String,
	date: String,
	amount: number,
	completed: number
}[]

export default function SummaryTable() {

	const [summary, setSummary] = useState<Summary>([]);

	useEffect(()=>{
		api.get('/summary').then(
			response => setSummary(response.data)
		)
	},[])

	return (
		<div className="w-full flex">
			<div className="grid grid-rows-7 grid-flow-row gap-3">
				{DiasSemana.map((dia, index) => (
					<div key={`${dia}-${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
						{dia}
					</div>
				))}
			</div>

			<div className="grid grid-rows-7 grid-flow-col gap-3">
				
				{summary.length > 0 && summaryDates.map(date => {

					const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'))

					return(
						<HabitDay 
							key={date.toString()}
							date={date}
							defaultCompleted={dayInSummary?.completed} 
							amount={dayInSummary?.amount} 	
						/>
					)

				})}
				{amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_,index) =>(
					<FutureHabitDay key={index}/>
				))}
				
			</div>

		</div>
	)
}