import {toRaw} from "nativescript-vue";
import {getShowDays} from "~/utils/dateUtils";
import {Habit} from "~/types";
import {CanvasRenderingContext2D} from "@nativescript/canvas";
import 'chart.js/auto';
import { BasePlatform, BubbleDataPoint, Chart, ChartEvent, ChartTypeRegistry, ScatterDataPoint } from 'chart.js';

class NativeScriptPlatform extends BasePlatform {
// @ts-ignore

    acquireContext(item) {
        // To prevent canvas fingerprinting, some add-ons undefine the getContext
        // method, for example: https://github.com/kkapsner/CanvasBlocker
        // https://github.com/chartjs/Chart.js/issues/2807
        return item && item.getContext && item.getContext('2d') || null;
    }

    addEventListener(chart: Chart<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint)[], unknown>, type: string, listener: (e: ChartEvent) => void): void {
// @ts-ignore
        (chart.canvas as any).addEventListener(type, (args) => {
            const event: any = {
                type,
                chart,
                native: args,
            };

            if (args.touches) {
                const touch = args.touches.item(0);
                event.x = touch.clientX;
                event.y = touch.clientY;
            }
            listener(event);
        });
    }
}
export function printWeekLine(ctx: CanvasRenderingContext2D, habits: Habit[], findIndexHabitDay: Function) {



      var c = new Chart(ctx, {
          type: 'bar',
          // @ts-ignore
          platform: NativeScriptPlatform,
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: '# of Votes',
                  data: [1200, 1900, 300, 500, 200, 300],
                  borderWidth: 1
              }]
          },

          options: {
              animations: {
                  y: {
                      duration: 700,
                      easing: 'linear'
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });

/*
    const datasets = toRaw(habits).map(habit => ({
        label: habit.title,
        borderColor: habit.color,
        backgroundColor: habit.color,
        tension: 0.4,
        data: getShowDays().map(day => findIndexHabitDay(day.date, habit)?.habitDay?.value ?? 0)
    }));
    const labels = getShowDays().map(x => x.dayWeekName);
    const min = Math.min(...datasets.flatMap(x => x.data)) - 1
    const max = Math.max(...datasets.flatMap(x => x.data)) + 1

    const data = {
        labels: labels,
        datasets
    };
    const config = {
        type: 'line',
        data: data,
// @ts-ignore
        platform: NativeScriptPlatform,
        options: {
            elements: {
                point: {
                    radius: 0
                }

            },
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
            interaction: {
                intersect: false,
            },

            scales: {
                x: {
                    display: false,
                    title: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    title: {
                        display: false,
                        text: 'Value'
                    },
                    suggestedMin: min,
                    suggestedMax: max
                }
            }
        },
    };
// @ts-ignore
    var chart = new Chart(ctx, config);*/

}