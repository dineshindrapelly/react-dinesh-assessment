import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const moment = require('moment');

interface Props {
  data: any;
  latestMetrics: any;
  selectedChartOptions: any;
}
let objGrpByTime: Array<any> = [];
let chartData: Array<Object> = [];
let seen: any = {};

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    height: '70vh',
    minHeight: '250px',
  },
});



function grpKey(array: any, key: string): void {
  // arrays to be merged
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].measurements.length; j++) {
      objGrpByTime.push({
        at: moment(array[i].measurements[j]['at']).format('LTS'),
        [array[i].measurements[j]['metric']]: array[i].measurements[j]['value'],
      });
    }
  }
  // time grouping
  objGrpByTime.filter(function(entry) {
    let previous;
    if (seen.hasOwnProperty(entry.at)) {
      previous = seen[entry.at];
      previous.data.push(entry);
      return false;
    }

    if (!Array.isArray(entry)) {
      entry.data = [entry.data];
    }
    seen[entry.at] = entry;
    return true;
  });

  chartData = mergeUniqueObjects(objGrpByTime);
}

function mergeUniqueObjects<T>(array: T[]): T[] {
  const newArray = new Map();
  array.forEach((item: any) => {
    const propertyValue = item['at'];
    newArray.has(propertyValue)
      ? newArray.set(propertyValue, { ...item, ...newArray.get(propertyValue) })
      : newArray.set(propertyValue, item);
  });
  return Array.from(newArray.values());
}

const Charts: React.FC<Props> = props => {
  const classes = useStyles();
  const { data, latestMetrics, selectedChartOptions } = props;
  useEffect(() => {
    grpKey(data, 'at');
  }, [data]);

  useEffect(() => {
    chartData.push(latestMetrics);
    const insertlatestMetrics = chartData;
    chartData = mergeUniqueObjects(insertlatestMetrics);
  }, [latestMetrics]);


  // Updating colors
  const colors = ['#16302B', '#694873', '#8B728E', '#85B79D', '#C0E5C8', '#5E5D5C', '#453643', '#28112B'];
  if (selectedChartOptions.length === 0) {
    return <div style={{paddingLeft: "30px"}}>Select a metric in above dropdown</div>;
  } else {
    return (
      <Fragment>
        <div className={classes.wrapper}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 70, right: 70, left: 70, bottom: 70 }}>
              <XAxis dataKey="at" tickCount={30} />
              <YAxis
                type="number"
                domain={['auto', 'auto']}
                tickCount={30}
                scale="linear"
                padding={{ top: 10, bottom: 10 }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Legend />
              <Tooltip />

              {selectedChartOptions?.map((c: { value: string }, i: number) => {
                return (
                  <Line
                    type="monotone"
                    key={c.value}
                    dataKey={c.value}
                    stroke={colors[i]}
                    dot={false}
                    isAnimationActive={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Fragment>
    );
  }
};

export default Charts;
