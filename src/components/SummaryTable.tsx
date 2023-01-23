import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import {HabitDay, FutureHabitDay} from "./HabitDay";

const DiasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7 // 18 semanas
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

console.log(summaryDates)
export default function SummaryTable() {

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
				
				{summaryDates.map(date => (
					<HabitDay 
						key={date.toString()}
						completed={Math.round(Math.random() * 5)} 
						amount={5} 	
					/>
				))}
				{amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_,index) =>(
					<FutureHabitDay key={index}/>
				))}
				
			</div>

		</div>
	)
}